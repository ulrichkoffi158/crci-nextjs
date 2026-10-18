import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, Facebook } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import NewsList from '@/components/news/NewsList'
import { getArticles } from '@/lib/sanity.queries'
import { CONTACT_INFO } from '@/data'

export const metadata: Metadata = {
  title: 'Actualités',
  description: "Les actions de terrain, événements et communiqués de la Croix-Rouge de Côte d'Ivoire.",
}
export const revalidate = 300

export default async function ActualitesPage() {
  const articles = await getArticles()
  return (
    <>
      <PageHero eyebrow="Actualités" title="Nos actualités" image="/images/crci/journee-8-mai.jpg"
        description="Actions de terrain, événements et communiqués de la Croix-Rouge de Côte d'Ivoire." />
      <section className="section-padding bg-navy-50/50">
        <div className="container-crci">
          {articles.length > 0 ? (
            <NewsList articles={articles} />
          ) : (
            <div className="max-w-xl mx-auto text-center bg-white rounded-3xl border border-navy-100 shadow-card p-10">
              <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-5">
                <Newspaper className="w-7 h-7 text-navy" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">Nos premières actualités arrivent bientôt</h2>
              <p className="text-slate-500 mb-6">En attendant, suivez nos actions au quotidien sur notre page Facebook.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={CONTACT_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white px-6 py-3 rounded-full text-sm font-semibold">
                  <Facebook className="w-4 h-4" /> Suivre la CRCI
                </a>
                <Link href="/galerie" className="inline-flex items-center gap-2 border border-navy-200 text-navy hover:bg-navy-50 px-6 py-3 rounded-full text-sm font-semibold">
                  Voir la galerie
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
