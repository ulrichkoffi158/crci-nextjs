import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import ArticleCard from '@/components/shared/ArticleCard'
import NewsCarousel from './NewsCarousel'
import { getArticles, getBanners, type Slide } from '@/lib/sanity.queries'
import { HOME_SLIDES } from '@/data'

/** Section Actualités de l'accueil : carrousel « À la une » + derniers articles publiés dans Sanity */
export default async function LatestNews() {
  const [banners, allArticles] = await Promise.all([getBanners(), getArticles()])
  const slides: Slide[] = [...banners, ...HOME_SLIDES]
  const articles = allArticles.slice(0, 3)

  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 bg-white">
      <div className="container-crci">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <SectionHeader label="Actualités" title="À la une" centered={false} className="mb-0"
            description="Campagnes, appels à l'action et temps forts de la Croix-Rouge de Côte d'Ivoire." />
          {articles.length > 0 && (
            <Link href="/actualites" className="inline-flex items-center gap-2 text-navy font-semibold hover:gap-3 transition-all whitespace-nowrap">
              Toutes les actualités <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <NewsCarousel slides={slides} />

        {articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </section>
  )
}
