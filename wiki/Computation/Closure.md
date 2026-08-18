---
aliases:
  - Lexical Closure
tags:
  - computation
summary: A function bundled with the variables from its enclosing scope at the point it was created.
---
**Closure** is a function value that carries a reference to the variables it used from its enclosing scope, so those variables stay alive and visible to the function even after the scope that declared them has otherwise finished executing. `function counter() { let n = 0; return () => ++n; }` returns a closure: the returned arrow function keeps `n` alive across calls, private to that one instance, with no other way to reach it.

The mechanism is lexical scoping resolved at creation time, not call time: the closure captures the variable, not a copy of its value at that moment, which is why the classic loop-variable bug exists — a closure created inside a `for (var i ...)` loop in JavaScript captures the single shared `i`, so all the closures see whatever `i` ended up being after the loop ended, not the value at each iteration. `let` (block-scoped) fixes this by creating a fresh binding per iteration; understanding why is the fastest way to actually understand closures rather than just use them.

Closures are the usual way to fake private state in languages without a `private` keyword: the counter example above has no way for outside code to read or set `n` directly, only through the function that closed over it. This is the same trick module patterns in older JavaScript relied on before ES modules existed.

The cost is that a closure keeps its captured variables alive for as long as the closure itself is reachable, which can pin down more memory than expected if a closure retains a large object it only needed briefly — a common source of memory leaks in long-lived event handlers or caches built out of closures rather than an explicit data structure.

## See also
- [[Higher-Order Function]]
- [[Currying]]
- [[Pure Function]]
- [[Lazy Evaluation]]
