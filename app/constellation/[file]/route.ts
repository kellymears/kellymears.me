import { renderConstellationField } from '@/components/home/constellation-field'
import { getGraph } from '@/lib/knowledge'
import { renderRouteFieldSvg, renderRouteFieldText } from '@/lib/route-field'

export const dynamic = 'force-static'

/**
 * Prerendered fields: the wiki graph per theme, and every route per activity
 * group (path text for the canvas, an SVG mask for the no-JS fallback).
 */
const FILES: Record<string, () => string> = {
  'light.svg': () => renderConstellationField(getGraph(), 'light'),
  'dark.svg': () => renderConstellationField(getGraph(), 'dark'),
  'rides-cycling.svg': () => renderRouteFieldSvg('cycling'),
  'rides-foot.svg': () => renderRouteFieldSvg('foot'),
  'rides-cycling.txt': () => renderRouteFieldText('cycling'),
  'rides-foot.txt': () => renderRouteFieldText('foot'),
}

export function generateStaticParams() {
  return Object.keys(FILES).map((file) => ({ file }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const file = (await params).file
  const render = FILES[file]
  if (!render) return new Response(null, { status: 404 })

  const type = file.endsWith('.txt') ? 'text/plain' : 'image/svg+xml'
  return new Response(render(), {
    headers: { 'Content-Type': `${type}; charset=utf-8` },
  })
}
