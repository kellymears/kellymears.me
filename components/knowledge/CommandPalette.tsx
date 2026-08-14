'use client'

import {
  FALLBACK_TOPIC_COLOR,
  TOPIC_COLORS,
  TOPIC_ORDER,
  topicLabel,
} from '@/components/knowledge/graph-colors'
import {
  highlightSegments,
  searchNotes,
  type SearchEntry,
  type SearchResult,
} from '@/components/knowledge/search'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

/**
 * Expose a topic's hue as `--topic` / `--topic-dark` so utilities can pick the
 * right one per color scheme — dark mode here is class-based, so a single
 * resolved color would be wrong half the time.
 */
const topicVars = (topic: string): CSSProperties => {
  const color = TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR
  return { '--topic': color.light, '--topic-dark': color.dark } as CSSProperties
}

const RESULT_LIMIT = 24
const STARTING_POINTS = 6

/**
 * The vault's most-linked notes, highest degree first. Hand-listed because the
 * client index carries no degree field and shipping one for 201 entries to
 * order six rows isn't worth the bytes. Any slug that stops existing is simply
 * skipped, and the list falls back to a spread across topics.
 */
const HUB_SLUGS = ['silent-failure', 'ground-truth', 'determinism', 'vacuous-truth', 'tool-use']

/* -------------------------------------------------------------------------- */
/* items                                                                      */
/* -------------------------------------------------------------------------- */

type Item =
  | { kind: 'topic'; id: string; topic: string; href: string }
  | { kind: 'note'; id: string; result: SearchResult; href: string }
  | { kind: 'random'; id: string; href: null }

interface Section {
  title: string
  items: Item[]
}

/* -------------------------------------------------------------------------- */
/* pieces                                                                     */
/* -------------------------------------------------------------------------- */

function TopicChip({ topic }: { topic: string }) {
  return (
    <span
      style={topicVars(topic)}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    >
      <span
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
        aria-hidden="true"
      />
      {topicLabel(topic)}
    </span>
  )
}

function Highlighted({ text, ranges }: { text: string; ranges: [number, number][] }) {
  return (
    <>
      {highlightSegments(text, ranges).map((segment, i) =>
        segment.match ? (
          <mark
            key={i}
            className="decoration-primary-400/70 bg-transparent font-bold text-gray-900 underline decoration-2 underline-offset-2 dark:text-gray-100"
          >
            {segment.text}
          </mark>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        )
      )}
    </>
  )
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-gray-400 dark:text-gray-500"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function DiceIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8.5 8.5h.01M15.5 15.5h.01M12 12h.01" />
    </svg>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-[10px] font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
      {children}
    </kbd>
  )
}

/* -------------------------------------------------------------------------- */
/* palette                                                                    */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  index: SearchEntry[]
}

export function CommandPalette({ open, onClose, index }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement | null>(null)

  const trimmed = query.trim()

  const topics = useMemo(() => {
    const seen = [...new Set(index.map((entry) => entry.k))]
    return seen.sort((a, b) => {
      const ai = TOPIC_ORDER.indexOf(a)
      const bi = TOPIC_ORDER.indexOf(b)
      if (ai === -1 && bi === -1) return a.localeCompare(b)
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    })
  }, [index])

  const results = useMemo(
    () => (trimmed ? searchNotes(index, trimmed, RESULT_LIMIT) : []),
    [index, trimmed]
  )

  const starting = useMemo(() => {
    if (trimmed) return []

    const bySlug = new Map(index.map((entry) => [entry.s, entry]))
    const hubs = HUB_SLUGS.map((slug) => bySlug.get(slug)).filter(
      (entry): entry is SearchEntry => entry !== undefined
    )
    if (hubs.length) {
      return hubs.slice(0, STARTING_POINTS).map(
        (entry): SearchResult => ({
          entry,
          score: 0,
          matchedOn: 'title',
          ranges: [],
          matchedText: entry.t,
        })
      )
    }

    return searchNotes(index, '', STARTING_POINTS)
  }, [index, trimmed])

  const sections: Section[] = useMemo(() => {
    if (trimmed) {
      if (!results.length) return []
      return [
        {
          title: results.length === RESULT_LIMIT ? `Top ${RESULT_LIMIT} notes` : 'Notes',
          items: results.map((result) => ({
            kind: 'note' as const,
            id: `note-${result.entry.s}`,
            result,
            href: result.entry.p,
          })),
        },
      ]
    }

    return [
      {
        title: 'Domains',
        items: topics.map((topic) => ({
          kind: 'topic' as const,
          id: `topic-${topic}`,
          topic,
          href: `/knowledge/${topic}`,
        })),
      },
      {
        title: 'Starting points',
        items: starting.map((result) => ({
          kind: 'note' as const,
          id: `start-${result.entry.s}`,
          result,
          href: result.entry.p,
        })),
      },
      { title: 'Actions', items: [{ kind: 'random' as const, id: 'random', href: null }] },
    ]
  }, [trimmed, results, topics, starting])

  const items = useMemo(() => sections.flatMap((section) => section.items), [sections])

  // Reset on each open so the palette never reopens mid-thought.
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [trimmed])

  // Keep the highlighted row in view without scrolling the page behind it.
  useEffect(() => {
    if (!open) return
    const node = listRef.current?.querySelector('[data-active="true"]')
    node?.scrollIntoView({ block: 'nearest' })
  }, [active, open, items])

  // Warm the route the user is most likely to pick next.
  useEffect(() => {
    if (!open) return
    const href = items[active]?.href
    if (href) router.prefetch(href)
  }, [open, items, active, router])

  const go = useCallback(
    (item: Item | undefined) => {
      if (!item) return
      const href =
        item.kind === 'random' ? index[Math.floor(Math.random() * index.length)]?.p : item.href
      if (!href) return
      onClose()
      router.push(href)
    },
    [index, onClose, router]
  )

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const count = items.length
    const next = (delta: number) => {
      event.preventDefault()
      if (!count) return
      setActive((current) => (current + delta + count) % count)
    }

    if (event.key === 'ArrowDown' || (event.ctrlKey && event.key.toLowerCase() === 'n'))
      return next(1)
    if (event.key === 'ArrowUp' || (event.ctrlKey && event.key.toLowerCase() === 'p'))
      return next(-1)
    if (event.key === 'Home' && count) {
      event.preventDefault()
      return setActive(0)
    }
    if (event.key === 'End' && count) {
      event.preventDefault()
      return setActive(count - 1)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      go(items[active])
    }
  }

  let cursor = -1

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] dark:bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 flex justify-center overflow-hidden p-0 sm:p-6 sm:pt-[12vh]">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="flex h-dvh w-full flex-col overflow-hidden border-gray-200 bg-white shadow-2xl sm:h-auto sm:max-h-[70vh] sm:max-w-xl sm:rounded-2xl sm:border dark:border-gray-800 dark:bg-gray-900">
              <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 px-4 py-3.5 dark:border-gray-800">
                <SearchIcon />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onKeyDown}
                  role="combobox"
                  aria-expanded
                  aria-controls="knowledge-palette-list"
                  aria-activedescendant={items[active]?.id}
                  aria-label="Search the knowledge base"
                  placeholder="Search 200+ concept notes…"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full min-w-0 border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium text-gray-400 transition-colors hover:text-gray-600 sm:hidden dark:text-gray-500 dark:hover:text-gray-300"
                >
                  Close
                </button>
              </div>

              <div
                ref={listRef}
                id="knowledge-palette-list"
                role="listbox"
                aria-label="Search results"
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
              >
                {sections.map((section) =>
                  section.items.length ? (
                    <div key={section.title} className="pb-1">
                      <p className="px-4 pt-2 pb-1 text-[11px] font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
                        {section.title}
                      </p>
                      {section.items.map((item) => {
                        cursor++
                        const at = cursor
                        return (
                          <Row
                            key={item.id}
                            item={item}
                            active={at === active}
                            onHover={() => setActive(at)}
                            onSelect={() => go(item)}
                          />
                        )
                      })}
                    </div>
                  ) : null
                )}

                {trimmed && !results.length && (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Nothing matches &ldquo;{trimmed}&rdquo;
                    </p>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                      Try fewer characters, or browse the domains from the index.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        router.push('/knowledge')
                      }}
                      className="hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 mt-6 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300"
                    >
                      Browse all notes
                    </button>
                  </div>
                )}
              </div>

              <div className="hidden shrink-0 items-center gap-4 border-t border-gray-200 px-4 py-2 text-[11px] text-gray-400 sm:flex dark:border-gray-800 dark:text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd> navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <Kbd>↵</Kbd> open
                </span>
                <span className="inline-flex items-center gap-1">
                  <Kbd>esc</Kbd> close
                </span>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

/* -------------------------------------------------------------------------- */
/* row                                                                        */
/* -------------------------------------------------------------------------- */

interface RowProps {
  item: Item
  active: boolean
  onHover: () => void
  onSelect: () => void
}

function Row({ item, active, onHover, onSelect }: RowProps) {
  const className = clsx(
    'flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors sm:py-2',
    active ? 'bg-primary-50 dark:bg-primary-950/40' : 'bg-transparent'
  )

  const shared = {
    id: item.id,
    role: 'option' as const,
    'aria-selected': active,
    'data-active': active,
    onMouseMove: onHover,
    onClick: onSelect,
    className,
  }

  if (item.kind === 'topic') {
    return (
      <div {...shared} style={topicVars(item.topic)}>
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {topicLabel(item.topic)}
        </span>
        <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">Domain</span>
      </div>
    )
  }

  if (item.kind === 'random') {
    return (
      <div {...shared}>
        <span className="text-gray-400 dark:text-gray-500">
          <DiceIcon />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          Open a random note
        </span>
      </div>
    )
  }

  const { result } = item
  const { entry } = result
  const isAlias = result.matchedOn === 'alias'

  return (
    <div {...shared}>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
          {isAlias ? (
            <>
              <Highlighted text={result.matchedText} ranges={result.ranges} />
              <span className="text-gray-400 dark:text-gray-500"> → </span>
              <span className="text-gray-900 dark:text-gray-100">{entry.t}</span>
            </>
          ) : result.matchedOn === 'title' ? (
            <Highlighted text={entry.t} ranges={result.ranges} />
          ) : (
            <span className="text-gray-900 dark:text-gray-100">{entry.t}</span>
          )}
        </p>
        {entry.d && (
          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
            {result.matchedOn === 'summary' ? (
              <Highlighted text={entry.d} ranges={result.ranges} />
            ) : (
              entry.d
            )}
          </p>
        )}
      </div>
      <TopicChip topic={entry.k} />
    </div>
  )
}

export default CommandPalette
