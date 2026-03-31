import { render } from 'ink'
import { App } from './app.js'
import { plainTextCard } from './plain.js'

if (!process.stdout.isTTY) {
  process.stdout.write(plainTextCard())
  process.exit(0)
}

const instance = render(<App />, {
  exitOnCtrlC: true,
  patchConsole: true,
})

await instance.waitUntilExit()
