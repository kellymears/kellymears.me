import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'

let activeWidth = 80

marked.use(
  markedTerminal({
    reflowText: true,
    showSectionPrefix: false,
    tab: 2,
  }) as Parameters<typeof marked.use>[0]
)

// Override hr after marked-terminal to avoid full-width dash lines
marked.use({
  renderer: {
    hr: () => '\n \n' + '╌'.repeat(Math.min(activeWidth, 40)) + '\n \n',
  },
})

/**
 * Strip leading whitespace from a line, preserving any ANSI escape codes.
 * marked-terminal wraps text in ANSI codes (e.g. \x1b[0m), so plain
 * trimStart() sees the escape sequence as the first character and skips it.
 */
function stripLeading(line: string): string {
  return line.replace(/^(\s|\x1b\[[0-9;]*m)+/, (match) => {
    return match.replace(/\s+/g, '')
  })
}

export function renderMarkdown(source: string, width: number): string {
  activeWidth = width
  // @ts-expect-error marked-terminal reads width from global options
  marked.setOptions({ width })

  const rendered = marked.parse(source) as string

  return rendered
    .trim()
    .split('\n')
    .map((line) => {
      const trimmed = stripLeading(line)
      // Preserve blank lines as a single space so Ink renders them as 1-line-tall
      return trimmed || ' '
    })
    .join('\n')
    .replace(/\n( \n){2,}/g, '\n \n') // collapse runs of blank lines to one
    .trim()
}
