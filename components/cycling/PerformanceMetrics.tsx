import { HeartIcon, PowerIcon } from '@/components/icons'
import type { HeartRateStats, PowerStats } from '@/lib/cycling'

interface PerformanceMetricsProps {
  power: PowerStats | null
  heartRate: HeartRateStats | null
}

export function PerformanceMetrics({ power, heartRate }: PerformanceMetricsProps) {
  if (!power && !heartRate) return null

  return (
    <section className="animate-on-scroll py-8" aria-label="Performance metrics">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Performance
      </h2>

      <div className="space-y-4">
        {power && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <PowerIcon className="text-blue-500" />
              <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Power
              </span>
            </div>
            <dl className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Avg</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {power.avgWatts}
                  <span className="font-normal text-gray-500 dark:text-gray-400"> W</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Max</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {power.maxWatts}
                  <span className="font-normal text-gray-500 dark:text-gray-400"> W</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Total Energy</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {power.totalKJ.toLocaleString()}
                  <span className="font-normal text-gray-500 dark:text-gray-400"> kJ</span>
                </dd>
              </div>
            </dl>
            <p className="sr-only">Based on {power.ridesWithPower} rides with power data</p>
          </div>
        )}

        {heartRate && (
          <div className={power ? 'border-t border-gray-100 pt-4 dark:border-gray-800' : ''}>
            <div className="mb-3 flex items-center gap-2">
              <HeartIcon className="text-rose-500" />
              <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Heart Rate
              </span>
            </div>
            <dl className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Avg</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {heartRate.avgHR}
                  <span className="font-normal text-gray-500 dark:text-gray-400"> bpm</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Max</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {heartRate.maxHR}
                  <span className="font-normal text-gray-500 dark:text-gray-400"> bpm</span>
                </dd>
              </div>
            </dl>
            <p className="sr-only">Based on {heartRate.ridesWithHR} rides with heart rate data</p>
          </div>
        )}
      </div>
    </section>
  )
}
