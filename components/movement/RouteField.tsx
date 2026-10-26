import { FIELD_H as H, FIELD_W as W, type RouteField as Field } from '@/lib/route-field'
import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { RouteFieldCanvas } from './RouteFieldCanvas'

interface Props {
  field: Field
  /** Name and date for the newest route's marker; omitted → no label. */
  latest?: { name: string; date: string }
  /** Where the field's centre sits on wide screens, so copy can own one side. */
  focus?: 'center' | 'right'
  className?: string
}

/**
 * Every route in an activity group as one heat field, with the most recent
 * ones re-run as travelling streaks and the newest drawn in.
 *
 * `RouteFieldCanvas` paints the field and the motion from
 * `/constellation/rides-<group>.txt`, in the page's live primary tokens. The
 * newest route's end marker stays inline so it renders before hydration. With
 * scripting off, the field falls back to `/constellation/rides-<group>.svg`
 * as a CSS *mask* over a primary gradient, and the newest route draws in via
 * CSS. Position it inside a `relative` parent; it fills the viewport width.
 */
export function RouteField({ field, latest, focus = 'center', className }: Props) {
  const maskStyle = { '--rf-src': `url(/constellation/rides-${field.group}.svg)` } as CSSProperties
  const newest = field.recent[0]

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'rf-root pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden',
        focus === 'right' && 'rf-root--right',
        className
      )}
    >
      <div className={clsx('rf-drift absolute inset-0', focus === 'right' && 'lg:left-[22%]')}>
        <div className="rf-fallback absolute inset-0">
          <div className="rf-glow absolute inset-0">
            <div className="rf-heat absolute inset-0" style={maskStyle} />
          </div>
          <div className="rf-heat absolute inset-0" style={maskStyle} />
        </div>
        <RouteFieldCanvas src={`/constellation/rides-${field.group}.txt`} focus={focus} />

        {newest && (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            width={W}
            height={H}
            className="absolute inset-0 h-full w-full"
          >
            <path
              d={newest.d}
              pathLength={1}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rf-fallback rf-latest-path"
            />
            <circle cx={newest.end[0]} cy={newest.end[1]} r="6" className="rf-latest-dot" />
            {latest && (
              <text x={newest.end[0] + 30} y={newest.end[1] - 22} className="rf-latest-label">
                <tspan className="rf-latest-kicker">LATEST · {latest.date}</tspan>
                <tspan x={newest.end[0] + 30} dy="26">
                  {latest.name}
                </tspan>
              </text>
            )}
          </svg>
        )}
      </div>
    </div>
  )
}
