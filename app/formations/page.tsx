'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Clock, Users, MapPin, CheckCircle, Calendar, Send, Award } from 'lucide-react'
import { FORMATIONS } from '@/data'
import SectionHeader from '@/components/shared/SectionHeader'
import { getFormations, type SanityFormation } from '@/lib/sanity.queries'

type RegistrationForm = {
  nom: string; prenom: string; email: string; telephone: string;
  organisation: string; formation: string; session: string;
  nombrePersonnes: string; besoinsSpecifiques: string;
}

const initReg: RegistrationForm = {
  nom: '', prenom: '', email: '', telephone: '',
  organisation: '', formation: '', session: '', nombrePersonnes: '1', besoinsSpecifiques: '',
}

// Adaptateur SanityFormation → format local
function sanityToLocal(f: SanityFormation) {
  return {
    id: f._id,
    code: f.code,
    title: f.title,
    subtitle: f.subtitle ?? '',
    description: f.description,
    duration: f.duration ?? '',
    maxParticipants: f.maxParticipants ?? 20,
    price: f.price ?? 'Sur devis',
    location: f.location ?? 'Abidjan',
    objectives: f.objectives ?? [],
    certification: f.certification ?? '',
    nextSessions: f.nextSessions ?? [],
  }
}

export default function FormationsPage() {
  const [selectedFormation, setSelectedFormation] = useState<string | null>(null)
  const [showForm, setShowForm]                   = useState(false)
  const [reg, setReg]                             = useState<RegistrationForm>(initReg)
  const [sent, setSent]                           = useState(false)
  const [formations, setFormations]               = useState(FORMATIONS as any[])
  const [loading, setLoading]                     = useState(true)

  useEffect(() => {
    getFormations().then((data) => {
      if (data && data.length > 0) {
        setFormations(data.map(sanityToLocal))
      }
      setLoading(false)
    })
  }, [])

  const openRegistration = (formationCode: string) => {
    setReg(p => ({ ...p, formation: formationCode }))
    setShowForm(true)
    setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = formations.find(f => f.code === reg.formation)
    const body = `INSCRIPTION FORMATION CRCI

Formation: ${found?.title || reg.formation} (${reg.formation})
Session choisie: ${reg.session}
Nombre de personnes: ${reg.nombrePersonnes}

Informations du participant:
Nom: ${reg.nom} ${reg.prenom}
Email: ${reg.email}
Téléphone: ${reg.telephone}
Organisation: ${reg.organisation || 'Non renseignée'}

Besoins spécifiques: ${reg.besoinsSpecifiques || 'Aucun'}`
    window.location.href = `mailto:info@croix-rougeci.org?subject=${encodeURIComponent(`Inscription ${reg.formation} - ${reg.prenom} ${reg.nom}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="bg-[#ED1C24] text-white py-20">
        <div className="container-crci text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Formations Certifiées</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Formations</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto">Acquérez des compétences vitales en secourisme et gestion des urgences. Formations dispensées par des instructeurs certifiés CRCI.</p>
        </div>
      </section>

      {/* Stats formations */}
      <section className="bg-[#2D2D2D] text-white py-10">
        <div className="container-crci">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: String(formations.length), label: 'Formations disponibles' },
              { value: '1 200+', label: 'Personnes formées/an' },
              { value: '45', label: 'Instructeurs certifiés' },
              { value: '100%', label: 'Taux de satisfaction' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#ED1C24]">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue formations */}
      <section className="section-padding bg-gray-50">
        <div className="container-crci">
          <SectionHeader label="Catalogue" title="Nos programmes de formation" description="Des formations adaptées à tous les niveaux, des premiers secours de base au management des situations d'urgence complexes." />

          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement des formations…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {formations.map((formation) => (
                <div key={formation.id ?? formation.code} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Card header */}
                  <div className="bg-gradient-to-r from-[#ED1C24] to-[#8B0000] p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{formation.code}</span>
                      <span className="text-yellow-300 font-bold text-sm">{formation.price}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                    <p className="text-white/80 text-sm">{formation.subtitle}</p>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#ED1C24]" />{formation.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#ED1C24]" />Max. {formation.maxParticipants} pers.</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#ED1C24]" />{formation.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{formation.description}</p>

                    {/* Objectifs */}
                    {formation.objectives?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Objectifs</p>
                        <div className="space-y-1">
                          {formation.objectives.slice(0, 3).map((obj: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                              {obj}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sessions */}
                    {formation.nextSessions?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Prochaines sessions — cliquez pour vous inscrire</p>
                        <div className="flex flex-wrap gap-2">
                          {formation.nextSessions.map((s: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => {
                                setReg(p => ({ ...p, formation: formation.code, session: s }))
                                setShowForm(true)
                                setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 100)
                              }}
                              className="text-xs bg-[#ED1C24]/10 hover:bg-[#ED1C24] text-[#ED1C24] hover:text-white px-3 py-1.5 rounded-full flex items-center gap-1 transition-all cursor-pointer font-medium border border-[#ED1C24]/20 hover:border-[#ED1C24]"
                            >
                              <Calendar className="w-3 h-3" />{s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certification */}
                    {formation.certification && (
                      <div className="flex items-center gap-2 mb-5 bg-yellow-50 px-3 py-2 rounded-lg">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-yellow-700 font-medium">{formation.certification}</span>
                      </div>
                    )}

                    <button
                      onClick={() => openRegistration(formation.code)}
                      className="w-full bg-[#ED1C24] hover:bg-[#C0181E] text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg group-hover:shadow-lg"
                    >
                      S&apos;inscrire à cette formation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire d'inscription */}
          <div id="inscription" className="max-w-2xl mx-auto">
            {showForm && !sent ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-[#2D2D2D] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ED1C24] rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  Formulaire d&apos;inscription
                </h2>
                {reg.formation && (
                  <div className="bg-[#ED1C24]/5 border border-[#ED1C24]/20 rounded-xl p-4">
                    <p className="text-[#ED1C24] font-bold text-sm">
                      Formation sélectionnée : {formations.find(f => f.code === reg.formation)?.title} ({reg.formation})
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'nom' as const, label: 'Nom *', type: 'text', placeholder: 'KOFFI' },
                    { name: 'prenom' as const, label: 'Prénom *', type: 'text', placeholder: 'Koné' },
                    { name: 'email' as const, label: 'Email *', type: 'email', placeholder: 'email@exemple.ci' },
                    { name: 'telephone' as const, label: 'Téléphone *', type: 'tel', placeholder: '+225 07 XX XX XX XX' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input required type={f.type} placeholder={f.placeholder} value={reg[f.name]}
                        onChange={e => setReg(p => ({ ...p, [f.name]: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organisation / Entreprise</label>
                  <input type="text" placeholder="Nom de votre structure (optionnel)" value={reg.organisation}
                    onChange={e => setReg(p => ({ ...p, organisation: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Formation *</label>
                    <select required value={reg.formation} onChange={e => setReg(p => ({ ...p, formation: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm bg-white">
                      <option value="">-- Choisir --</option>
                      {formations.map(f => <option key={f.code} value={f.code}>{f.code} - {f.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session souhaitée *</label>
                    <select required value={reg.session} onChange={e => setReg(p => ({ ...p, session: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm bg-white">
                      <option value="">-- Choisir une session --</option>
                      {reg.formation && formations.find(f => f.code === reg.formation)?.nextSessions?.map((s: string) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                      <option value="Autre">Autre (préciser dans besoins)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de participants</label>
                  <input type="number" min="1" max="20" value={reg.nombrePersonnes}
                    onChange={e => setReg(p => ({ ...p, nombrePersonnes: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Besoins spécifiques</label>
                  <textarea rows={3} placeholder="Accessibilité, régime alimentaire, ou toute autre demande particulière..." value={reg.besoinsSpecifiques}
                    onChange={e => setReg(p => ({ ...p, besoinsSpecifiques: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm resize-none" />
                </div>

                <button type="submit" className="w-full bg-[#ED1C24] hover:bg-[#C0181E] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Confirmer mon inscription
                </button>
                <p className="text-center text-xs text-gray-400">Votre inscription sera envoyée à info@croix-rougeci.org</p>
              </form>
            ) : sent ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-[#2D2D2D] mb-3">Inscription enregistrée !</h2>
                <p className="text-gray-500 text-lg mb-6">Votre client mail s&apos;est ouvert. Notre équipe vous confirmera votre inscription sous 48h.</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 text-sm">📧 Envoyez votre email à <strong>info@croix-rougeci.org</strong></p>
                </div>
              </div>
            ) : (
              <div className="bg-[#ED1C24]/5 border-2 border-dashed border-[#ED1C24]/30 rounded-2xl p-12 text-center">
                <BookOpen className="w-12 h-12 text-[#ED1C24]/50 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Cliquez sur &quot;S&apos;inscrire&quot; sur une formation ci-dessus pour ouvrir le formulaire d&apos;inscription.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
