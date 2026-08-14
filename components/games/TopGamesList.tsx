import type { GameSummary } from '@/lib/games'

export interface TopGamesListProps {
  games: GameSummary[]
}

/**
 * The long tail below the featured cards — dense enough to scan, with the bar
 * carrying the comparison so the eye does not have to parse the numbers.
 */
export function TopGamesList({ games }: TopGamesListProps) {
  const peak = games[0]?.hours ?? 1

  return (
    <ol className="divide-y divide-gray-100 dark:divide-gray-800">
      {games.map((game, i) => (
        <li key={game.appid}>
          <a
            href={game.storeUrl}
            rel="noreferrer noopener"
            target="_blank"
            className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-4 py-2.5"
          >
            <span className="text-xs text-gray-400 tabular-nums dark:text-gray-500">{i + 1}</span>

            <span className="min-w-0">
              <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 block truncate text-sm font-medium text-gray-900 transition-colors dark:text-gray-100">
                {game.name}
              </span>
              <span className="mt-1 block h-0.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <span
                  className="bg-primary-500/60 dark:bg-primary-400/60 group-hover:bg-primary-500 dark:group-hover:bg-primary-400 block h-full rounded-full transition-colors"
                  style={{ width: `${(game.hours / peak) * 100}%` }}
                />
              </span>
            </span>

            <span className="text-sm text-gray-600 tabular-nums dark:text-gray-400">
              {game.hours.toLocaleString()}h
            </span>
          </a>
        </li>
      ))}
    </ol>
  )
}
