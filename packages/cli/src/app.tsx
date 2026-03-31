import { useState } from 'react'
import { Box, useStdout, useInput, useApp } from 'ink'
import { useNavigation } from './hooks/use-navigation.js'
import { MacWindow } from './components/chrome/MacWindow.js'
import { MobileFrame } from './components/chrome/MobileFrame.js'
import { HelpOverlay } from './components/chrome/HelpOverlay.js'
import { StatusBar } from './components/layout/StatusBar.js'
import { About } from './components/tabs/About.js'
import { OpenSource } from './components/tabs/OpenSource.js'
import { Cycling } from './components/tabs/Cycling.js'
import { Writing } from './components/tabs/Writing.js'

export function App() {
  const { stdout } = useStdout()
  const { exit } = useApp()
  const columns = stdout?.columns ?? 80
  const isWide = columns >= 80

  const [showHelp, setShowHelp] = useState(false)
  const { activeTab } = useNavigation({ isActive: !showHelp })

  useInput(
    (input) => {
      if (input === '?') setShowHelp((s) => !s)
      if (input === 'q') exit()
    },
    { isActive: true }
  )

  const contentWidth = isWide ? Math.min(columns, 100) : columns

  const tabContent = (
    <>
      {activeTab === 0 && <About wide={isWide} width={contentWidth} />}
      {activeTab === 1 && <OpenSource wide={isWide} width={contentWidth} />}
      {activeTab === 2 && <Cycling wide={isWide} width={contentWidth} />}
      {activeTab === 3 && <Writing wide={isWide} width={contentWidth} />}
    </>
  )

  return (
    <Box flexDirection="column" width={contentWidth}>
      {isWide ? (
        <MacWindow activeTab={activeTab} width={contentWidth}>
          {tabContent}
        </MacWindow>
      ) : (
        <MobileFrame activeTab={activeTab} width={contentWidth}>
          {tabContent}
        </MobileFrame>
      )}
      <StatusBar wide={isWide} />
      {showHelp && <HelpOverlay width={contentWidth} />}
    </Box>
  )
}
