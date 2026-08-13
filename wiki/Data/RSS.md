---
aliases:
  - Feeds
  - Atom
tags:
  - data
summary: A syndication format letting readers subscribe to a site without an intermediary.
---
**RSS** — and its sibling Atom — is an XML format publishing a list of items with titles, links, dates, and content, so that a reader application can poll a site and present new entries. It is the web's original subscription mechanism and remains the only widely-implemented one that involves no platform between publisher and reader.

Its persistence is a matter of properties rather than nostalgia. A feed is a static file. It requires no account, no algorithm, and no permission. Nothing about it can be changed by a third party, and a reader's subscription list is theirs. Podcasting runs on it entirely.

Implementation is simple enough to be worth doing by hand: generate the XML in the same pass that generates the site, one feed for everything and optionally one per tag. The details that matter are stable item identifiers, correctly formatted dates, absolute links, and — the perennial bug — properly escaping content so that markup in a post does not break the document.

Because the format is machine-readable and low-friction, it is also a decent general-purpose data channel: any list of dated items with links can be published this way.

## See also
- [[Static Site Generation]]
- [[Structured Data]]
- [[Search Engine Optimization]]
- [[Markdown]]

## Related
- [[Server-Side Rendering]]
- [[Semantic HTML]]
- [[Frontmatter]]
- [[Progressive Enhancement]]
- [[Knowledge Graph]]
- [[Incremental Static Regeneration]]
