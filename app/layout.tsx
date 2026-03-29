import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Croix-Rouge de Côte d'Ivoire — Au service de l'humanité depuis 1960",
    template: '%s | Croix-Rouge CI',
  },
  description:
    "La Croix-Rouge de Côte d'Ivoire, reconnue par décret N°63-169 du 18 avril 1963, œuvre pour la protection des populations vulnérables à travers 107 comités locaux, 42 000 volontaires et plus de 370 000 personnes impactées en 2025.",
  keywords: ['Croix-Rouge', "Côte d'Ivoire", 'humanitaire', 'volontariat', 'secourisme', 'santé', 'couverture médicale', 'CRCI', 'Abidjan'],
  icons: {
    icon: '/images/logo-crci.png',
    apple: '/images/logo-crci-180.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    url: 'https://croix-rougeci.org',
    siteName: "Croix-Rouge de Côte d'Ivoire",
    images: [{ url: '/images/logo-crci.png', width: 512, height: 512, alt: "Logo CRCI" }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
