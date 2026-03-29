'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ZoomIn, Camera, Filter } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import { getPhotos, type SanityPhoto } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'

type Photo = {
  id: string | number
  src: string
  alt: string
  category: string
  caption: string
  year: string
}

const CATEGORIES = ['Toutes', 'Secours', 'Formation', 'Santé', 'Volontariat', 'Événements', 'Humanitaire']

// Données statiques de secours (affichées si Sanity non configuré)
const PHOTOS_STATIC: Photo[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80', alt: 'Formation premiers secours CRCI', category: 'Formation', caption: "Formation PSC1 — Gestes qui sauvent à Abidjan", year: '2025' },
  { id: 2, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', alt: 'Distribution humanitaire CRCI', category: 'Humanitaire', caption: "Distribution de kits alimentaires dans le Nord — 2 000 familles assistées", year: '2025' },
  { id: 3, src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', alt: 'Campagne santé CRCI', category: 'Santé', caption: "Campagne de vaccination — 15 000 enfants touchés à Abidjan", year: '2026' },
  { id: 4, src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80', alt: 'Intervention urgence CRCI', category: 'Secours', caption: "Intervention d'urgence — Inondations de Yamoussoukro", year: '2026' },
  { id: 5, src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80', alt: 'Programme santé mère-enfant CRCI', category: 'Santé', caption: "Programme Santé Mère-Enfant — 8 000 mères suivies dans les zones rurales", year: '2026' },
  { id: 6, src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', alt: 'Assemblée générale CRCI 2026', category: 'Événements', caption: "Assemblée Générale 2026 — 200 représentants des 107 comités locaux", year: '2026' },
  { id: 7, src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80', alt: 'Volontaires CRCI en mission', category: 'Volontariat', caption: "Nos 42 000 volontaires — L'âme de la Croix-Rouge CI", year: '2025' },
  { id: 8, src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', alt: 'Couverture médicale CRCI', category: 'Santé', caption: "Couverture médicale lors des événements publics — Experts certifiés", year: '2025' },
  { id: 9, src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80', alt: 'Don de sang CRCI', category: 'Humanitaire', caption: "Collecte de sang — Campagne nationale Don de Vie", year: '2025' },
  { id: 10, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', alt: 'Formation BNS', category: 'Formation', caption: "Brevet National de Secourisme — Certification professionnelle CRCI", year: '2025' },
  { id: 11, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', alt: 'Sensibilisation communautaire CRCI', category: 'Humanitaire', caption: "Sensibilisation communautaire — Prévention choléra, zone lagunaire", year: '2025' },
  { id: 12, src: 'https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=800&q=80', alt: 'Poste de secours événementiel', category: 'Secours', caption: "Poste de secours événementiel — Couverture médicale d'excellence", year: '2026' },
]

function sanityToPhoto(p: SanityPhoto): Photo {
  return {
    id: p._id,
    src: p.image ? urlFor(p.image).width(800).height(600).url() : '',
    alt: p.alt,
    category: p.category,
    caption: p.caption ?? '',
    year: p.year ? String(p.year) : '2025',
  }
}

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState('Toutes')
  const [lightbox, setLightbox]             = useState<Photo | null>(null)
  const [photos, setPhotos]                 = useState<Photo[]>(PHOTOS_STATIC)
  const [loading, setLoading]               = useState(true)

  useEffect(() => {
    getPhotos().then((data) => {
      if (data && data.length > 0) {
        setPhotos(data.map(sanityToPhoto))
      }
      setLoading(false)
    })
  }, [])

  const filtered = activeCategory === 'Toutes'
    ? photos
    : photos.filter(p => p.category === activeCategory)

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D2D2D] via-gray-800 to-[#ED1C24]/30 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ED1C24 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ED1C24 0%, transparent 40%)' }} />
        </div>
        <div className="container-crci text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <Camera className="w-3.5 h-3.5" /> Notre action en images
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galerie Photos</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos actions sur le terrain — secours, formations, couverture médicale
            et missions humanitaires à travers toute la Côte d&apos;Ivoire.
          </p>
          <div className="mt-8 text-white/60 text-sm">{photos.length} photos · Activités 2025–2026</div>
        </div>
      </section>

      {/* Galerie */}
      <section className="section-padding bg-gray-50">
        <div className="container-crci">
          <SectionHeader
            label="Photos"
            title="Nos actions en images"
            description="Chaque photo témoigne de l'engagement de nos 42 000 volontaires au service des populations ivoiriennes."
          />

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#ED1C24] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:text-[#ED1C24] border border-gray-200 hover:border-[#ED1C24]/40 hover:shadow-sm'
                }`}
              >
                {cat !== 'Toutes' && <Filter className="w-3.5 h-3.5" />}
                {cat}
                {cat === 'Toutes' && <span className="ml-1 bg-current/20 text-current text-xs px-1.5 py-0.5 rounded-full">{photos.length}</span>}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement des photos…</div>
          ) : (
            <>
              {/* Grille masonry */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filtered.map((photo) => (
                  <div
                    key={photo.id}
                    className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                    onClick={() => setLightbox(photo)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4 text-[#ED1C24]" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="text-xs bg-[#ED1C24] text-white px-2 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-600 font-medium leading-snug">{photo.caption}</p>
                      <p className="text-xs text-gray-400 mt-1">{photo.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Aucune photo dans cette catégorie pour le moment.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA ajout photos */}
      <section className="py-16 bg-[#ED1C24]">
        <div className="container-crci text-center text-white">
          <Camera className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Vous avez des photos de nos activités ?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Partagez vos photos de missions, formations ou événements CRCI.
            Elles pourront enrichir cette galerie et témoigner de notre action.
          </p>
          <a
            href="mailto:info@croix-rougeci.org?subject=Contribution%20Galerie%20CRCI"
            className="inline-flex items-center gap-2 bg-white text-[#ED1C24] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Envoyer des photos — info@croix-rougeci.org
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">{lightbox.caption}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="text-xs bg-[#ED1C24] text-white px-3 py-1 rounded-full">{lightbox.category}</span>
                <span className="text-gray-400 text-sm">{lightbox.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
