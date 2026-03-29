import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeader({ label, title, description, centered = true, light = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-3xl mb-12', centered && 'mx-auto text-center', className)}>
      {label && (
        <span className="inline-block bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          {label}
        </span>
      )}
      <h2 className={cn('text-3xl md:text-4xl font-bold mb-4 text-balance', light ? 'text-white' : 'text-[#2D2D2D]')}>
        {title}
      </h2>
      {description && (
        <p className={cn('text-lg leading-relaxed', light ? 'text-white/80' : 'text-gray-500')}>
          {description}
        </p>
      )}
    </div>
  )
}
