import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { formSchema } from '@/lib/validations'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TITLES = { contact: 'Message de contact', volontariat: 'Candidature volontariat', don: 'Intention de don' } as const

// Limite simple : 5 envois par adresse IP toutes les 10 minutes (par instance serveur)
const hits = new Map<string, number[]>()
function tooMany(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local'
  if (tooMany(ip)) {
    return NextResponse.json({ ok: false, error: 'Trop de messages envoyés. Merci de réessayer dans quelques minutes.' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 }) }

  const parsed = formSchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return NextResponse.json({ ok: false, error: first?.message || 'Formulaire incomplet.' }, { status: 400 })
  }
  const data = parsed.data
  // Robot détecté : on fait comme si tout allait bien
  if (data.website) return NextResponse.json({ ok: true })

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_FROM } = process.env
  const MAIL_TO = process.env.MAIL_TO || 'info@croix-rougeci.org'
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[contact] SMTP non configuré : renseignez SMTP_HOST, SMTP_USER et SMTP_PASS dans Vercel.')
    return NextResponse.json({ ok: false, error: "L'envoi en ligne n'est pas encore activé. Merci de nous écrire à info@croix-rougeci.org ou d'appeler le (+225) 27 20 21 72 40." }, { status: 503 })
  }

  const fullName = [data.prenom, data.nom].filter(Boolean).join(' ')
  const subject = `[Site CRCI] ${TITLES[data.type]} — ${data.sujet || fullName}`
  const rows: [string, string][] = [
    ['Nom', fullName],
    ['E-mail', data.email],
    ['Téléphone', data.telephone || '—'],
    ...(data.sujet ? [['Sujet', data.sujet] as [string, string]] : []),
    ...Object.entries(data.details),
  ]
  const text = `${TITLES[data.type]}\n\n${rows.map(([k, v]) => `${k} : ${v}`).join('\n')}${data.message ? `\n\nMessage :\n${data.message}` : ''}\n\n— Envoyé depuis le site de la Croix-Rouge de Côte d'Ivoire`
  const html = `<div style="font-family:Arial,sans-serif;color:#0B1F3A;max-width:640px">
    <div style="background:#0B1F3A;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0;border-bottom:3px solid #ED1C24"><strong>${esc(TITLES[data.type])}</strong> — site CRCI</div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #D9E3F2">${rows.map(([k, v]) => `<tr><td style="padding:8px 12px;background:#EEF3FA;width:35%;font-weight:bold;border-top:1px solid #D9E3F2">${esc(k)}</td><td style="padding:8px 12px;border-top:1px solid #D9E3F2">${esc(v)}</td></tr>`).join('')}</table>
    ${data.message ? `<div style="padding:16px 12px;white-space:pre-wrap;border:1px solid #D9E3F2;border-top:0">${esc(data.message)}</div>` : ''}
    <p style="color:#64748b;font-size:12px;margin-top:12px">Répondez directement à cet e-mail pour écrire à ${esc(fullName)}.</p></div>`

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === 'true' || SMTP_PORT === '465',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    await transporter.sendMail({
      from: MAIL_FROM || `Site CRCI <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: `${fullName} <${data.email}>`,
      subject,
      text,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] échec envoi SMTP :', err)
    return NextResponse.json({ ok: false, error: "Le message n'a pas pu être envoyé. Merci de réessayer ou de nous écrire à info@croix-rougeci.org." }, { status: 502 })
  }
}
