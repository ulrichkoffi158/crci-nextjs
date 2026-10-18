import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/forms/ContactForm'
import { CONTACT_INFO } from '@/data'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez le siège de la Croix-Rouge de Côte d'Ivoire au Plateau, à Abidjan.",
}

export default function ContactPage({ searchParams }: { searchParams: { sujet?: string } }) {
  const defaultSujet = searchParams?.sujet === 'partenariat' ? 'Partenariat' : ''
  const items = [
    { icon: MapPin, label: 'Adresse', value: CONTACT_INFO.address, href: CONTACT_INFO.mapsUrl },
    { icon: Phone, label: 'Téléphone', value: CONTACT_INFO.phone, href: CONTACT_INFO.phoneHref },
    { icon: Mail, label: 'E-mail', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: Clock, label: 'Horaires', value: CONTACT_INFO.hours },
    { icon: Facebook, label: 'Facebook', value: 'facebook.com/CroixRouge225', href: CONTACT_INFO.social.facebook },
  ]
  return (
    <>
      <PageHero eyebrow="Contact" title="Contactez-nous" description="Notre équipe est disponible pour répondre à vos questions et vous orienter." />
      <section className="section-padding bg-navy-50/50">
        <div className="container-crci">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-navy mb-2">Siège national</h2>
              {items.map((item) => {
                const inner = (
                  <>
                    <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{item.label}</p>
                      <p className="text-navy font-medium text-sm mt-0.5 leading-snug">{item.value}</p>
                    </div>
                  </>
                )
                const cls = 'flex items-start gap-4 p-4 bg-white rounded-2xl border border-navy-100'
                return item.href
                  ? <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cls} hover:border-navy-200 hover:shadow-card transition-all`}>{inner}</a>
                  : <div key={item.label} className={cls}>{inner}</div>
              })}
              <div className="rounded-2xl overflow-hidden border border-navy-100 h-64 bg-white">
                <iframe
                  title="Plan d'accès au siège de la Croix-Rouge de Côte d'Ivoire"
                  src="https://www.google.com/maps?q=Croix-Rouge%20de%20C%C3%B4te%20d'Ivoire%20si%C3%A8ge%20Plateau%20Abidjan&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm defaultSujet={defaultSujet} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
