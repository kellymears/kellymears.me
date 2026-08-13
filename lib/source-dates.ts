import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

/**
 * Last-modified dates for source files, as `YYYY-MM-DD`.
 *
 * Prefers the last commit date, read in a single batched `git log` pass, because
 * a file's mtime on a CI checkout is the checkout time — which would stamp every
 * page with the build date and tell crawlers the whole site changed on every
 * deploy. Falls back to mtime whenever git cannot give a better answer.
 */

let commitDates: Map<string, string> | null = null

const git = (args: string[]): string =>
  execFileSync('git', ['-c', 'core.quotepath=false', ...args], {
    cwd: root,
    encoding: 'utf-8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  })

const ISO_DATE_LINE = /^\d{4}-\d{2}-\d{2}T/

/**
 * One `git log` over the given pathspec, newest first. The first date seen for a
 * path is its most recent commit, so later (older) mentions are ignored.
 */
const buildCommitDates = (pathspec: string): Map<string, string> => {
  const dates = new Map<string, string>()

  try {
    if (git(['rev-parse', '--is-shallow-repository']).trim() === 'true') {
      // Every file would collapse to the tip commit's date, which is no better
      // than mtime and costs a subprocess.
      console.log(`[source-dates] shallow repository — using file mtimes for ${pathspec}`)
      return dates
    }

    const log = git(['log', '--pretty=format:%cI', '--name-only', '--', pathspec])
    let currentDate = ''

    for (const line of log.split('\n')) {
      const entry = line.trim()
      if (!entry) continue
      if (ISO_DATE_LINE.test(entry)) {
        currentDate = entry.slice(0, 10)
        continue
      }
      if (currentDate && !dates.has(entry)) dates.set(entry, currentDate)
    }

    console.log(`[source-dates] commit dates for ${dates.size} files under ${pathspec}`)
  } catch {
    console.log(`[source-dates] git unavailable — using file mtimes for ${pathspec}`)
    return new Map()
  }

  return dates
}

const today = (): string => new Date().toISOString().slice(0, 10)

/** File mtime as `YYYY-MM-DD`, or today if the file cannot be read. */
const modifiedTime = (relativePath: string): string => {
  try {
    return fs.statSync(path.join(root, relativePath)).mtime.toISOString().slice(0, 10)
  } catch {
    return today()
  }
}

/**
 * Last-modified date for a repo-relative path. Uses the last commit that touched
 * it, falling back to mtime for files git does not know about — a note that is
 * new or uncommitted, or any case where git is unavailable.
 */
const getSourceDate = (relativePath: string, pathspec = 'wiki/'): string => {
  if (!commitDates) commitDates = buildCommitDates(pathspec)
  return commitDates.get(relativePath) ?? modifiedTime(relativePath)
}

/** Newest of a set of dates, or today when the set is empty. */
const newestDate = (dates: string[]): string =>
  dates.length === 0 ? today() : [...dates].sort().slice(-1)[0]!

export { getSourceDate, newestDate, today }
