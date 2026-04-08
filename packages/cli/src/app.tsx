import { useState } from 'react'
import { Box, useInput, useApp } from 'ink'
import type { CliData } from './types.js'
import { useTerminalSize } from './hooks/use-terminal-size.js'
import { useNavigation } from './hooks/use-navigation.js'
import { MacWindow } from './components/chrome/MacWindow.js'
import { MobileFrame } from './components/chrome/MobileFrame.js'
import { HelpOverlay } from './components/chrome/HelpOverlay.js'
import { StatusBar } from './components/layout/StatusBar.js'
import { Background } from './components/Background.js'
import { About } from './components/tabs/About.js'
import { Cycling } from './components/tabs/Cycling.js'
import { Writing } from './components/tabs/Writing.js'

/**
 * Find the block dimensions that tile the margins most evenly.
 * Each candidate maintains a roughly square aspect ratio in the terminal
 * (chars are ~2:1, so blockW=2 × blockH=1 is visually square).
 */
function computeGridCell(marginH: number, marginV: number): { blockW: number; blockH: number } {
  const candidates = [
    { blockW: 2, blockH: 1 }, // ██    + gap → 3×2 pattern (compact)
    { blockW: 3, blockH: 1 }, // ███   + gap → 4×2 pattern (medium)
    { blockW: 4, blockH: 2 }, // ████  + gap → 5×3 pattern (large)
  ]

  let best: { blockW: number; blockH: number } = { blockW: 2, blockH: 1 }
  let bestScore = Infinity

  for (const c of candidates) {
    const cellW = c.blockW + 1
    const cellH = c.blockH + 1

    // Need at least 2 cells per margin side for the grid to read as a frame
    if (marginH < cellW * 2 || marginV < cellH * 2) continue

    // Score = total remainder when dividing each margin by cell size
    const score = (marginH % cellW) + (marginV % cellH)
    if (score < bestScore) {
      bestScore = score
      best = c
    }
  }

  return best
}

export function App({ data }: { data: CliData }) {
  const { columns, rows } = useTerminalSize()
  const { exit } = useApp()
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
  let windowHeight = Math.max(16, rows - 4)

  // Compute symmetric margins and adaptive grid cell size
  const marginH = Math.max(0, Math.floor((columns - contentWidth) / 2))
  const marginV = Math.max(0, Math.floor((rows - windowHeight) / 2))
  const { blockW, blockH } = computeGridCell(marginH, marginV)
  const cellH = blockH + 1

  // Snap topPad so grid squares are flush above the window
  let topPad = marginV
  if (topPad > 0 && topPad % cellH === 0) {
    topPad -= 1
  }

  // Snap windowHeight down so grid squares are flush below the window too
  const afterWindow = topPad + windowHeight
  const rem = afterWindow % cellH
  if (rem >= blockH) {
    windowHeight -= rem - blockH + 1
  }
  windowHeight = Math.max(16, windowHeight)

  const contentHeight = windowHeight - 6

  const tabContent = (
    <>
      {activeTab === 0 && (
        <About
          wide={isWide}
          width={contentWidth}
          height={contentHeight}
          profile={data.profile}
          experience={data.experience}
        />
      )}
      {activeTab === 1 && (
        <Cycling wide={isWide} width={contentWidth} height={contentHeight} cycling={data.cycling} />
      )}
      {activeTab === 2 && (
        <Writing wide={isWide} width={contentWidth} height={contentHeight} writing={data.writing} />
      )}
    </>
  )

  return (
    <Box width={columns} height={rows}>
      {/* Background grid layer */}
      <Box position="absolute" width={columns} height={rows}>
        <Background width={columns} height={rows} blockW={blockW} blockH={blockH} />
      </Box>

      {/* Centered content layer — explicit topPad for grid alignment */}
      <Box
        position="absolute"
        width={columns}
        height={rows}
        flexDirection="column"
        alignItems="center"
        paddingTop={topPad}
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
