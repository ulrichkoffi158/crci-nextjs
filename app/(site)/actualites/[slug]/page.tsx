import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { getArticle, getArticles } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'
import { formatDate } from '@/lib/utils'

export const revalidate = 300

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Article introuvable' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: 'article', images: [{ url: article.image }] },
  }
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1200).url()
      if (!src) return null
      return (
        <figure className="my-8">
          <Image src={src} alt={value.alt || ''} width={1200} height={750} className="rounded-2xl w-full h-auto" />
          {value.caption && <figcaption className="text-sm text-slate-500 mt-2 text-center">{value.caption}</figcaption>}
        </figure>
      )
    },
  },
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  return (
    <article>
      <header className="bg-navy-pattern text-white pt-36 md:pt-44 pb-16">
        <div className="container-crci max-w-3xl">
          <Link href="/actualites" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Toutes les actualités
          </Link>
          {article.category && <p className="eyebrow text-white/80 mb-4"><span className="w-6 h-0.5 bg-[#ED1C24] rounded-full" />{article.category}</p>}
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-balance">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(article.date)}</span>
            {article.readTime && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>}
            {article.author && <span>{article.author}</span>}
          </div>
        </div>
      </header>
      <div className="container-crci max-w-3xl -mt-8 relative">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-navy">
          <Image src={article.image} alt={article.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>
      </div>
      <div className="container-crci max-w-3xl py-12 md:py-16">
        <p className="text-xl text-navy/80 leading-relaxed font-medium mb-8">{article.excerpt}</p>
        <div className="prose-crci text-slate-700 leading-relaxed space-y-5">
          <PortableText value={article.content} components={components} />
        </div>
      </div>
    </article>
  )
}
