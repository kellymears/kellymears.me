import { GameCard } from '@/components/games/GameCard'
import { GenreBreakdown } from '@/components/games/GenreBreakdown'
import { TopGamesList } from '@/components/games/TopGamesList'
import { StatLine } from '@/components/knowledge/StatLine'
import { getGamesPageData } from '@/lib/games'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'

const DESCRIPTION =
  'A record of what I have played, drawn from Steam — hours, genres, and the games that stuck.'

export const metadata = genPageMetadata({ title: 'Games', description: DESCRIPTION })

export default function GamesPage() {
  const data = getGamesPageData()
  if (!data) notFound()

  const { stats, featured, featuredIsCurated, topByHours, recent, genres, byYear } = data

  const firstYear = byYear[0]?.year
  const lastYear = byYear[byYear.length - 1]?.year

  return (
    <div className="space-y-0">
      <header className="pt-12 pb-8">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
          Games
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Time Well Spent
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Every game I have played on Steam.
        </p>

        <StatLine
          className="mt-8"
          items={[
            { value: stats.played, label: 'Played' },
            { value: stats.hours, label: 'Hours' },
            { value: stats.days, label: 'Days' },
            { value: stats.centurions, label: 'Past 100h' },
          ]}
        />
      </header>

      <section className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {featuredIsCurated ? 'The ones that stuck' : 'Deepest wells'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {featuredIsCurated ? 'Chosen, not counted' : 'Ranked by hours'}
          </p>
        </div>

        {!featuredIsCurated && (
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Hours measure something, but not the same thing as having loved a game. Until this list
            is chosen by hand it is only a leaderboard of time.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((game, i) => (
            <GameCard key={game.appid} game={game} rank={featuredIsCurated ? undefined : i + 1} />
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Lately
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Past two weeks</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {recent.map((game) => (
              <li key={game.appid} className="text-sm text-gray-600 dark:text-gray-400">
                <a
                  href={game.storeUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="hover:text-primary-600 dark:hover:text-primary-400 font-medium text-gray-900 transition-colors dark:text-gray-100"
                >
                  {game.name}
                </a>{' '}
                <span className="tabular-nums">{game.recentHours}h</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Where the hours went
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">By genre</p>
        </div>
        <GenreBreakdown genres={genres} />
      </section>

      <section className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            The long list
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Top {topByHours.length} of {stats.played.toLocaleString()}
          </p>
        </div>
        <TopGamesList games={topByHours} />
      </section>

      <section className="border-t border-gray-200 py-10 dark:border-gray-800">
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {stats.owned.toLocaleString()} games owned, {stats.unplayed.toLocaleString()} never
          launched, spanning releases from {firstYear} to {lastYear}. The median played game got{' '}
          {stats.medianHours} hours — the deepest got {stats.deepestHours.toLocaleString()}.
          Engines, tools, demos, and soundtracks are excluded, as is anything under thirty minutes.
        </p>
      </section>
    </div>
  )
}
