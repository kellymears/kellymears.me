---
aliases:
  - Render-blocking
tags:
  - web
summary: The sequence of steps between receiving HTML and painting pixels, and everything that blocks it.
---
The **critical rendering path** is the chain of work a browser must complete before it can paint: parse the HTML, fetch and parse the stylesheets, build the render tree, lay out, and paint. Anything that must finish before that chain can proceed is *render-blocking*, and the length of the chain is what a visitor experiences as load time.

Stylesheets are render-blocking by default — the browser will not paint content it might have to restyle. Synchronous scripts in the head block parsing. Fonts introduce their own delay, since text using an unavailable font is either invisible or shown in a fallback and then reflowed; see [[Web Font Loading]].

The optimisations follow from the structure: inline the small amount of CSS needed for the first screen and load the rest asynchronously, defer scripts, preload resources that the browser could not otherwise discover until late, and avoid *chained* requests — a stylesheet that imports another stylesheet that references a font is three round trips deep before anything paints.

Preloading is worth a caution: it is a hint the framework must actually emit. Preload directives can silently stop being emitted across a framework upgrade, putting resources back into the chain with no error anywhere — a [[Silent Failure]] that only a look at the served HTML reveals.

## See also
- [[Core Web Vitals]]
- [[Lazy Loading]]
- [[Web Font Loading]]
- [[Server-Side Rendering]]
- [[Hydration]]

## Related
- [[React Server Components]]
- [[Islands Architecture]]
- [[Streaming Response]]
