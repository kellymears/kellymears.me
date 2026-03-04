import { CyclingStats } from '@/components/cycling/CyclingStats'
import { LazyRideHeatmap } from '@/components/cycling/LazyRideHeatmap'
import { PerformanceMetrics } from '@/components/cycling/PerformanceMetrics'
import { RecentRides } from '@/components/cycling/RecentRides'
import { RideAverages } from '@/components/cycling/RideAverages'
import { RideTypeBreakdown } from '@/components/cycling/RideTypeBreakdown'
import { WeeklyMileageChart } from '@/components/cycling/WeeklyMileageChart'
import { YearInReview } from '@/components/cycling/YearInReview'
import { getCyclingPageData } from '@/lib/cycling'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Cycling',
  description: 'Live cycling stats, weekly mileage, recent rides, and performance metrics.',
})

export default function CyclingPage() {
  const {
    athlete,
    rideStats,
    ytdStats,
    recentStats,
    weeklyMileage,
    recentRides,
    rideCategories,
    powerStats,
    heartRateStats,
  } = getCyclingPageData()

  const profileUrl = `https://www.strava.com/athletes/${athlete.username}`

  return (
    <div className="space-y-0">
      <div className="relative pt-12 pb-8">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
          Cycling
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Rides &amp; Stats
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Road, gravel, mountain, and virtual rides.{' '}
          {rideStats.totalMiles > 0 && (
            <>
              {rideStats.totalMiles.toLocaleString()} lifetime miles across{' '}
              {rideStats.totalRides.toLocaleString()} rides.
            </>
          )}
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 dark:hover:text-primary-400 mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          <svg width="16" height="16" className="shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
          </svg>
          {athlete.firstname} {athlete.lastname}
        </a>
      </div>

      <CyclingStats stats={rideStats} />
      <LazyRideHeatmap />
      <YearInReview ytd={ytdStats} recent={recentStats} />
      <WeeklyMileageChart data={weeklyMileage} />

      <div className="grid min-w-0 items-start gap-x-8 pt-2 md:grid-cols-3">
        <RecentRides rides={recentRides} />
        <div className="min-w-0">
          <RideTypeBreakdown categories={rideCategories} />
          <RideAverages stats={rideStats} weeklyMileage={weeklyMileage} />
          <PerformanceMetrics power={powerStats} heartRate={heartRateStats} />
        </div>
      </div>
    </div>
  )
}
