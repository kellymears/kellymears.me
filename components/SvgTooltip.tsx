import type { TooltipState } from '@/lib/use-svg-tooltip'

interface SvgTooltipProps {
  state: TooltipState | null
}

export function SvgTooltip({ state }: SvgTooltipProps) {
  if (!state) return null

  return (
    <div
      className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
      style={{ left: state.x, top: state.y }}
      role="tooltip"
    >
      {state.text}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"
        aria-hidden="true"
      />
    </div>
  )
}
