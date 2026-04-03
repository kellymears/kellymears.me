import { render } from 'ink'
import { App } from './app.js'
import { plainTextCard, offlineCard } from './plain.js'
import { fetchCliData } from './fetch-data.js'

const data = await fetchCliData({
  onRetry: (attempt) => {
    if (attempt === 1) process.stderr.write('  Connecting...\n')
  },
})

if (!data) {
  process.stderr.write(offlineCard())
  process.exit(1)
}

if (!process.stdout.isTTY) {
  process.stdout.write(plainTextCard(data.profile))
  process.exit(0)
}

// Enter fullscreen (alternate screen buffer + hide cursor)
process.stdout.write('\x1b[?1049h\x1b[?25l')
process.on('exit', () => {
  process.stdout.write('\x1b[?25h\x1b[?1049l')
})

const instance = render(<App data={data} />, {
  exitOnCtrlC: true,
  patchConsole: true,
  incrementalRendering: true,
})

await instance.waitUntilExit()
