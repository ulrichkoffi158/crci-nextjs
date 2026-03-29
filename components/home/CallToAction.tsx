import Link from 'next/link'
import { Heart, Users, BookOpen, ArrowRight } from 'lucide-react'

const actions = [
  { icon: Heart, title: 'Faire un don', description: "Votre générosité finance directement nos actions de secours et d'assistance humanitaire sur le terrain.", href: '/dons', cta: 'Je fais un don', bg: 'bg-[#ED1C24]' },
  { icon: Users, title: 'Devenir volontaire', description: "Rejoignez les 4200 volontaires engagés et participez à des missions concrètes à travers toute la Côte d'Ivoire.", href: '/volontariat', cta: "Je m'engage", bg: 'bg-[#2D2D2D]' },
  { icon: BookOpen, title: 'Se former', description: 'Acquérez des compétences en secourisme, gestion des urgences et santé communautaire grâce à nos formations certifiées.', href: '/formations', cta: 'Je me forme', bg: 'bg-[#8B0000]' },
]

export default function CallToAction() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2144 40%, #102a55 70%, #0a1e3d 100%)' }}>
      <div className="container-crci">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#ED1C24]/20 text-[#ED1C24] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Agissez maintenant</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comment soutenir notre mission ?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Chaque geste compte. Découvrez comment vous pouvez contribuer à l&apos;action humanitaire de la Croix-Rouge CI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((a) => (
            <div key={a.title} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ED1C24]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-14 h-14 ${a.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}>
                <a.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{a.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{a.description}</p>
              <Link href={a.href} className="inline-flex items-center gap-2 text-[#ED1C24] font-semibold text-sm hover:gap-3 transition-all">
                {a.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
