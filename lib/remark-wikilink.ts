import { slug as slugifyHeading } from 'github-slugger'
import type { PhrasingContent, Root, Text } from 'mdast'
import { SKIP, visit } from 'unist-util-visit'

interface WikilinkTarget {
  path: string
  slug: string
}

interface RemarkWikilinkOptions {
  /**
   * Resolve a wikilink target (the part before `|` or `#`) to a note. Passed in
   * rather than imported so this plugin stays free of a cycle with lib/knowledge.
   */
  resolve: (target: string) => WikilinkTarget | undefined
}

/** `[[Target]]`, `[[Target|Label]]`, `[[Target#Heading]]`, `[[Target#Heading|Label]]`. */
const WIKILINK_PATTERN = /\[\[([^\]|#]+)(?:#([^\]|]*))?(?:\|([^\]]*))?\]\]/g

/**
 * Rewrite Obsidian-style wikilinks in text nodes into mdast links. `code` and
 * `inlineCode` are separate node types, so text inside them is never visited.
 */
const remarkWikilink =
  (options: RemarkWikilinkOptions) =>
  (tree: Root): void => {
    const { resolve } = options

    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return
      if (!node.value.includes('[[')) return

      const replacement: PhrasingContent[] = []
      let cursor = 0
      WIKILINK_PATTERN.lastIndex = 0

      for (const match of node.value.matchAll(WIKILINK_PATTERN)) {
        const start = match.index ?? 0
        if (start > cursor) {
          replacement.push({ type: 'text', value: node.value.slice(cursor, start) })
        }
        cursor = start + match[0].length

        const target = (match[1] ?? '').trim()
        const heading = (match[2] ?? '').trim()
        const label = (match[3] ?? '').trim() || target
        const resolved = resolve(target)

        if (!resolved) {
          replacement.push({ type: 'text', value: label })
          continue
        }

        replacement.push({
          type: 'link',
          url: heading ? `${resolved.path}#${slugifyHeading(heading)}` : resolved.path,
          children: [{ type: 'text', value: label }],
          data: { hProperties: { 'data-wikilink': resolved.slug } },
        })
      }

      if (replacement.length === 0) return
      if (cursor < node.value.length) {
        replacement.push({ type: 'text', value: node.value.slice(cursor) })
      }

      parent.children.splice(index, 1, ...replacement)
      return [SKIP, index + replacement.length]
    })
  }

export { remarkWikilink }
export type { RemarkWikilinkOptions, WikilinkTarget }
