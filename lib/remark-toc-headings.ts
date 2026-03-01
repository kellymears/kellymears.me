import { slug } from 'github-slugger'
import type { Root } from 'mdast'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

interface TocHeading {
  value: string
  url: string
  depth: number
}

const extractTocHeadings = async (markdown: string): Promise<TocHeading[]> => {
  const headings: TocHeading[] = []

  const tree = remark().parse(markdown)

  visit(tree, 'heading', (node) => {
    const text = toString(node)
    headings.push({
      value: text,
      url: `#${slug(text)}`,
      depth: node.depth,
    })
  })

  return headings
}

export type { TocHeading }
export { extractTocHeadings }
