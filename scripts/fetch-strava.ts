import { config } from 'dotenv'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { fetchAllStravaData } from '../lib/strava'

config({ path: join(process.cwd(), '.env.local') })

async function main() {
  const outDir = join(process.cwd(), 'data', 'cache')
  const outPath = join(outDir, 'strava.json')
  mkdirSync(outDir, { recursive: true })

  console.log('[fetch-strava] Fetching all Strava data...')
  const data = await fetchAllStravaData()

  writeFileSync(outPath, JSON.stringify(data, null, 2))
  console.log(`[fetch-strava] Wrote ${outPath}`)
}

main().catch((e) => {
  console.error('[fetch-strava] Fatal error:', e)
  process.exit(1)
})
