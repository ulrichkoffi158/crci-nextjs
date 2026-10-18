import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { Article } from '@/data'

interface ArticleCardProps { article: Article; className?: string }

export default function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article className={cn('group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col', className)}>
      <Link href={`/actualites/${article.slug}`} className="relative h-52 overflow-hidden block">
        <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-card" />
        {article.category && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-navy">{article.category}</span>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(article.date)}</span>
          {article.readTime && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>}
        </div>
        <h3 className="font-bold text-navy text-lg mb-3 line-clamp-2 group-hover:text-[#C0181E] transition-colors">
          <Link href={`/actualites/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
        <Link href={`/actualites/${article.slug}`} className="inline-flex items-center gap-1.5 text-navy-600 font-semibold text-sm hover:gap-2.5 transition-all">
          Lire la suite <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
