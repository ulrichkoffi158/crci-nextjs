import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteNotFound from './(site)/not-found'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1"><SiteNotFound /></main>
      <Footer />
    </div>
  )
}
