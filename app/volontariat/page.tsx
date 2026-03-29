'use client'

import { useState } from 'react'
import { Users, Heart, Shield, Clock, CheckCircle, Star, Send } from 'lucide-react'
import { VOLUNTEER_CATEGORIES, DOMAINES_VOLONTARIAT } from '@/data'
import SectionHeader from '@/components/shared/SectionHeader'

type FormData = {
  nom: string; prenom: string; dateNaissance: string; email: string;
  telephone: string; adresse: string; ville: string; categorie: string;
  domaine: string; experience: string; motivation: string;
  disponibilite: string; accepteCharte: boolean;
}

const initForm: FormData = {
  nom: '', prenom: '', dateNaissance: '', email: '', telephone: '',
  adresse: '', ville: '', categorie: '', domaine: '', experience: '',
  motivation: '', disponibilite: '', accepteCharte: false,
}

export default function VolontariatPage() {
  const [form, setForm] = useState<FormData>(initForm)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.nom.trim()) e.nom = 'Nom requis'
    if (!form.prenom.trim()) e.prenom = 'Prénom requis'
    if (!form.email.includes('@')) e.email = 'Email invalide'
    if (!form.telephone.trim()) e.telephone = 'Téléphone requis'
    if (!form.categorie) e.categorie = 'Catégorie requise'
    if (!form.domaine) e.domaine = 'Domaine requis'
    if (form.motivation.length < 20) e.motivation = 'Décrivez votre motivation (min. 20 caractères)'
    if (!form.disponibilite) e.disponibilite = 'Disponibilité requise'
    if (!form.accepteCharte) e.accepteCharte = 'Vous devez accepter la charte'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const body = `CANDIDATURE VOLONTARIAT CRCI

Informations personnelles:
Nom: ${form.nom} ${form.prenom}
Date de naissance: ${form.dateNaissance}
Email: ${form.email}
Téléphone: ${form.telephone}
Adresse: ${form.adresse}, ${form.ville}

Engagement:
Catégorie: ${form.categorie}
Domaine d'action: ${form.domaine}
Expériences: ${form.experience || 'Non renseigné'}
Disponibilité: ${form.disponibilite}

Motivation:
${form.motivation}

Charte acceptée: Oui`
    window.location.href = `mailto:info@croix-rougeci.org?subject=${encodeURIComponent(`Candidature Volontaire - ${form.prenom} ${form.nom}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n })
  }

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="bg-[#ED1C24] text-white py-20">
        <div className="container-crci text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Rejoignez-nous</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Devenez Volontaire CRCI</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto">Rejoignez les 4200 volontaires engagés au service des populations vulnérables de Côte d&apos;Ivoire.</p>
        </div>
      </section>

      {/* Pourquoi devenir volontaire */}
      <section className="section-padding bg-gray-50">
        <div className="container-crci">
          <SectionHeader label="Engagement" title="Pourquoi devenir volontaire ?" description="Le volontariat à la Croix-Rouge CI est une aventure humaine unique, enrichissante et concrète." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Heart, title: 'Engagement humanitaire', desc: "Contribuez directement à l'amélioration des conditions de vie des plus vulnérables." },
              { icon: Star, title: 'Formation certifiée', desc: "Accédez à des formations en secourisme, premiers secours et gestion de crises." },
              { icon: Users, title: 'Réseau national', desc: "Intégrez un réseau de 4200 volontaires à travers 107 comités locaux." },
              { icon: Shield, title: 'Couverture assurance', desc: "Vous bénéficiez d'une couverture assurance pendant vos missions." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-12 h-12 bg-[#ED1C24]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#ED1C24]" />
                </div>
                <h3 className="font-bold text-[#2D2D2D] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Catégories */}
          <SectionHeader label="Catégories" title="Types d'engagement" description="Choisissez la forme d'engagement qui correspond à votre disponibilité et à vos aspirations." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {VOLUNTEER_CATEGORIES.map((cat) => (
              <div key={cat.title} className="bg-white p-6 rounded-2xl border-l-4 border-[#ED1C24] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ED1C24] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">✚</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D2D2D] mb-2">{cat.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{cat.description}</p>
                    {cat.requirements && (
                      <div className="mt-3 space-y-1">
                        {cat.requirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            {req}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div id="formulaire" className="max-w-3xl mx-auto">
            {sent ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-[#2D2D2D] mb-3">Candidature envoyée !</h2>
                <p className="text-gray-500 text-lg mb-6">Votre client mail s&apos;est ouvert. Notre équipe vous contactera dans les 72 heures.</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 text-sm">📧 Envoyez votre email à <strong>volontariat@croixrouge.ci</strong> depuis votre client mail.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-[#2D2D2D] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ED1C24] rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  Formulaire de candidature
                </h2>

                {/* Informations personnelles */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4 pb-2 border-b">Informations personnelles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'nom' as const, label: 'Nom *', type: 'text', placeholder: 'KOFFI' },
                      { name: 'prenom' as const, label: 'Prénom *', type: 'text', placeholder: 'Koné' },
                      { name: 'email' as const, label: 'Email *', type: 'email', placeholder: 'zadi@exemple.ci' },
                      { name: 'telephone' as const, label: 'Téléphone *', type: 'tel', placeholder: '+225 07 XX XX XX XX' },
                      { name: 'dateNaissance' as const, label: 'Date de naissance', type: 'date', placeholder: '' },
                      { name: 'ville' as const, label: 'Ville *', type: 'text', placeholder: 'Abidjan' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.name] as string}
                          onChange={e => set(f.name, e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none text-sm transition-colors ${errors[f.name] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#ED1C24]'}`} />
                        {errors[f.name] && <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                    <input type="text" placeholder="Quartier, Commune..." value={form.adresse}
                      onChange={e => set('adresse', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                  </div>
                </div>

                {/* Engagement */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4 pb-2 border-b">Mon engagement</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                      <select value={form.categorie} onChange={e => set('categorie', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none text-sm bg-white ${errors.categorie ? 'border-red-400' : 'border-gray-200 focus:border-[#ED1C24]'}`}>
                        <option value="">-- Choisir une catégorie --</option>
                        {VOLUNTEER_CATEGORIES.map(c => <option key={c.title} value={c.title}>{c.title}</option>)}
                      </select>
                      {errors.categorie && <p className="text-red-500 text-xs mt-1">{errors.categorie}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Domaine d&apos;action *</label>
                      <select value={form.domaine} onChange={e => set('domaine', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none text-sm bg-white ${errors.domaine ? 'border-red-400' : 'border-gray-200 focus:border-[#ED1C24]'}`}>
                        <option value="">-- Choisir un domaine --</option>
                        {DOMAINES_VOLONTARIAT.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.domaine && <p className="text-red-500 text-xs mt-1">{errors.domaine}</p>}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité *</label>
                    <select value={form.disponibilite} onChange={e => set('disponibilite', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none text-sm bg-white ${errors.disponibilite ? 'border-red-400' : 'border-gray-200 focus:border-[#ED1C24]'}`}>
                      <option value="">-- Choisir votre disponibilité --</option>
                      {['Weekends uniquement', 'Soirées en semaine', 'Temps partiel (2-3j/semaine)', 'Temps plein', 'Urgences uniquement', 'Flexible'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.disponibilite && <p className="text-red-500 text-xs mt-1">{errors.disponibilite}</p>}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expériences et compétences</label>
                    <textarea rows={3} placeholder="Décrivez vos expériences, formations ou compétences pertinentes..." value={form.experience}
                      onChange={e => set('experience', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm resize-none" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motivation * (min. 20 caractères)</label>
                    <textarea rows={4} placeholder="Expliquez pourquoi vous souhaitez rejoindre la Croix-Rouge CI..." value={form.motivation}
                      onChange={e => set('motivation', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none text-sm resize-none ${errors.motivation ? 'border-red-400' : 'border-gray-200 focus:border-[#ED1C24]'}`} />
                    <div className="flex justify-between">
                      {errors.motivation ? <p className="text-red-500 text-xs mt-1">{errors.motivation}</p> : <span />}
                      <p className={`text-xs mt-1 text-right ${form.motivation.length < 20 ? 'text-gray-400' : 'text-green-500'}`}>{form.motivation.length}/20 min.</p>
                    </div>
                  </div>
                </div>

                {/* Charte */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={form.accepteCharte} onChange={e => set('accepteCharte', e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#ED1C24] rounded accent-[#ED1C24]" />
                    <span className="text-sm text-gray-600">
                      J&apos;accepte la <strong>Charte du Volontaire</strong> de la Croix-Rouge de Côte d&apos;Ivoire et m&apos;engage à respecter les 7 Principes Fondamentaux du Mouvement International.
                    </span>
                  </label>
                  {errors.accepteCharte && <p className="text-red-500 text-xs mt-1 ml-7">{errors.accepteCharte}</p>}
                </div>

                <button type="submit" className="w-full bg-[#ED1C24] hover:bg-[#C0181E] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Envoyer ma candidature
                </button>
                <p className="text-center text-xs text-gray-400">Votre candidature sera transmise à info@croix-rougeci.org</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
