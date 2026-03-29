'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { ARTICLES, type Article } from '@/data'

// ── Couleurs par catégorie ────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; accent: string; btn: string; btnHover: string }> = {
  Santé:          { bg: 'linear-gradient(120deg,#15803d 0%,#16a34a 60%,#4ade80 100%)',  accent: '#bbf7d0', btn: '#14532d',     btnHover: '#166534' },
  Urgence:        { bg: 'linear-gradient(120deg,#c2410c 0%,#ea580c 60%,#fb923c 100%)',  accent: '#fed7aa', btn: '#7c2d12',     btnHover: '#9a3412' },
  Formation:      { bg: 'linear-gradient(120deg,#1d4ed8 0%,#2563eb 60%,#60a5fa 100%)',  accent: '#bfdbfe', btn: '#1e3a8a',     btnHover: '#1e40af' },
  Social:         { bg: 'linear-gradient(120deg,#6d28d9 0%,#7c3aed 60%,#a78bfa 100%)',  accent: '#ede9fe', btn: '#4c1d95',     btnHover: '#5b21b6' },
  Institutionnel: { bg: 'linear-gradient(120deg,#075985 0%,#0369a1 60%,#38bdf8 100%)',  accent: '#e0f2fe', btn: '#0c4a6e',     btnHover: '#075985' },
  default:        { bg: 'linear-gradient(120deg,#9b1c1c 0%,#ED1C24 60%,#f87171 100%)',  accent: '#fecaca', btn: '#7f1d1d',     btnHover: '#991b1b' },
}

function getStyle(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default
}

// ── Formater la date ──────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function NewsSlider() {
  const slides = ARTICLES.slice(0, 6) // max 6 slides
  const total = slides.length

  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const DURATION = 5000 // ms per slide

  // ── Transition vers un slide ────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number, dir: 'left' | 'right' = 'right') => {
      if (isAnimating) return
      setDirection(dir)
      setIsAnimating(true)
      setProgress(0)
      setTimeout(() => {
        setCurrent((index + total) % total)
        setIsAnimating(false)
      }, 400)
    },
    [isAnimating, total]
  )

  const next = useCallback(() => goTo(current + 1, 'right'), [current, goTo])
  const prev = useCallback(() => goTo(current - 1, 'left'), [current, goTo])

  // ── Autoplay ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current)
    setProgress(0)

    if (!isPlaying) return

    const step = 50
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (step / DURATION) * 100, 100))
    }, step)

    intervalRef.current = setTimeout(next, DURATION)

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [current, isPlaying, next])

  const slide = slides[current]
  const style = getStyle(slide.category)

  // ── Clavier ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === ' ') setIsPlaying((p) => !p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  return (
    <section className="w-full" aria-label="Actualités en vedette">
      {/* ── Titre de section ───────────────────────────────────────────────── */}
      <div className="container-crci pt-16 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#ED1C24] mb-1">
              Actualités
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Nos dernières nouvelles
            </h2>
          </div>
          <Link
            href="/actualites"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#ED1C24] hover:underline"
          >
            Voir toutes les actualités →
          </Link>
        </div>
      </div>

      {/* ── Slider principal ───────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 220 }}>

        {/* Fond animé */}
        <div
          className="relative w-full transition-all"
          style={{
            background: style.bg,
            transition: 'background 0.5s ease',
          }}
        >
          {/* Motif décoratif */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none"
            style={{
              background: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
            }}
          />

          {/* Layout principal */}
          <div className="flex items-stretch relative z-10">

            {/* ── Colonne gauche : navigation verticale ────────────────────── */}
            <div className="flex flex-col items-center justify-between py-4 px-3 gap-2 select-none shrink-0 w-10">
              {/* Bouton pause/play */}
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="text-white/80 hover:text-white transition-colors mt-1"
                aria-label={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>

              {/* Dots de navigation */}
              <div className="flex flex-col gap-2 flex-1 justify-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 'right' : 'left')}
                    aria-label={`Slide ${i + 1}`}
                    className="relative flex items-center justify-center group"
                  >
                    <span
                      className="block transition-all duration-300"
                      style={{
                        width: i === current ? 3 : 2,
                        height: i === current ? 28 : 16,
                        borderRadius: 9999,
                        background:
                          i === current
                            ? 'rgba(255,255,255,1)'
                            : 'rgba(255,255,255,0.35)',
                      }}
                    />
                    {/* Progress bar sur le dot actif */}
                    {i === current && (
                      <span
                        className="absolute top-0 left-0 right-0 rounded-full bg-white/30"
                        style={{
                          height: `${progress}%`,
                          width: 3,
                          transition: 'height 0.05s linear',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Flèche gauche ────────────────────────────────────────────── */}
            <button
              onClick={prev}
              className="flex items-center justify-center px-2 text-white/70 hover:text-white transition-colors shrink-0 self-stretch"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* ── Contenu du slide ─────────────────────────────────────────── */}
            <div
              className="flex-1 py-8 px-4 md:px-8"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateX(${direction === 'right' ? '-30px' : '30px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              {/* Titre */}
              <h3
                className="text-xl md:text-3xl lg:text-4xl font-black uppercase text-white leading-tight mb-3"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)', letterSpacing: '0.02em' }}
              >
                {slide.title}
              </h3>

              {/* Label catégorie + date */}
              <p
                className="text-xs md:text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: style.accent }}
              >
                {slide.category.toUpperCase()} &nbsp;·&nbsp; {formatDate(slide.date)}
              </p>

              {/* Extrait */}
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                {slide.excerpt}
              </p>
            </div>

            {/* ── Bouton "Lire la suite" ───────────────────────────────────── */}
            <div className="flex items-end justify-end pb-5 pr-4 md:pr-8 shrink-0">
              <Link
                href={`/actualites/${slide.slug}`}
                className="inline-block text-xs md:text-sm font-bold px-5 py-2 rounded-full text-white border border-white/40 hover:bg-white/20 transition-all whitespace-nowrap"
                style={{
                  backdropFilter: 'blur(4px)',
                  background: 'rgba(255,255,255,0.15)',
                }}
              >
                En savoir plus
              </Link>
            </div>

            {/* ── Flèche droite ────────────────────────────────────────────── */}
            <button
              onClick={next}
              className="flex items-center justify-center px-2 text-white/70 hover:text-white transition-colors shrink-0 self-stretch"
              aria-label="Suivant"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* ── Barre de progression ─────────────────────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-white/60"
              style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
            />
          </div>
        </div>

        {/* ── Grille des 3 articles suivants ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
          {slides
            .filter((_, i) => i !== current)
            .slice(0, 3)
            .map((article, idx) => {
              const s = getStyle(article.category)
              return (
                <Link
                  key={article.id}
                  href={`/actualites/${article.slug}`}
                  className={`group flex gap-4 p-4 md:p-5 hover:bg-gray-50 transition-colors items-start ${idx < 2 ? 'md:border-r border-gray-100' : ''}`}
                >
                  {/* Point coloré catégorie */}
                  <span
                    className="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: getComputedColor(article.category) }}
                  />
                  <div className="min-w-0">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: getComputedColor(article.category) }}
                    >
                      {article.category}
                    </span>
                    <p className="text-sm font-semibold text-gray-800 leading-snug mt-0.5 group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(article.date)}</p>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>

      {/* ── Lien mobile "Voir toutes" ─────────────────────────────────────── */}
      <div className="container-crci pb-6 mt-4 md:hidden text-center">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 border-2 border-[#ED1C24] text-[#ED1C24] hover:bg-[#ED1C24] hover:text-white px-6 py-2.5 rounded-xl font-semibold transition-all text-sm"
        >
          Toutes les actualités →
        </Link>
      </div>
    </section>
  )
}

// Couleur d'accent par catégorie (pour les petits éléments)
function getComputedColor(category: string): string {
  const map: Record<string, string> = {
    Santé:          '#16a34a',
    Urgence:        '#ea580c',
    Formation:      '#2563eb',
    Social:         '#7c3aed',
    Institutionnel: '#0369a1',
  }
  return map[category] ?? '#ED1C24'
}
