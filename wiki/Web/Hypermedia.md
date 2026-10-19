---
aliases:
  - HATEOAS
  - htmx
  - HTML over the wire
tags:
  - web
summary: The idea that a server's responses should carry the links and forms that say what can be done next, the original architecture of the web, and its revival as an alternative to JavaScript-heavy apps.
---
**Hypermedia** is media, text, images, documents, that contains controls for navigating to or acting on other resources: links and forms. The web is the largest hypermedia system ever built. Its core idea is that a server's response doesn't only carry data; it also tells the client what it can do next.

An ordinary HTML page shows this. A product page contains the product's details, plus a form to add it to the cart, and links to reviews and related items. The browser knows nothing about shopping. It just renders what it's given and follows whichever link or form the user picks. The server can add a feature, remove one, or change a URL, and every browser picks up the change on the next load, because the controls arrive with the content; see [[World Wide Web]].

Roy Fielding described this in his 2000 dissertation defining REST, the architectural style behind the web's design; see [[Hypertext Transfer Protocol]]. One of its constraints has an unwieldy name, **HATEOAS** (hypermedia as the engine of application state): clients move through an application by following links found in responses, not by knowing URLs in advance. Most APIs that call themselves RESTful ignore it, returning plain [[JSON]] and expecting clients to hard-code the URLs, which Fielding has complained about for years.

The rise of the [[Single-Page Application]] moved the web away from hypermedia. The server sends data; client-side JavaScript decides what controls to show and builds the HTML; see [[State Management]]. That brought richer interactivity at the price of large bundles, duplicated logic on client and server, and broken basics like the back button; see [[Performance Budget]].

A revival, sometimes called **HTML over the wire**, pushes back. Libraries such as htmx (2020) extend HTML so that any element, not just links and forms, can make a request and swap in a fragment of HTML from the server: a button that replaces one row of a table, a search box that updates results as you type. Turbo, LiveView, and similar tools send server-rendered fragments over a [[WebSocket]]. The server keeps the logic and state, and the client stays thin; see [[Server-Side Rendering]].

The trade-offs are real in both directions. Hypermedia suits applications that are mostly documents and forms, which is most of them; it struggles with highly interactive interfaces, offline use, or anything that must respond without a round trip; see [[Optimistic UI]] and [[Local-First Software]]. Hybrid approaches, server components and islands of interactivity in otherwise static pages, try to get both; see [[Islands Architecture]] and [[React Server Components]].

The idea predates the web: hypertext systems from the 1960s onward explored linked documents, some more ambitiously than the web does; see [[Project Xanadu]].

## See also
- [[OpenAPI]]
- [[Mosaic]]
