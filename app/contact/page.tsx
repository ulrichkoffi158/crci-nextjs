'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/data'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', sujet: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(form.sujet)}&body=${encodeURIComponent(`De: ${form.prenom} ${form.nom} (${form.email} / ${form.telephone})\n\n${form.message}`)}`
    setSent(true)
  }

  return (
    <div className="pt-28">
      <section className="bg-[#ED1C24] text-white py-16">
        <div className="container-crci text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto">Notre équipe est disponible pour répondre à toutes vos questions et vous orienter.</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-crci">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#2D2D2D]">Informations de contact</h2>
              {[
                { icon: MapPin, label: 'Adresse', value: CONTACT_INFO.address },
                { icon: Phone, label: 'Téléphone', value: CONTACT_INFO.phone },
                { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                { icon: Clock, label: 'Horaires', value: CONTACT_INFO.hours },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#ED1C24]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#ED1C24]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-[#2D2D2D] font-medium text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">Message envoyé !</h3>
                  <p className="text-gray-500">Votre client mail s&apos;est ouvert. Nous vous répondrons dans les meilleurs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                  <h2 className="text-2xl font-bold text-[#2D2D2D]">Envoyez-nous un message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[{ name: 'nom', label: 'Nom', placeholder: 'KOFFI' }, { name: 'prenom', label: 'Prénom', placeholder: 'Koné' }].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{f.label} *</label>
                        <input required type="text" placeholder={f.placeholder} value={(form as any)[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input required type="email" placeholder="email@exemple.ci" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input type="tel" placeholder="+225 07 00 00 00 00" value={form.telephone} onChange={e => setForm(p => ({ ...p, telephone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                    <input required type="text" placeholder="Objet de votre message" value={form.sujet} onChange={e => setForm(p => ({ ...p, sujet: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required rows={6} placeholder="Votre message..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-[#ED1C24] hover:bg-[#C0181E] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
