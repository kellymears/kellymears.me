import { CyclingStats } from '@/components/cycling/CyclingStats'
import { FunFacts } from '@/components/cycling/FunFacts'
import { PerformanceMetrics } from '@/components/cycling/PerformanceMetrics'
import { RecentRides, RidesSkeleton } from '@/components/cycling/RecentRides'
import { RideAverages } from '@/components/cycling/RideAverages'
import { TerrainBreakdown } from '@/components/cycling/TerrainBreakdown'
import { WeeklyMileageChart } from '@/components/cycling/WeeklyMileageChart'
import { YearInReview } from '@/components/cycling/YearInReview'
import { MovementToggle } from '@/components/movement/MovementToggle'
import { getActivityPageData, GROUP_COPY, type ActivityGroup } from '@/lib/cycling'
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

  return (
    <div className="space-y-0">
      <div className="relative pt-12 pb-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-widest uppercase">
            {copy.eyebrow}
          </p>
          <MovementToggle active={group} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {copy.lead}{' '}
          {rideStats.totalMiles > 0 && (
            <>
              {rideStats.totalMiles.toLocaleString()} lifetime miles across{' '}
              {rideStats.totalRides.toLocaleString()} {copy.nounPlural.toLowerCase()}.
            </>
          )}
        </p>
        {group === 'cycling' && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400 mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
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
        <div className="min-w-0 md:sticky md:top-20">
          <TerrainBreakdown categories={terrainCategories} />
          <RideAverages stats={rideStats} group={group} />
          <PerformanceMetrics power={powerStats} heartRate={heartRateStats} />
        </div>
      </div>
    </div>
  )
}
