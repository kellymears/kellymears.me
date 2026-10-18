---
aliases:
  - COOP
  - COEP
  - SharedArrayBuffer
  - Site isolation
tags:
  - web
summary: The opt-in state, set with two HTTP headers, in which a page shares its process with nothing it didn't choose, required since the Spectre attacks before browsers allow shared memory and precise timers.
---
**Cross-origin isolation** is a state a web page opts into, using two HTTP headers, in which the browser guarantees that nothing from another site shares its process unless that site explicitly agreed. In exchange, the page gets access to powerful features that were withdrawn from the web in 2018: shared memory between threads and high-precision timers.

The story starts with Spectre. In January 2018, researchers showed that a CPU's speculative execution leaves traces in its caches that a program can measure, letting it read memory it shouldn't; see [[Speculative Execution]]. On the web, this meant JavaScript could potentially read anything else in the same browser process: another site's page loaded in an [[Iframe]], or an image or data file fetched from another origin. The [[Same-Origin Policy]] blocks a script from *asking* for that data, but Spectre reads it through the hardware, below where the policy applies.

Browsers responded in three ways:

- **Coarser timers.** The attack needs to time memory accesses precisely, so `performance.now()` was rounded and jittered.
- **No shared memory.** `SharedArrayBuffer`, which lets a [[Web Worker]] and the main thread share memory, can be used to build an extremely precise timer, so browsers disabled it.
- **Site isolation.** Chrome and later Firefox moved to putting each site in its own operating-system process, so there's less in any one process to steal; see [[Process]] and [[Browser Engine]].

Cross-origin isolation is how a page earns the features back. It sets two headers:

- **Cross-Origin-Opener-Policy (COOP)**: `same-origin` means windows from other sites that this page opens, or that opened it, get a separate browsing context group, so they can't hold references to each other.
- **Cross-Origin-Embedder-Policy (COEP)**: `require-corp` means every resource the page loads from another origin must explicitly consent to being embedded, through [[Cross-Origin Resource Sharing]] or a Cross-Origin-Resource-Policy header.

With both set, the browser can safely give the page its own process containing only resources that agreed to be there, and restores `SharedArrayBuffer` and finer timers.

Who needs this: applications compiled to [[WebAssembly]] that use threads, such as games, video editors, and ports of desktop software; and pages doing heavy computation across workers. Most ordinary sites don't.

The cost is the embedding requirement. A page that turns on COEP breaks every third-party image, script, or embed whose server doesn't send the right headers, often ads, analytics, and video players; see [[Third-Party Script]]. A later `credentialless` mode eased this by loading such resources without cookies instead of blocking them; see [[HTTP Cookie]].

The episode shows how a hardware flaw can reshape a platform's APIs years later, and how security features on the web usually arrive as opt-in headers, like [[Content Security Policy]] and [[HTTP Strict Transport Security]], because changing defaults would break the existing web; see [[Backward Compatibility]].

## See also
- [[Browser Fingerprinting]]
- [[Web Standards]]
