'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { sendForm } from '@/lib/sendForm'
import { FormError, Honeypot, inputCls } from './FormStatus'

const SUJETS = ['Demande d’information', 'Partenariat', 'Couverture médicale d’un événement', 'Don ou mécénat', 'Presse et médias', 'Autre']

export default function ContactForm({ defaultSujet = '' }: { defaultSujet?: string }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', sujet: defaultSujet, message: '' })
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.message.trim().length < 10) { setError('Merci de détailler votre message (10 caractères minimum).'); return }
    setStatus('sending')
    const res = await sendForm({ type: 'contact', ...form, website })
    if (res.ok) setStatus('sent')
    else { setStatus('idle'); setError(res.error) }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-16 px-8 bg-white rounded-3xl shadow-navy border border-navy-100">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-navy mb-2">Message envoyé</h2>
        <p className="text-slate-500">Merci {form.prenom || form.nom}. Notre équipe vous répondra dans les meilleurs délais.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative bg-white rounded-3xl shadow-navy border border-navy-100 p-6 md:p-10 space-y-5" noValidate>
      <h2 className="text-2xl font-bold text-navy">Envoyez-nous un message</h2>
      <Honeypot value={website} onChange={setWebsite} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-nom" className="block text-sm font-medium text-navy mb-1.5">Nom *</label>
          <input id="c-nom" required value={form.nom} onChange={(e) => set('nom', e.target.value)} className={inputCls()} autoComplete="family-name" />
        </div>
        <div>
          <label htmlFor="c-prenom" className="block text-sm font-medium text-navy mb-1.5">Prénom</label>
          <input id="c-prenom" value={form.prenom} onChange={(e) => set('prenom', e.target.value)} className={inputCls()} autoComplete="given-name" />
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-medium text-navy mb-1.5">E-mail *</label>
          <input id="c-email" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls()} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="c-tel" className="block text-sm font-medium text-navy mb-1.5">Téléphone</label>
          <input id="c-tel" type="tel" value={form.telephone} onChange={(e) => set('telephone', e.target.value)} className={inputCls()} autoComplete="tel" placeholder="+225 07 00 00 00 00" />
        </div>
      </div>
      <div>
        <label htmlFor="c-sujet" className="block text-sm font-medium text-navy mb-1.5">Sujet *</label>
        <select id="c-sujet" required value={form.sujet} onChange={(e) => set('sujet', e.target.value)} className={inputCls()}>
          <option value="">Choisir un sujet</option>
          {SUJETS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="c-message" className="block text-sm font-medium text-navy mb-1.5">Message *</label>
        <textarea id="c-message" required rows={6} value={form.message} onChange={(e) => set('message', e.target.value)} className={`${inputCls()} resize-none`} />
      </div>
      {error && <FormError message={error} />}
      <button type="submit" disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-800 disabled:opacity-60 text-white py-4 rounded-xl font-semibold transition-colors">
        {status === 'sending' ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…</> : <><Send className="w-5 h-5" /> Envoyer le message</>}
      </button>
      <p className="text-xs text-slate-400 text-center">Vos informations servent uniquement à vous répondre.</p>
    </form>
  )
}
