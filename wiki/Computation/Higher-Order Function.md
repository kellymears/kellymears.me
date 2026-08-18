---
aliases:
  - HOF
tags:
  - computation
summary: A function that takes another function as an argument, returns one, or both.
---
**Higher-Order Function** is a function that treats functions as ordinary data: it accepts one or more as arguments, returns one as a result, or both. `map`, `filter`, and `reduce` are the canonical examples — each takes a function describing what to do per element and handles the looping itself, separating the traversal (fixed, boring, easy to get wrong by hand) from the per-element logic (the part that actually varies).

The requirement underneath is that functions be first-class values in the language — assignable to variables, passable as arguments, storable in data structures — which most languages have had for decades but which older or more restrictive ones (early Java, C without function pointers) made awkward. A callback, an event handler, a comparator passed to a sort function, and a middleware chain are all higher-order functions in disguise: something is accepting a function and deciding when to call it.

Higher-order functions are the mechanism [[Currying]] and function composition run on — composing `f` and `g` into a single function is itself a higher-order operation, since it takes two functions and returns a third. They're also where a [[Closure]] earns its keep: a function returned from another function typically needs to remember variables from the enclosing scope, and a closure is exactly that memory.

The risk is indirection outrunning its benefit — a codebase where every operation is expressed as a composition of tiny higher-order combinators can become harder to read than the loop it replaced, because a reader has to mentally execute the composition instead of just reading top to bottom. The `map`/`filter`/`reduce` trio earns its place by matching a shape readers already recognize; a bespoke higher-order abstraction has to earn that recognition the hard way, one reader at a time.

## See also
- [[Closure]]
- [[Currying]]
- [[Pure Function]]
- [[Recursion]]
