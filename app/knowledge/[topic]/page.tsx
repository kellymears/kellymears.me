import { Card } from '@/components/Card'
import Link from '@/components/Link'
import { KnowledgeGraph } from '@/components/knowledge/KnowledgeGraph'
import { Wander } from '@/components/knowledge/Wander'
import { NoteCard, topicVars } from '@/components/knowledge/NoteCard'
import { StatLine } from '@/components/knowledge/StatLine'
import siteMetadata from '@/data/siteMetadata'
import {
  getAllNotes,
  getGraph,
  getNoteBySlug,
  getNotesByTopic,
  getTopic,
  getTopics,
  type KnowledgeGraph as Graph,
  type KnowledgeGraphNode,
} from '@/lib/knowledge'
import { genPageMetadata } from 'app/seo'
import clsx from 'clsx'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const dynamicParams = false

interface TopicPageProps {
  params: Promise<{ topic: string }>
}

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }))
}

export async function generateMetadata(props: TopicPageProps) {
  const { topic: slug } = await props.params
  const topic = getTopic(slug)
  if (!topic) return genPageMetadata({ title: 'Knowledge' })

  return genPageMetadata({
    title: topic.name,
    description: topic.blurb || `${topic.noteCount} concept notes on ${topic.name.toLowerCase()}.`,
  })
}

const LAYOUT_SIZE = 1000
const LAYOUT_PADDING = 60

/**
 * Graph positions are laid out across the whole vault, so any slice of it sits
 * off in one corner. Rescale the slice — uniformly, to keep the cluster shape
 * the global layout produced — back into the padded 0..1000 box the graph
 * component expects.
 */
function renormalize(nodes: KnowledgeGraphNode[]): KnowledgeGraphNode[] {
  if (nodes.length === 0) return nodes

  const xs = nodes.map((node) => node.x)
  const ys = nodes.map((node) => node.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const span = LAYOUT_SIZE - LAYOUT_PADDING * 2
  const rangeX = maxX - minX
  const rangeY = maxY - minY
  const scale = Math.min(
    rangeX > 0 ? span / rangeX : Infinity,
    rangeY > 0 ? span / rangeY : Infinity
  )
  const factor = Number.isFinite(scale) ? scale : 1
  const offsetX = LAYOUT_PADDING + (span - rangeX * factor) / 2
  const offsetY = LAYOUT_PADDING + (span - rangeY * factor) / 2

  return nodes.map((node) => ({
    ...node,
    x: Math.round(((node.x - minX) * factor + offsetX) * 100) / 100,
    y: Math.round(((node.y - minY) * factor + offsetY) * 100) / 100,
  }))
}

/** The topic's notes plus every note one link away from them, wherever it lives. */
function buildTopicGraph(topicSlug: string): Graph {
  const graph = getGraph()
  const members = new Set(
    graph.nodes.filter((node) => node.topic === topicSlug).map((node) => node.id)
  )

  const included = new Set(members)
  for (const edge of graph.edges) {
    if (members.has(edge.source)) included.add(edge.target)
    if (members.has(edge.target)) included.add(edge.source)
  }

  return {
    nodes: renormalize(graph.nodes.filter((node) => included.has(node.id))),
    edges: graph.edges.filter(
      (edge) =>
        included.has(edge.source) &&
        included.has(edge.target) &&
        (members.has(edge.source) || members.has(edge.target))
    ),
  }
}

interface Neighbor {
  slug: string
  name: string
  path: string
  count: number
}

/** How often this domain's notes link to each other domain. */
function buildNeighbors(topicSlug: string): { neighbors: Neighbor[]; internal: number } {
  const graph = getGraph()
  const members = new Set(
    graph.nodes.filter((node) => node.topic === topicSlug).map((node) => node.id)
  )
  const counts = new Map<string, number>()
  let internal = 0

  for (const edge of graph.edges) {
    const sourceInside = members.has(edge.source)
    const targetInside = members.has(edge.target)
    if (!sourceInside && !targetInside) continue

    if (sourceInside && targetInside) {
      internal += 1
      continue
    }

    const outsideSlug = sourceInside ? edge.target : edge.source
    const outside = getNoteBySlug(outsideSlug)
    if (!outside) continue
    counts.set(outside.topic, (counts.get(outside.topic) ?? 0) + 1)
  }

  const neighbors = getTopics()
    .filter((topic) => counts.has(topic.slug))
    .map((topic) => ({
      slug: topic.slug,
      name: topic.name,
      path: topic.path,
      count: counts.get(topic.slug) ?? 0,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

  return { neighbors, internal }
}

export default async function TopicPage(props: TopicPageProps) {
  const { topic: slug } = await props.params
  const topic = getTopic(slug)
  if (!topic) notFound()

  const notes = [...getNotesByTopic(slug)].sort(
    (a, b) => b.degree - a.degree || a.title.localeCompare(b.title)
  )
  const graph = buildTopicGraph(slug)
  const allNotes = getAllNotes()
  const { neighbors, internal } = buildNeighbors(slug)
  const outward = neighbors.reduce((sum, n) => sum + n.count, 0)
  const widestNeighbor = neighbors[0]?.count ?? 1

  const topics = getTopics()
  const index = topics.findIndex((t) => t.slug === slug)
  const previous = index > 0 ? topics[index - 1] : undefined
  const next = index >= 0 && index < topics.length - 1 ? topics[index + 1] : undefined

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: topic.name,
    description: topic.blurb,
    url: `${siteMetadata.siteUrl}${topic.path}`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Knowledge',
      url: `${siteMetadata.siteUrl}/knowledge`,
    },
    hasPart: notes.map((note) => ({
      '@type': 'DefinedTerm',
      name: note.title,
      description: note.summary,
      url: `${siteMetadata.siteUrl}${note.path}`,
    })),
  }

  return (
    <div className="space-y-2" style={topicVars(topic.slug)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/*
        One grid for the header *and* the map, so the "Where it reaches" rail can
        span both rows. As two stacked blocks the rail was far taller than the
        title beside it, and the row it defined left a screen-deep void under the
        stat line before the map began.
      */}
      <div
        className={clsx(
          'grid gap-x-10 gap-y-8 pt-8 pb-8',
          neighbors.length > 0 && 'xl:grid-cols-[minmax(0,1fr)_19rem]'
        )}
      >
        <header>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase">
              <Link
                href="/knowledge"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Knowledge
              </Link>
              <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">
                /
              </span>
              <span className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
                  aria-hidden="true"
                />
                Domain
              </span>
            </p>
            <Wander paths={allNotes.map((n) => n.path)} label="View random note" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
            {topic.name}
          </h1>

          {topic.blurb && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {topic.blurb}
            </p>
          )}

          <StatLine
            className="mt-8"
            items={[
              { value: topic.noteCount, label: 'Notes' },
              { value: internal, label: 'Within this domain' },
              { value: outward, label: 'To other domains' },
            ]}
          />
        </header>

        {neighbors.length > 0 && (
          <Card
            variant="stat"
            hover={false}
            as="aside"
            // `self-start` so spanning two rows does not stretch the card to the
            // height of the map beside it; `sticky` then keeps it in view for the
            // length of that map, the same way the note page pins its local graph.
            // `mb-10` keeps it off the bottom edge of the grid row it is pinned
            // within, rather than coming to rest flush against it.
            className="p-5 xl:sticky xl:top-24 xl:row-span-2 xl:mb-10 xl:self-start"
            aria-label="Neighboring domains"
          >
            <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Connected domains
            </h2>
            <ul className="mt-4 space-y-3">
              {neighbors.map((neighbor) => (
                <li key={neighbor.slug}>
                  <Link
                    href={neighbor.path}
                    className="group block"
                    style={topicVars(neighbor.slug)}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate text-sm font-medium text-gray-900 transition-colors dark:text-gray-100">
                        {neighbor.name}
                      </span>
                      <span className="shrink-0 text-xs text-gray-500 tabular-nums dark:text-gray-400">
                        {neighbor.count}
                      </span>
                    </span>
                    <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <span
                        className="animate-grow-width block h-full rounded-full bg-[var(--topic)] opacity-70 transition-opacity group-hover:opacity-100 dark:bg-[var(--topic-dark)]"
                        style={{
                          width: `${Math.round((neighbor.count / widestNeighbor) * 100)}%`,
                        }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <section aria-label={`${topic.name} as a graph`}>
          <h2 className="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Domain Map
          </h2>
          <div className="content-defer">
            <KnowledgeGraph
              graph={graph}
              variant="constellation"
              focusTopic={topic.slug}
              height={574}
              showLegend
            />
          </div>
        </section>
      </div>

      <section
        className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800"
        aria-label={`Notes in ${topic.name}`}
      >
        <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Connected notes
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {notes.map((note, i) => (
            <div
              key={note.slug}
              className="animate-fade-slide-up"
              style={{ animationDelay: `${Math.min(i, 12) * 50}ms` }}
            >
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </section>

      <nav
        className="flex items-stretch justify-between gap-4 border-t border-gray-200 py-10 dark:border-gray-800"
        aria-label="Domain navigation"
      >
        {previous ? (
          <Link href={previous.path} className="group max-w-[45%]">
            <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:-translate-x-0.5"
              >
                &larr;
              </span>{' '}
              Previous
            </span>
            <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-1 block text-sm font-medium text-gray-900 transition-colors dark:text-gray-100">
              {previous.name}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link href={next.path} className="group max-w-[45%] text-right">
            <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Next{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </span>
            <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-1 block text-sm font-medium text-gray-900 transition-colors dark:text-gray-100">
              {next.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
