import type { Metadata } from 'next'
import Image from 'next/image'
import { TIMELINE, VALUES, GOVERNANCE } from '@/data'
import SectionHeader from '@/components/shared/SectionHeader'
import { CheckCircle, Users, Target, Eye, Quote } from 'lucide-react'

export const metadata: Metadata = { title: 'Qui sommes-nous' }

export default function QuiSommesNousPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="bg-[#ED1C24] text-white py-20">
        <div className="container-crci text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Notre Organisation</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Qui sommes-nous ?</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto">
            Auxiliaire des pouvoirs publics, la Croix-Rouge CI est un acteur humanitaire de référence en Côte d&apos;Ivoire depuis 1960.
          </p>
        </div>
      </section>

      {/* MOT DU PRÉSIDENT */}
      <section id="mot-president" className="section-padding bg-white">
        <div className="container-crci">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Photo + info */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative">
                {/* Décoration derrière la photo */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#ED1C24]/30 rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#ED1C24]/10 rounded-2xl" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl w-72 h-80 lg:w-80 lg:h-96 border-4 border-white">
                  <Image
                    src="/images/site-crci-president-national-officiel.jpg"
                    alt="Dr. DA Léonce Bruno — Président National CRCI"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 288px, 320px"
                  />
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#ED1C24] text-white px-5 py-2.5 rounded-xl shadow-lg whitespace-nowrap text-center">
                  <p className="font-bold text-sm">Dr. DA Léonce Bruno</p>
                  <p className="text-xs text-white/80">Président National</p>
                </div>
              </div>
              {/* Infos supplémentaires */}
              <div className="mt-12 flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="text-xs bg-red-50 text-[#ED1C24] border border-[#ED1C24]/20 px-3 py-1.5 rounded-full font-medium">Croix-Rouge CI</span>
                <span className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full">Membre FICR</span>
                <span className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full">Depuis 1963</span>
              </div>
            </div>

            {/* Discours */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Mot du Président National
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-snug mb-6">
                &laquo;&nbsp;Ensemble, nous faisons la différence&nbsp;&raquo;
              </h2>

              <div className="relative pl-6 border-l-4 border-[#ED1C24] mb-6">
                <Quote className="absolute -left-4 -top-2 w-7 h-7 text-[#ED1C24] bg-white" />
                <p className="text-gray-600 leading-relaxed italic text-base">
                  &laquo;&nbsp;C&apos;est avec une immense fierté et une profonde humilité que je m&apos;adresse à vous
                  en tant que Président National de la Croix-Rouge de Côte d&apos;Ivoire. Notre organisation,
                  fondée le 13 octobre 1960 et reconnue par décret N°63-169 du 18 avril 1963,
                  incarne depuis plus de 65 ans les valeurs d&apos;humanité, de solidarité et de service
                  désintéressé au profit des populations les plus vulnérables de notre pays.&nbsp;&raquo;
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">
                Nos <strong className="text-[#2D2D2D]">4200 volontaires</strong> déployés dans
                nos <strong className="text-[#2D2D2D]">107 comités locaux repartis sur l'ensemble du térritoire</strong> sont le cœur battant
                de cette institution. Chaque jour, ils interviennent dans les secours d&apos;urgence,
                la santé communautaire, la formation aux premiers secours et la couverture médicale
                d&apos;événements à travers toute la Côte d&apos;Ivoire.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                En 2025, ce sont plus de <strong className="text-[#2D2D2D]">370 000 personnes</strong> qui
                ont bénéficié de nos actions. Cette réalité nous oblige et nous inspire à aller encore
                plus loin. Je vous invite à nous rejoindre — en tant que volontaire, donateur ou partenaire —
                pour que la flamme de l&apos;humanité continue d&apos;éclairer notre nation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/volontariat"
                  className="inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  Rejoindre notre mouvement
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#ED1C24] text-[#ED1C24] hover:bg-[#ED1C24] hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
                >
                  Nous contacter
                </a>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#ED1C24] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  DL
                </div>
                <div>
                  <p className="font-bold text-[#2D2D2D] text-sm">Dr. DA Léonce Bruno</p>
                  <p className="text-gray-400 text-xs">Président National — Croix-Rouge de Côte d&apos;Ivoire</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section id="valeurs" className="section-padding bg-white">
        <div className="container-crci">
          <SectionHeader label="Notre identité" title="Mission, Vision & Valeurs" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Target, title: 'Notre Mission', color: 'bg-[#ED1C24]', text: "Prévenir et alléger en tout temps et en tout lieu les souffrances humaines sans distinction de race, de religion, de sexe et d’idéologie politique, protéger la vie et la santé et faire respecter la dignité des personnes." },
              { icon: Eye, title: 'Notre Vision', color: 'bg-[#2D2D2D]', text: "D’ici à 2029, la Croix-Rouge de Côte d’Ivoire est une Société Nationale forte, de référence dans le domaine de l’humanitaire, financièrement autonome et capable de fournir des services durables et de qualité aux populations vulnérables sur toute l’étendue du territoire national." },
              { icon: Users, title: 'Nos Forces', color: 'bg-[#8B0000]', text: "4200 volontaires actifs et formés, 107 comités locaux sur toute l'étendue du térritoire, 65 ans d'expérience humanitaire, experts reconnus en couverture médicale et gestion des urgences, présence sur tout le territoire national." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* 7 Principes fondamentaux */}
          <SectionHeader label="Principes" title="Les 7 Principes Fondamentaux" description="Les principes fondamentaux qui guident l'ensemble des actions du Mouvement International de la Croix-Rouge et du Croissant-Rouge." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="p-6 border-2 border-gray-100 hover:border-[#ED1C24]/30 rounded-xl transition-colors group">
                <div className="w-8 h-8 bg-[#ED1C24] rounded-lg flex items-center justify-center mb-4 text-white text-sm font-bold group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h4 className="font-bold text-[#2D2D2D] mb-2">{v.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="histoire" className="section-padding bg-gray-50">
        <div className="container-crci">
          <SectionHeader label="Histoire" title="Notre parcours depuis 1963" description="Plus de 60 ans d'engagement au service des populations ivoiriennes les plus vulnérables." />
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#ED1C24]/30 md:-translate-x-0.5" />
            {TIMELINE.map((item, i) => (
              <div key={item.year} className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                <div className="flex-1 md:text-right pl-12 md:pl-0">
                  {i % 2 === 0 ? (
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <span className="text-[#ED1C24] font-bold text-lg">{item.year}</span>
                      <h4 className="font-bold text-[#2D2D2D] mt-1 mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  ) : <div className="hidden md:block" />}
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-[#ED1C24] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-10">
                  ✚
                </div>
                <div className="flex-1 pl-12 md:pl-6">
                  {i % 2 !== 0 ? (
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <span className="text-[#ED1C24] font-bold text-lg">{item.year}</span>
                      <h4 className="font-bold text-[#2D2D2D] mt-1 mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  ) : <div className="hidden md:block" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise couverture médicale */}
      <section id="actions" className="section-padding bg-[#ED1C24] text-white">
        <div className="container-crci">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Expertise reconnue</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert en Couverture Médicale</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              La Croix-Rouge CI est l&apos;organisation de référence en Côte d&apos;Ivoire pour la couverture
              médicale d&apos;événements et la gestion des urgences sanitaires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🏥',
                title: 'Postes de secours',
                description: 'Déploiement rapide de postes médicaux lors d\'événements culturels, sportifs, religieux et institutionnels.',
              },
              {
                icon: '🚑',
                title: 'Urgences sanitaires',
                description: 'Intervention rapide avec équipes spécialisées.',
              },
              {
                icon: '👨‍⚕️',
                title: 'Instructeurs certifiés',
                description: '25 instructeurs certifiés dispensant des formations reconnues aux normes nationales et internationales.',
              },
              {
                icon: '📋',
                title: 'Protocoles validés',
                description: 'Auxiliaire officiel des pouvoirs publics — protocoles validés par le Ministère de la Santé et le mouvement international de la Croix Rouge et du Croissant Rouge',
              },
            ].map(item => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#ED1C24] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Demander une couverture médicale →
            </a>
          </div>
        </div>
      </section>

      {/* Gouvernance */}
      <section id="gouvernance" className="section-padding bg-white">
        <div className="container-crci">
          <SectionHeader label="Gouvernance" title="Notre équipe dirigeante" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOVERNANCE.map((member) => (
              <div key={member.name} className="group text-center p-8 rounded-2xl bg-gray-50 hover:bg-[#ED1C24] transition-all duration-300 hover:shadow-xl">
                <div className="w-20 h-20 bg-[#ED1C24] group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-white group-hover:text-[#ED1C24] font-bold text-2xl transition-colors">{member.initials}</span>
                </div>
                <h3 className="font-bold text-[#2D2D2D] group-hover:text-white transition-colors mb-1">{member.name}</h3>
                <p className="text-[#ED1C24] group-hover:text-white/80 text-sm font-medium transition-colors">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
