import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/plus-jakarta-sans'
import '@/styles/globals.css'
import { SITE_URL } from '@/data'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Croix-Rouge de Côte d'Ivoire — Au service de l'humanité depuis 1960",
    template: '%s | Croix-Rouge de Côte d\'Ivoire',
  },
  description:
    "La Croix-Rouge de Côte d'Ivoire, auxiliaire des pouvoirs publics reconnue par décret N°63-169 du 18 avril 1963, protège et secourt les populations vulnérables grâce à ses volontaires et ses 107 comités locaux.",
  keywords: ['Croix-Rouge', "Côte d'Ivoire", 'humanitaire', 'volontariat', 'secourisme', 'don', 'CRCI', 'Abidjan'],
  icons: {
    icon: '/images/logo-crci.png',
    apple: '/images/logo-crci-180.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    siteName: "Croix-Rouge de Côte d'Ivoire",
    images: [{ url: '/images/crci/hero-secours.jpg', width: 1536, height: 1024, alt: "Secouristes de la Croix-Rouge de Côte d'Ivoire" }],
  },
}

export const viewport: Viewport = { themeColor: '#0B1F3A' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
