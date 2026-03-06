import { config } from 'dotenv'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fetchAllGitHubData } from '../lib/github'

config({ path: join(process.cwd(), '.env.local') })

async function main() {
  const outDir = join(process.cwd(), 'public', 'static', 'data')
  const outPath = join(outDir, 'github.json')
  mkdirSync(outDir, { recursive: true })

  console.log('[import:github] Fetching all GitHub data...')
  const data = await fetchAllGitHubData()

  writeFileSync(outPath, JSON.stringify(data))
  console.log(`[import:github] Wrote ${outPath}`)
}

main().catch((e) => {
  console.error('[import:github] Fatal error:', e)
  process.exit(1)
})
