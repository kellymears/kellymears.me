---
aliases:
  - RSC
  - Server Components
tags:
  - web
summary: Components that execute only on the server and never ship their code to the browser.
---
**React Server Components** are components that run exclusively on the server. They can read a database, use the filesystem, and hold secrets, and their code is never sent to the browser — the client receives a serialised description of their output instead of the logic that produced it.

The model's value is that it makes the [[Client-Server Boundary]] explicit and per-component rather than per-route. A page can be almost entirely server-rendered with a few interactive leaves, and only those leaves cost the visitor any JavaScript. This is a substantial change from conventional [[Server-Side Rendering]], where the whole tree ships regardless.

The rules that follow are strict by necessity. Anything crossing the boundary must be serialisable, so functions and class instances cannot be passed to a client component. Hooks and event handlers require a client component, marked explicitly. And a client component's imports are all client code — including anything it imports transitively, which is how a single innocuous import can put a large library into the visitor's bundle. See [[Module Graph]] and [[Code Splitting]].

Server components also interact with data freshness: since they render on the server, caching and revalidation decide how current the output is, which makes [[Incremental Static Regeneration]] and [[Cache Invalidation]] part of the component model rather than infrastructure beneath it.

## See also
- [[Hydration]]
- [[Islands Architecture]]
- [[Performance Budget]]
- [[Lazy Loading]]
