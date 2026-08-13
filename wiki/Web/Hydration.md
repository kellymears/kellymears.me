---
aliases:
  - Hydrating
tags:
  - web
summary: Attaching client-side behaviour to server-rendered markup without rebuilding it.
---
**Hydration** is the process by which a client framework takes over already-rendered HTML: it walks the existing [[Document Object Model]], attaches event handlers, and initialises its internal state so subsequent updates work — without discarding and re-creating the markup.

Its defining constraint is that the client's first render must **match** what the server produced. Where they differ you get a hydration mismatch, which frameworks report as an error and resolve by discarding the server's work. The usual causes are all forms of the same thing: the two environments disagreed about something. Current time. A random value. A user preference read from the browser. Anything derived from `window`.

Hydration is also the main cost of [[Server-Side Rendering]] as usually practised: the framework and every interactive component must be downloaded and executed before the page responds to input, so a page that *looked* ready is not. That gap is what [[Islands Architecture]], [[React Server Components]], and partial hydration all exist to shrink.

A subtler hazard: content rendered by the server and then mutated directly by the browser — by a text editor, an embedded map, a third-party widget — is invisible to the framework's model. A subsequent re-render diffs against a stale picture and duplicates or destroys elements. Keying the wrapper on a value that changes with the data, forcing a clean remount, is the usual escape.

## See also
- [[Client-Server Boundary]]
- [[contenteditable]]
- [[Critical Rendering Path]]
- [[Progressive Enhancement]]

## Related
- [[Lazy Loading]]
- [[Performance Budget]]
