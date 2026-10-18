import type { FormPayload } from './validations'

export type SendResult = { ok: true } | { ok: false; error: string }

/** Envoie un formulaire au serveur (route /api/contact) */
export async function sendForm(payload: FormPayload): Promise<SendResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => null)
    if (res.ok && json?.ok) return { ok: true }
    return { ok: false, error: json?.error || "Le message n'a pas pu être envoyé. Merci de réessayer." }
  } catch {
    return { ok: false, error: 'Connexion impossible. Vérifiez votre connexion internet et réessayez.' }
  }
}
