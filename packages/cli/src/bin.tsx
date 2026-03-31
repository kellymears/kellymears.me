import { render } from 'ink'
import { App } from './app.js'
import { plainTextCard } from './plain.js'

if (!process.stdout.isTTY) {
  process.stdout.write(plainTextCard())
  process.exit(0)
}

// Enter fullscreen (alternate screen buffer + hide cursor)
process.stdout.write('\x1b[?1049h\x1b[?25l')
process.on('exit', () => {
  process.stdout.write('\x1b[?25h\x1b[?1049l')
})

const instance = render(<App />, {
  exitOnCtrlC: true,
  patchConsole: true,
  incrementalRendering: true,
})

await instance.waitUntilExit()
