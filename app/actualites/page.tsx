'use client'

import { useState, useEffect } from 'react'
import { Search, Rss } from 'lucide-react'
import { ARTICLES } from '@/data'
import ArticleCard from '@/components/shared/ArticleCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { getArticles, type SanityArticle } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'

// Adaptateur : convertit un SanityArticle en format compatible avec ArticleCard
function sanityToLocal(a: SanityArticle) {
  return {
    id: a._id,
    slug: typeof a.slug === 'string' ? a.slug : (a.slug as any)?.current ?? a._id,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    category: a.category,
    date: a.date,
    readTime: a.readTime ?? '3 min',
    author: a.author ?? 'Équipe CRCI',
    image: a.image
      ? urlFor(a.image).width(800).height(500).url()
      : 'https://images.unsplash.com/photo-1593113630400-ea4288922559?w=800',
  }
}

const CATEGORIES = ['Toutes', 'Santé', 'Formation', 'Action humanitaire', 'Partenariat', 'Événement', 'Urgence']

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [searchQuery, setSearchQuery]           = useState('')
  const [articles, setArticles]                 = useState(ARTICLES as any[])
  const [loading, setLoading]                   = useState(true)

  useEffect(() => {
    getArticles().then((data) => {
      if (data && data.length > 0) {
        setArticles(data.map(sanityToLocal))
      }
      // Si Sanity renvoie 0 résultats (projet non configuré) → garder ARTICLES statiques
      setLoading(false)
    })
  }, [])

  const filtered = articles.filter((a) => {
    const matchCat   = selectedCategory === 'Toutes' || a.category === selectedCategory
    const matchQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="bg-[#ED1C24] text-white py-20">
        <div className="container-crci text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <Rss className="inline w-3 h-3 mr-1" />Actualités
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Actualités</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto">
            Retrouvez toutes les informations, actions de terrain et événements de la Croix-Rouge de Côte d&apos;Ivoire.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="bg-white border-b border-gray-100 py-6 sticky top-20 z-30 shadow-sm">
        <div className="container-crci">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#ED1C24] focus:outline-none text-sm"
              />
            </div>

            {/* Catégories */}
            <div className="flex gap-2 flex-wrap justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#ED1C24] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grille articles */}
      <section className="section-padding bg-gray-50">
        <div className="container-crci">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Chargement des articles…</div>
          ) : filtered.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-8">
                {filtered.length} article{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Aucun article ne correspond à votre recherche.</p>
              <button
                onClick={() => { setSelectedCategory('Toutes'); setSearchQuery('') }}
                className="mt-4 text-[#ED1C24] text-sm font-medium hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
