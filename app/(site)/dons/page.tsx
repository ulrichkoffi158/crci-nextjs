import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, ShieldCheck, Globe2, Receipt, ChevronRight, LifeBuoy, Stethoscope, Droplets, HandHeart } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import DonationPanel from '@/components/donate/DonationPanel'
import { CONTACT_INFO } from '@/data'

export const metadata: Metadata = {
  title: 'Faire un don',
  description: "Soutenez la Croix-Rouge de Côte d'Ivoire par Wave ou par virement bancaire.",
}

const USES = [
  { icon: LifeBuoy, label: 'Secours et urgences' },
  { icon: Stethoscope, label: 'Santé communautaire' },
  { icon: Droplets, label: 'Eau, hygiène et assainissement' },
  { icon: HandHeart, label: 'Assistance aux plus vulnérables' },
]

export default function DonsPage() {
  return (
    <>
      <PageHero eyebrow="Agissez pour l'humanité" title="Faites un don" image="/images/crci/remise-kits-hygiene.jpg"
        description="Chaque don, quel que soit son montant, aide nos volontaires à secourir et à soutenir les populations les plus vulnérables de Côte d'Ivoire." />
      <section className="section-padding bg-navy-50/50">
        <div className="container-crci">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><DonationPanel /></div>
            <aside className="space-y-5">
              <div className="bg-white rounded-2xl border border-navy-100 p-6">
                <h3 className="font-bold text-navy mb-4">Vos dons financent</h3>
                <ul className="space-y-3">
                  {USES.map((u) => (
                    <li key={u.label} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center"><u.icon className="w-4 h-4 text-navy" /></span>{u.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-navy-100 p-6">
                <h3 className="font-bold text-navy mb-4">Garanties</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3"><ShieldCheck className="w-4 h-4 text-navy-600 mt-0.5 flex-shrink-0" />Auxiliaire des pouvoirs publics, reconnue par le décret N°63-169</li>
                  <li className="flex items-start gap-3"><Globe2 className="w-4 h-4 text-navy-600 mt-0.5 flex-shrink-0" />Membre du Mouvement international de la Croix-Rouge et du Croissant-Rouge</li>
                  <li className="flex items-start gap-3"><Receipt className="w-4 h-4 text-navy-600 mt-0.5 flex-shrink-0" />Reçu de don remis sur demande</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-navy-100 p-6">
                <h3 className="font-bold text-navy mb-2">Une question sur votre don ?</h3>
                <p className="text-slate-500 text-sm mb-4">Le service Mobilisation des ressources vous accompagne.</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-sm text-navy font-medium hover:underline mb-2"><Mail className="w-4 h-4" />{CONTACT_INFO.email}</a>
                <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-3 text-sm text-navy font-medium hover:underline"><Phone className="w-4 h-4" />{CONTACT_INFO.phone}</a>
              </div>
              <div className="bg-navy-pattern rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Donner autrement ?</h3>
                <p className="text-white/70 text-sm mb-4">Offrez votre temps en devenant volontaire, ou engagez votre entreprise comme partenaire.</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/volontariat" className="inline-flex items-center gap-1 bg-white text-navy px-4 py-2 rounded-full text-sm font-semibold">Volontariat <ChevronRight className="w-4 h-4" /></Link>
                  <Link href="/contact?sujet=partenariat" className="inline-flex items-center gap-1 border border-white/30 px-4 py-2 rounded-full text-sm font-semibold">Partenariat</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
