import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ArticleCard from '@/components/shared/ArticleCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { ARTICLES } from '@/data'

export default function NewsGrid() {
  const featured = ARTICLES[0]
  const others = ARTICLES.slice(1, 4)
  return (
    <section className="section-padding bg-white">
      <div className="container-crci">
        <SectionHeader label="Actualités" title="Nos dernières nouvelles" description="Restez informés des actions menées par la Croix-Rouge CI sur le terrain et de nos événements à venir." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2"><ArticleCard article={featured} featured /></div>
          <div className="flex flex-col gap-6">
            {others.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
        <div className="text-center">
          <Link href="/actualites" className="inline-flex items-center gap-2 border-2 border-[#ED1C24] text-[#ED1C24] hover:bg-[#ED1C24] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
            Toutes les actualités <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
