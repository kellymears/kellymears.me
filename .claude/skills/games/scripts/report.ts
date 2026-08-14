/**
 * What has changed in the Steam library since the last games sync, and what the
 * vault does not yet cover.
 *
 * Reads the cached import rather than the API, so it is fast and offline. Run
 * `npm run import:steam` first if the snapshot is stale — the report says how
 * old it is.
 *
 *   tsx .claude/skills/games/scripts/report.ts
 *   tsx .claude/skills/games/scripts/report.ts --all      ignore the watermark
 *   tsx .claude/skills/games/scripts/report.ts --stamp --added 3 --note "..."
 *
 * `--stamp` is the last step, never the first: it records the current playtimes
 * as read, so stamping before the notes are written means that play is never
 * looked at again.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
// The page's own filter, so the report and the site can never disagree about
// what counts as a game.
import { isCountedGame } from '../../../../lib/games'
import type { SteamLibrary } from '../../../../lib/steam'

// Walk up from this file to the repo root so the script works from any cwd.
function repoRoot(): string {
  let dir = dirname(new URL(import.meta.url).pathname)
  while (dir !== '/' && !existsSync(join(dir, 'package.json'))) dir = dirname(dir)
  return dir
}

const ROOT = repoRoot()
const LIBRARY = join(ROOT, 'public', 'static', 'data', 'steam.json')
const STATE = join(ROOT, '.claude', 'skills', 'games', '.sync-state.json')
const NOTES_DIR = join(ROOT, 'wiki', 'Graphics')

/** Hours a game must gain since the watermark to be worth re-reading. */
const MOVED_THRESHOLD_HOURS = 5
/** Hours a newly played game must reach before it can evidence anything. */
const NEW_THRESHOLD_HOURS = 2

interface StateRun {
  at: string
  added: number
  note: string
}
interface State {
  runs: StateRun[]
  last_run: string | null
  /** appid -> playtime in minutes as of the last stamp. */
  playtime: Record<string, number>
}

const EMPTY_STATE: State = { runs: [], last_run: null, playtime: {} }

function readState(): State {
  if (!existsSync(STATE)) return EMPTY_STATE
  try {
    return { ...EMPTY_STATE, ...(JSON.parse(readFileSync(STATE, 'utf-8')) as Partial<State>) }
  } catch {
    return EMPTY_STATE
  }
}

function flag(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

function option(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}

function main() {
  if (!existsSync(LIBRARY)) {
    console.error('No steam.json. Run `npm run import:steam` first.')
    process.exit(1)
  }

  const library = JSON.parse(readFileSync(LIBRARY, 'utf-8')) as SteamLibrary
  const state = readState()

  if (flag('stamp')) {
    const next: State = {
      runs: [
        ...state.runs,
        {
          at: new Date().toISOString().slice(0, 19),
          added: Number(option('added') ?? 0),
          note: option('note') ?? '',
        },
      ],
      last_run: new Date().toISOString().slice(0, 19),
      playtime: Object.fromEntries(library.games.map((g) => [g.appid, g.playtimeMinutes])),
    }
    writeFileSync(STATE, JSON.stringify(next, null, 2) + '\n')
    console.log(`Stamped ${next.last_run} — ${library.games.length} playtimes recorded.`)
    return
  }

  const ageDays = Math.floor(
    (Date.now() - new Date(library.fetchedAt).getTime()) / (1000 * 60 * 60 * 24)
  )
  console.log(`Library fetched ${library.fetchedAt.slice(0, 10)} (${ageDays}d ago)`)
  console.log(state.last_run ? `Last games sync ${state.last_run}` : 'No previous games sync')

  const baseline: Record<string, number> = flag('all') ? {} : state.playtime

  const moved = library.games
    .filter(isCountedGame)
    .map((g) => {
      const before = baseline[String(g.appid)] ?? 0
      return { ...g, gainedHours: Math.round((g.playtimeMinutes - before) / 60), isNew: before === 0 }
    })
    .filter((g) =>
      g.isNew ? g.gainedHours >= NEW_THRESHOLD_HOURS : g.gainedHours >= MOVED_THRESHOLD_HOURS
    )
    .sort((a, b) => b.gainedHours - a.gainedHours)

  console.log(`\n=== Play since the watermark (${moved.length}) ===`)
  if (moved.length === 0) {
    console.log('Nothing has moved. There is likely nothing to write.')
  }
  for (const g of moved) {
    const total = Math.round(g.playtimeMinutes / 60)
    const tag = g.isNew ? 'NEW' : '   '
    console.log(
      `${String(g.gainedHours).padStart(5)}h ${tag}  ${g.name} (${total}h total) — ${g.details?.genres.join('/') ?? 'delisted'}`
    )
  }

  const covered = existsSync(NOTES_DIR)
    ? readdirSync(NOTES_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''))
        .sort()
    : []

  console.log(`\n=== Already covered in wiki/Graphics (${covered.length}) ===`)
  console.log(covered.join(' · '))
  console.log('\nA concept already on that list is an update candidate, not a new note.')
}

main()
