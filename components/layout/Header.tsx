'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, Phone, Mail, Facebook, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, CONTACT_INFO } from '@/data'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(11,31,58,0.25)]' : 'bg-white'
      )}
    >
      {/* Barre supérieure */}
      <div className="bg-navy text-white/85 hidden md:block">
        <div className="container-crci flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-6">
            <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" /> {CONTACT_INFO.phone}
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> {CONTACT_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-white/60">{CONTACT_INFO.hours}</span>
            <a href={CONTACT_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="container-crci" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 bg-white rounded-lg">
              <Image src="/images/logo-crci.png" alt="Logo Croix-Rouge de Côte d'Ivoire" width={48} height={48} className="w-full h-full object-contain" priority />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-navy text-[15px] md:text-base tracking-tight">Croix-Rouge</div>
              <div className="text-navy-600 text-xs md:text-[13px] font-medium">de Côte d&apos;Ivoire</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="relative px-3.5 py-2 text-sm font-medium text-navy/80 hover:text-navy transition-colors inline-flex items-center gap-1">
                  {item.label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ) : (
                <Link key={item.label} href={item.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium transition-colors',
                    "after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#ED1C24] after:transition-transform after:origin-left",
                    isActive(item.href) ? 'text-navy after:scale-x-100' : 'text-navy/80 hover:text-navy after:scale-x-0 hover:after:scale-x-100'
                  )}>
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dons"
              className="hidden sm:inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-crci hover:shadow-crci-lg">
              <Heart className="w-4 h-4" /> Faire un don
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg text-navy hover:bg-navy-50 transition-colors"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={isOpen}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-navy-100 py-4 space-y-1">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-navy hover:bg-navy-50">
                  {item.label} <ArrowUpRight className="w-4 h-4 opacity-60" />
                </a>
              ) : (
                <Link key={item.label} href={item.href}
                  className={cn('flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href) ? 'bg-navy text-white' : 'text-navy hover:bg-navy-50')}>
                  {item.label}
                </Link>
              )
            )}
            <Link href="/dons" className="flex items-center justify-center gap-2 bg-[#ED1C24] text-white px-4 py-3 rounded-lg text-sm font-semibold mt-3">
              <Heart className="w-4 h-4" /> Faire un don
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
