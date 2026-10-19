'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Slide } from '@/lib/sanity.queries'

const DURATION = 6500 // ms par diapositive

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href)

function SlideLink({ href, className, children, label }: { href?: string; className?: string; children: React.ReactNode; label?: string }) {
  if (!href) return <div className={className}>{children}</div>
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}</a>
  ) : (
    <Link href={href} className={className} aria-label={label}>{children}</Link>
  )
}

export default function NewsCarousel({ slides }: { slides: Slide[] }) {
  const total = slides.length
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [reduced, setReduced] = useState(false)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) setPlaying(false)
  }, [])

  const go = useCallback((i: number) => setCurrent(((i % total) + total) % total), [total])
  const next = useCallback(() => go(current + 1), [current, go])
  const prev = useCallback(() => go(current - 1), [current, go])

  const running = playing && !hovered && total > 1
  useEffect(() => {
    if (!running) return
    const t = setTimeout(next, DURATION)
    return () => clearTimeout(t)
  }, [running, current, next])

  if (total === 0) return null

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="À la une"
      className="relative flex rounded-3xl overflow-hidden shadow-navy bg-navy-950"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev() }}
    >
      {/* Barre de contrôle verticale */}
      {total > 1 && (
        <div className="relative z-20 flex flex-col items-center justify-center gap-3 w-10 md:w-12 bg-navy-950 border-r border-white/10 py-4">
          <button onClick={() => setPlaying((p) => !p)} className="w-7 h-7 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label={playing ? 'Mettre en pause le défilement' : 'Reprendre le défilement'}>
            {playing ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          </button>
          <div className="flex flex-col gap-2.5" role="tablist" aria-label="Choisir une diapositive">
            {slides.map((s, i) => (
              <button key={s.id} role="tab" aria-selected={i === current} aria-label={`Diapositive ${i + 1} : ${s.title}`} onClick={() => go(i)}
                className={cn('w-2.5 h-2.5 rounded-[3px] transition-all duration-300', i === current ? 'bg-white scale-125' : 'bg-[#ED1C24]/80 hover:bg-[#ff6b72]')} />
            ))}
          </div>
        </div>
      )}

      {/* Diapositives */}
      <div className="relative flex-1 min-h-[440px] sm:min-h-[400px] md:min-h-[420px]"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 45) (dx < 0 ? next() : prev())
          touchX.current = null
        }}>
        {slides.map((s, i) => {
          const active = i === current
          return (
            <div key={s.id} role="group" aria-roledescription="diapositive" aria-label={`${i + 1} sur ${total}`} aria-hidden={!active}
              className={cn('absolute inset-0 transition-opacity duration-700 ease-out', active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none')}>
              {s.imageOnly && s.image ? (
                <SlideLink href={s.href} label={s.title} className="absolute inset-0 block">
                  <Image src={s.image} alt="" fill sizes="100vw" className="object-cover blur-2xl scale-110 opacity-60" aria-hidden />
                  <Image src={s.image} alt={s.imageAlt || s.title} fill sizes="(max-width: 1280px) 100vw, 1200px" priority={i === 0} className="object-contain" />
                </SlideLink>
              ) : (
                <>
                  {s.image && (
                    <Image src={s.image} alt={s.imageAlt || ''} fill sizes="100vw" priority={i === 0}
                      className={cn('object-cover transition-transform duration-[7000ms] ease-out', active && !reduced ? 'scale-105' : 'scale-100')} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent md:hidden" />
                  <div className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-[#ED1C24]/25 blur-3xl" />
                  <div className="relative h-full flex items-center px-6 sm:px-16 md:px-20 py-10">
                    <div className={cn('max-w-2xl transition-all duration-700', active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}>
                      {s.subtitle && (
                        <p className="eyebrow text-white/85 mb-4"><span className="w-8 h-0.5 bg-[#ED1C24] rounded-full" />{s.subtitle}</p>
                      )}
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase leading-[1.05] tracking-tight mb-4 [text-shadow:0_2px_18px_rgba(6,19,42,0.45)] text-balance">
                        {s.title}
                      </h3>
                      {s.description && <p className="text-white/80 text-base md:text-lg leading-relaxed mb-7 max-w-xl">{s.description}</p>}
                      {s.href && (
                        <SlideLink href={s.href} className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-colors shadow-crci">
                          {s.cta || 'En savoir plus'} {isExternal(s.href) ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </SlideLink>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}

        {total > 1 && (
          <>
            <button onClick={prev} aria-label="Diapositive précédente"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full hidden sm:flex bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} aria-label="Diapositive suivante"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full hidden sm:flex bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Barre de progression */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
              <div key={`${current}-${running}`} className="h-full bg-[#ED1C24] origin-left"
                style={running ? { animation: `crci-progress ${DURATION}ms linear forwards` } : { transform: 'scaleX(0)' }} />
            </div>
            <p className="absolute bottom-3 right-4 z-20 text-xs font-semibold text-white/70 tabular-nums" aria-hidden>
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
