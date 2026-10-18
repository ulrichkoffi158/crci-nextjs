import Link from 'next/link'
import Image from 'next/image'
import { Heart, Phone, Mail, MapPin, Clock, Facebook, ArrowUpRight } from 'lucide-react'
import { CONTACT_INFO, CIFS_URL } from '@/data'

type FooterLink = { label: string; href: string; external?: boolean }

const footerLinks: Record<string, FooterLink[]> = {
  'À propos': [
    { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
    { label: 'Notre histoire', href: '/qui-sommes-nous#histoire' },
    { label: 'Gouvernance', href: '/qui-sommes-nous#gouvernance' },
    { label: 'Principes fondamentaux', href: '/qui-sommes-nous#valeurs' },
  ],
  'Nos actions': [
    { label: 'Secours et couverture médicale', href: '/qui-sommes-nous#actions' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Galerie photos', href: '/galerie' },
    { label: 'Formations (CIFS)', href: CIFS_URL, external: true },
  ],
  'Agir avec nous': [
    { label: 'Faire un don', href: '/dons' },
    { label: 'Devenir volontaire', href: '/volontariat' },
    { label: 'Devenir partenaire', href: '/contact?sujet=partenariat' },
    { label: 'Nous contacter', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Bandeau d'appel */}
      <div className="bg-navy-pattern border-b border-white/10">
        <div className="container-crci py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-bold">Ensemble, sauvons des vies.</p>
            <p className="text-white/65 text-sm mt-1">Chaque don et chaque heure de volontariat comptent.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/dons" className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
              <Heart className="w-4 h-4" /> Faire un don
            </Link>
            <Link href="/volontariat" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
              Devenir volontaire
            </Link>
          </div>
        </div>
      </div>

      <div className="container-crci py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-14 h-14 bg-white rounded-xl p-1.5 flex-shrink-0">
                <Image src="/images/logo-crci.png" alt="Logo Croix-Rouge de Côte d'Ivoire" width={56} height={56} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-extrabold text-lg leading-tight">Croix-Rouge</div>
                <div className="text-white/70 text-sm">de Côte d&apos;Ivoire</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Auxiliaire des pouvoirs publics reconnue par le décret N°63-169 du 18 avril 1963, membre du Mouvement
              international de la Croix-Rouge et du Croissant-Rouge.
            </p>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-[#ff6b72] flex-shrink-0" />{CONTACT_INFO.address}</li>
              <li><a href={CONTACT_INFO.phoneHref} className="flex items-center gap-3 hover:text-white"><Phone className="w-4 h-4 text-[#ff6b72]" />{CONTACT_INFO.phone}</a></li>
              <li><a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="w-4 h-4 text-[#ff6b72]" />{CONTACT_INFO.email}</a></li>
              <li className="flex items-start gap-3"><Clock className="w-4 h-4 mt-0.5 text-[#ff6b72] flex-shrink-0" />{CONTACT_INFO.hours}</li>
            </ul>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-[0.14em] mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm transition-colors">
                        {link.label} <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-crci py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Croix-Rouge de Côte d&apos;Ivoire. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            <a href={CONTACT_INFO.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de la Croix-Rouge de Côte d'Ivoire"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a href={CONTACT_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Itinéraire vers le siège</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
