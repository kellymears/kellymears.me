import { renderConstellationField } from '@/components/home/constellation-field'
import { getGraph } from '@/lib/knowledge'
import { renderRouteFieldSvg } from '@/lib/route-field'

export const dynamic = 'force-static'

/** Prerendered SVG fields: the wiki graph per theme, and every route per activity group. */
const FILES: Record<string, () => string> = {
  'light.svg': () => renderConstellationField(getGraph(), 'light'),
  'dark.svg': () => renderConstellationField(getGraph(), 'dark'),
  'rides-cycling.svg': () => renderRouteFieldSvg('cycling'),
  'rides-foot.svg': () => renderRouteFieldSvg('foot'),
}

export function generateStaticParams() {
  return Object.keys(FILES).map((file) => ({ file }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const render = FILES[(await params).file]
  if (!render) return new Response(null, { status: 404 })

  return new Response(render(), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  })
}
