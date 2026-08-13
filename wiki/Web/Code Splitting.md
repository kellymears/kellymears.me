---
aliases:
  - Chunking
tags:
  - web
summary: Dividing an application bundle so a page downloads only the code it needs.
---
**Code splitting** breaks an application's JavaScript into separate files so a visitor downloads only what a given route or interaction requires. Without it, every page pays for every feature.

The mechanism is a boundary the [[Bundler]] recognises — usually a dynamic import — which becomes a split point. Everything reachable only through that import moves into its own chunk, fetched on demand.

The part that surprises people is that **splitting is a property of the module graph, not of intent**. Bundlers commonly group every client reference reachable from a route into one shared chunk, so a page that renders any member of that group pulls the whole group. A server-side dynamic import does not split anything, because it never produced a client reference. A dynamic import called from a server component may not either. The boundary has to sit inside a client module to have any effect. See [[Module Graph]] and [[Client-Server Boundary]].

This is why splitting must be *measured* rather than assumed. Two plausible refactors can both be byte-identical to the baseline. The verification is to build, download the chunks a page actually references, and search them for a marker from the code you meant to exclude.

## See also
- [[Tree Shaking]]
- [[Lazy Loading]]
- [[Performance Budget]]
- [[Ground Truth]]
- [[React Server Components]]

## Related
- [[Islands Architecture]]
- [[Server-Side Rendering]]
