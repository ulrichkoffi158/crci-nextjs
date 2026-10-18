import type { Metadata } from 'next'
import { BookOpen, ShieldCheck, Shield, Users, CheckCircle2, Scale } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeader from '@/components/shared/SectionHeader'
import VolunteerForm from '@/components/forms/VolunteerForm'
import { VOLUNTEER_CATEGORIES, VOLUNTEER_RIGHTS, VOLUNTEER_DUTIES } from '@/data'

export const metadata: Metadata = {
  title: 'Devenir volontaire',
  description: "Rejoignez les volontaires de la Croix-Rouge de Côte d'Ivoire : formes d'engagement, droits et obligations selon nos Statuts, formulaire de candidature.",
}

const RIGHT_ICONS = [BookOpen, ShieldCheck, Shield, Users]

export default function VolontariatPage() {
  return (
    <>
      <PageHero eyebrow="Rejoignez-nous" title="Devenez volontaire" image="/images/crci/journee-8-mai.jpg"
        description="Rejoignez les 4 200 volontaires engagés au service des populations vulnérables de Côte d'Ivoire.">
        <a href="#formulaire" className="mt-8 inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-7 py-3.5 rounded-full font-semibold transition-colors">
          Je pose ma candidature
        </a>
      </PageHero>

      {/* Droits */}
      <section className="section-padding bg-white">
        <div className="container-crci">
          <SectionHeader label="Vos droits" title="Ce que la Croix-Rouge vous apporte" description="Les droits des volontaires sont fixés par l'article 13 de nos Statuts." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VOLUNTEER_RIGHTS.map((r, i) => {
              const Icon = RIGHT_ICONS[i % RIGHT_ICONS.length]
              return (
                <div key={r.title} className="p-6 rounded-2xl border border-navy-100 bg-navy-50/40">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-white" /></div>
                  <h3 className="font-bold text-navy mb-2">{r.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{r.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Types d'engagement */}
      <section className="section-padding bg-navy-50/60">
        <div className="container-crci">
          <SectionHeader label="Types d'engagement" title="Les formes d'engagement prévues par nos Statuts"
            description="Définitions reprises des Statuts de la Croix-Rouge de Côte d'Ivoire (articles 6, 7 et 12)." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VOLUNTEER_CATEGORIES.map((cat) => (
              <article key={cat.title} className="bg-white p-7 rounded-2xl border border-navy-100 shadow-card">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-navy">{cat.title}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C0181E] bg-red-50 px-2.5 py-1 rounded-full whitespace-nowrap">{cat.reference}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{cat.description}</p>
                <ul className="space-y-1.5">
                  {cat.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-navy-600 flex-shrink-0 mt-0.5" />{req}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Le titre de Président honoraire peut également être décerné par l&apos;Assemblée générale (art. 8).
          </p>
        </div>
      </section>

      {/* Obligations */}
      <section className="section-padding bg-navy-pattern text-white">
        <div className="container-crci grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-white/80 mb-4"><span className="w-6 h-0.5 bg-[#ED1C24] rounded-full" />Vos engagements</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Être volontaire, c&apos;est aussi des responsabilités</h2>
            <p className="text-white/70 text-lg">Tout volontaire s&apos;engage à respecter les obligations prévues par l&apos;article 14 des Statuts.</p>
          </div>
          <ul className="space-y-3">
            {VOLUNTEER_DUTIES.map((d) => (
              <li key={d} className="flex items-start gap-3 bg-white/[0.06] border border-white/10 rounded-xl p-4">
                <Scale className="w-5 h-5 text-[#ff6b72] flex-shrink-0 mt-0.5" />
                <span className="text-white/85 text-sm leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulaire */}
      <section id="formulaire" className="section-padding bg-white scroll-mt-28">
        <div className="container-crci max-w-3xl">
          <VolunteerForm />
        </div>
      </section>
    </>
  )
}
