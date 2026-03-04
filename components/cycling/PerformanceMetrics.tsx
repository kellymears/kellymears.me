import type { PowerStats, HeartRateStats } from '@/lib/cycling'

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
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-blue-500"
                aria-hidden="true"
              >
                <path d="M9.504.43a1.516 1.516 0 0 1 2.437 1.713L10.415 5.5h2.123c1.57 0 2.346 1.909 1.22 3.004l-7.34 7.142a1.249 1.249 0 0 1-1.81-.17 1.25 1.25 0 0 1-.096-1.460l1.667-2.452-.004-.007L5.847 10.5H3.462c-1.57 0-2.346-1.909-1.22-3.004L9.504.43Z" />
              </svg>
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-rose-500"
                aria-hidden="true"
              >
                <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 0 0 8 13.393a20.561 20.561 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5ZM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 0 1-.31-.17 22.075 22.075 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 0 1-3.744 2.584l-.018.01-.006.003h-.002L8 14.25Zm0 0 .345.666a.752.752 0 0 1-.69 0L8 14.25Z" />
              </svg>
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
