'use client'

import type { RidesData } from '@/lib/rides'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const RideHeatmap = dynamic(
  () => import('./RideHeatmap').then((m) => ({ default: m.RideHeatmap })),
  { ssr: false }
)

export function LazyRideHeatmap() {
  const [data, setData] = useState<RidesData | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetch('/static/data/activities-routes.json')
      .then((res) => (res.ok ? (res.json() as Promise<RidesData>) : null))
      .then((d) => {
        if (d && d.totalRides > 0) setData(d)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!data) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(id)
  }, [data])

  return (
    <div
      className="relative left-1/2 aspect-[16/10] max-h-[60vh] w-screen -translate-x-1/2 transition-opacity duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      role="region"
      aria-label="Ride route heatmap"
    >
      {data && <RideHeatmap data={data} />}
      {data && (
        <p className="sr-only">
          Interactive heatmap showing {data.totalRides} cycling routes in the Winston-Salem area.
          Routes are rendered as colored lines on a map with geographic labels.
        </p>
      )}
    </div>
  )
}
