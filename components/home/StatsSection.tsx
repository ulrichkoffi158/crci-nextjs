import StatCounter from '@/components/shared/StatCounter'
import { STATS } from '@/data'

export default function StatsSection() {
  return (
    <section id="stats" className="bg-gray-50 py-20">
      <div className="container-crci">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} description={stat.description} />
          ))}
        </div>
      </div>
    </section>
  )
}
