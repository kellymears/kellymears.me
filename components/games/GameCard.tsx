import { Card } from '@/components/Card'
import type { GameSummary } from '@/lib/games'

/**
 * Steam header art is a fixed 460×215. The explicit attributes reserve the box
 * before the CDN answers, so a grid of these does not reflow as it fills in.
 */
const HEADER_WIDTH = 460
const HEADER_HEIGHT = 215

export interface GameCardProps {
  game: GameSummary
  /** Rank badge, when the card sits in an ordered list. */
  rank?: number
}

export function GameCard({ game, rank }: GameCardProps) {
  return (
    <Card as="article" className="overflow-hidden">
      <a href={game.storeUrl} className="block" rel="noreferrer noopener" target="_blank">
        {game.headerUrl ? (
          <img
            src={game.headerUrl}
            alt=""
            width={HEADER_WIDTH}
            height={HEADER_HEIGHT}
            loading="lazy"
            decoding="async"
            className="aspect-[460/215] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-[460/215] w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="px-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {game.name}
            </span>
          </div>
        )}

        <div className="p-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 font-semibold text-gray-900 transition-colors dark:text-gray-100">
              {rank !== undefined && (
                <span className="mr-2 text-sm font-normal text-gray-400 tabular-nums dark:text-gray-500">
                  {rank}
                </span>
              )}
              {game.name}
            </h3>
            <span className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 shrink-0 bg-gradient-to-br bg-clip-text text-sm font-bold text-transparent tabular-nums">
              {game.hours.toLocaleString()}h
            </span>
          </div>

          {game.note ? (
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {game.note}
            </p>
          ) : (
            game.shortDescription && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {game.shortDescription}
              </p>
            )
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {game.releaseYear !== null && (
              <span className="text-xs text-gray-500 tabular-nums dark:text-gray-400">
                {game.releaseYear}
              </span>
            )}
            {game.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Card>
  )
}
