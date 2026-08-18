---
aliases:
  - Referential Transparency
tags:
  - computation
summary: A function whose output depends only on its input and which causes no observable effect outside itself.
---
**Pure Function** describes a function with two properties: given the same input, it always returns the same output, and calling it causes no observable side effect — no mutation of shared state, no I/O, nothing the caller has to know happened besides the return value. `Math.sqrt` is pure; `console.log` is not, and neither is any function that calls it internally, because impurity is contagious upward through the call graph.

The property this buys is referential transparency: any call to a pure function can be replaced by its result without changing the program's behavior. That license is what makes [[Memoization]] safe (caching only works if the same input always deserves the same cached output), what makes reordering or parallelizing calls safe (there's no hidden ordering dependency on side effects), and what makes a unit test for the function complete — there's no ambient state to set up or tear down, only inputs and an expected output.

Purity is a spectrum in practice, not a binary most real programs commit to fully. A function can be "locally pure" — mutating a value it allocated itself and returns, never touching anything the caller owns — and still get most of the reasoning benefit, which is the compromise most functional-leaning code in imperative languages actually makes. Haskell pushes purity furthest, using the type system (the `IO` type) to statically wall off anything impure so a function's signature discloses whether it can misbehave.

The common failure mode is a function that looks pure — takes arguments, returns a value — but secretly reads a mutable global, the system clock, or random state. It passes a casual read but breaks every downstream assumption that depends on purity, usually surfacing as a test that passes alone and fails in a suite, or a cache that serves stale results.

## See also
- [[Immutability]]
- [[Memoization]]
- [[Determinism]]
- [[Higher-Order Function]]
- [[Closure]]
