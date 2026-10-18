import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import ArticleCard from '@/components/shared/ArticleCard'
import { getArticles } from '@/lib/sanity.queries'

/** Dernières actualités publiées dans Sanity. N'affiche rien tant qu'aucun article n'est publié. */
export default async function LatestNews() {
  const articles = (await getArticles()).slice(0, 3)
  if (articles.length === 0) return null
  return (
    <section className="section-padding bg-navy-50/60">
      <div className="container-crci">
        <SectionHeader label="Actualités" title="Nos dernières nouvelles" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
        <div className="text-center">
          <Link href="/actualites" className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white px-7 py-3 rounded-full font-semibold transition-colors">
            Toutes les actualités <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
