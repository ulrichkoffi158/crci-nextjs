'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/data'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md border-b border-gray-100' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      {/* Top bar */}
      <div className="bg-[#ED1C24] text-white py-1.5 hidden md:block">
        <div className="container-crci flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              (+225) 27 20 21 72 40
            </span>
            <span>info@croix-rougeci.org</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/CroixRouge225?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-crci">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src="/images/logo-crci.png"
                alt="Logo Croix-Rouge de Côte d'Ivoire"
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-[#2D2D2D] text-sm md:text-base leading-tight">Croix-Rouge</div>
              <div className="text-[#ED1C24] text-xs md:text-sm font-medium">de Côte d&apos;Ivoire</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'bg-[#ED1C24] text-white'
                    : 'text-[#2D2D2D] hover:text-[#ED1C24] hover:bg-red-50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/dons"
              className="hidden sm:flex items-center gap-2 bg-[#ED1C24] hover:bg-[#C0181E] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Heart className="w-4 h-4" />
              Faire un Don
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2D2D2D] hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-[#ED1C24] text-white'
                    : 'text-[#2D2D2D] hover:bg-red-50'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dons"
              className="flex items-center gap-2 bg-[#ED1C24] text-white px-4 py-3 rounded-lg text-sm font-semibold mt-2"
            >
              <Heart className="w-4 h-4" />
              Faire un Don
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
