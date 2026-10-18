import StatCounter from '@/components/shared/StatCounter'
import { STATS } from '@/data'

export default function StatsSection() {
  return (
    <section id="stats" className="relative bg-white">
      <div className="container-crci">
        <div className="relative -mt-14 md:-mt-16 z-10 bg-white rounded-3xl shadow-navy border border-navy-100 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-navy-100">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} description={stat.description} className="px-4 py-8 md:py-10" />
          ))}
        </div>
      </div>
    </section>
  )
}
