'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Smartphone, Building2, Copy, CheckCircle, ExternalLink, Send, Loader2, Info } from 'lucide-react'
import { DONATION_AMOUNTS, BANK_INFO, WAVE_INFO, formatIban } from '@/data'
import { formatCurrency } from '@/lib/utils'
import { sendForm } from '@/lib/sendForm'
import { FormError, Honeypot, inputCls } from '@/components/forms/FormStatus'

type Method = 'wave' | 'virement'

export default function DonationPanel() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'unique' | 'mensuel'>('unique')
  const [method, setMethod] = useState<Method>('wave')
  const [copied, setCopied] = useState<string | null>(null)
  const [donor, setDonor] = useState({ nom: '', email: '', telephone: '', message: '' })
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const amount = customAmount ? parseInt(customAmount, 10) || null : selectedAmount
  const selected = DONATION_AMOUNTS.find((d) => d.amount === amount)
  const amountLabel = amount ? formatCurrency(amount) : 'Montant libre'

  const copy = async (text: string, key: string) => {
    try { await navigator.clipboard.writeText(text) } catch { /* presse-papiers indisponible */ }
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const notify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('sending')
    const res = await sendForm({
      type: 'don',
      nom: donor.nom, email: donor.email, telephone: donor.telephone,
      sujet: `${amountLabel}${frequency === 'mensuel' ? ' / mois' : ''} par ${method === 'wave' ? 'Wave' : 'virement SIB'}`,
      message: donor.message,
      details: {
        'Montant': amountLabel,
        'Fréquence': frequency === 'mensuel' ? 'Mensuel' : 'Don unique',
        'Moyen de paiement': method === 'wave' ? 'Wave' : `Virement bancaire (${BANK_INFO.bankName})`,
        'Reçu de don souhaité': 'Oui',
      },
      website,
    })
    if (res.ok) setStatus('sent')
    else { setStatus('idle'); setError(res.error) }
  }

  const bankRows = [
    { label: 'Bénéficiaire', value: BANK_INFO.accountName, key: 'name' },
    { label: 'Banque', value: `${BANK_INFO.bankName} — ${BANK_INFO.branch}`, key: 'bank', noCopy: true },
    { label: 'N° de compte', value: BANK_INFO.accountNumber, key: 'account' },
    { label: 'IBAN', value: formatIban(BANK_INFO.iban), copyValue: BANK_INFO.iban, key: 'iban' },
    { label: 'Code BIC / SWIFT', value: BANK_INFO.bic, key: 'bic' },
    { label: 'Type de compte', value: BANK_INFO.accountType, key: 'type', noCopy: true },
    { label: 'Libellé à indiquer', value: BANK_INFO.reference, key: 'ref' },
  ]

  return (
    <div className="bg-white rounded-3xl shadow-navy border border-navy-100 overflow-hidden">
      {/* Étape 1 : montant */}
      <div className="p-6 md:p-10 border-b border-navy-100">
        <StepTitle n={1} title="Choisissez votre don" />
        <div className="flex gap-1 mb-6 bg-navy-50 p-1 rounded-xl">
          {(['unique', 'mensuel'] as const).map((f) => (
            <button key={f} onClick={() => setFrequency(f)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${frequency === f ? 'bg-navy text-white shadow' : 'text-navy/70 hover:text-navy'}`}>
              {f === 'unique' ? 'Don unique' : 'Don mensuel'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {DONATION_AMOUNTS.map((d) => {
            const active = selectedAmount === d.amount && !customAmount
            return (
              <button key={d.amount} onClick={() => { setSelectedAmount(d.amount); setCustomAmount('') }}
                className={`py-4 rounded-xl border-2 font-display font-bold transition-all ${active ? 'border-[#ED1C24] bg-red-50 text-[#C0181E]' : 'border-navy-100 text-navy hover:border-navy-200'}`}>
                {formatCurrency(d.amount)}
              </button>
            )
          })}
        </div>
        <label htmlFor="montant-libre" className="block text-sm font-medium text-navy mb-2">Ou un montant libre (FCFA)</label>
        <input id="montant-libre" type="number" min={500} step={500} inputMode="numeric" placeholder="Ex. : 75 000" value={customAmount}
          onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
          className={`${inputCls()} text-lg font-bold`} />
        {selected && (
          <p className="mt-4 flex items-start gap-2 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" /> {selected.impact}
          </p>
        )}
      </div>

      {/* Étape 2 : paiement */}
      <div className="p-6 md:p-10 border-b border-navy-100 bg-navy-50/30">
        <StepTitle n={2} title="Payez avec Wave ou par virement" />
        <div className="grid grid-cols-2 gap-3 mb-6" role="tablist">
          {([
            { id: 'wave', label: 'Wave', icon: Smartphone },
            { id: 'virement', label: 'Virement bancaire', icon: Building2 },
          ] as const).map((m) => (
            <button key={m.id} role="tab" aria-selected={method === m.id} onClick={() => setMethod(m.id)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${method === m.id ? 'border-navy bg-white text-navy shadow-sm' : 'border-transparent bg-white/60 text-navy/60 hover:text-navy'}`}>
              <m.icon className="w-4 h-4" /> {m.label}
            </button>
          ))}
        </div>

        {method === 'wave' ? (
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-center">
            <div className="bg-white rounded-2xl p-3 border border-navy-100 shadow-sm mx-auto">
              <Image src={WAVE_INFO.qrImage} alt="QR code Wave de la Croix-Rouge de Côte d'Ivoire" width={334} height={328} className="w-44 h-auto" />
            </div>
            <div>
              <ol className="space-y-2 text-sm text-slate-600 mb-5 list-decimal pl-5">
                <li>Ouvrez l&apos;application <strong className="text-navy">Wave</strong> et scannez le QR code,</li>
                <li>ou, sur votre téléphone, appuyez sur le bouton ci-dessous ;</li>
                <li>saisissez le montant de votre don : <strong className="text-navy">{amountLabel}</strong>.</li>
              </ol>
              <a href={WAVE_INFO.payUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1DC8FF] hover:bg-[#12b5ea] text-navy-950 px-6 py-3 rounded-full font-bold transition-colors">
                <Smartphone className="w-4 h-4" /> Payer avec Wave <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div>
            <dl className="bg-white rounded-2xl border border-navy-100 divide-y divide-navy-100">
              {bankRows.map((row) => (
                <div key={row.key} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <dt className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{row.label}</dt>
                    <dd className="font-semibold text-navy mt-0.5 break-words font-mono text-[13px] sm:text-sm">{row.value}</dd>
                  </div>
                  {!row.noCopy && (
                    <button onClick={() => copy(row.copyValue ?? row.value, row.key)} className="p-2 rounded-lg hover:bg-navy-50 flex-shrink-0" aria-label={`Copier ${row.label}`}>
                      {copied === row.key ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    </button>
                  )}
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" /> {BANK_INFO.note}
            </p>
          </div>
        )}
      </div>

      {/* Étape 3 : prévenir la CRCI */}
      <div className="p-6 md:p-10">
        <StepTitle n={3} title="Prévenez-nous pour recevoir votre reçu" />
        {status === 'sent' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4"><Heart className="w-8 h-8 text-[#ED1C24] fill-[#ED1C24]" /></div>
            <h3 className="text-2xl font-bold text-navy mb-2">Merci pour votre générosité !</h3>
            <p className="text-slate-500 max-w-md mx-auto">Votre don de <strong className="text-navy">{amountLabel}{frequency === 'mensuel' ? ' / mois' : ''}</strong> a bien été signalé. Notre équipe vous contactera pour vous remettre votre reçu.</p>
          </div>
        ) : (
          <form onSubmit={notify} className="relative space-y-4">
            <Honeypot value={website} onChange={setWebsite} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="d-nom" className="block text-sm font-medium text-navy mb-1.5">Nom et prénom *</label>
                <input id="d-nom" required value={donor.nom} onChange={(e) => setDonor({ ...donor, nom: e.target.value })} className={inputCls()} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="d-tel" className="block text-sm font-medium text-navy mb-1.5">Téléphone</label>
                <input id="d-tel" type="tel" value={donor.telephone} onChange={(e) => setDonor({ ...donor, telephone: e.target.value })} className={inputCls()} autoComplete="tel" />
              </div>
            </div>
            <div>
              <label htmlFor="d-email" className="block text-sm font-medium text-navy mb-1.5">E-mail *</label>
              <input id="d-email" required type="email" value={donor.email} onChange={(e) => setDonor({ ...donor, email: e.target.value })} className={inputCls()} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="d-msg" className="block text-sm font-medium text-navy mb-1.5">Message (facultatif)</label>
              <textarea id="d-msg" rows={3} value={donor.message} onChange={(e) => setDonor({ ...donor, message: e.target.value })} className={`${inputCls()} resize-none`}
                placeholder="Référence de la transaction, entreprise, affectation souhaitée…" />
            </div>
            {error && <FormError message={error} />}
            <button type="submit" disabled={status === 'sending'}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] disabled:opacity-60 text-white py-4 rounded-xl font-bold text-base transition-colors shadow-crci">
              {status === 'sending' ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi…</> : <><Send className="w-5 h-5" /> J&apos;ai fait mon don de {amountLabel}{frequency === 'mensuel' ? ' / mois' : ''}</>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold text-navy mb-6">
      <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">{n}</span>
      {title}
    </h2>
  )
}
