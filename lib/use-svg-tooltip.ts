import { useCallback, useState } from 'react'

export interface TooltipState {
  x: number
  y: number
  text: string
}

/**
 * Shared tooltip positioning for SVG chart elements.
 * Computes position relative to the nearest `.relative` ancestor.
 */
export function useSvgTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const show = useCallback((target: SVGElement, text: string) => {
    const rect = target.getBoundingClientRect()
    const container = target.closest('.relative')?.getBoundingClientRect()
    if (!container) return

    setTooltip({
      x: rect.left - container.left + rect.width / 2,
      y: rect.top - container.top - 8,
      text,
    })
  }, [])

  const hide = useCallback(() => setTooltip(null), [])

  return { tooltip, show, hide } as const
}
