import type { CliData } from './types.js'

const CLI_API_URL = process.env.CLI_API_URL || 'https://kellymears.me/api/cli'
const TIMEOUT_MS = 3000

export async function fetchCliData(): Promise<CliData | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const response = await fetch(CLI_API_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timer)

    if (!response.ok) return null

    const data = await response.json()

    if (
      data &&
      typeof data === 'object' &&
      'profile' in data &&
      'github' in data &&
      'cycling' in data &&
      'writing' in data &&
      'experience' in data &&
      'stats' in data
    ) {
      return data as CliData
    }

    return null
  } catch {
    return null
  }
}
