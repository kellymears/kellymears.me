import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const root = process.cwd()
const wikiDir = path.join(root, 'wiki')

/** Words per minute used to estimate reading time. */
const WORDS_PER_MINUTE = 200

/** Sections lifted out of the body and turned into structured link lists. */
const LINK_SECTIONS = new Set(['see also', 'related'])

interface KnowledgeTopic {
  slug: string
  dir: string
  name: string
  blurb: string
  noteCount: number
  path: string
}

interface KnowledgeNote {
  slug: string
  title: string
  aliases: string[]
  tags: string[]
  summary: string
  topic: string
  topicName: string
  body: string
  path: string
  /** Repo-relative source file, e.g. `wiki/Design/OKLCH.md`. */
  filePath: string
  outbound: string[]
  backlinks: string[]
  seeAlso: string[]
  related: string[]
  wordCount: number
  readingTime: number
  degree: number
}

interface KnowledgeGraphNode {
  id: string
  title: string
  topic: string
  x: number
  y: number
  degree: number
}

interface KnowledgeGraphEdge {
  source: string
  target: string
}

interface KnowledgeGraph {
  nodes: KnowledgeGraphNode[]
  edges: KnowledgeGraphEdge[]
}

interface SearchIndexEntry {
  s: string
  t: string
  a: string[]
  d: string
  p: string
  k: string
}

interface KnowledgeStats {
  notes: number
  links: number
  topics: number
}

/** Fixed display order. `dir` is the folder name inside `wiki/`. */
const TOPIC_DEFINITIONS: { slug: string; dir: string; name: string }[] = [
  { slug: 'method', dir: 'Method', name: 'Method' },
  { slug: 'computation', dir: 'Computation', name: 'Computation & Algorithms' },
  { slug: 'agents', dir: 'Agents', name: 'Agents & Language Models' },
  { slug: 'web', dir: 'Web', name: 'Web Platform' },
  { slug: 'design', dir: 'Design', name: 'Design & Interface' },
  { slug: 'testing', dir: 'Testing', name: 'Testing & Verification' },
  { slug: 'delivery', dir: 'Delivery', name: 'Version Control & Delivery' },
  { slug: 'systems', dir: 'Systems', name: 'Systems & Tooling' },
  { slug: 'data', dir: 'Data', name: 'Data & Content' },
  { slug: 'graphics', dir: 'Graphics', name: 'Graphics & Rendering' },
  { slug: 'play', dir: 'Play', name: 'Play & Games' },
  { slug: 'networks', dir: 'Networks', name: 'Networks & Distribution' },
  { slug: 'matter', dir: 'Matter', name: 'Matter & Energy' },
  { slug: 'body', dir: 'Body', name: 'Body & Medicine' },
  { slug: 'meaning', dir: 'Meaning', name: 'Meaning & Society' },
]

/**
 * Slugify a note title: lowercase, drop apostrophes entirely, collapse every
 * other non-alphanumeric run into a single dash, trim dashes from the ends.
 */
const slugifyNote = (title: string): string =>
  title
    .toLowerCase()
    .replace(/['‘’ʼ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** `[[Target]]`, `[[Target|Label]]`, `[[Target#Heading]]`, `[[Target#Heading|Label]]`. */
const WIKILINK_PATTERN = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g

const extractWikilinkTargets = (source: string): string[] => {
  const targets: string[] = []
  for (const match of source.matchAll(WIKILINK_PATTERN)) {
    const target = (match[1] ?? '').trim()
    if (target) targets.push(target)
  }
  return targets
}

interface ParsedNote {
  data: Record<string, unknown>
  content: string
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/**
 * Minimal frontmatter reader for the vault's fixed shape: scalar values and
 * `- item` lists, one level deep. Used when strict YAML parsing rejects a note
 * (an unquoted colon in a summary, for instance) so one bad note cannot take the
 * whole wiki down.
 */
const parseFrontmatterLeniently = (source: string): ParsedNote => {
  const match = FRONTMATTER_PATTERN.exec(source)
  if (!match) return { data: {}, content: source }

  const data: Record<string, unknown> = {}
  let currentKey: string | null = null

  for (const line of (match[1] ?? '').split('\n')) {
    const item = /^\s*-\s+(.*)$/.exec(line)
    if (item && currentKey) {
      const list = Array.isArray(data[currentKey]) ? (data[currentKey] as string[]) : []
      list.push(unquote(item[1] ?? ''))
      data[currentKey] = list
      continue
    }

    const pair = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line)
    if (!pair) continue

    currentKey = pair[1] ?? ''
    const value = (pair[2] ?? '').trim()
    data[currentKey] = value ? unquote(value) : []
  }

  return { data, content: source.slice(match[0].length) }
}

const unquote = (value: string): string =>
  value
    .trim()
    .replace(/^['"](.*)['"]$/s, '$1')
    .trim()

/**
 * Parse a note's frontmatter, preferring strict YAML. A note that strict YAML
 * rejects falls back to the lenient reader and warns, so a malformed note is
 * visible at build time instead of quietly losing its metadata.
 */
const parseNote = (source: string, label: string): ParsedNote => {
  try {
    const { data, content } = matter(source)
    return { data: data as Record<string, unknown>, content }
  } catch (error) {
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error)
    console.warn(`[knowledge] invalid YAML frontmatter in ${label} — ${reason}`)
    return parseFrontmatterLeniently(source)
  }
}

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string')
  if (typeof value === 'string') return [value]
  return []
}

const unique = (values: string[]): string[] => [...new Set(values)]

interface SplitContent {
  body: string
  sections: Record<string, string>
}

/**
 * Peel the `## See also` / `## Related` sections off the end of a note. Anything
 * else — including other headings — stays in the body.
 */
const splitLinkSections = (content: string): SplitContent => {
  const bodyLines: string[] = []
  const sections: Record<string, string[]> = {}
  let current: string | null = null

  for (const line of content.split('\n')) {
    const heading = /^##\s+(.+?)\s*$/.exec(line)
    if (heading) {
      const name = (heading[1] ?? '').toLowerCase()
      if (LINK_SECTIONS.has(name)) {
        current = name
        sections[name] = sections[name] ?? []
        continue
      }
      current = null
    }
    if (current) sections[current]?.push(line)
    else bodyLines.push(line)
  }

  return {
    body: bodyLines.join('\n').trim(),
    sections: Object.fromEntries(Object.entries(sections).map(([k, v]) => [k, v.join('\n')])),
  }
}

interface RawNote {
  slug: string
  title: string
  aliases: string[]
  tags: string[]
  summary: string
  topic: string
  topicName: string
  body: string
  path: string
  filePath: string
  bodyTargets: string[]
  seeAlsoTargets: string[]
  relatedTargets: string[]
  wordCount: number
  readingTime: number
}

let notesCache: KnowledgeNote[] | null = null
let topicsCache: KnowledgeTopic[] | null = null
let bySlugCache: Map<string, KnowledgeNote> | null = null
let byTargetCache: Map<string, KnowledgeNote> | null = null
const graphCache = new Map<number, KnowledgeGraph>()
const localGraphCache = new Map<string, KnowledgeGraph>()
let searchIndexCache: SearchIndexEntry[] | null = null

/**
 * Read the one-line blurb that follows each topic heading in `wiki/Home.md`,
 * keyed by the heading text verbatim.
 *
 * Those headings do not all match the display names in `TOPIC_DEFINITIONS` —
 * the vault says `## Computation` where the site says "Computation & Algorithms"
 * — so the lookup falls back to the folder name. Keyed on display name alone,
 * three domains silently rendered with no description at all.
 */
const readHomeBlurbs = (): Record<string, string> => {
  const homePath = path.join(wikiDir, 'Home.md')
  if (!fs.existsSync(homePath)) return {}

  const { content } = parseNote(fs.readFileSync(homePath, 'utf-8'), 'wiki/Home.md')
  const blurbs: Record<string, string> = {}
  const lines = content.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const heading = /^##\s+(.+?)\s*$/.exec(lines[i] ?? '')
    if (!heading) continue

    const name = (heading[1] ?? '').trim()
    for (let j = i + 1; j < lines.length; j++) {
      const line = (lines[j] ?? '').trim()
      if (!line) continue
      if (line.startsWith('#')) break
      if (line.startsWith('[[')) break
      blurbs[name] = line
      break
    }
  }

  return blurbs
}

const readRawNotes = (): RawNote[] => {
  const raw: RawNote[] = []

  for (const topic of TOPIC_DEFINITIONS) {
    const dir = path.join(wikiDir, topic.dir)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

    for (const file of files) {
      const relativePath = `wiki/${topic.dir}/${file}`
      const source = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data: frontmatter, content } = parseNote(source, relativePath)
      const title = file.replace(/\.md$/, '')
      const noteSlug = slugifyNote(title)
      const { body, sections } = splitLinkSections(content)
      const words = body.split(/\s+/).filter(Boolean).length

      raw.push({
        slug: noteSlug,
        title,
        aliases: toStringArray(frontmatter.aliases),
        tags: toStringArray(frontmatter.tags),
        summary: typeof frontmatter.summary === 'string' ? frontmatter.summary : '',
        topic: topic.slug,
        topicName: topic.name,
        body,
        path: `/knowledge/${topic.slug}/${noteSlug}`,
        filePath: relativePath,
        bodyTargets: extractWikilinkTargets(body),
        seeAlsoTargets: extractWikilinkTargets(sections['see also'] ?? ''),
        relatedTargets: extractWikilinkTargets(sections['related'] ?? ''),
        wordCount: words,
        readingTime: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
      })
    }
  }

  return raw
}

const buildNotes = (): KnowledgeNote[] => {
  const raw = readRawNotes()

  // Titles win over aliases, so seed the lookup with titles first.
  const byTarget = new Map<string, RawNote>()
  for (const note of raw) byTarget.set(note.title.toLowerCase(), note)
  for (const note of raw) {
    for (const alias of note.aliases) {
      const key = alias.toLowerCase()
      if (!byTarget.has(key)) byTarget.set(key, note)
    }
  }

  const resolveTargets = (targets: string[], self: string): string[] =>
    unique(
      targets
        .map((t) => byTarget.get(t.toLowerCase())?.slug)
        .filter((s): s is string => typeof s === 'string' && s !== self)
    )

  const notes: KnowledgeNote[] = raw.map((note) => {
    const seeAlso = resolveTargets(note.seeAlsoTargets, note.slug)
    const related = resolveTargets(note.relatedTargets, note.slug)
    const outbound = unique([
      ...resolveTargets(note.bodyTargets, note.slug),
      ...seeAlso,
      ...related,
    ])

    return {
      slug: note.slug,
      title: note.title,
      aliases: note.aliases,
      tags: note.tags,
      summary: note.summary,
      topic: note.topic,
      topicName: note.topicName,
      body: note.body,
      path: note.path,
      filePath: note.filePath,
      outbound,
      backlinks: [],
      seeAlso,
      related,
      wordCount: note.wordCount,
      readingTime: note.readingTime,
      degree: 0,
    }
  })

  const backlinks = new Map<string, string[]>()
  for (const note of notes) {
    for (const target of note.outbound) {
      const list = backlinks.get(target)
      if (list) list.push(note.slug)
      else backlinks.set(target, [note.slug])
    }
  }

  for (const note of notes) {
    note.backlinks = unique(backlinks.get(note.slug) ?? []).sort()
    note.degree = unique([...note.outbound, ...note.backlinks]).length
  }

  notes.sort((a, b) => a.title.localeCompare(b.title))

  // Aliases may point at a note that also owns the key as a title; the map above
  // already resolved that. Rebuild it against the finished notes for lookups.
  const finished = new Map<string, KnowledgeNote>(notes.map((n) => [n.slug, n]))
  const targetLookup = new Map<string, KnowledgeNote>()
  for (const [key, note] of byTarget) {
    const resolved = finished.get(note.slug)
    if (resolved) targetLookup.set(key, resolved)
  }

  bySlugCache = finished
  byTargetCache = targetLookup

  return notes
}

const getAllNotes = (): KnowledgeNote[] => {
  if (!notesCache) notesCache = buildNotes()
  return notesCache
}

const getTopics = (): KnowledgeTopic[] => {
  if (topicsCache) return topicsCache

  const notes = getAllNotes()
  const blurbs = readHomeBlurbs()

  topicsCache = TOPIC_DEFINITIONS.map((topic) => ({
    slug: topic.slug,
    dir: topic.dir,
    name: topic.name,
    blurb: blurbs[topic.name] ?? blurbs[topic.dir] ?? '',
    noteCount: notes.filter((n) => n.topic === topic.slug).length,
    path: `/knowledge/${topic.slug}`,
  }))

  return topicsCache
}

const getTopic = (slug: string): KnowledgeTopic | undefined =>
  getTopics().find((t) => t.slug === slug)

const getNotesByTopic = (topicSlug: string): KnowledgeNote[] =>
  getAllNotes().filter((n) => n.topic === topicSlug)

const getNoteBySlug = (noteSlug: string): KnowledgeNote | undefined => {
  getAllNotes()
  return bySlugCache?.get(noteSlug)
}

const getNote = (topicSlug: string, noteSlug: string): KnowledgeNote | undefined => {
  const note = getNoteBySlug(noteSlug)
  return note && note.topic === topicSlug ? note : undefined
}

const resolveWikilink = (target: string): KnowledgeNote | undefined => {
  getAllNotes()
  const cleaned = target.split('|')[0]?.split('#')[0]?.trim() ?? ''
  if (!cleaned) return undefined
  return byTargetCache?.get(cleaned.toLowerCase())
}

/* -------------------------------------------------------------------------- */
/* Graph layout                                                               */
/* -------------------------------------------------------------------------- */

const LAYOUT_SEED = 0x5eed1e5
const LAYOUT_SIZE = 1000
const LAYOUT_PADDING = 40

/**
 * Default aspect ratios. The constellation renders in a wide card, so baking the
 * ratio into the simulation gives a genuinely wide layout — as opposed to
 * stretching a square one afterwards, which would squash clusters into ellipses
 * and skew every edge angle. The local graph sits in a near-square rail.
 */
const GRAPH_ASPECT = 1.9
const LOCAL_GRAPH_ASPECT = 1

/** Deterministic PRNG — positions must be byte-identical across builds. */
const mulberry32 = (seed: number) => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface LayoutInput {
  id: string
  topic: string
}

interface Point {
  x: number
  y: number
}

/**
 * Fruchterman-Reingold with a weak pull toward each topic's centroid, where the
 * centroids sit evenly around a ring. O(n²) repulsion is fine at this scale.
 *
 * `aspect` widens the box the simulation runs in — the ring becomes an ellipse
 * and repulsion spreads across the wider coordinate space during the solve, so
 * the layout is natively wide rather than a square result scaled sideways. At
 * `aspect === 1` every expression below reduces to the original square solve.
 */
const simulate = (
  nodes: LayoutInput[],
  edges: KnowledgeGraphEdge[],
  iterations: number,
  aspect: number
): Point[] => {
  const width = LAYOUT_SIZE * aspect
  const height = LAYOUT_SIZE
  const n = nodes.length
  if (n === 0) return []
  if (n === 1) return [{ x: width / 2, y: height / 2 }]

  const random = mulberry32(LAYOUT_SEED)
  const k = Math.sqrt((width * height) / n)
  const center = { x: width / 2, y: height / 2 }

  const topics = [...new Set(nodes.map((node) => node.topic))].sort()
  const ringRadiusX = width * 0.32
  const ringRadiusY = height * 0.32
  const centroids = new Map<string, Point>(
    topics.map((topic, i) => {
      const angle = (2 * Math.PI * i) / topics.length
      return [
        topic,
        {
          x: center.x + ringRadiusX * Math.cos(angle),
          y: center.y + ringRadiusY * Math.sin(angle),
        },
      ]
    })
  )

  const index = new Map(nodes.map((node, i) => [node.id, i]))
  const px = new Float64Array(n)
  const py = new Float64Array(n)
  const dx = new Float64Array(n)
  const dy = new Float64Array(n)

  for (let i = 0; i < n; i++) {
    const home = centroids.get(nodes[i]?.topic ?? '') ?? center
    px[i] = home.x + (random() - 0.5) * ringRadiusX
    py[i] = home.y + (random() - 0.5) * ringRadiusY
  }

  const links: [number, number][] = []
  for (const edge of edges) {
    const a = index.get(edge.source)
    const b = index.get(edge.target)
    if (a !== undefined && b !== undefined && a !== b) links.push([a, b])
  }

  const clusterStrength = 0.045
  let temperature = width * 0.1
  const cooling = temperature / (iterations + 1)

  for (let step = 0; step < iterations; step++) {
    dx.fill(0)
    dy.fill(0)

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let deltaX = (px[i] as number) - (px[j] as number)
        let deltaY = (py[i] as number) - (py[j] as number)
        let distSq = deltaX * deltaX + deltaY * deltaY
        if (distSq < 0.01) {
          // Coincident nodes get a deterministic nudge apart.
          deltaX = ((i % 7) - 3) * 0.1 + 0.01
          deltaY = ((j % 7) - 3) * 0.1 + 0.01
          distSq = deltaX * deltaX + deltaY * deltaY
        }
        const dist = Math.sqrt(distSq)
        const force = (k * k) / dist
        // Repulsion acts in the target box's coordinates: each node's personal
        // space is as wide as the box is wide, so the packing reaches
        // equilibrium spread across the full width. Attraction below stays
        // isotropic in real space, which is what keeps clusters round and edges
        // near their natural length — the difference between a natively wide
        // layout and a square one pulled sideways.
        const fx = (deltaX / dist) * force * aspect
        const fy = (deltaY / dist) * force
        dx[i] = (dx[i] as number) + fx
        dy[i] = (dy[i] as number) + fy
        dx[j] = (dx[j] as number) - fx
        dy[j] = (dy[j] as number) - fy
      }
    }

    for (const [a, b] of links) {
      const deltaX = (px[a] as number) - (px[b] as number)
      const deltaY = (py[a] as number) - (py[b] as number)
      const dist = Math.max(0.01, Math.sqrt(deltaX * deltaX + deltaY * deltaY))
      const force = (dist * dist) / k
      const fx = (deltaX / dist) * force
      const fy = (deltaY / dist) * force
      dx[a] = (dx[a] as number) - fx
      dy[a] = (dy[a] as number) - fy
      dx[b] = (dx[b] as number) + fx
      dy[b] = (dy[b] as number) + fy
    }

    for (let i = 0; i < n; i++) {
      const home = centroids.get(nodes[i]?.topic ?? '') ?? center
      dx[i] = (dx[i] as number) + (home.x - (px[i] as number)) * clusterStrength * k
      dy[i] = (dy[i] as number) + (home.y - (py[i] as number)) * clusterStrength * k
    }

    for (let i = 0; i < n; i++) {
      const mag = Math.sqrt((dx[i] as number) ** 2 + (dy[i] as number) ** 2)
      if (mag < 1e-9) continue
      const capped = Math.min(mag, temperature)
      px[i] = (px[i] as number) + ((dx[i] as number) / mag) * capped
      py[i] = (py[i] as number) + ((dy[i] as number) / mag) * capped
    }

    temperature = Math.max(0.01, temperature - cooling)
  }

  separate(px, py, n, k * SEPARATION, SEPARATION_PASSES)

  return normalize(px, py, n, width, height)
}

/**
 * Target floor on pairwise distance, as a fraction of `k` (the natural spacing
 * for n nodes in the box). Raising it spreads the map; past ~0.7 the topic
 * clusters dissolve into an even lattice and the structure stops reading.
 */
const SEPARATION = 0.62
const SEPARATION_PASSES = 12

/**
 * Enforce a floor on pairwise distance.
 *
 * Fruchterman-Reingold settles hubs into dense knots, and `normalize` then
 * rescales the whole cloud to fill the box — so simply raising the repulsion
 * constant buys nothing, the knot comes back the same size relative to its
 * neighbors. This pass acts on the distances directly, which is what opens up
 * room for labels and makes a single dot distinguishable from its neighbors.
 *
 * Deterministic: fixed iteration order, no randomness, no time source.
 */
const separate = (
  px: Float64Array,
  py: Float64Array,
  n: number,
  minDist: number,
  passes: number
): void => {
  const minSq = minDist * minDist

  for (let pass = 0; pass < passes; pass++) {
    let collisions = 0

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let deltaX = (px[i] as number) - (px[j] as number)
        let deltaY = (py[i] as number) - (py[j] as number)
        let distSq = deltaX * deltaX + deltaY * deltaY
        if (distSq >= minSq) continue

        if (distSq < 1e-6) {
          // Coincident: nudge apart along a deterministic per-pair direction.
          deltaX = ((i % 7) - 3) * 0.1 + 0.01
          deltaY = ((j % 5) - 2) * 0.1 + 0.01
          distSq = deltaX * deltaX + deltaY * deltaY
        }

        const dist = Math.sqrt(distSq)
        // Split the correction between the pair, so neither is privileged.
        const push = (minDist - dist) / dist / 2
        const offsetX = deltaX * push
        const offsetY = deltaY * push
        px[i] = (px[i] as number) + offsetX
        py[i] = (py[i] as number) + offsetY
        px[j] = (px[j] as number) - offsetX
        py[j] = (py[j] as number) - offsetY
        collisions++
      }
    }

    if (collisions === 0) break
  }
}

/**
 * Fit the simulated cloud into a padded `width × height` box. The scale factor
 * is uniform, so the cloud's own proportions survive — the width comes from the
 * simulation having run in a wide box, not from stretching x here.
 */
const normalize = (
  px: Float64Array,
  py: Float64Array,
  n: number,
  width: number,
  height: number
): Point[] => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (let i = 0; i < n; i++) {
    const x = px[i] as number
    const y = py[i] as number
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }

  const spanX = width - LAYOUT_PADDING * 2
  const spanY = height - LAYOUT_PADDING * 2
  const rangeX = maxX - minX
  const rangeY = maxY - minY
  const scale = Math.min(
    rangeX > 0 ? spanX / rangeX : Infinity,
    rangeY > 0 ? spanY / rangeY : Infinity
  )
  const factor = Number.isFinite(scale) ? scale : 1
  const offsetX = LAYOUT_PADDING + (spanX - rangeX * factor) / 2
  const offsetY = LAYOUT_PADDING + (spanY - rangeY * factor) / 2

  const points: Point[] = []
  for (let i = 0; i < n; i++) {
    const x = ((px[i] as number) - minX) * factor + offsetX
    const y = ((py[i] as number) - minY) * factor + offsetY
    points.push({
      x: round(Number.isFinite(x) ? x : width / 2),
      y: round(Number.isFinite(y) ? y : height / 2),
    })
  }
  return points
}

const round = (value: number): number => Math.round(value * 100) / 100

/** Unique undirected edges across the whole vault. */
const buildEdges = (notes: KnowledgeNote[]): KnowledgeGraphEdge[] => {
  const known = new Set(notes.map((n) => n.slug))
  const seen = new Set<string>()
  const edges: KnowledgeGraphEdge[] = []

  for (const note of notes) {
    for (const target of note.outbound) {
      if (!known.has(target)) continue
      const key = note.slug < target ? `${note.slug} ${target}` : `${target} ${note.slug}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ source: note.slug, target })
    }
  }

  return edges
}

/**
 * The whole vault, laid out once per aspect ratio. Coordinates span
 * `0..1000 * aspect` horizontally and `0..1000` vertically.
 */
const getGraph = (aspect = GRAPH_ASPECT): KnowledgeGraph => {
  const cached = graphCache.get(aspect)
  if (cached) return cached

  const notes = getAllNotes()
  const edges = buildEdges(notes)
  const positions = simulate(
    notes.map((n) => ({ id: n.slug, topic: n.topic })),
    edges,
    300,
    aspect
  )

  const graph: KnowledgeGraph = {
    nodes: notes.map((note, i) => ({
      id: note.slug,
      title: note.title,
      topic: note.topic,
      x: positions[i]?.x ?? (LAYOUT_SIZE * aspect) / 2,
      y: positions[i]?.y ?? LAYOUT_SIZE / 2,
      degree: note.degree,
    })),
    edges,
  }

  graphCache.set(aspect, graph)
  return graph
}

const getLocalGraph = (
  noteSlug: string,
  depth = 2,
  aspect = LOCAL_GRAPH_ASPECT
): KnowledgeGraph => {
  const cacheKey = `${noteSlug}|${depth}|${aspect}`
  const cached = localGraphCache.get(cacheKey)
  if (cached) return cached

  const notes = getAllNotes()
  const origin = getNoteBySlug(noteSlug)
  if (!origin) return { nodes: [], edges: [] }

  const neighbors = new Map<string, string[]>()
  for (const note of notes) {
    neighbors.set(note.slug, unique([...note.outbound, ...note.backlinks]))
  }

  const included = new Set<string>([origin.slug])
  let frontier = [origin.slug]

  for (let hop = 0; hop < depth; hop++) {
    const next: string[] = []
    for (const slug of frontier) {
      for (const neighbor of neighbors.get(slug) ?? []) {
        if (included.has(neighbor)) continue
        included.add(neighbor)
        next.push(neighbor)
      }
    }
    if (next.length === 0) break
    frontier = next
  }

  const members = notes.filter((n) => included.has(n.slug))
  const seen = new Set<string>()
  const edges: KnowledgeGraphEdge[] = []

  for (const note of members) {
    for (const target of note.outbound) {
      if (!included.has(target)) continue
      const key = note.slug < target ? `${note.slug} ${target}` : `${target} ${note.slug}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ source: note.slug, target })
    }
  }

  const positions = simulate(
    members.map((n) => ({ id: n.slug, topic: n.topic })),
    edges,
    120,
    aspect
  )

  const graph: KnowledgeGraph = {
    nodes: members.map((note, i) => ({
      id: note.slug,
      title: note.title,
      topic: note.topic,
      x: positions[i]?.x ?? (LAYOUT_SIZE * aspect) / 2,
      y: positions[i]?.y ?? LAYOUT_SIZE / 2,
      degree: note.degree,
    })),
    edges,
  }

  localGraphCache.set(cacheKey, graph)
  return graph
}

const getHubs = (limit = 12): KnowledgeNote[] =>
  [...getAllNotes()]
    .sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title))
    .slice(0, limit)

const getSearchIndex = (): SearchIndexEntry[] => {
  if (searchIndexCache) return searchIndexCache

  searchIndexCache = getAllNotes().map((note) => ({
    s: note.slug,
    t: note.title,
    a: note.aliases,
    d: note.summary,
    p: note.path,
    k: note.topic,
  }))

  return searchIndexCache
}

const getKnowledgeStats = (): KnowledgeStats => ({
  notes: getAllNotes().length,
  links: getGraph().edges.length,
  topics: getTopics().length,
})

/**
 * Deterministic "article of the day": FNV-1a over the day key indexes the
 * slug-sorted note list, so every process — and every visitor — resolves the
 * same note for the same key. The caller supplies the key (e.g. "2026-08-18"
 * in the reset timezone); this module stays clock-free by design.
 */
const getDailyNote = (dayKey: string): KnowledgeNote => {
  const notes = [...getAllNotes()].sort((a, b) => a.slug.localeCompare(b.slug))
  let hash = 0x811c9dc5
  for (let i = 0; i < dayKey.length; i++) {
    hash ^= dayKey.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  const pick = notes[hash % notes.length]
  if (!pick) throw new Error('getDailyNote: the vault has no notes')
  return pick
}

/** A note's most-linked neighbors — outbound and backlinks together, ranked by overall degree. */
const getProminentConnections = (slug: string, limit = 3): KnowledgeNote[] => {
  const note = getNoteBySlug(slug)
  if (!note) return []
  return unique([...note.outbound, ...note.backlinks])
    .map((target) => getNoteBySlug(target))
    .filter((neighbor): neighbor is KnowledgeNote => neighbor !== undefined)
    .sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title))
    .slice(0, limit)
}

export {
  getAllNotes,
  getDailyNote,
  getGraph,
  getHubs,
  getProminentConnections,
  getKnowledgeStats,
  getLocalGraph,
  getNote,
  getNoteBySlug,
  getNotesByTopic,
  getSearchIndex,
  getTopic,
  getTopics,
  resolveWikilink,
  slugifyNote,
}
export type {
  KnowledgeGraph,
  KnowledgeGraphEdge,
  KnowledgeGraphNode,
  KnowledgeNote,
  KnowledgeStats,
  KnowledgeTopic,
  SearchIndexEntry,
}
