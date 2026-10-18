'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2, Users } from 'lucide-react'
import { APPLICATION_CATEGORIES, DOMAINES_VOLONTARIAT } from '@/data'
import { sendForm } from '@/lib/sendForm'
import { FormError, Honeypot, inputCls } from './FormStatus'

type F = {
  nom: string; prenom: string; dateNaissance: string; email: string; telephone: string
  adresse: string; ville: string; categorie: string; domaine: string; experience: string
  motivation: string; disponibilite: string; accepteCode: boolean
}
const init: F = { nom: '', prenom: '', dateNaissance: '', email: '', telephone: '', adresse: '', ville: '', categorie: '', domaine: '', experience: '', motivation: '', disponibilite: '', accepteCode: false }
const DISPONIBILITES = ['Week-ends uniquement', 'Soirées en semaine', 'Quelques jours par semaine', 'Interventions d’urgence', 'Flexible']

export default function VolunteerForm() {
  const [form, setForm] = useState<F>(init)
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof F, v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => { const n = { ...p }; delete n[k]; return n })
  }

  const validate = () => {
    const e: Partial<Record<keyof F, string>> = {}
    if (!form.nom.trim()) e.nom = 'Nom requis'
    if (!form.prenom.trim()) e.prenom = 'Prénom requis'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'E-mail invalide'
    if (!form.telephone.trim()) e.telephone = 'Téléphone requis'
    if (!form.ville.trim()) e.ville = 'Ville requise'
    if (!form.categorie) e.categorie = 'Choisissez une forme d’engagement'
    if (!form.domaine) e.domaine = 'Choisissez un domaine'
    if (!form.disponibilite) e.disponibilite = 'Indiquez votre disponibilité'
    if (form.motivation.trim().length < 20) e.motivation = 'Décrivez votre motivation (20 caractères minimum)'
    if (!form.accepteCode) e.accepteCode = 'Vous devez accepter de respecter le code de conduite'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setError('')
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    const res = await sendForm({
      type: 'volontariat',
      nom: form.nom, prenom: form.prenom, email: form.email, telephone: form.telephone,
      sujet: `${form.categorie} — ${form.prenom} ${form.nom}`,
      message: form.motivation,
      details: {
        'Engagement souhaité': form.categorie,
        "Domaine d'action": form.domaine,
        'Disponibilité': form.disponibilite,
        'Date de naissance': form.dateNaissance || '—',
        'Adresse': [form.adresse, form.ville].filter(Boolean).join(', '),
        'Expériences et compétences': form.experience || '—',
        'Code de conduite': 'Accepté',
      },
      website,
    })
    if (res.ok) setStatus('sent')
    else { setStatus('idle'); setError(res.error) }
  }

  if (status === 'sent') {
    return (
      <div className="bg-white rounded-3xl shadow-navy border border-navy-100 p-12 text-center">
        <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-navy mb-3">Candidature envoyée</h2>
        <p className="text-slate-500 text-lg">Merci {form.prenom}. Le comité local le plus proche de chez vous vous recontactera.</p>
      </div>
    )
  }

  const field = (name: keyof F, label: string, type = 'text', extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`v-${name}`} className="block text-sm font-medium text-navy mb-1.5">{label}</label>
      <input id={`v-${name}`} type={type} value={form[name] as string} onChange={(e) => set(name, e.target.value)} className={inputCls(!!errors[name])} {...extra} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )
  const select = (name: keyof F, label: string, options: string[], placeholder: string) => (
    <div>
      <label htmlFor={`v-${name}`} className="block text-sm font-medium text-navy mb-1.5">{label}</label>
      <select id={`v-${name}`} value={form[name] as string} onChange={(e) => set(name, e.target.value)} className={inputCls(!!errors[name])}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="relative bg-white rounded-3xl shadow-navy border border-navy-100 p-6 md:p-10 space-y-8">
      <Honeypot value={website} onChange={setWebsite} />
      <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
        <span className="w-10 h-10 bg-[#ED1C24] rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-white" /></span>
        Formulaire de candidature
      </h2>
      <fieldset>
        <legend className="font-semibold text-navy mb-4 pb-2 border-b border-navy-100 w-full">Informations personnelles</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('nom', 'Nom *', 'text', { autoComplete: 'family-name' })}
          {field('prenom', 'Prénom *', 'text', { autoComplete: 'given-name' })}
          {field('email', 'E-mail *', 'email', { autoComplete: 'email' })}
          {field('telephone', 'Téléphone *', 'tel', { autoComplete: 'tel', placeholder: '+225 07 00 00 00 00' })}
          {field('dateNaissance', 'Date de naissance', 'date')}
          {field('ville', 'Ville / commune *', 'text', { placeholder: 'Abidjan, Cocody' })}
        </div>
        <div className="mt-4">{field('adresse', 'Quartier', 'text')}</div>
      </fieldset>
      <fieldset>
        <legend className="font-semibold text-navy mb-4 pb-2 border-b border-navy-100 w-full">Mon engagement</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {select('categorie', 'Je souhaite devenir *', APPLICATION_CATEGORIES, 'Choisir')}
          {select('domaine', "Domaine d'action *", DOMAINES_VOLONTARIAT, 'Choisir un domaine')}
        </div>
        <div className="mt-4">{select('disponibilite', 'Disponibilité *', DISPONIBILITES, 'Choisir')}</div>
        <div className="mt-4">
          <label htmlFor="v-experience" className="block text-sm font-medium text-navy mb-1.5">Expériences et compétences</label>
          <textarea id="v-experience" rows={3} value={form.experience} onChange={(e) => set('experience', e.target.value)} className={`${inputCls()} resize-none`}
            placeholder="Secourisme, santé, logistique, communication…" />
        </div>
        <div className="mt-4">
          <label htmlFor="v-motivation" className="block text-sm font-medium text-navy mb-1.5">Motivation *</label>
          <textarea id="v-motivation" rows={4} value={form.motivation} onChange={(e) => set('motivation', e.target.value)} className={`${inputCls(!!errors.motivation)} resize-none`}
            placeholder="Pourquoi souhaitez-vous rejoindre la Croix-Rouge de Côte d'Ivoire ?" />
          {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
        </div>
      </fieldset>
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.accepteCode} onChange={(e) => set('accepteCode', e.target.checked)} className="mt-1 w-4 h-4 accent-[#0B1F3A]" />
          <span className="text-sm text-slate-600">
            Je m&apos;engage à signer et à respecter le <strong className="text-navy">code de conduite</strong> de la Croix-Rouge de Côte d&apos;Ivoire,
            ainsi que les 7 Principes fondamentaux du Mouvement (Statuts, art. 14).
          </span>
        </label>
        {errors.accepteCode && <p className="text-red-500 text-xs mt-1 ml-7">{errors.accepteCode}</p>}
      </div>
      {error && <FormError message={error} />}
      <button type="submit" disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-crci">
        {status === 'sending' ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…</> : <><Send className="w-5 h-5" /> Envoyer ma candidature</>}
      </button>
    </form>
  )
}
