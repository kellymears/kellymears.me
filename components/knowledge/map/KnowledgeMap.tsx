'use client'

import Link from '@/components/Link'
import { topicLabel, TOPIC_ORDER } from '@/components/knowledge/graph-colors'
import { topicVars } from '@/components/knowledge/NoteCard'
import type { PackedGraph } from '@/components/knowledge/packed-graph'
import { searchNotes, type SearchEntry } from '@/components/knowledge/search'
import clsx from 'clsx'
import {
  ArrowLeft,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { buildAdjacency, KnowledgeMapEngine } from './map-engine'

interface Props {
  graph: PackedGraph
  topics: { slug: string; name: string }[]
}

const PANEL =
  'bg-paper/90 rounded-xl shadow-lg ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-800'
const PILL =
  'bg-paper/90 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 backdrop-blur transition-colors hover:text-gray-900 dark:bg-gray-900/90 dark:text-gray-300 dark:ring-gray-800 dark:hover:text-gray-100'
const MAX_MIN_LINKS = 20
const HOPS = [
  [0, 'Off'],
  [1, '1 hop'],
  [2, '2 hops'],
] as const

/** Notes within `hops` links of `origin`, as a mask. */
function withinHops(origin: number, hops: number, n: number, start: Uint32Array, adj: Uint32Array) {
  const seen = new Uint8Array(n)
  seen[origin] = 1
  let frontier = [origin]
  for (let h = 0; h < hops; h++) {
    const next: number[] = []
    for (const i of frontier) {
      for (let j = start[i]!; j < start[i + 1]!; j++) {
        const k = adj[j]!
        if (!seen[k]) {
          seen[k] = 1
          next.push(k)
        }
      }
    }
    frontier = next
  }
  return seen
}

const notePath = (graph: PackedGraph, i: number) =>
  `/knowledge/${graph.nodes[i]![2]}/${graph.nodes[i]![0]}`

/**
 * The whole vault as one full-screen, live field. The canvas and its physics
 * live in `KnowledgeMapEngine`; this component owns the filters, search,
 * selection and the URL (`?focus=<slug>&topic=a,b`), and hands the engine a
 * visibility mask whenever they change.
 */
export function KnowledgeMap({ graph, topics }: Props) {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<KnowledgeMapEngine | null>(null)

  const [selected, setSelected] = useState(-1)
  const [topicFilter, setTopicFilter] = useState<ReadonlySet<string>>(new Set())
  const [minLinks, setMinLinks] = useState(0)
  const [hops, setHops] = useState(0)
  const [deformed, setDeformed] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [origin, setOrigin] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  const n = graph.nodes.length
  const { start, adj } = useMemo(() => buildAdjacency(n, graph.edges), [n, graph.edges])
  const bySlug = useMemo(() => new Map(graph.nodes.map((node, i) => [node[0], i])), [graph.nodes])
  const topicNames = useMemo(() => new Map(topics.map((t) => [t.slug, t.name])), [topics])
  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const node of graph.nodes) counts.set(node[2], (counts.get(node[2]) ?? 0) + 1)
    return TOPIC_ORDER.filter((t) => counts.has(t)).map((t) => [t, counts.get(t)!] as const)
  }, [graph.nodes])

  const neighborhood = useMemo(
    () => (selected >= 0 && hops > 0 ? withinHops(selected, hops, n, start, adj) : null),
    [selected, hops, n, start, adj]
  )

  const visible = useMemo(() => {
    const mask = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      const node = graph.nodes[i]!
      // Isolating a note shows its whole neighborhood, whatever the filters.
      mask[i] = neighborhood
        ? neighborhood[i]!
        : (topicFilter.size === 0 || topicFilter.has(node[2])) && node[5] >= minLinks
          ? 1
          : 0
    }
    if (selected >= 0) mask[selected] = 1
    return mask
  }, [n, graph.nodes, topicFilter, minLinks, neighborhood, selected])
  const shown = useMemo(() => visible.reduce((sum, v) => sum + v, 0), [visible])

  const neighbors = useMemo(() => {
    if (selected < 0) return []
    const list: number[] = []
    for (let j = start[selected]!; j < start[selected + 1]!; j++) list.push(adj[j]!)
    return list.sort((a, b) => graph.nodes[b]![5] - graph.nodes[a]![5])
  }, [selected, start, adj, graph.nodes])

  // The engine is imperative and lives for the page; React only feeds it.
  useEffect(() => {
    const engine = new KnowledgeMapEngine(canvasRef.current!, rootRef.current!, graph, {
      onSelect: setSelected,
      onOpen: (i) => router.push(notePath(graph, i)),
      onDeformed: setDeformed,
    })
    engineRef.current = engine

    // Deep links: read once, client side, so the page itself stays static.
    const params = new URLSearchParams(location.search)
    const focus = bySlug.get(params.get('focus') ?? '') ?? -1
    const wanted = new Set(
      (params.get('topic') ?? '').split(',').filter((t) => TOPIC_ORDER.includes(t))
    )
    if (wanted.size) setTopicFilter(wanted)
    if (focus >= 0) {
      setSelected(focus)
      setOrigin(notePath(graph, focus))
      engine.setSelected(focus)
      engine.flyTo(focus, false)
    } else if (wanted.size) {
      const indices = graph.nodes.flatMap((node, i) => (wanted.has(node[2]) ? [i] : []))
      engine.fit(indices, false)
    }
    setReady(true)
    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [graph, bySlug, router])

  useEffect(() => engineRef.current?.setVisible(visible), [visible])
  useEffect(() => engineRef.current?.setSelected(selected), [selected])

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    if (!ready) return
    const params = new URLSearchParams()
    if (selected >= 0) params.set('focus', graph.nodes[selected]![0])
    if (topicFilter.size) params.set('topic', [...topicFilter].join(','))
    const query = params.toString().replaceAll('%2C', ',')
    history.replaceState(history.state, '', query ? `?${query}` : location.pathname)
  }, [ready, selected, topicFilter, graph.nodes])

  const choose = (i: number) => {
    setSelected(i)
    engineRef.current?.flyTo(i)
  }

  const isolate = (value: number) => {
    setHops(value)
    if (value > 0 && selected >= 0) {
      const mask = withinHops(selected, value, n, start, adj)
      engineRef.current?.fit([...mask.keys()].filter((i) => mask[i]))
    }
  }

  /** Zooms by `factor`, or fits the whole map for 0. */
  const zoom = (factor: number) => {
    if (factor) engineRef.current?.zoomBy(factor)
    else engineRef.current?.fit()
  }

  const toggleTopic = (topic: string) => {
    const next = new Set(topicFilter)
    if (next.has(topic)) next.delete(topic)
    else next.add(topic)
    setTopicFilter(next)
    if (selected < 0) {
      const indices = next.size
        ? graph.nodes.flatMap((node, i) => (next.has(node[2]) ? [i] : []))
        : undefined
      engineRef.current?.fit(indices)
    }
  }

  const node = selected >= 0 ? graph.nodes[selected]! : null

  return (
    <div
      ref={rootRef}
      className="km bg-paper relative h-full w-full overflow-hidden font-sans dark:bg-gray-950"
    >
      <h1 className="sr-only">Knowledge map</h1>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={`Map of ${n} notes and ${graph.edges.length / 2} links. Arrow keys pan, plus and minus zoom, 0 fits the whole map.`}
        className="absolute inset-0 h-full w-full touch-none outline-none"
      />

      <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-col items-start gap-2 sm:inset-x-auto sm:top-4 sm:left-4 sm:w-80">
        <div className="pointer-events-auto flex w-full items-center gap-2">
          <Link href={origin ?? '/knowledge'} className={PILL}>
            <ArrowLeft size={14} aria-hidden="true" />
            {origin ? 'Back to note' : 'Knowledge'}
          </Link>
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="km-filters"
            className={clsx(PILL, 'ml-auto sm:hidden')}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Filters
            {topicFilter.size + (minLinks ? 1 : 0) > 0 && (
              <span className="bg-primary-600 rounded-full px-1.5 text-[0.65rem] text-white tabular-nums">
                {topicFilter.size + (minLinks ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <MapSearch graph={graph} bySlug={bySlug} onChoose={choose} />

        <section
          id="km-filters"
          aria-label="Filters"
          className={clsx(
            PANEL,
            'pointer-events-auto w-full p-3',
            filtersOpen ? 'block' : 'hidden sm:block'
          )}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
              Topics
            </h2>
            {(topicFilter.size > 0 || minLinks > 0) && (
              <button
                type="button"
                onClick={() => {
                  setTopicFilter(new Set())
                  setMinLinks(0)
                  if (selected < 0) engineRef.current?.fit()
                }}
                className="hover:text-primary-600 dark:hover:text-primary-400 text-xs text-gray-500 transition-colors dark:text-gray-400"
              >
                Clear
              </button>
            )}
          </div>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {topicCounts.map(([topic, count]) => {
              const on = topicFilter.has(topic)
              const dim = topicFilter.size > 0 && !on
              return (
                <li key={topic}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleTopic(topic)}
                    style={topicVars(topic)}
                    title={topicNames.get(topic)}
                    className={clsx(
                      'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs ring-1 transition-colors',
                      on
                        ? 'bg-gray-900 text-white ring-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:ring-gray-100'
                        : 'text-gray-700 ring-gray-200 hover:ring-gray-400 dark:text-gray-300 dark:ring-gray-700 dark:hover:ring-gray-500',
                      dim && 'opacity-60'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
                    />
                    {topicLabel(topic)}
                    <span className="font-mono text-[0.65rem] tabular-nums opacity-60">
                      {count}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <label className="mt-3 block text-xs text-gray-600 dark:text-gray-400">
            <span className="flex justify-between">
              <span>At least {minLinks} links</span>
            </span>
            <input
              type="range"
              min={0}
              max={MAX_MIN_LINKS}
              value={minLinks}
              onChange={(e) => setMinLinks(Number(e.target.value))}
              className="accent-primary-600 mt-1 w-full"
            />
          </label>
          <p className="mt-2 font-mono text-[0.65rem] text-gray-500 tabular-nums dark:text-gray-400">
            Showing {shown} of {n}
            {neighborhood && ' · isolating, filters paused'}
          </p>
        </section>
      </div>

      {node && (
        <section
          aria-label="Selected note"
          className={clsx(
            PANEL,
            'absolute inset-x-3 bottom-16 flex max-h-[42vh] flex-col p-4 sm:inset-x-auto sm:top-4 sm:right-4 sm:bottom-auto sm:max-h-[calc(100%-6rem)] sm:w-80'
          )}
          style={topicVars(node[2])}
        >
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
                />
                {topicNames.get(node[2]) ?? topicLabel(node[2])}
              </p>
              <h2 className="mt-1 text-lg leading-snug font-semibold text-gray-900 dark:text-gray-100">
                {node[1]}
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                {node[5]} {node[5] === 1 ? 'link' : 'links'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(-1)}
              aria-label="Clear selection"
              className="-m-1 rounded-full p-1 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <Link
            href={notePath(graph, selected)}
            className="bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors"
          >
            Open note <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span id="km-isolate" className="text-xs text-gray-600 dark:text-gray-400">
              Isolate
            </span>
            <div
              role="radiogroup"
              aria-labelledby="km-isolate"
              className="flex rounded-full p-0.5 ring-1 ring-gray-200 dark:ring-gray-700"
            >
              {HOPS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={hops === value}
                  onClick={() => isolate(value)}
                  className={clsx(
                    'rounded-full px-2.5 py-0.5 text-xs transition-colors',
                    hops === value
                      ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {neighbors.length > 0 && (
            <>
              <h3 className="mt-4 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
                Linked notes
              </h3>
              <ul className="-mx-1 mt-1.5 min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {neighbors.map((i) => (
                  <li key={i} style={topicVars(graph.nodes[i]![2])}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
                      />
                      <span className="min-w-0 flex-1 truncate">{graph.nodes[i]![1]}</span>
                      <span className="font-mono text-[0.65rem] text-gray-400 tabular-nums">
                        {graph.nodes[i]![5]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      <div className="absolute right-3 bottom-3 flex items-center gap-2 sm:right-4 sm:bottom-4">
        {deformed && (
          <button type="button" onClick={() => engineRef.current?.resetLayout()} className={PILL}>
            <RotateCcw size={14} aria-hidden="true" />
            Reset layout
          </button>
        )}
        <div className={clsx(PANEL, 'flex rounded-full p-0.5')}>
          {(
            [
              ['Zoom out', Minus, 1 / 1.5],
              ['Fit whole map', Maximize2, 0],
              ['Zoom in', Plus, 1.5],
            ] as const
          ).map(([label, Icon, factor]) => (
            <button
              key={label}
              type="button"
              onClick={() => zoom(factor)}
              aria-label={label}
              title={label}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <Icon size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-4 hidden font-mono text-[0.65rem] text-gray-500 lg:block dark:text-gray-400">
        Drag a note to pull its links · scroll to move · ⌘/ctrl + scroll to zoom · double-click to
        open
      </p>

      <p className="sr-only" aria-live="polite">
        {node ? `${node[1]}, ${node[5]} links. Press Enter to open.` : ''}
      </p>
    </div>
  )
}

/** Title search over the map's own nodes, as an ARIA combobox. */
function MapSearch({
  graph,
  bySlug,
  onChoose,
}: {
  graph: PackedGraph
  bySlug: Map<string, number>
  onChoose: (i: number) => void
}) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const entries = useMemo<SearchEntry[]>(
    () => graph.nodes.map(([s, t, k]) => ({ s, t, k, a: [], d: '', p: `/knowledge/${k}/${s}` })),
    [graph.nodes]
  )
  const results = useMemo(
    () => (query.trim() ? searchNotes(entries, query, 8) : []),
    [entries, query]
  )
  const expanded = open && results.length > 0

  const pick = (slug: string) => {
    const i = bySlug.get(slug)
    if (i === undefined) return
    onChoose(i)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className={clsx(PANEL, 'pointer-events-auto relative w-full')}>
      <div className="flex items-center gap-2 px-3">
        <Search size={14} aria-hidden="true" className="shrink-0 text-gray-400" />
        <input
          type="search"
          role="combobox"
          aria-label="Find a note"
          aria-expanded={expanded}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={expanded ? `${id}-${active}` : undefined}
          placeholder="Find a note"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault()
              const step = e.key === 'ArrowDown' ? 1 : -1
              setActive((a) => (a + step + results.length) % Math.max(results.length, 1))
            } else if (e.key === 'Enter' && expanded) {
              e.preventDefault()
              pick(results[active]!.entry.s)
            } else if (e.key === 'Escape') {
              setQuery('')
              setOpen(false)
            }
          }}
          className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
      {expanded && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label="Matching notes"
          className="border-t border-gray-200 py-1 dark:border-gray-800"
        >
          {results.map(({ entry }, i) => (
            <li
              key={entry.s}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === active}
              // Pick on mousedown, before the input's blur closes the list.
              onMouseDown={(e) => {
                e.preventDefault()
                pick(entry.s)
              }}
              onMouseEnter={() => setActive(i)}
              style={topicVars(entry.k)}
              className={clsx(
                'flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300',
                i === active && 'bg-gray-100 dark:bg-gray-800'
              )}
            >
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
              />
              <span className="min-w-0 flex-1 truncate">{entry.t}</span>
              <span className="font-mono text-[0.65rem] text-gray-400">{topicLabel(entry.k)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
