import { experience } from '@/data/experience'
import { TimelineItem } from '@/components/work/TimelineItem'

export function Timeline() {
  return (
    <section className="py-12" aria-label="Career timeline">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Experience
      </h2>

      <ol className="relative ml-2" aria-label="Work experience timeline">
        {experience.map((item) => (
          <TimelineItem key={`${item.company}-${item.startYear}`} item={item} />
        ))}
      </ol>
    </section>
  )
}
