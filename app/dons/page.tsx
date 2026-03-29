'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Shield, Smartphone, Building2, Copy, CheckCircle, ChevronRight, Mail, Phone, Info, Sparkles, Users, HandHeart } from 'lucide-react'
import { DONATION_AMOUNTS, BANK_INFO } from '@/data'
import { formatCurrency } from '@/lib/utils'

export default function DonsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'unique' | 'mensuel'>('unique')
  const [activeTab, setActiveTab] = useState<'mobile' | 'virement'>('mobile')
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [donSent, setDonSent] = useState(false)
  const [sentAmount, setSentAmount] = useState<string>('')
  const [sentFrequency, setSentFrequency] = useState<'unique' | 'mensuel'>('unique')

  const amount = customAmount ? parseInt(customAmount) : selectedAmount
  const selected = DONATION_AMOUNTS.find(d => d.amount === amount)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleDonSubmit = () => {
    const amountLabel = amount ? formatCurrency(amount) : 'un montant libre'
    const body = `Madame, Monsieur,\n\nJe souhaite effectuer un don de ${amountLabel} FCFA (${frequency === 'mensuel' ? 'mensuel' : 'unique'}) en faveur de la Croix-Rouge de Côte d'Ivoire.\n\nMerci de me contacter pour finaliser ma contribution et m'informer de la procédure de paiement.\n\nCordialement,`
    window.location.href = `mailto:info@croix-rougeci.org?subject=${encodeURIComponent(`Don CRCI — ${amountLabel} FCFA${frequency === 'mensuel' ? ' / mois' : ''}`)}&body=${encodeURIComponent(body)}`
    setSentAmount(amountLabel)
    setSentFrequency(frequency)
    setTimeout(() => setDonSent(true), 500)
  }

  // Écran de remerciement
  if (donSent) {
    return (
      <div className="pt-28 min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center">
        <div className="container-crci py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animation de succès */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-28 h-28 bg-[#ED1C24]/10 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-20 h-20 bg-[#ED1C24]/20 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-[#ED1C24] fill-[#ED1C24]" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              <CheckCircle className="w-3.5 h-3.5" /> Message envoyé avec succès
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-4">
              Merci pour votre générosité&nbsp;!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-3">
              Votre intention de don de <strong className="text-[#ED1C24]">{sentAmount} FCFA{sentFrequency === 'mensuel' ? ' / mois' : ''}</strong> a bien été enregistrée.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Notre service a reçu votre message. Un membre de notre équipe vous contactera
              dans les <strong>24 à 48 heures</strong> pour vous accompagner dans votre démarche
              et vous fournir les meilleures informations pour finaliser votre contribution.
            </p>

            {/* Carte de confirmation */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 text-left">
              <h3 className="font-bold text-[#2D2D2D] mb-5 flex items-center gap-2 text-base">
                <div className="w-7 h-7 bg-[#ED1C24] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                Ce qui se passe maintenant
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    icon: Mail,
                    title: 'Email reçu par la CRCI',
                    desc: 'Notre équipe a reçu votre notification de don à info@croix-rougeci.org',
                    color: 'bg-blue-50 text-blue-600',
                  },
                  {
                    step: '2',
                    icon: Phone,
                    title: 'Notre service vous contacte',
                    desc: 'Un conseiller CRCI vous appellera dans les 24–48h pour finaliser votre don et vous guider',
                    color: 'bg-orange-50 text-orange-600',
                  },
                  {
                    step: '3',
                    icon: Heart,
                    title: 'Votre don sauve des vies',
                    desc: "100% de votre contribution est utilisée pour nos missions humanitaires en Côte d'Ivoire",
                    color: 'bg-red-50 text-[#ED1C24]',
                  },
                  {
                    step: '4',
                    icon: HandHeart,
                    title: 'Reçu de don est envoyé',
                    desc: 'Un reçu de don vous sera adressé par email pour votre déclaration',
                    color: 'bg-green-50 text-green-600',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2D2D] text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            {selected && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 mb-8 text-left">
                <p className="text-green-700 text-xs font-bold uppercase tracking-wider mb-2">💚 Impact de votre don</p>
                <p className="text-green-800 font-semibold">{selected.impact}</p>
              </div>
            )}

            {/* Contact direct */}
            <div className="bg-[#ED1C24]/5 border border-[#ED1C24]/20 rounded-xl p-5 mb-8 text-sm text-gray-600">
              <p className="mb-2 font-medium text-[#2D2D2D]">Besoin d&apos;aide immédiate ?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:info@croix-rougeci.org" className="flex items-center gap-1.5 text-[#ED1C24] font-medium hover:underline">
                  <Mail className="w-4 h-4" /> info@croix-rougeci.org
                </a>
                <a href="tel:+2252720217240" className="flex items-center gap-1.5 text-[#ED1C24] font-medium hover:underline">
                  <Phone className="w-4 h-4" /> (+225) 27 20 21 72 40
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { setDonSent(false); setCustomAmount(''); setSelectedAmount(25000) }}
                className="inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <Heart className="w-4 h-4" /> Faire un autre don
              </button>
              <a
                href="/volontariat"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 hover:border-[#ED1C24] hover:text-[#ED1C24] px-8 py-3 rounded-xl font-bold text-sm transition-all"
              >
                <Users className="w-4 h-4" /> Devenir volontaire
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-8">
              Croix-Rouge de Côte d&apos;Ivoire — Reconnue d&apos;utilité publique depuis 1963 · Décret N°63-169
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#ED1C24] via-[#C0181E] to-[#8B0000] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl font-bold text-white">✚</div>
          <div className="absolute bottom-10 right-10 text-9xl font-bold text-white">✚</div>
        </div>
        <div className="container-crci text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-3.5 h-3.5" /> Agissez pour l&apos;humanité
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Faites un Don</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Chaque don, quel que soit son montant, contribue à sauver des vies et à soutenir
            les populations les plus vulnérables de Côte d&apos;Ivoire.
          </p>
          {/* Impact summary */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { value: '4200', label: 'Volontaires mobilisés' },
              { value: '370 000+', label: 'Personnes assistées en 2025' },
              { value: '107', label: "Comités locaux sur l'ensemble du territoire ivoirien" },
            ].map(s => (
              <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 text-center min-w-[130px]">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-white/75 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main donation section */}
      <section className="section-padding bg-gray-50">
        <div className="container-crci">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left — Amount selector */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-xl font-bold text-[#2D2D2D] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ED1C24] rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  Choisissez votre don
                </h2>

                {/* Frequency */}
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  {(['unique', 'mensuel'] as const).map((f) => (
                    <button key={f} onClick={() => setFrequency(f)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${frequency === f ? 'bg-[#ED1C24] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
                      {f === 'unique' ? '💝 Don unique' : '🔁 Don mensuel'}
                    </button>
                  ))}
                </div>

                {/* Amount grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {DONATION_AMOUNTS.map((d) => (
                    <button key={d.amount} onClick={() => { setSelectedAmount(d.amount); setCustomAmount('') }}
                      className={`p-4 rounded-xl border-2 transition-all text-center group ${selectedAmount === d.amount && !customAmount ? 'border-[#ED1C24] bg-[#ED1C24]/5 shadow-md' : 'border-gray-200 hover:border-[#ED1C24]/50 hover:bg-red-50'}`}>
                      <div className="font-bold text-[#2D2D2D] text-sm">{formatCurrency(d.amount)}</div>
                      <div className="text-gray-400 text-xs mt-1">FCFA</div>
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ou saisissez un montant libre (FCFA)</label>
                  <input type="number" placeholder="Ex: 75 000" value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-lg font-bold" />
                </div>

                {/* Impact */}
                {selected && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-700 text-xs font-bold uppercase tracking-wider mb-1">Impact de votre don</p>
                      <p className="text-green-800 font-semibold text-sm">{selected.impact}</p>
                    </div>
                  </div>
                )}

                {/* Payment tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveTab('mobile')}
                      className={`pb-3 text-sm font-semibold border-b-2 transition-all ${activeTab === 'mobile' ? 'border-[#ED1C24] text-[#ED1C24]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                      📱 Paiement Mobile
                    </button>
                    <button
                      onClick={() => setActiveTab('virement')}
                      className={`pb-3 text-sm font-semibold border-b-2 transition-all ${activeTab === 'virement' ? 'border-[#ED1C24] text-[#ED1C24]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                      🏦 Virement Bancaire
                    </button>
                  </div>
                </div>

                {/* Mobile payment */}
                {activeTab === 'mobile' && (
                  <div>
                    <p className="text-sm text-gray-600 mb-6 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      Scannez le QR code avec votre application de paiement ou utilisez le numéro de compte ci-dessous.
                      Pour toute assistance : <strong className="ml-1">info@croix-rougeci.org</strong>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                      {/* Orange Money */}
                      <div className="border-2 border-orange-200 rounded-2xl p-6 hover:border-orange-400 transition-all hover:shadow-lg group bg-gradient-to-b from-orange-50 to-white">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-[#FF7900] rounded-xl flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">Orange Money</div>
                            <div className="text-xs text-gray-500">Côte d&apos;Ivoire</div>
                          </div>
                        </div>
                        <div className="flex justify-center mb-4 bg-white rounded-xl p-3 border border-orange-100 shadow-sm">
                          <Image
                            src="/images/qr-orange-money.png"
                            alt="QR Code Orange Money CRCI"
                            width={150}
                            height={150}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="bg-orange-100 rounded-xl p-3 text-center">
                          <p className="text-xs text-orange-700 font-semibold mb-1">Composez</p>
                          <p className="text-lg font-bold text-orange-800">#144#</p>
                          <p className="text-xs text-orange-600 mt-1">→ Paiement marchand → CRCI</p>
                        </div>
                      </div>

                      {/* Wave */}
                      <div className="border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-all hover:shadow-lg group bg-gradient-to-b from-blue-50 to-white">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-[#1BA8F5] rounded-xl flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">Wave</div>
                            <div className="text-xs text-gray-500">Côte d&apos;Ivoire</div>
                          </div>
                        </div>
                        <div className="flex justify-center mb-4 bg-white rounded-xl p-3 border border-blue-100 shadow-sm">
                          <Image
                            src="/images/qr-wave.png"
                            alt="QR Code Wave CRCI"
                            width={150}
                            height={150}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="bg-blue-100 rounded-xl p-3 text-center">
                          <p className="text-xs text-blue-700 font-semibold mb-1">Ouvrez l&apos;app Wave</p>
                          <p className="text-sm font-bold text-blue-800">Scanner → Payer CRCI</p>
                          <p className="text-xs text-blue-600 mt-1">Référence : DON-CRCI-2026</p>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation button */}
                    <button
                      onClick={handleDonSubmit}
                      className="mt-6 w-full bg-[#ED1C24] hover:bg-[#C0181E] text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Heart className="w-5 h-5" />
                      Confirmer mon don {amount ? `de ${formatCurrency(amount)}` : ''} {frequency === 'mensuel' ? '/ mois' : ''}
                    </button>
                  </div>
                )}

                {/* Virement */}
                {activeTab === 'virement' && (
                  <div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-[#2D2D2D] rounded-xl flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{BANK_INFO.bankName}</div>
                          <div className="text-xs text-gray-500">Coordonnées bancaires officielles</div>
                        </div>
                      </div>

                      {[
                        { label: 'Bénéficiaire', value: BANK_INFO.accountName, field: 'name' },
                        { label: 'IBAN', value: BANK_INFO.iban, field: 'iban' },
                        { label: 'Code SWIFT/BIC', value: BANK_INFO.swift, field: 'swift' },
                        { label: 'Référence à indiquer', value: BANK_INFO.reference, field: 'ref' },
                      ].map(item => (
                        <div key={item.field} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                            <p className="font-bold text-[#2D2D2D] mt-0.5">{item.value}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.value, item.field)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors ml-3"
                            title="Copier"
                          >
                            {copiedField === item.field
                              ? <CheckCircle className="w-4 h-4 text-green-500" />
                              : <Copy className="w-4 h-4 text-gray-400" />
                            }
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-700 text-sm">{BANK_INFO.note}</p>
                    </div>

                    <button
                      onClick={handleDonSubmit}
                      className="mt-6 w-full bg-[#2D2D2D] hover:bg-black text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Notifier la CRCI de mon virement
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mt-5 text-gray-400 text-xs">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé — Reçu de don envoyé par email sur demande</span>
                </div>
              </div>
            </div>

            {/* Right — Sidebar */}
            <div className="space-y-5">
              {/* Contact don */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold text-[#2D2D2D] mb-4 text-sm uppercase tracking-wider">Une question sur votre don ?</h3>
                <p className="text-gray-500 text-sm mb-4">Notre équipe est disponible pour vous accompagner dans votre démarche.</p>
                <a href="mailto:info@croix-rougeci.org" className="flex items-center gap-3 text-sm text-[#ED1C24] font-medium hover:underline mb-2">
                  <Mail className="w-4 h-4" /> info@croix-rougeci.org
                </a>
                <a href="tel:+2252720217240" className="flex items-center gap-3 text-sm text-[#ED1C24] font-medium hover:underline">
                  <Phone className="w-4 h-4" /> (+225) 27 20 21 72 40
                </a>
              </div>

              {/* Transparency */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold text-[#2D2D2D] mb-4 text-sm uppercase tracking-wider">Utilisation des fonds</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Secours & urgences', pct: 40, color: 'bg-[#ED1C24]' },
                    { label: 'Santé communautaire', pct: 30, color: 'bg-orange-400' },
                    { label: 'Formation & prévention', pct: 20, color: 'bg-blue-500' },
                    { label: 'Frais de structure', pct: 10, color: 'bg-gray-400' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-bold text-gray-800">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold text-[#2D2D2D] mb-4 text-sm uppercase tracking-wider">Garanties</h3>
                <div className="space-y-3">
                  {[
                    { icon: '🔒', text: 'Organisation d\'utilité publique (Décret N°63-169)' },
                    { icon: '🌍', text: 'Membre du Mouvement International Croix-Rouge' },
                    { icon: '📊', text: 'Rapport annuel publié' },
                    { icon: '🧾', text: 'Reçu de don disponible sur demande' },
                  ].map(b => (
                    <div key={b.text} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-base mt-0.5">{b.icon}</span>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devenir bénévole CTA */}
              <div className="bg-gradient-to-br from-[#ED1C24] to-[#8B0000] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Vous ne pouvez pas donner ?</h3>
                <p className="text-white/80 text-sm mb-4">Devenez volontaire et offrez votre temps à ceux qui en ont besoin.</p>
                <a href="/volontariat" className="inline-flex items-center gap-2 bg-white text-[#ED1C24] px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                  Devenir volontaire <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
