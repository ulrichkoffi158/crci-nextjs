import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  image?: string
  children?: React.ReactNode
  className?: string
}

/** En-tête de page bleu nuit, avec photo optionnelle en fond */
export default function PageHero({ eyebrow, title, description, image, children, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-gradient-navy text-white pt-36 md:pt-44 pb-16 md:pb-20', className)}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-800/40" />
        </>
      )}
      <div className="absolute inset-0 bg-cross-pattern" />
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#ED1C24]/15 blur-3xl" />
      <div className="relative container-crci">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow text-white/80 mb-5">
              <span className="w-8 h-0.5 bg-[#ED1C24] rounded-full" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5 text-balance">{title}</h1>
          {description && <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
