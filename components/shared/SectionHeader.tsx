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
        <p className={cn('eyebrow mb-4', centered && 'justify-center', light ? 'text-white/80' : 'text-[#C0181E]')}>
          <span className="w-6 h-0.5 bg-[#ED1C24] rounded-full" />
          {label}
        </p>
      )}
      <h2 className={cn('text-3xl md:text-4xl font-extrabold mb-4 text-balance', light ? 'text-white' : 'text-navy')}>{title}</h2>
      {description && <p className={cn('text-lg leading-relaxed', light ? 'text-white/75' : 'text-slate-500')}>{description}</p>}
    </div>
  )
}
