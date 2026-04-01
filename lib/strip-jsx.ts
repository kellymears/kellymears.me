/**
 * Strip JSX components from MDX content, leaving plain markdown.
 * Used by both the CLI embed-data build script and the /api/cli route handler.
 */
export function stripJsx(content: string): string {
  return content
    .trim()
    .replace(/<[A-Z][A-Za-z]*\s*\/>/g, '') // self-closing JSX: <Component />
    .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, '') // JSX blocks: <Component>...</Component>
    .trim()
}
