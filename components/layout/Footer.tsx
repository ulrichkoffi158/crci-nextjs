import Link from 'next/link'
import Image from 'next/image'
import { Heart, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

const footerLinks = {
  'À propos': [
    { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
    { label: 'Notre histoire', href: '/qui-sommes-nous#histoire' },
    { label: 'Gouvernance', href: '/qui-sommes-nous#gouvernance' },
    { label: 'Nos valeurs', href: '/qui-sommes-nous#valeurs' },
  ],
  'Actions': [
    { label: "Secours d'urgence", href: '/qui-sommes-nous#actions' },
    { label: 'Couverture médicale', href: '/qui-sommes-nous#actions' },
    { label: 'Formation secourisme', href: '/formations' },
    { label: 'Galerie photos', href: '/galerie' },
  ],
  'Rejoignez-nous': [
    { label: 'Devenir volontaire', href: '/volontariat' },
    { label: 'Nos formations', href: '/formations' },
    { label: 'Faire un don', href: '/dons' },
    { label: 'Partenariat', href: '/contact' },
  ],
  'Informations': [
    { label: 'Actualités', href: '/actualites' },
    { label: 'Contact', href: '/contact' },
    { label: 'Espace presse', href: '/contact' },
    { label: 'Rapports annuels', href: '/qui-sommes-nous' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Main footer */}
      <div className="container-crci py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 flex-shrink-0">
                <Image
                  src="/images/logo-crci.png"
                  alt="Logo Croix-Rouge de Côte d'Ivoire"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-white text-base">Croix-Rouge</div>
                <div className="text-[#ED1C24] text-sm font-medium">de Côte d&apos;Ivoire</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              Reconnue par Décret N°63-169 du 18 avril 1963, la Croix-Rouge CI est l&apos;organisation
              humanitaire de référence en Côte d&apos;Ivoire — 4200 volontaires, 107 comités locaux,
              plus de 370 000 personnes assistées en 2025.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-[#ED1C24]/20 text-[#ED1C24] px-2 py-1 rounded-full font-semibold">Membre FICR</span>
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">Depuis 1960</span>
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">Utilité publique</span>
            </div>
            <div className="space-y-3 text-sm">
              <a
                href="https://www.google.com/maps/place/Croix-Rouge+de+C%C3%B4te+d'Ivoire,+le+si%C3%A8ge/@5.3200643,-4.0877724,13z/data=!4m20!1m13!4m12!1m4!2m2!1d-3.9572384!2d5.3916188!4e1!1m6!1m2!1s0xfc1ebb8f7681da5:0xaafba92a12e5c9b1!2sCroix-Rouge+de+C%C3%B4te+d'Ivoire,+le+si%C3%A8ge,+8XCM%2B2PG,+Av.+Lamblin,+Abidjan!2m2!1d-4.0156746!2d5.3200643!3m5!1s0xfc1ebb8f7681da5:0xaafba92a12e5c9b1!8m2!3d5.3200643!4d-4.0156746!16s%2Fg%2F1q5gqrk5y?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group/map"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-[#ED1C24] flex-shrink-0" />
                <span>Av. Lamblin, Abidjan (8XCM+2PG) — 01 BP 1244 Abidjan 01
                  <ExternalLink className="w-3 h-3 inline ml-1 opacity-0 group-hover/map:opacity-100 transition-opacity" />
                </span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
                <a href="tel:+22527202172 40" className="hover:text-white transition-colors">(+225) 27 20 21 72 40</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
                <a href="mailto:info@croix-rougeci.org" className="hover:text-white transition-colors">info@croix-rougeci.org</a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 bg-white/10 hover:bg-[#ED1C24] rounded-lg flex items-center justify-center transition-colors text-xs font-bold"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-[#ED1C24] text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

{/* Section Localisation / Siège */}
<div className="border-t border-white/10 bg-[#ED1C24]/20">
  <div className="container-crci py-10"> {/* py-10 pour donner un peu plus d'espace à la carte */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      
      {/* GAUCHE : La Carte Google Maps */}
      <div className="w-full lg:w-1/2 h-64 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.50285437873!2d-4.024227824143248!3d5.339943435728569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb38f7681d1b%3A0xaafe992a12e5c9b1!2sCroix-Rouge%20de%20C%C3%B4te%20d&#39;Ivoire%2C%20le%20si%C3%A8ge!5e0!3m2!1sfr!2sci!4v1711321818123!5m2!1sfr!2sci" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />
      </div>

      {/* DROITE : Infos et Action */}
      <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <h3 className="text-white font-bold text-lg mb-1">Siège National</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Avenue Lamblin, Plateau<br />
            8XCM+2PG, Abidjan, Côte d'Ivoire
          </p>
        </div>

        <Link
          href="https://www.google.com/maps/place/Croix-Rouge+de+C%C3%B4te+d'Ivoire,+le+si%C3%A8ge/@5.3200643,-4.0877724,13z/data=!4m20!1m13!4m12!1m4!2m2!1d-3.9572384!2d5.3916188!4e1!1m6!1m2!1s0xfc1ebb8f7681da5:0xaafba92a12e5c9b1!2sCroix-Rouge+de+C%C3%B4te+d'Ivoire,+le+si%C3%A8ge,+8XCM%2B2PG,+Av.+Lamblin,+Abidjan!2m2!1d-4.0156746!2d5.3200643!3m5!1s0xfc1ebb8f7681da5:0xaafba92a12e5c9b1!8m2!3d5.3200643!4d-4.0156746!16s%2Fg%2F1q5gqrk5y?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          className="flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105 whitespace-nowrap shadow-lg shadow-[#ED1C24]/20"
        >
          <MapPin className="w-4 h-4" />
          Itinéraire Maps
        </Link>
      </div>

    </div>
  </div>
</div>

      {/* Don CTA */}
      <div className="border-t border-white/10 bg-[#ED1C24]/20">
        <div className="container-crci py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-300 text-sm">Ensemble, sauvons des vies. Votre don fait la différence.</p>
            <Link
              href="/dons"
              className="flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Heart className="w-4 h-4" />
              Faire un don maintenant
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-crci py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Croix-Rouge de Côte d&apos;Ivoire. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
              <Link href="/contact" className="hover:text-gray-300 transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
