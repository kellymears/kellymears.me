import { Card } from '@/components/Card'
import { RelatedRides } from '@/components/cycling/RelatedRides'
import { RideDetailContent } from '@/components/cycling/RideDetailContent'
import { RideMap } from '@/components/cycling/RideMap'
import SectionContainer from '@/components/SectionContainer'
import type {
  ActivityGroup,
  NormalizedActivity,
  RecentRide,
  RideBenchmarks,
  RideHistory,
} from '@/lib/cycling'
import {
  GROUP_COPY,
  RIDE_TYPE_ACCENT,
  RIDE_TYPE_SHORT_LABELS,
  SOURCE_LABELS,
} from '@/lib/cycling-constants'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const STRAVA_ID_RE = /_sv_(\d+)$/

function getStravaUrl(raw: NormalizedActivity): string | null {
  if (raw.source !== 'sv') return null
  const match = raw.id.match(STRAVA_ID_RE)
  return match ? `https://www.strava.com/activities/${match[1]}` : null
}

interface RideLayoutProps {
  group: ActivityGroup
  ride: RecentRide
  raw: NormalizedActivity
  prev: RecentRide | null
  next: RecentRide | null
  related: RecentRide[]
  recent: RecentRide[]
  benchmarks: RideBenchmarks
  history: RideHistory
}

export default function RideLayout({
  group,
  ride,
  raw,
  prev,
  next,
  related,
  recent,
  benchmarks,
  history,
}: RideLayoutProps) {
  const copy = GROUP_COPY[group]
  const noun = copy.noun.toLowerCase()
  const sourceLabel = SOURCE_LABELS[ride.source] ?? ride.source
  const stravaUrl = getStravaUrl(raw)
  const isVirtual = raw.sportType === 'VirtualRide'
  const showMap = !isVirtual && raw.startLat != null && raw.startLng != null

  return (
    <SectionContainer>
      <div className="pt-6 pb-12">
        <div className="mb-6">
          <Link
            href={`/movement?type=${group}`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
            aria-label={`Back to ${copy.eyebrow.toLowerCase()}`}
          >
            &larr; All {copy.nounPlural.toLowerCase()}
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={raw.startTime}>{ride.date}</time>
            <span>&middot;</span>
            <span>{sourceLabel}</span>
            {ride.sportType !== 'Ride' && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${RIDE_TYPE_ACCENT[ride.sportType] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
              >
                {RIDE_TYPE_SHORT_LABELS[ride.sportType] ?? ride.sportType}
              </span>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
            {ride.name}
          </h1>
        </header>

        {showMap ? (
          <RideMap
            slug={ride.slug}
            distanceMeters={raw.distance}
            className="mb-8 h-[420px] w-full md:h-[500px]"
          />
        ) : (
          <div className="mb-8 flex h-[200px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isVirtual ? 'Indoor ride · no real-world route' : `No GPS recorded for this ${noun}`}
            </p>
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <RideDetailContent ride={ride} benchmarks={benchmarks} history={history} />

            {stravaUrl && (
              <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800">
                <a
                  href={stravaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  View on Strava
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            )}
          </div>

          <aside className="space-y-8 md:col-span-1">
            {related.length > 0 && (
              <RelatedRides title={`Related ${copy.nounPlural.toLowerCase()}`} rides={related} />
            )}
            {recent.length > 0 && (
              <RelatedRides title={`Recent ${copy.nounPlural.toLowerCase()}`} rides={recent} />
            )}
          </aside>
        </div>

        {(prev || next) && (
          <nav className="mt-12 grid gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2 dark:border-gray-800">
            {prev ? (
              <Card
                as={Link}
                href={`/movement/${prev.slug}`}
                hover={false}
                className="p-4 hover:shadow-sm"
              >
                <span className="mb-1 block text-xs font-medium tracking-widest text-gray-500 uppercase dark:text-gray-400">
                  &larr; Older {noun}
                </span>
                <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {prev.name}
                </span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                  {prev.date} · {prev.distance}
                </span>
              </Card>
            ) : (
              <div />
            )}

            {next ? (
              <Card
                as={Link}
                href={`/movement/${next.slug}`}
                hover={false}
                className="p-4 text-right hover:shadow-sm"
              >
                <span className="mb-1 block text-xs font-medium tracking-widest text-gray-500 uppercase dark:text-gray-400">
                  Newer {noun} &rarr;
                </span>
                <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {next.name}
                </span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                  {next.date} · {next.distance}
                </span>
              </Card>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </SectionContainer>
  )
}
