import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

const remarkCodeTitles = () => (tree: Root) => {
  visit(tree, 'code', (node, index, parent) => {
    const lang = node.lang
    if (!lang || !parent || index === undefined) return

    const [language, title] = lang.split(':')
    if (!title) return

    node.lang = language

    parent.children.splice(index, 0, {
      type: 'html',
      value: `<div class="remark-code-title">${title}</div>`,
    } as never)
  })
}

export { remarkCodeTitles }
