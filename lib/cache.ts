import { readFileSync } from 'fs'
import { join } from 'path'
import type { StravaPageData } from './strava'
import type { GitHubPageData } from './github'

const CACHE_DIR = join(process.cwd(), 'data', 'cache')

export function readStravaCache(): StravaPageData | null {
  try {
    const raw = readFileSync(join(CACHE_DIR, 'strava.json'), 'utf-8')
    return JSON.parse(raw) as StravaPageData
  } catch {
    return null
  }
}

export function readGitHubCache(): GitHubPageData | null {
  try {
    const raw = readFileSync(join(CACHE_DIR, 'github.json'), 'utf-8')
    return JSON.parse(raw) as GitHubPageData
  } catch {
    return null
  }
}
