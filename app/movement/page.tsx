import { CyclingStats } from '@/components/cycling/CyclingStats'
import { FunFacts } from '@/components/cycling/FunFacts'
import { PerformanceMetrics } from '@/components/cycling/PerformanceMetrics'
import { RecentRides, RidesSkeleton } from '@/components/cycling/RecentRides'
import { RideAverages } from '@/components/cycling/RideAverages'
import { TerrainBreakdown } from '@/components/cycling/TerrainBreakdown'
import { WeeklyMileageChart } from '@/components/cycling/WeeklyMileageChart'
import { YearInReview } from '@/components/cycling/YearInReview'
import { Accent } from '@/components/home/SectionHeading'
import Link from '@/components/Link'
import { MovementToggle } from '@/components/movement/MovementToggle'
import { RouteField } from '@/components/movement/RouteField'
import { getActivityPageData, GROUP_COPY, type ActivityGroup } from '@/lib/cycling'
import { getRouteField } from '@/lib/route-field'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'

type SearchParams = Promise<{ type?: string | string[] }>

// Resolve the active group: explicit ?type= wins, else the remembered cookie,
// else default to foot (the reason this page exists right now).
async function resolveGroup(searchParams: SearchParams): Promise<ActivityGroup> {
  const { type } = await searchParams
  const param = Array.isArray(type) ? type[0] : type
  if (param === 'cycling' || param === 'foot') return param
  const remembered = (await cookies()).get('movement-view')?.value
  if (remembered === 'cycling' || remembered === 'foot') return remembered
  return 'foot'
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const group = await resolveGroup(searchParams)
  const copy = GROUP_COPY[group]
  return genPageMetadata({
    title: copy.eyebrow,
    description: `Live ${copy.eyebrow.toLowerCase()} stats, weekly mileage, recent ${copy.nounPlural.toLowerCase()}, and performance metrics.`,
  })
}

export default async function MovementPage({ searchParams }: { searchParams: SearchParams }) {
  const group = await resolveGroup(searchParams)
  const copy = GROUP_COPY[group]
  const {
    athlete,
    rideStats,
    ytdStats,
    recentStats,
    weeklyMileage,
    recentRides,
    rideBenchmarks,
    rideHistory,
    virtualBenchmarks,
    virtualHistory,
    terrainCategories,
    powerStats,
    heartRateStats,
    totalEnergyKJ,
  } = getActivityPageData(group)

  const profileUrl = `https://www.strava.com/athletes/${athlete.username}`
  const field = getRouteField(group)
  const newest = field.recent[0] && recentRides.find((r) => r.id === field.recent[0]!.id)
  // "Rides & Stats" → "Rides & *Stats*": the last word takes the serif accent.
  const titleHead = copy.title.slice(0, copy.title.lastIndexOf(' ') + 1)
  const titleTail = copy.title.slice(titleHead.length)

  return (
    <div className="space-y-0">
      <div className="relative flex flex-col justify-end pt-80 pb-10 lg:min-h-[72vh] lg:pt-12">
        <RouteField
          field={field}
          focus="right"
          className="max-lg:bottom-auto max-lg:h-80"
          latest={newest ? { name: newest.name, date: newest.date } : undefined}
        />
        {/* Keeps the copy legible where it crosses the densest lines. */}
        <div
          aria-hidden="true"
          className="from-paper via-paper/60 pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 bg-gradient-to-r via-35% to-transparent to-60% lg:block dark:from-gray-950 dark:via-gray-950/60"
        />

        <div className="relative">
          <p className="text-primary-600 dark:text-primary-400 mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span>{copy.eyebrow}</span>
            <span aria-hidden="true" className="bg-primary-500 h-px w-8" />
            <span className="text-gray-500 dark:text-gray-400">
              {field.count.toLocaleString()} routes mapped
            </span>
          </p>
          <h1 className="text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-gray-900 dark:text-gray-100">
            {titleHead}
            <Accent>{titleTail}</Accent>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {copy.lead}{' '}
            {rideStats.totalMiles > 0 && (
              <>
                {rideStats.totalMiles.toLocaleString()} lifetime miles across{' '}
                {rideStats.totalRides.toLocaleString()} {copy.nounPlural.toLowerCase()}. Every line
                behind this is a real GPS track.
              </>
            )}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <MovementToggle active={group} />
            <Link
              href={`/movement/atlas?type=${group}`}
              className="group/atlas bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
              Open the atlas
              <span
                aria-hidden="true"
                className="transition-transform group-hover/atlas:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
            {group === 'cycling' && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
              >
                <svg
                  width="16"
                  height="16"
                  className="shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
                {athlete.firstname} {athlete.lastname}
              </a>
            )}
          </div>
        </div>
      </div>

      <CyclingStats stats={rideStats} group={group} />
      <FunFacts
        energy={totalEnergyKJ}
        miles={rideStats.totalMiles}
        elevation={rideStats.totalElevation}
      />
      <div className="content-defer">
        <YearInReview ytd={ytdStats} recent={recentStats} group={group} />
      </div>
      <div className="content-defer">
        <WeeklyMileageChart data={weeklyMileage} />
      </div>

      <div className="content-defer grid min-w-0 items-start gap-x-8 pt-2 md:grid-cols-3">
        <Suspense fallback={<RidesSkeleton />}>
          <RecentRides
            rides={recentRides}
            benchmarks={rideBenchmarks}
            history={rideHistory}
            virtualBenchmarks={virtualBenchmarks}
            virtualHistory={virtualHistory}
            group={group}
          />
        </Suspense>
        {/* `pb-8` so the pinned column stops short of its container's bottom
            edge rather than resting flush against it. */}
        <div className="min-w-0 md:sticky md:top-20 md:pb-8">
          <TerrainBreakdown categories={terrainCategories} />
          <RideAverages stats={rideStats} group={group} />
          <PerformanceMetrics power={powerStats} heartRate={heartRateStats} />
        </div>
      </div>
    </div>
  )
}
