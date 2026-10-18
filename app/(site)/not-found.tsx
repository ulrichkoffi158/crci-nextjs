import Link from 'next/link'
import { Home, Heart } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 bg-navy-pattern text-white">
      <div className="container-crci text-center max-w-2xl">
        <p className="eyebrow text-[#ff8a8f] mb-4">Erreur 404</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page introuvable</h1>
        <p className="text-white/75 text-lg mb-10">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-xl font-semibold hover:bg-navy-50 transition-colors">
            <Home className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
          <Link href="/dons" className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            <Heart className="w-4 h-4" /> Faire un don
          </Link>
        </div>
      </div>
    </section>
  )
}
