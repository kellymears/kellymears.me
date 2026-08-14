---
aliases:
  - Monadic
  - Bind operation
tags:
  - computation
summary: A wrapper type with a way to lift a value in and a way to chain functions that return more wrappers.
---
**Monad** is a shape a type can have: a container `M` with two operations. One wraps an ordinary value — spelled `of`, `unit`, or `return`. The other, `bind` or `flatMap`, takes an `M<A>` and a function from `A` to `M<B>` and produces an `M<B>`, flattening the nesting that would otherwise pile up. Three laws constrain them.

The laws are unremarkable once stated. Wrapping a value and then binding a function equals applying the function directly; binding the wrapping operation leaves the container unchanged; chained binds may be regrouped without changing the result. Together they say the container contributes nothing of its own beyond the chaining.

The shape is everywhere. A list's `flatMap` is the monad whose wrapper is "zero or more values". An option or result type is the one whose wrapper is "a value, or a reason there isn't one", and its bind short-circuits, which is what makes error propagation with a `?` operator work. Promises are the usual near-miss: `then` auto-flattens and also accepts plain values, so a promise of a promise cannot exist and the identity laws fail at the corners.

The laws buy a licence to refactor: regrouping cannot change meaning, so a sub-chain can be extracted into a named helper without argument about semantics. They are also testable as properties, one of the few places a [[Unit Test]] checks an algebraic claim rather than an example.

The word is the obstacle. It arrives from category theory, and the definitions imported with it are accurate and useless to someone who wants to chain fallible operations — a failure of [[Naming]] and of [[Plain Language]], not of the idea. The payoff is modest and real: absence made explicit in the type instead of a null return, a structured [[Fail Fast]] where there would otherwise be a [[Silent Failure]].

## See also
- [[Schema Validation]]
- [[Defensive Default]]
- [[Naming]]
- [[Idempotence]]
- [[Fail Fast]]
