import { Accent } from '@/components/home/SectionHeading'
import Link from '@/components/Link'
import { FIELD_H as H, FIELD_W as W, nodeRadius } from '@/components/home/constellation-field'
import type { KnowledgeGraph, KnowledgeNote } from '@/lib/knowledge'

interface Props {
  graph: KnowledgeGraph
  hubs: KnowledgeNote[]
  stats: { notes: number; links: number; topics: number }
}

const fmt = new Intl.NumberFormat('en-US')

/** Label metrics for 17px JetBrains Mono (0.6em advance). */
const CHAR_W = 10.3
const LABEL_H = 22

type Hub = KnowledgeGraph['nodes'][number]
interface PlacedLabel {
  node: Hub
  r: number
  x: number
  y: number
  anchor: 'start' | 'end' | 'middle'
}

/**
 * Hubs cluster at the centre of the layout, so naive right-hand labels pile
 * on top of each other. Try four sides per hub, most-linked first, and keep
 * the first box that clears every label already placed; drop the hub's label
 * (not its ring) if none does.
 */
function placeLabels(nodes: Hub[]): PlacedLabel[] {
  const boxes: { x0: number; y0: number; x1: number; y1: number }[] = []
  const placed: PlacedLabel[] = []
  for (const node of [...nodes].sort((a, b) => b.degree - a.degree)) {
    const r = nodeRadius(node.degree)
    const w = node.title.length * CHAR_W
    const gap = r + 14
    const options: PlacedLabel[] = [
      { node, r, x: node.x + gap, y: node.y + 6, anchor: 'start' },
      { node, r, x: node.x - gap, y: node.y + 6, anchor: 'end' },
      { node, r, x: node.x, y: node.y - gap - 4, anchor: 'middle' },
      { node, r, x: node.x, y: node.y + gap + 16, anchor: 'middle' },
    ]
    const fit = options.find((o) => {
      const x0 = o.anchor === 'start' ? o.x : o.anchor === 'end' ? o.x - w : o.x - w / 2
      const box = { x0: x0 - 6, y0: o.y - LABEL_H + 4, x1: x0 + w + 6, y1: o.y + 6 }
      const clear = boxes.every(
        (b) => box.x1 < b.x0 || box.x0 > b.x1 || box.y1 < b.y0 || box.y0 > b.y1
      )
      if (clear) boxes.push(box)
      return clear
    })
    // No room: keep the ring, drop the words.
    placed.push(fit ?? { node: { ...node, title: '' }, r, x: node.x, y: node.y, anchor: 'start' })
  }
  return placed
}

/** Whole units are sub-pixel at this scale and keep the inline SVG small. */
const r1 = Math.round

/**
 * The whole wiki as a constellation. Positions come straight from the
 * deterministic server-side layout in `lib/knowledge.ts`, so there is no client
 * JS. The static field (every edge and node) is a prerendered image per theme
 * from `/constellation/[file]`; only the hubs and their travelling signals are
 * inline, laid over it in the same viewBox so they can use the page's
 * randomized primary color and animate.
 */
export default function Constellation({ graph, hubs, stats }: Props) {
  const byId = new Map(graph.nodes.map((n) => [n.id, n]))

  const hubIds = new Set(hubs.map((h) => h.slug))
  const labels = placeLabels(graph.nodes.filter((n) => hubIds.has(n.id)))
  // Signals: a handful of edges out of each hub carry a travelling pulse.
  const signals = graph.edges
    .filter((e) => hubIds.has(e.source) || hubIds.has(e.target))
    .filter((_, i) => i % 3 === 0)
    .slice(0, 36)
    .map((e) => {
      const hub = hubIds.has(e.source) ? e.source : e.target
      const other = hub === e.source ? e.target : e.source
      return { from: byId.get(hub), to: byId.get(other) }
    })
    .filter((s) => s.from && s.to)

  return (
    <section aria-labelledby="constellation-title" className="relative py-16 sm:py-24">
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div
          className="kc-field relative h-[52vh] min-h-[360px] w-full overflow-hidden sm:h-[78vh] sm:max-h-[820px]"
          aria-hidden="true"
        >
          <div className="kc-drift absolute inset-y-0 left-0 h-full w-full lg:left-[14%]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimize */}
            <img
              src="/constellation/light.svg"
              alt=""
              width={W}
              height={H}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover dark:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/constellation/dark.svg"
              alt=""
              width={W}
              height={H}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            />
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              width={W}
              height={H}
            >
              <g className="kc-signals" fill="none" strokeWidth="2" strokeLinecap="round">
                {signals.map((s, i) => (
                  <path
                    key={i}
                    pathLength={1}
                    d={`M${r1(s.from!.x)} ${r1(s.from!.y)}L${r1(s.to!.x)} ${r1(s.to!.y)}`}
                    style={{ animationDelay: `${(i * 0.37) % 6}s` }}
                  />
                ))}
              </g>
              <g className="kc-hubs">
                {labels.map(({ node: n, r, x, y, anchor }, i) => (
                  <g key={n.id} style={{ animationDelay: `${i * 0.6}s` }}>
                    <circle cx={r1(n.x)} cy={r1(n.y)} r={r1(r + 10)} />
                    <text x={r1(x)} y={r1(y)} textAnchor={anchor}>
                      {n.title}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Copy sits over the field, anchored to the page column. */}
        <div className="relative -mt-20 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="bg-paper/95 max-w-md rounded-2xl border border-gray-200/70 p-6 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] sm:p-7 lg:pointer-events-auto dark:border-gray-800/70 dark:bg-gray-950/92">
              <p className="text-primary-600 dark:text-primary-400 font-mono text-xs tabular-nums">
                02
              </p>
              <h2
                id="constellation-title"
                className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100"
              >
                A wiki that <Accent>grows</Accent> while I work.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                One note per concept, each written to stand on its own. Every dot is a real note;
                every line, a real link.
              </p>
              <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">
                {[
                  ['Notes', stats.notes],
                  ['Links', stats.links],
                  ['Topics', stats.topics],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
                      {label}
                    </dt>
                    <dd className="from-primary-500 to-primary-700 dark:from-primary-300 dark:to-primary-500 bg-gradient-to-br bg-clip-text text-2xl font-semibold text-transparent tabular-nums">
                      {fmt.format(value as number)}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/knowledge"
                className="group/kc bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
              >
                Explore the graph
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover/kc:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
