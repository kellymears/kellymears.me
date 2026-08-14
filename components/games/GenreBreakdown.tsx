import type { GenreSlice } from '@/lib/games'

export interface GenreBreakdownProps {
  genres: GenreSlice[]
  /** How many rows to show; the tail is long and thin. */
  limit?: number
}

/**
 * Share of played hours by genre. Steam tags a game with several genres at once,
 * so these deliberately sum past 100% — each bar answers "how much of my time
 * touched this genre", not "what slice of a pie is it".
 */
export function GenreBreakdown({ genres, limit = 10 }: GenreBreakdownProps) {
  const shown = genres.slice(0, limit)
  const peak = shown[0]?.share ?? 1

  return (
    <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
      {shown.map((slice, i) => (
        <li
          key={slice.genre}
          className="animate-fade-slide-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {slice.genre}
            </span>
            <span className="text-xs text-gray-500 tabular-nums dark:text-gray-400">
              {slice.hours.toLocaleString()}h · {slice.games} games
            </span>
          </div>
          <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <span
              className="animate-grow-width bg-primary-500 dark:bg-primary-400 block h-full rounded-full opacity-70 transition-opacity group-hover:opacity-100"
              style={{ width: `${(slice.share / peak) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
