import { Accent, SectionHeading } from '@/components/home/SectionHeading'
import Link from '@/components/Link'

interface WorkItem {
  title: string
  role: string
  description: string
  start: number
  /** Omit for a current role. */
  end?: number
  href: string
}

const work: WorkItem[] = [
  {
    title: 'Carrot',
    role: 'Senior Engineer',
    description:
      'SaaS platform serving real estate investors and agents with lead generation and marketing tools.',
    start: 2022,
    href: '/work',
  },
  {
    title: 'Roots',
    role: 'Core Maintainer',
    description:
      'Open source tooling for the WordPress ecosystem — build systems, starter themes, and developer infrastructure.',
    start: 2018,
    end: 2024,
    href: '/open-source',
  },
  {
    title: 'Tiny Pixel Collective',
    role: 'Principal Engineer',
    description:
      'Consulting studio for progressive nonprofits, tenant organizing, and advocacy organizations.',
    start: 2017,
    end: 2022,
    href: '/work',
  },
  {
    title: 'Other98',
    role: 'Technology Director',
    description: 'Digital infrastructure for a national grassroots advocacy network.',
    start: 2014,
    end: 2017,
    href: '/work',
  },
]

const AXIS_START = 2014

export default function SelectedWork() {
  const now = new Date()
  const axisEnd = now.getFullYear() + (now.getMonth() + 1) / 12
  const span = axisEnd - AXIS_START
  const pct = (year: number) => `${((year - AXIS_START) / span) * 100}%`
  const ticks = Array.from(
    { length: Math.floor(axisEnd) - AXIS_START + 1 },
    (_, i) => AXIS_START + i
  ).filter((y) => y % 2 === 0)

  return (
    <section aria-label="Selected work experience" className="py-16 sm:py-20">
      <SectionHeading index="01" href="/work" srLabel="work experience">
        Selected <Accent>work</Accent>
      </SectionHeading>

      <div className="relative">
        {/* Year axis — shares the bar column's geometry on wide screens. */}
        <div
          aria-hidden="true"
          className="mb-3 hidden grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 md:grid"
        >
          <span />
          <div className="relative h-4 font-mono text-[0.65rem] text-gray-400 tabular-nums dark:text-gray-500">
            {ticks.map((y) => (
              <span key={y} className="absolute -translate-x-1/2" style={{ left: pct(y) }}>
                {y}
              </span>
            ))}
          </div>
        </div>

        <ol className="border-t border-gray-200 dark:border-gray-800">
          {work.map((item, i) => {
            const end = item.end ?? axisEnd
            return (
              <li key={item.title} className="border-b border-gray-200 dark:border-gray-800">
                <Link
                  href={item.href}
                  className="group/row hover:bg-primary-50/60 dark:hover:bg-primary-950/30 relative -mx-4 grid gap-4 px-4 py-6 transition-colors sm:-mx-6 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8 md:rounded-lg"
                >
                  <div className="flex gap-5">
                    <span className="mt-1.5 font-mono text-xs text-gray-400 tabular-nums dark:text-gray-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="group-hover/row:text-primary-700 dark:group-hover/row:text-primary-300 text-xl font-semibold tracking-tight text-gray-900 transition-colors sm:text-2xl dark:text-gray-100">
                        {item.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 mt-0.5 text-sm font-medium">
                        {item.role}
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-2 pl-9 md:pl-0">
                    <div className="relative h-8">
                      {/* gridlines */}
                      {ticks.map((y) => (
                        <span
                          key={y}
                          aria-hidden="true"
                          className="absolute inset-y-0 w-px bg-gray-100 dark:bg-gray-900"
                          style={{ left: pct(y) }}
                        />
                      ))}
                      <span
                        aria-hidden="true"
                        className="bg-primary-200 group-hover/row:bg-primary-500 dark:bg-primary-900 dark:group-hover/row:bg-primary-500 absolute top-1/2 h-2 -translate-y-1/2 rounded-full transition-all duration-500 group-hover/row:h-3"
                        style={{
                          left: pct(item.start),
                          width: `calc(${pct(end)} - ${pct(item.start)})`,
                        }}
                      >
                        {!item.end && (
                          <span className="bg-primary-500 animate-timeline-pulse ring-paper absolute top-1/2 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full ring-4 dark:ring-gray-950" />
                        )}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-gray-500 tabular-nums dark:text-gray-400">
                      {item.start}–{item.end ?? 'Present'}
                      <span className="text-gray-300 dark:text-gray-700"> · </span>
                      {Math.round(end - item.start)} yrs
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
