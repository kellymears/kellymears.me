---
aliases:
  - Curried Function
tags:
  - computation
summary: Transforming a function of several arguments into a chain of one-argument functions, each returning the next.
---
**Currying** rewrites a function that takes multiple arguments into a sequence of functions that each take exactly one, so `add(a, b)` becomes `add(a)(b)` — calling `add(a)` doesn't compute anything yet, it returns a new function waiting for `b`. The name honors logician Haskell Curry, though the technique traces further back to Moses Schönfinkel; Haskell the language (named after the same person) curries every function by default, so `add : Int -> Int -> Int` is really a function returning a function, and there's no separate multi-argument function type to begin with.

The practical use is partial application: calling a curried function with fewer arguments than its total gives back a specialized function with those arguments locked in. `const double = multiply(2)` reads naturally once `multiply` is curried, and is the same operation whether it's spelled with true currying or with a library helper (`_.curry`, `Function.prototype.bind`) bolted onto a language that doesn't curry by default, like JavaScript.

Currying is easy to conflate with partial application generally, but they're distinct: partial application can fix any subset of arguments in any order on an ordinary multi-argument function, while currying specifically means the function only ever takes them one at a time, and partial application falls out of that as a special case — nothing built-in is required to "partially apply" a curried function, calling it with too few arguments already does it.

The cost is ergonomic, not conceptual: a curried function called with the wrong number of arguments at each step tends to fail silently by returning a function instead of raising an obvious "wrong arity" error, which is a rough edge in dynamically typed languages that Haskell's type checker closes off entirely.

## See also
- [[Higher-Order Function]]
- [[Closure]]
- [[Pattern Matching]]
- [[Pure Function]]
