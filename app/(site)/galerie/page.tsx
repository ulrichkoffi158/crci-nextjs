import type { Metadata } from 'next'
import { Camera, Mail } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { getPhotos } from '@/lib/sanity.queries'
import { GALLERY, CONTACT_INFO } from '@/data'

export const metadata: Metadata = {
  title: 'Galerie photos',
  description: "Les actions de la Croix-Rouge de Côte d'Ivoire en images : secours, santé, eau et hygiène, assistance.",
}
export const revalidate = 300

export default async function GaleriePage() {
  const sanityPhotos = await getPhotos()
  // Les photos publiées dans Sanity s'ajoutent aux photos fournies avec le site
  const photos = [...sanityPhotos, ...GALLERY]

  return (
    <>
      <PageHero eyebrow="Notre action en images" title="Galerie photos" image="/images/crci/wash-kits.jpg"
        description="Secours, santé, eau et hygiène, assistance : nos volontaires sur le terrain, partout en Côte d'Ivoire." />
      <section className="section-padding bg-navy-50/50">
        <div className="container-crci">
          <GalleryGrid photos={photos} />
        </div>
      </section>
      <section className="py-16 bg-white border-t border-navy-100">
        <div className="container-crci text-center">
          <Camera className="w-10 h-10 mx-auto mb-4 text-navy" />
          <h2 className="text-2xl font-bold text-navy mb-3">Vous avez des photos de nos activités ?</h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">
            Partagez-les avec le service communication : elles pourront enrichir cette galerie, avec l&apos;accord des personnes photographiées.
          </p>
          <a href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent('Photos pour la galerie CRCI')}`}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white px-7 py-3 rounded-full font-semibold transition-colors">
            <Mail className="w-4 h-4" /> Envoyer des photos
          </a>
        </div>
      </section>
    </>
  )
}
