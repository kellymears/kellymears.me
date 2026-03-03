import { config } from 'dotenv'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { fetchAllGitHubData } from '../lib/github'

config({ path: join(process.cwd(), '.env.local') })

async function main() {
  const outDir = join(process.cwd(), 'data', 'cache')
  const outPath = join(outDir, 'github.json')
  mkdirSync(outDir, { recursive: true })

  console.log('[fetch-github] Fetching all GitHub data...')
  const data = await fetchAllGitHubData()

  writeFileSync(outPath, JSON.stringify(data, null, 2))
  console.log(`[fetch-github] Wrote ${outPath}`)
}

main().catch((e) => {
  console.error('[fetch-github] Fatal error:', e)
  process.exit(1)
})
