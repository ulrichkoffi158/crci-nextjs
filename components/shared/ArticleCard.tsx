import Link from 'next/link'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { Article } from '@/data'

const categoryColors: Record<string, string> = {
  'Santé': 'bg-blue-100 text-blue-700',
  'Urgence': 'bg-red-100 text-red-700',
  'Formation': 'bg-green-100 text-green-700',
  'Social': 'bg-purple-100 text-purple-700',
  'Institutionnel': 'bg-gray-100 text-gray-700',
}

interface ArticleCardProps { article: Article; featured?: boolean; className?: string }

export default function ArticleCard({ article, featured = false, className }: ArticleCardProps) {
  return (
    <article className={cn('group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1', featured && 'md:grid md:grid-cols-2', className)}>
      <div className={cn('relative overflow-hidden', featured ? 'h-64 md:h-full' : 'h-52')}>
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0 bg-gradient-card" />
        <span className={cn('absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold', categoryColors[article.category] || 'bg-gray-100 text-gray-700')}>
          {article.category}
        </span>
      </div>
      <div className={cn('p-6', featured && 'flex flex-col justify-center p-8')}>
        <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(article.date)}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime} min</span>
        </div>
        <h3 className={cn('font-bold text-[#2D2D2D] mb-3 line-clamp-2 group-hover:text-[#ED1C24] transition-colors', featured ? 'text-2xl' : 'text-lg')}>
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
        <Link href={`/actualites/${article.slug}`} className="inline-flex items-center gap-1.5 text-[#ED1C24] font-semibold text-sm hover:gap-2.5 transition-all">
          Lire la suite <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
