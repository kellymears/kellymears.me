import { config } from 'dotenv'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fetchSteamLibrary } from '../lib/steam'

config({ path: join(process.cwd(), '.env.local') })

async function main() {
  const outDir = join(process.cwd(), 'public', 'static', 'data')
  const outPath = join(outDir, 'steam.json')
  mkdirSync(outDir, { recursive: true })

  console.log('[import:steam] Fetching Steam library...')
  const library = await fetchSteamLibrary()

  writeFileSync(outPath, JSON.stringify(library))
  console.log(`[import:steam] Wrote ${outPath} (${library.games.length} games)`)
  if (library.unresolved.length > 0) {
    console.log(`[import:steam] ${library.unresolved.length} delisted from the store`)
  }
}

main().catch((e) => {
  console.error('[import:steam] Fatal error:', e)
  process.exit(1)
})
