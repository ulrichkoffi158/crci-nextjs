import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import NewsSlider from '@/components/home/NewsSlider'
import CallToAction from '@/components/home/CallToAction'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Croix-Rouge de Côte d'Ivoire — Au service de l'humanité",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <NewsSlider />
      <CallToAction />
    </>
  )
}
