---
aliases:
  - Web Workers
tags:
  - web
summary: A background thread for running JavaScript off the main thread, with no access to the DOM.
---
**Web Worker** runs a JavaScript file on a separate thread from the page's main thread, so a genuinely expensive computation — parsing a large file, running a physics simulation, image processing — doesn't block scrolling, clicking, or rendering while it runs. JavaScript's usual single-threaded model is what makes this necessary in the first place: one long synchronous function on the main thread freezes the entire page for its duration, no matter how responsive the rest of the code is.

The tradeoff that defines what a worker is *for* is that it has no access to the [[Document Object Model]] at all — it can't touch an element, read layout, or call a DOM API. It communicates with the main thread purely through message passing: `postMessage` sends a value across (structured-cloned, not shared by reference, so mutating an object on one side doesn't affect the other's copy), and a `message` event delivers it. This makes a worker suitable for pure computation and unsuitable for anything that needs to read or write the page directly — which is most UI work, and exactly why workers are a niche tool rather than a default.

A [[Service Worker]] is a specialized sibling, not a general-purpose worker: same off-main-thread, no-DOM-access model, but scoped to intercepting network requests for an origin and capable of outliving the page that registered it, where a plain Web Worker dies when its page does and exists to compute, not to proxy the network.

`SharedWorker` is a third variant, reachable from multiple tabs of the same origin at once, useful for coordinating state across tabs without each one running its own duplicate worker — though its main-thread access restriction is identical to a plain worker's.

## See also
- [[Service Worker]]
- [[Document Object Model]]
- [[Debounce and Throttle]]
- [[Performance Budget]]

## Related
- [[Optimistic UI]]
