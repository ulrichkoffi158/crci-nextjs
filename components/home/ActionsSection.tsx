import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import { ACTIONS } from '@/data'

export default function ActionsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-crci">
        <SectionHeader label="Nos actions" title="Sur le terrain, au plus près des communautés"
          description="Nos volontaires interviennent chaque jour dans tout le pays, des secours d'urgence à la prévention." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIONS.map((a) => {
            const Inner = (
              <>
                <div className="relative h-56 overflow-hidden">
                  <Image src={a.image} alt={a.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-card" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-[#C0181E] transition-colors">{a.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{a.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600">
                    {a.external ? <>Voir le site du CIFS <ArrowUpRight className="w-4 h-4" /></> : <>En savoir plus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </span>
                </div>
              </>
            )
            const cls = 'group bg-white rounded-2xl overflow-hidden border border-navy-100 hover:border-navy-200 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1'
            return a.external ? (
              <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>{Inner}</a>
            ) : (
              <Link key={a.title} href={a.href} className={cls}>{Inner}</Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
