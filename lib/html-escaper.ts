const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const escape = (str: string) => str.replace(/[&<>"']/g, (ch) => htmlEscapes[ch]!)

export { escape }
