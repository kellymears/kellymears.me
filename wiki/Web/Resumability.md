---
aliases:
  - Resumable rendering
tags:
  - web
summary: A way of making server-rendered pages interactive without replaying the application in the browser, by writing its state and event wiring into the HTML so the client picks up where the server stopped.
---
**Resumability** is an approach to making a server-rendered page interactive without rerunning the application in the browser. The server renders the page, then writes into the HTML everything the client would otherwise have to rebuild: application state, which elements have listeners, and where the code for each handler lives. The browser resumes from that point instead of starting over.

The contrast is with hydration, the standard technique. A hydrated page arrives as finished HTML, but the framework then downloads the code for every component on it, runs those components again to rebuild its internal picture of the page, and attaches event listeners. That repeated work grows with page size and lands on the main thread just as the user starts to interact; see [[Hydration]] and [[Long Task]]. Resumability aims to make startup cost close to constant regardless of how large the page is.

The idea is most associated with Qwik, a framework created by Miško Hevery, the original author of AngularJS, and released in a 1.0 version in 2023. Its mechanics show what resumability demands:

- **Serialized state.** Component state and reactive subscriptions are written into the page as data, so nothing has to be recomputed; see [[Serialization]] and [[Reactive Signals]].
- **One global listener.** A small loader, about a kilobyte, listens for events at the document level and reads attributes on the target to find which handler to load; see [[Event Delegation]].
- **Code on demand.** Each handler is its own small chunk, fetched the first time it's needed. A button nobody clicks never costs any JavaScript; see [[Code Splitting]] and [[Lazy Loading]].

The constraints are real. Anything the server serializes must be representable as data, which is awkward for closures that capture local variables, so the framework's compiler rewrites code to extract handlers and record what they capture; see [[Closure]]. Fetching code on first interaction can make that first click slow on a poor connection, which Qwik addresses by prefetching likely handlers in the background, often through a service worker.

Resumability sits on a spectrum of answers to the same problem. Islands hydrate only the interactive regions of a mostly static page; see [[Islands Architecture]]. Server components keep some components on the server entirely, so their code never ships; see [[React Server Components]]. Resumability goes further by skipping the replay even for interactive parts.

Whether the saving matters depends on the page. On small sites hydration is cheap, while on large, interaction-heavy pages it can dominate the time before a page responds to input, a delay that shows up in responsiveness metrics; see [[Core Web Vitals]].

The underlying observation is older than any framework: the server already did the work, so the client shouldn't repeat it.

## See also
- [[Server-Side Rendering]]
- [[Progressive Enhancement]]
