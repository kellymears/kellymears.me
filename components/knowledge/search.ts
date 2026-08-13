/**
 * Dependency-free fuzzy matcher for the knowledge command palette.
 *
 * The index is small (201 entries) but this runs on every keystroke, so every
 * pass is linear in the length of the string being matched. Folded copies of
 * each entry are memoized in a WeakMap keyed on the entry object.
 */

import type { SearchIndexEntry } from '@/lib/knowledge'

/**
 * The palette's view of a note. Aliased rather than redeclared so the client
 * shape can never drift from what `getSearchIndex()` actually serializes.
 */
export type SearchEntry = SearchIndexEntry

export interface SearchResult {
  entry: SearchEntry
  score: number
  matchedOn: 'title' | 'alias' | 'summary'
  /** character ranges (start inclusive, end exclusive) into `matchedText` */
  ranges: [number, number][]
  /** the original string the ranges apply to — the title, the matching alias, or the summary */
  matchedText: string
}

/* -------------------------------------------------------------------------- */
/* normalization                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Lowercase + strip diacritics while preserving length, so indices computed
 * against the folded string stay valid against the original. Any character
 * whose folded form changes width (astral code points, ligature expansions)
 * is passed through untouched rather than shifting every index after it.
 */
const fold = (input: string): string => {
  let out = ''
  for (const ch of input) {
    const [base = ch] = ch.normalize('NFD')
    const lowered = base.toLowerCase()
    out += lowered.length === ch.length ? lowered : ch
  }
  return out
}

interface FoldedAlias {
  raw: string
  folded: string
}

interface Folded {
  title: string
  aliases: FoldedAlias[]
  summary: string
}

const foldedCache = new WeakMap<SearchEntry, Folded>()

const foldedEntry = (entry: SearchEntry): Folded => {
  const cached = foldedCache.get(entry)
  if (cached) return cached
  const folded: Folded = {
    title: fold(entry.t),
    aliases: entry.a.map((raw) => ({ raw, folded: fold(raw) })),
    summary: fold(entry.d),
  }
  foldedCache.set(entry, folded)
  return folded
}

const LOWER_A = 97
const LOWER_Z = 122
const DIGIT_0 = 48
const DIGIT_9 = 57

/**
 * True when nothing alphanumeric precedes `index` — i.e. a match starting here
 * begins a word. `charCodeAt` out of range yields NaN, which fails both range
 * checks, so position 0 and past-the-end both read as boundaries.
 */
const isBoundary = (hay: string, index: number): boolean => {
  const code = hay.charCodeAt(index - 1)
  const alphanumeric = (code >= LOWER_A && code <= LOWER_Z) || (code >= DIGIT_0 && code <= DIGIT_9)
  return !alphanumeric
}

/* -------------------------------------------------------------------------- */
/* matching                                                                   */
/* -------------------------------------------------------------------------- */

interface Match {
  score: number
  ranges: [number, number][]
}

const rangesFromPositions = (positions: number[]): [number, number][] => {
  const ranges: [number, number][] = []
  let start: number | null = null
  let previous = -2

  for (const at of positions) {
    if (start === null) start = at
    else if (at !== previous + 1) {
      ranges.push([start, previous + 1])
      start = at
    }
    previous = at
  }

  if (start !== null) ranges.push([start, previous + 1])
  return ranges
}

/**
 * Leftmost greedy subsequence match, then a backward pass that pulls each
 * character as far right as it can go. The second pass turns a scattered
 * greedy match into the tightest run available, which is what the contiguity
 * bonus wants to measure.
 */
const subsequence = (hay: string, needle: string): number[] | null => {
  let cursor = 0
  let end = -1

  for (const ch of needle) {
    const found = hay.indexOf(ch, cursor)
    if (found === -1) return null
    cursor = found + 1
    end = found
  }
  if (end === -1) return null

  const positions: number[] = []
  let backCursor = end
  for (const ch of [...needle].reverse()) {
    const found = hay.lastIndexOf(ch, backCursor)
    if (found === -1) return null
    positions.push(found)
    backCursor = found - 1
  }

  return positions.reverse()
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Score one string against the query. Tiers are 100 apart so the length
 * preference (max 48) can reorder within a tier but never across one.
 */
const matchString = (hay: string, needle: string): Match | null => {
  if (!hay || !needle) return null

  const lengthPenalty = Math.min(hay.length, 60) * 0.8

  if (hay === needle) {
    return { score: 1000 - lengthPenalty, ranges: [[0, hay.length]] }
  }

  if (hay.startsWith(needle)) {
    return { score: 850 - lengthPenalty, ranges: [[0, needle.length]] }
  }

  const at = hay.indexOf(needle)
  if (at !== -1) {
    const tier = isBoundary(hay, at) ? 750 : 650
    return { score: tier - lengthPenalty - at * 0.5, ranges: [[at, at + needle.length]] }
  }

  const positions = subsequence(hay, needle)
  if (!positions) return null

  const first = positions[0]
  const last = positions[positions.length - 1]
  if (first === undefined || last === undefined) return null

  let runs = 0
  let boundaryHits = 0
  let previous = Number.NaN
  for (const at of positions) {
    if (at !== previous + 1) runs++
    if (isBoundary(hay, at)) boundaryHits++
    previous = at
  }

  const span = last - first + 1
  const contiguity = (needle.length - runs) * 12
  const start = first === 0 ? 40 : isBoundary(hay, first) ? 25 : 0
  const spread = (span - needle.length) * 1.5

  const score = clamp(380 + contiguity + start + boundaryHits * 8 - spread, 200, 620)
  return { score: score - lengthPenalty, ranges: rangesFromPositions(positions) }
}

const mergeRanges = (ranges: [number, number][]): [number, number][] => {
  const merged: [number, number][] = []
  for (const [start, end] of [...ranges].sort((a, b) => a[0] - b[0])) {
    const last = merged.at(-1)
    if (last && start <= last[1]) last[1] = Math.max(last[1], end)
    else merged.push([start, end])
  }
  return merged
}

/**
 * Fallback for multi-word queries typed out of order ("server react"). Every
 * token must match, and the result always scores below a whole-query match.
 */
const matchTokens = (hay: string, tokens: string[]): Match | null => {
  let total = 0
  const ranges: [number, number][] = []

  for (const token of tokens) {
    const match = matchString(hay, token)
    if (!match) return null
    total += match.score
    ranges.push(...match.ranges)
  }

  return {
    score: clamp(total / tokens.length - 60, 150, 620),
    ranges: mergeRanges(ranges),
  }
}

const matchAgainst = (hay: string, needle: string, tokens: string[] | null): Match | null =>
  matchString(hay, needle) ?? (tokens ? matchTokens(hay, tokens) : null)

/* -------------------------------------------------------------------------- */
/* default (empty query) results                                              */
/* -------------------------------------------------------------------------- */

const asDefaultResult = (entry: SearchEntry): SearchResult => ({
  entry,
  score: 0,
  matchedOn: 'title',
  ranges: [],
  matchedText: entry.t,
})

/**
 * With no query there is nothing to rank, and dumping the whole index is
 * noise. The index carries no popularity signal, so the useful default is
 * *coverage*: round-robin one note at a time across topics, so the first
 * screenful shows the shape of the whole vault rather than the letter A.
 *
 * The palette prefers named hub notes over this, but it stays the fallback
 * for any caller without that list.
 */
const defaultResults = (index: SearchEntry[], limit: number): SearchResult[] => {
  const byTopic = new Map<string, SearchEntry[]>()
  for (const entry of index) {
    const bucket = byTopic.get(entry.k)
    if (bucket) bucket.push(entry)
    else byTopic.set(entry.k, [entry])
  }

  // Local copies, drained with `shift` — the index itself is never mutated.
  const queues = [...byTopic.values()]
  const out: SearchResult[] = []

  while (out.length < limit) {
    let drained = true
    for (const queue of queues) {
      const entry = queue.shift()
      if (!entry) continue
      drained = false
      out.push(asDefaultResult(entry))
      if (out.length >= limit) break
    }
    if (drained) break
  }

  return out
}

/* -------------------------------------------------------------------------- */
/* public API                                                                 */
/* -------------------------------------------------------------------------- */

export function searchNotes(index: SearchEntry[], query: string, limit = 20): SearchResult[] {
  const needle = fold(query.trim())
  if (!needle) return defaultResults(index, limit)

  const split = needle.split(/\s+/).filter(Boolean)
  const tokens = split.length > 1 ? split : null

  const results: SearchResult[] = []

  for (const entry of index) {
    const folded = foldedEntry(entry)

    let best: SearchResult | null = null

    const title = matchAgainst(folded.title, needle, tokens)
    if (title) {
      best = {
        entry,
        score: title.score,
        matchedOn: 'title',
        ranges: title.ranges,
        matchedText: entry.t,
      }
    }

    for (const alias of folded.aliases) {
      const match = matchAgainst(alias.folded, needle, tokens)
      if (!match) continue
      const score = match.score - 120
      if (best && best.score >= score) continue
      best = {
        entry,
        score,
        matchedOn: 'alias',
        ranges: match.ranges,
        matchedText: alias.raw,
      }
    }

    if (!best) {
      const at = folded.summary.indexOf(needle)
      if (at !== -1) {
        best = {
          entry,
          score: 150 - at * 0.05,
          matchedOn: 'summary',
          ranges: [[at, at + needle.length]],
          matchedText: entry.d,
        }
      }
    }

    if (best) results.push(best)
  }

  results.sort(
    (a, b) =>
      b.score - a.score || a.entry.t.length - b.entry.t.length || a.entry.t.localeCompare(b.entry.t)
  )

  return results.slice(0, limit)
}

/**
 * Split a string into alternating plain/highlighted segments using ranges
 * produced by {@link searchNotes}. Ranges are assumed sorted and disjoint.
 */
export function highlightSegments(
  text: string,
  ranges: [number, number][]
): { text: string; match: boolean }[] {
  if (!ranges.length) return [{ text, match: false }]

  const segments: { text: string; match: boolean }[] = []
  let cursor = 0
  for (const [start, end] of ranges) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false })
    segments.push({ text: text.slice(start, end), match: true })
    cursor = end
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false })
  return segments
}
