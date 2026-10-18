'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Photo } from '@/data'

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState('Toutes')
  const [index, setIndex] = useState<number | null>(null)

  const categories = useMemo(() => ['Toutes', ...Array.from(new Set(photos.map((p) => p.category)))], [photos])
  const filtered = category === 'Toutes' ? photos : photos.filter((p) => p.category === category)
  const current = index !== null ? filtered[index] : null

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % filtered.length))
      if (e.key === 'ArrowLeft') setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, filtered.length])

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-navy text-white shadow-md' : 'bg-white text-navy/70 border border-navy-100 hover:border-navy-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
        {filtered.map((photo, i) => (
          <button key={photo.id} onClick={() => setIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white border border-navy-100 shadow-card hover:shadow-card-hover transition-all text-left">
            <div className="relative overflow-hidden">
              <Image src={photo.src} alt={photo.alt} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              <span className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-navy" />
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C0181E]">{photo.category}</p>
              <p className="text-sm text-navy font-medium leading-snug mt-0.5">{photo.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIndex(null)} role="dialog" aria-modal="true" aria-label={current.caption}>
          <button className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white" onClick={() => setIndex(null)} aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
          {filtered.length > 1 && (
            <>
              <button className="absolute left-3 md:left-6 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                onClick={(e) => { e.stopPropagation(); setIndex((index! - 1 + filtered.length) % filtered.length) }} aria-label="Photo précédente">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="absolute right-3 md:right-6 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                onClick={(e) => { e.stopPropagation(); setIndex((index! + 1) % filtered.length) }} aria-label="Photo suivante">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <figure className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} width={1600} height={1067} className="w-full h-auto max-h-[78vh] object-contain rounded-2xl" />
            <figcaption className="mt-4 text-center text-white">
              <span className="font-semibold">{current.caption}</span>
              <span className="text-white/50 text-sm ml-3">{current.category}{current.year ? ` · ${current.year}` : ''}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
