---
aliases:
  - Server-client boundary
tags:
  - web
summary: The line in an application where execution moves from the server to the browser.
---
The **client-server boundary** is the point at which code stops running on the server and starts running in the visitor's browser. In older architectures it coincided with the network request. In modern component frameworks it can sit inside a single page, at the granularity of a component.

Making it explicit has three effects. It determines what ships: everything on the client side of the line is downloaded, parsed, and executed by every visitor. It determines what is reachable: secrets, direct database access, and the filesystem exist on one side only. And it determines what must be serialisable, since only data crosses.

The boundary is where adapters belong. Data from a storage layer is typically shaped by that layer's constraints — optional fields typed as nullable, presentation values stored beside content, identifiers that mean nothing to the view. Converting that into the shape the interface actually wants, at the boundary, keeps storage concerns out of rendering code. Widening a view type to accept the storage layer's nullability is the tempting shortcut and it pushes the problem inward, defeating the point of having a boundary at all.

The commonest way it goes wrong is accidental: an import added for convenience drags a module across the line, and a large dependency lands in every visitor's bundle. Lint rules restricting which modules may be imported from which directories are the standard defence.

## See also
- [[React Server Components]]
- [[Module Graph]]
- [[Code Splitting]]
- [[Schema Drift]]
- [[Hydration]]
- [[Server-Side Rendering]]

## Related
- [[Performance Budget]]
- [[Lazy Loading]]
- [[Islands Architecture]]
