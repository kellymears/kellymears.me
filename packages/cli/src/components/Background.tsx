import { useState, useEffect, useRef } from 'react'
import { Box, Text } from 'ink'
import type { ReactNode } from 'react'

// Detect terminal color scheme from COLORFGBG (fg;bg) env var
function prefersDark(): boolean {
  const cfg = process.env.COLORFGBG
  if (cfg) {
    const bg = parseInt(cfg.split(';').pop() ?? '', 10)
    if (!isNaN(bg)) return bg < 8
  }
  return true
}

const DARK_COLORS = [
  '#060606',
  '#0a0a0a',
  '#0e0e0e',
  '#121212',
  '#161616',
  '#1a1a1a',
  '#1e1e1e',
  '#222222',
  '#262626',
  '#2a2a2a',
]

const LIGHT_COLORS = [
  '#d6d6d6',
  '#dadada',
  '#dedede',
  '#e2e2e2',
  '#e6e6e6',
  '#eaeaea',
  '#eeeeee',
  '#f2f2f2',
  '#f6f6f6',
  '#fafafa',
]

const COLORS = prefersDark() ? DARK_COLORS : LIGHT_COLORS

function colorOf(v: number): string {
  const i = Math.max(0, Math.min(COLORS.length - 1, Math.floor(v * COLORS.length)))
  return COLORS[i]
}

interface Props {
  width: number
  height: number
  blockW: number
  blockH: number
}

export function Background({ width, height, blockW, blockH }: Props) {
  const cellW = blockW + 1 // block + 1 space gap
  const cellH = blockH + 1 // block rows + 1 gap row

  const cols = Math.ceil(width / cellW)
  const gridRows = Math.ceil(height / cellH)
  const count = cols * gridRows

  const block = '█'.repeat(blockW)

  const targets = useRef<number[]>([])
  const tick = useRef(0)

  const [cells, setCells] = useState<number[]>(() => {
    targets.current = Array.from({ length: count }, () => Math.random())
    return Array.from({ length: count }, () => Math.random())
  })

  useEffect(() => {
    if (count !== cells.length) {
      targets.current = Array.from({ length: count }, () => Math.random())
      setCells(Array.from({ length: count }, () => Math.random()))
    }
  }, [count])

  useEffect(() => {
    const id = setInterval(() => {
      const t = tick.current++
      const tgt = targets.current

      const n = Math.max(1, Math.floor(count * 0.03))
      for (let i = 0; i < n; i++) {
        tgt[Math.floor(Math.random() * count)] = Math.random()
      }

      setCells((prev) =>
        prev.map((v, i) => {
          const x = i % cols
          const y = Math.floor(i / cols)

          const wave =
            (Math.sin(x * 0.2 + t * 0.03) * Math.sin(y * 0.3 + t * 0.045) +
              Math.cos((x + y) * 0.12 + t * 0.02) +
              2) /
            4

          const target = wave * 0.6 + (tgt[i] ?? 0.5) * 0.4
          return v + (target - v) * 0.05
        })
      )
    }, 80)

    return () => clearInterval(id)
  }, [cols, gridRows, count])

  // Render grid — row-by-row to fill exactly width × height
  const output: ReactNode[] = []
  let rowIdx = 0

  for (let y = 0; y < gridRows && rowIdx < height; y++) {
    // Render blockH content rows for this grid row
    for (let bh = 0; bh < blockH && rowIdx < height; bh++) {
      const spans: ReactNode[] = []
      let charIdx = 0

      for (let x = 0; x < cols && charIdx < width; x++) {
        const idx = y * cols + x
        const color = colorOf(idx < cells.length ? cells[idx] : 0.5)

        // Block chars — clamp to remaining width
        const bw = Math.min(blockW, width - charIdx)
        spans.push(
          <Text key={x} color={color}>
            {bw === blockW ? block : '█'.repeat(bw)}
          </Text>
        )
        charIdx += bw

        // Gap space — only if there's room
        if (charIdx < width) {
          spans.push(' ')
          charIdx += 1
        }
      }

      output.push(
        <Box key={`r${rowIdx}`}>
          <Text>{spans}</Text>
        </Box>
      )
      rowIdx++
    }

    // Gap row — only if there's room
    if (rowIdx < height) {
      output.push(<Box key={`g${rowIdx}`} height={1} />)
      rowIdx++
    }
  }

  return (
    <Box flexDirection="column" width={width} height={height}>
      {output}
    </Box>
  )
}
