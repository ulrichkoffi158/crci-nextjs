import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import ActionsSection from '@/components/home/ActionsSection'
import LatestNews from '@/components/home/LatestNews'
import CallToAction from '@/components/home/CallToAction'

export const revalidate = 300

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <LatestNews />
      <ActionsSection />
      <CallToAction />
    </>
  )
}
