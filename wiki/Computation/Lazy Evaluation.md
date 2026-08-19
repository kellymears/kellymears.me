---
aliases:
  - Call-by-need
  - Non-strict Evaluation
tags:
  - computation
summary: Deferring a computation until its result is actually needed, and then caching it so it never runs twice.
---
**Lazy Evaluation** delays computing an expression until the moment its value is demanded, rather than at the point it's written or bound. Haskell is the mainstream example built entirely on it: `let xs = [1..]` binds an infinite list without looping forever, because nothing forces any element until something downstream asks for it — `take 5 xs` only ever computes the first five.

The mechanism underneath is a thunk: a suspended computation plus, once evaluated, a memoized slot for the result, so a lazy value is computed at most once no matter how many times it's referenced. This is what separates laziness from simply writing the computation later — call-by-name evaluation defers the work too but repeats it on every use, while call-by-need (the usual meaning of "lazy" in practice) defers and then caches.

Laziness composes well with infinite or self-referential structures — an infinite stream, a fixed point defined in terms of itself — because nothing forces the whole structure to exist before use. It composes badly with side effects: if a lazy binding's evaluation is deferred past the point its side effect was meant to happen, the program's I/O order stops matching its source order, which is a large part of why Haskell segregates effects into `IO` and [[Monad|monadic]] sequencing rather than letting them leak into ordinary lazy bindings.

Most languages are strict by default (arguments evaluated before a call) and opt into laziness locally — a generator in Python, an `IEnumerable` in C#, a stream in Java — rather than making it the whole evaluation model. The local version buys the same "don't compute what you don't use" benefit without the global reasoning cost, which is why it's far more common in practice than a fully lazy language.

## See also
- [[Closure]]
- [[Memoization]]
- [[Pure Function]]
- [[Recursion]]
- [[Determinism]]
