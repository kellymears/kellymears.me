import { readFileSync } from 'fs'
import { join } from 'path'
import type { GitHubPageData } from './github'

const DATA_DIR = join(process.cwd(), 'public', 'static', 'data')

export function readGitHubCache(): GitHubPageData | null {
  try {
    const raw = readFileSync(join(DATA_DIR, 'github.json'), 'utf-8')
    return JSON.parse(raw) as GitHubPageData
  } catch {
    return null
  }
}
