import Link from 'next/link'
import { Heart, Users, BookOpen, ArrowRight, ArrowUpRight } from 'lucide-react'
import { CIFS_URL } from '@/data'

const actions = [
  { icon: Heart, title: 'Faire un don', description: "Votre générosité finance directement nos actions de secours et d'assistance humanitaire sur le terrain.", href: '/dons', cta: 'Je fais un don', accent: 'bg-[#ED1C24]' },
  { icon: Users, title: 'Devenir volontaire', description: "Rejoignez nos 4 200 volontaires et participez à des missions concrètes partout en Côte d'Ivoire.", href: '/volontariat', cta: "Je m'engage", accent: 'bg-white/15' },
  { icon: BookOpen, title: 'Se former', description: "Apprenez les gestes qui sauvent avec le CIFS, centre de formation de la Croix-Rouge de Côte d'Ivoire.", href: CIFS_URL, cta: 'Voir les formations', accent: 'bg-white/15', external: true },
]

export default function CallToAction() {
  return (
    <section className="section-padding bg-navy-pattern relative overflow-hidden">
      <div className="absolute -left-32 bottom-0 w-96 h-96 rounded-full bg-[#ED1C24]/10 blur-3xl" />
      <div className="container-crci relative">
        <div className="text-center mb-14">
          <p className="eyebrow text-white/80 justify-center mb-4"><span className="w-6 h-0.5 bg-[#ED1C24] rounded-full" />Agissez maintenant</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Comment soutenir notre mission ?</h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">Chaque geste compte. Choisissez la façon dont vous voulez agir à nos côtés.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((a) => {
            const content = (
              <>
                <div className={`w-14 h-14 ${a.accent} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <a.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{a.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">{a.description}</p>
                <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                  {a.cta} {a.external ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </span>
              </>
            )
            const cls = 'group block bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1'
            return a.external
              ? <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
              : <Link key={a.title} href={a.href} className={cls}>{content}</Link>
          })}
        </div>
      </div>
    </section>
  )
}
