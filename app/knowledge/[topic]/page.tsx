import { Accent, SectionHeading } from '@/components/home/SectionHeading'
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
  // "Design & Interface" → "Design & " + *Interface*, the accent in topic color.
  const split = topic.name.lastIndexOf(' ') + 1
  const nameHead = topic.name.slice(0, split)
  const nameTail = topic.name.slice(split)
  const hubs = notes.slice(0, 4)
  const byLetter = [
    ...Map.groupBy(
      [...notes].sort((a, b) => a.title.localeCompare(b.title)),
      (note) => note.title[0]!.toUpperCase()
    ),
  ]

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
    <div style={topicVars(topic.slug)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="pt-12 pb-2">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <Link
              href="/knowledge"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Knowledge
            </Link>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
            />
            <span className="text-[var(--topic)] dark:text-[var(--topic-dark)]">
              Domain {String(index + 1).padStart(2, '0')}
            </span>
          </p>
          <Wander paths={allNotes.map((n) => n.path)} label="View random note" />
        </div>

        <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-gray-900 dark:text-gray-100">
          {nameHead}
          <em className="pr-[0.08em] font-serif font-normal tracking-normal text-[var(--topic)] italic dark:text-[var(--topic-dark)]">
            {nameTail}
          </em>
        </h1>

        {topic.blurb && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {topic.blurb}
          </p>
        )}

        <StatLine
          className="mt-8"
          items={[
            { value: topic.noteCount, label: 'Notes' },
            { value: internal, label: 'Links within' },
            { value: outward, label: 'Links outward' },
          ]}
        />
      </header>

      <section className="pt-2 pb-4" aria-label={`${topic.name} as a graph`}>
        <KnowledgeGraph
          graph={graph}
          variant="constellation"
          frame="bleed"
          focusTopic={topic.slug}
          showLegend
        />
      </section>

      {neighbors.length > 0 && (
        <section className="py-10" aria-label="Neighboring domains">
          <SectionHeading index="01">
            Where it <Accent>reaches</Accent>
          </SectionHeading>
          {/* One bar, split by where this domain's outward links land. */}
          <div className="flex h-3 w-full gap-[3px]" aria-hidden="true">
            {neighbors.map((neighbor) => (
              <Link
                key={neighbor.slug}
                href={neighbor.path}
                tabIndex={-1}
                title={`${neighbor.name}: ${neighbor.count}`}
                className="animate-grow-width h-full rounded-full bg-[var(--topic)] opacity-80 transition-opacity hover:opacity-100 dark:bg-[var(--topic-dark)]"
                style={{ ...topicVars(neighbor.slug), flexGrow: neighbor.count, flexBasis: 0 }}
              />
            ))}
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {neighbors.map((neighbor) => (
              <li key={neighbor.slug}>
                <Link
                  href={neighbor.path}
                  className="group flex items-baseline gap-2.5 text-sm"
                  style={topicVars(neighbor.slug)}
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
                  />
                  <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate text-gray-900 transition-colors dark:text-gray-100">
                    {neighbor.name}
                  </span>
                  <span className="ml-auto font-mono text-xs text-gray-500 tabular-nums dark:text-gray-400">
                    {Math.round((neighbor.count / outward) * 100)}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="animate-on-scroll py-10" aria-label={`Hubs of ${topic.name}`}>
        <SectionHeading index="02">
          The <Accent>hubs</Accent>
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {hubs.map((note, i) => (
            <div
              key={note.slug}
              className="animate-fade-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </section>

      <section className="animate-on-scroll py-10" aria-label={`Every note in ${topic.name}`}>
        <SectionHeading index="03">
          Every <Accent>note</Accent>
        </SectionHeading>
        {/* A table of contents: alphabetical, dot leaders to the link count.
            `data-wikilink` opts each row into the hover previews. */}
        <div className="gap-x-12 sm:columns-2 lg:columns-3">
          {byLetter.map(([letter, group]) => (
            <div key={letter} className="mb-6 break-inside-avoid">
              <p className="mb-2 font-serif text-2xl text-[var(--topic)] italic dark:text-[var(--topic-dark)]">
                {letter}
              </p>
              <ul className="space-y-1">
                {group.map((note) => (
                  <li key={note.slug}>
                    <Link
                      href={note.path}
                      data-wikilink={note.slug}
                      className="group flex items-baseline gap-2 text-sm"
                    >
                      <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-gray-800 transition-colors dark:text-gray-200">
                        {note.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-gray-300 dark:border-gray-700"
                      />
                      <span className="font-mono text-xs text-gray-400 tabular-nums dark:text-gray-500">
                        {note.degree}
                        <span className="sr-only"> links</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
