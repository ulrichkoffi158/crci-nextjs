'use client'

import Link from 'next/link'
import { Heart, ChevronDown, Users } from 'lucide-react'

export default function HeroSection() {
  const scrollDown = () => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:"url('/images/image-secours.png')"}} />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[#ED1C24]/20" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#ED1C24]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 container-crci text-center text-white pt-32">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-[#ED1C24] rounded-full animate-pulse" />
          Depuis 1960 au service de l&apos;humanité
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up">
          Ensemble,<br />
          <span className="text-[#ED1C24] drop-shadow-lg">sauvons des vies</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up">
          La Croix-Rouge de Côte d&apos;Ivoire mobilise <strong className="text-white">4200 volontaires</strong> à travers{' '}
          107 comités locaux pour protéger et secourir les populations les plus vulnérables.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up">
          <Link href="/dons" className="group flex items-center gap-2.5 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:scale-105">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Faire un don
          </Link>
          <Link href="/volontariat" className="flex items-center gap-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all">
            <Users className="w-5 h-5" />
            Devenir volontaire
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {[{ value: '4200', label: 'Volontaires actifs' }, { value: '107', label: 'Comités locaux' }, { value: '370 000+', label: 'Bénéficiaires/an' }].map((s) => (
            <div key={s.label} className="text-center px-6 border-r border-white/20 last:border-0">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-white/70 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce" aria-label="Défiler">
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
