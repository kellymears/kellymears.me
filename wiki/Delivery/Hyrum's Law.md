---
aliases:
  - Law of implicit interfaces
  - The Hyrum's Law
tags:
  - delivery
summary: With enough users, every observable behavior of an interface becomes a dependency for somebody.
---
**Hyrum's law** states that with a sufficient number of users of an interface, every observable behavior of that interface will be depended upon by somebody, regardless of what the interface's contract promises. The observation, attributed to a Google engineer named Hyrum Wright, does not distinguish between behavior a specification documents and behavior that merely happens to be true of one implementation — error wording, iteration order, timing, even outright bugs. Enough callers, and all of it becomes load-bearing.

This makes "it was never part of the documented contract" a weak defense when a change breaks someone. The claim is often true and beside the point: [[Documentation Rot]] means the written contract rarely covers every observable property, and a caller who noticed a convenient regularity has no way to know whether it was intentional. Removing an undocumented behavior is not obviously safer than removing a documented one; it is only less defensible, because the maintainer can point to a specification and call the breakage someone else's mistake. The underlying fault is the kind [[Chesterton's Fence]] warns against — a change made without knowing what depends on the thing removed produces a [[Regression]] that looks unrelated to its cause. Catching the dependency in [[Code Review]], or tracing a [[Root Cause Analysis]] back to the exact caller, is far cheaper than discovering it in production.

Versioning schemes exist partly to manage this. A [[Semantic Versioning]] major bump signals that behavior, documented or not, may change, and a [[Deprecation]] window gives dependents time to notice and adjust before it does. Neither eliminates Hyrum's law — a minor version can still break someone who relied on accidental behavior — but both convert a [[Silent Failure]] into an announced one, which is the most a maintainer can reasonably offer.

## See also
- [[Semantic Versioning]]
- [[Deprecation]]
- [[Chesterton's Fence]]
- [[Documentation Rot]]
- [[Regression]]
