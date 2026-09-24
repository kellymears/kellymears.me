import { Accent, SectionHeading } from '@/components/home/SectionHeading'
import Link from '@/components/Link'
import { RouteField } from '@/components/movement/RouteField'
import type { PeriodStats, RecentRide, WeeklyMileage } from '@/lib/cycling'
import type { RouteField as Field } from '@/lib/route-field'

interface Props {
  ytd: PeriodStats
  weeks: WeeklyMileage[]
  rides: RecentRide[]
  field: Field
  latest?: { name: string; date: string }
}

const fmt = new Intl.NumberFormat('en-US')

function parseRoute(raw: string) {
  const pipe = raw.indexOf('|')
  if (pipe === -1) return { viewBox: '0 0 128 128', points: raw }
  return { viewBox: raw.slice(0, pipe), points: raw.slice(pipe + 1) }
}

export default function Movement({ ytd, weeks, rides, field, latest }: Props) {
  const max = Math.max(...weeks.map((w) => w.distance), 1)
  const year = new Date().getFullYear()

  return (
    <section aria-label="Recent rides" className="py-16 sm:py-20">
      <SectionHeading index="03" href="/movement" linkLabel="All rides" srLabel="and activity">
        Lately, on the <Accent>bike</Accent>
      </SectionHeading>

      {/* Every ride as a heat field, YTD figures laid over its quiet side. */}
      <div className="relative flex items-end pt-72 pb-8 lg:min-h-[520px] lg:pt-0">
        <RouteField
          field={field}
          focus="right"
          latest={latest}
          className="max-lg:bottom-auto max-lg:h-72"
        />
        <div
          aria-hidden="true"
          className="from-paper via-paper/50 pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 bg-gradient-to-r via-30% to-transparent to-55% lg:block dark:from-gray-950 dark:via-gray-950/50"
        />
        <div className="relative">
          <p className="font-mono text-xs tracking-widest text-gray-500 uppercase dark:text-gray-400">
            {year} to date
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="from-primary-500 to-primary-700 dark:from-primary-300 dark:to-primary-500 bg-gradient-to-br bg-clip-text text-6xl font-semibold tracking-tighter text-transparent tabular-nums sm:text-7xl">
              {fmt.format(ytd.miles)}
            </span>
            <span className="font-serif text-2xl text-gray-500 italic dark:text-gray-400">
              miles
            </span>
          </p>
          <dl className="mt-4 flex gap-6 font-mono text-xs text-gray-600 tabular-nums dark:text-gray-400">
            <div>
              <dt className="sr-only">Rides</dt>
              <dd>{fmt.format(ytd.rides)} rides</dd>
            </div>
            <div>
              <dt className="sr-only">Elevation</dt>
              <dd>{fmt.format(ytd.elevation)} ft up</dd>
            </div>
            <div>
              <dt className="sr-only">Time</dt>
              <dd>{Math.round(ytd.hours)} hrs</dd>
            </div>
          </dl>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {fmt.format(field.count)} rides on one map. The moving streaks are the most recent.
          </p>
        </div>
      </div>

      <figure className="mt-2">
        <div
          className="flex h-16 items-end gap-[3px] sm:h-20"
          role="img"
          aria-label={`Weekly mileage over the last ${weeks.length} weeks, peaking at ${Math.round(max)} miles`}
        >
          {weeks.map((w, i) => (
            <span
              key={w.weekStart}
              title={`Week of ${w.weekStart}: ${w.distance} mi`}
              className="bg-primary-300 hover:bg-primary-600 dark:bg-primary-800 dark:hover:bg-primary-400 animate-slide-up flex-1 origin-bottom rounded-t-sm transition-colors"
              style={{
                height: `${Math.max((w.distance / max) * 100, 2)}%`,
                animationDelay: `${i * 25}ms`,
              }}
            />
          ))}
        </div>
        <figcaption className="mt-2 flex justify-between font-mono text-[0.65rem] tracking-wider text-gray-400 uppercase dark:text-gray-500">
          <span>{weeks.length} weeks ago</span>
          <span>This week</span>
        </figcaption>
      </figure>

      <div className="mt-10">
        {/* Route line drawings */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {rides.map((ride) => {
            const { viewBox, points } = parseRoute(ride.routePath!)
            return (
              <li key={ride.id}>
                <Link
                  href={`/movement/${ride.slug}`}
                  className="group/ride hover:border-primary-300 dark:hover:border-primary-700 flex h-full flex-col rounded-xl border border-gray-200 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800"
                >
                  <svg
                    viewBox={viewBox}
                    width="120"
                    height="96"
                    className="text-primary-600 dark:text-primary-400 h-20 w-full overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <polyline
                      points={points}
                      pathLength={1}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="route-draw"
                    />
                  </svg>
                  <p className="group-hover/ride:text-primary-700 dark:group-hover/ride:text-primary-300 mt-3 line-clamp-2 text-sm leading-snug font-medium text-gray-900 transition-colors dark:text-gray-100">
                    {ride.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.7rem] text-gray-500 tabular-nums dark:text-gray-400">
                    {ride.distance} · {ride.date.replace(/, \d{4}$/, '')}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
