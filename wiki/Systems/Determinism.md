---
aliases:
  - Reproducibility
  - Deterministic build
tags:
  - systems
summary: The property that identical inputs produce identical outputs, and the foundation of caching and verification.
---
**Determinism** is the property that the same inputs always produce the same output. It is what makes caching sound, comparison meaningful, and bisection possible — a reproducible build lets you assert that a local artifact and a deployed one are the same thing rather than hoping.

Achieving it means eliminating the ordinary sources of variance: timestamps, random values, iteration order over unordered collections, absolute paths, parallel scheduling, locale, and anything read from the environment. Systems that need determinism usually forbid the clock and the random generator outright and require such values to be supplied as inputs.

Determinism also has a *tolerance* dimension worth knowing. Numeric computation on a graphics processor can vary by a single unit in the last place between runs, for reasons that are genuinely environmental rather than a code defect. That means a byte-exact comparison of rendered output can fail intermittently on unchanged code — and the way to establish which it is, is to compare the *inputs* rather than the outputs, and to confirm that an older binary flakes identically.

Where full determinism is not achievable, the fallback is to isolate the non-deterministic part behind a recorded boundary; see [[Record and Replay Testing]] and [[Seeded Randomness]].

## See also
- [[Fingerprint]]
- [[Hash Function]]
- [[Flaky Test]]
- [[Nondeterminism]]
- [[Bundler]]
- [[Cache Invalidation]]

## Related
- [[Procedural Generation]]
- [[Reproducible Case]]
