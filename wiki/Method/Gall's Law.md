---
aliases:
  - Gall's Law of Systems
tags:
  - method
summary: A complex system that works evolved from a simple system that worked; a complex system built from scratch never does.
---
**Gall's Law**, from systems theorist John Gall's *Systemantics*, states that a complex system that works is invariably found to have evolved from a simple system that worked, and a complex system designed from scratch never works and cannot be patched into working — you have to start over from a working simple system. It's a claim about the *path* to a working complex system, not about complex systems being bad.

The reasoning is that a working system, however simple, has already survived contact with reality — its assumptions have been tested, its edge cases have shown up and been handled, and its interfaces have proven they compose. Layering complexity onto that foundation adds one variable at a time onto ground already known to hold. A system designed complex from day one has to get every one of those interactions right simultaneously, with no working substrate to validate any single piece against, which is why big-bang rewrites so reliably produce something worse than what they replaced even when every individual design decision looked reasonable on a whiteboard.

The internet is the standard example: it grew from a simple point-to-point protocol connecting a handful of research machines into a system with load balancers, CDNs, and encrypted global routing — but every layer was added onto a version that already worked, one increment at a time, never redesigned wholesale. Compare that to a "big design up front" enterprise system that ships eighteen months late because integration only happens once, at the very end, on components that were each built as if the others didn't exist.

The corollary for software architecture is to build the smallest version that actually does the job, ship it, and let the next layer of complexity respond to something that working version taught you — rather than designing for scale, extensibility, or edge cases a system hasn't encountered yet. This is the standing argument against a premature [[Second-System Effect]], and it's a large part of why [[Minimum Viable Product]] works as a strategy rather than merely a shortcut.

## See also
- [[Second-System Effect]]
- [[Minimum Viable Product]]
- [[Worse Is Better]]
- [[Technical Debt]]

## Related
- [[Path Dependence]]
