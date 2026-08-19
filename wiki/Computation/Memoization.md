---
aliases:
  - Memoize
tags:
  - computation
summary: Caching a function's result against its input so a repeat call with the same input skips recomputation.
---
**Memoization** caches a [[Pure Function]]'s return value keyed by its arguments, so a second call with the same arguments returns the cached result instead of recomputing it. It's only sound for pure functions — a memoized wrapper around a function whose output can change for the same input (reads the clock, reads a mutable global) will happily serve a stale answer with no way to know it's wrong, since the cache has no way to detect the function's real dependency changed.

The classic demonstration is recursive Fibonacci: computed naively, `fib(n)` makes exponentially many redundant calls, because `fib(n-2)` gets recomputed from scratch by both `fib(n-1)` and the direct call from `fib(n)`. Memoizing each `fib(k)` the first time it's computed collapses that to linear work, with no change to the recursive structure of the code itself — the technique is a pure add-on, not a rewrite.

This is the exact overlap point with [[Dynamic Programming]]: memoization applied systematically to a recursive definition, so that every overlapping subproblem is computed once, *is* the top-down form of dynamic programming. The bottom-up form builds the same table by iterating from the base cases forward instead of recursing down and caching on the way back up; both compute the same values, and the choice between them is usually about which is easier to write correctly for a given recurrence, not about performance.

The failure modes are a cache with no eviction policy — a memoized function called with unboundedly many distinct arguments over a long-running process leaks memory exactly like any unbounded cache, and needs a [[Least Recently Used Cache]] or similar bound — and, more subtly, memoizing something that looks pure but has a hidden dependency: memoizing a function of a mutable object's *reference* rather than its *contents* will serve a stale result the moment the object is mutated in place, since the cache key never changed even though the meaningful input did.

## See also
- [[Dynamic Programming]]
- [[Pure Function]]
- [[Recursion]]
- [[Least Recently Used Cache]]
