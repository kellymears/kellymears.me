import type { CliData } from './types.js'

const CLI_API_URL = process.env.CLI_API_URL || 'https://kellymears.me/api/cli'
const TIMEOUT_MS = 5000
const MAX_ATTEMPTS = 3
const RETRY_DELAY_MS = 1000

export interface FetchOptions {
  onRetry?: (attempt: number) => void
}

async function attempt(): Promise<CliData | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
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
    clearTimeout(timer)
    return null
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchCliData(options?: FetchOptions): Promise<CliData | null> {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const result = await attempt()
    if (result) return result

    if (i < MAX_ATTEMPTS - 1) {
      options?.onRetry?.(i + 1)
      await delay(RETRY_DELAY_MS)
    }
  }

  return null
}
