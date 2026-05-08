'use client'

import type { TooltipState } from '@/lib/use-svg-tooltip'
import { useLayoutEffect, useRef, useState } from 'react'

interface SvgTooltipProps {
  state: TooltipState | null
}

const EDGE_MARGIN = 8

export function SvgTooltip({ state }: SvgTooltipProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lastShiftRef = useRef(0)
  const [shiftX, setShiftX] = useState(0)

  useLayoutEffect(() => {
    if (!state) {
      lastShiftRef.current = 0
      setShiftX(0)
      return
    }
    const node = ref.current
    const container = node?.parentElement?.getBoundingClientRect()
    if (!node || !container) return

    const tooltip = node.getBoundingClientRect()
    const oldShift = lastShiftRef.current
    const naturalLeft = tooltip.left - oldShift
    const naturalRight = tooltip.right - oldShift

    let next = 0
    if (naturalRight > container.right - EDGE_MARGIN) {
      next = container.right - EDGE_MARGIN - naturalRight
    } else if (naturalLeft < container.left + EDGE_MARGIN) {
      next = container.left + EDGE_MARGIN - naturalLeft
    }

    lastShiftRef.current = next
    setShiftX(next)
  }, [state])

  if (!state) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute z-50 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
      style={{
        left: state.x,
        top: state.y,
        transform: `translate(calc(-50% + ${shiftX}px), -100%)`,
      }}
      role="tooltip"
    >
      {state.text}
      <div
        className="absolute top-full left-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"
        style={{ transform: `translateX(calc(-50% - ${shiftX}px))` }}
        aria-hidden="true"
      />
    </div>
  )
}
