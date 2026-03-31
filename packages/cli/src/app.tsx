import { useState } from 'react'
import { Box, useStdout, useInput, useApp } from 'ink'
import { useNavigation } from './hooks/use-navigation.js'
import { MacWindow } from './components/chrome/MacWindow.js'
import { MobileFrame } from './components/chrome/MobileFrame.js'
import { HelpOverlay } from './components/chrome/HelpOverlay.js'
import { StatusBar } from './components/layout/StatusBar.js'
import { Background } from './components/Background.js'
import { About } from './components/tabs/About.js'
import { OpenSource } from './components/tabs/OpenSource.js'
import { Cycling } from './components/tabs/Cycling.js'
import { Writing } from './components/tabs/Writing.js'

export function App() {
  const { stdout } = useStdout()
  const { exit } = useApp()
  const columns = stdout?.columns ?? 80
  const rows = stdout?.rows ?? 24
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
  const windowHeight = Math.max(16, rows - 4)
  const contentHeight = windowHeight - 6

  const tabContent = (
    <>
      {activeTab === 0 && <About wide={isWide} width={contentWidth} height={contentHeight} />}
      {activeTab === 1 && <OpenSource wide={isWide} width={contentWidth} height={contentHeight} />}
      {activeTab === 2 && <Cycling wide={isWide} width={contentWidth} height={contentHeight} />}
      {activeTab === 3 && <Writing wide={isWide} width={contentWidth} height={contentHeight} />}
    </>
  )

  return (
    <Box width={columns} height={rows}>
      {/* Background grid layer */}
      <Box position="absolute" width={columns} height={rows}>
        <Background width={columns} height={rows} />
      </Box>

      {/* Centered content layer */}
      <Box
        position="absolute"
        width={columns}
        height={rows}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {isWide ? (
          <MacWindow activeTab={activeTab} width={contentWidth} height={windowHeight}>
            {tabContent}
          </MacWindow>
        ) : (
          <MobileFrame activeTab={activeTab} width={contentWidth} height={windowHeight}>
            {tabContent}
          </MobileFrame>
        )}
      </Box>

      {/* Status bar — pinned to bottom */}
      <Box
        position="absolute"
        width={columns}
        height={rows}
        flexDirection="column"
        justifyContent="flex-end"
      >
        <StatusBar wide={isWide} />
      </Box>

      {/* Help overlay — topmost */}
      {showHelp && (
        <Box
          position="absolute"
          width={columns}
          height={rows}
          alignItems="center"
          justifyContent="center"
        >
          <HelpOverlay width={contentWidth} />
        </Box>
      )}
    </Box>
  )
}
