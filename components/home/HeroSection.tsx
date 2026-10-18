import Link from 'next/link'
import Image from 'next/image'
import { Heart, Users, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-navy-950">
      <Image src="/images/crci/hero-secours.jpg" alt="Secouristes de la Croix-Rouge de Côte d'Ivoire lors d'une évacuation" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/55 to-transparent" />

      <div className="relative z-10 container-crci pt-40 pb-20 md:pb-28 text-white">
        <div className="max-w-3xl">
          <p className="eyebrow text-white/85 mb-6">
            <span className="w-10 h-0.5 bg-[#ED1C24] rounded-full" />
            Au service de l&apos;humanité depuis 1960
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] mb-6 text-balance">
            Ensemble, <span className="text-[#ff4d55]">sauvons des vies.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            La Croix-Rouge de Côte d&apos;Ivoire mobilise <strong className="text-white">4 200 volontaires</strong> à travers{' '}
            <strong className="text-white">107 comités locaux</strong> pour protéger et secourir les populations les plus vulnérables.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/dons" className="group inline-flex items-center gap-2.5 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-8 py-4 rounded-full text-base md:text-lg font-semibold transition-all shadow-crci-lg">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" /> Faire un don
            </Link>
            <Link href="/volontariat" className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-base md:text-lg font-semibold transition-all">
              <Users className="w-5 h-5" /> Devenir volontaire
            </Link>
          </div>
        </div>
      </div>

      <a href="#stats" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce" aria-label="Défiler vers les chiffres clés">
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  )
}
