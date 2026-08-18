---
aliases:
  - Immutable Data
tags:
  - computation
summary: A value that cannot change after construction, so sharing it never risks a caller seeing another caller's edit.
---
**Immutability** means a value, once constructed, cannot be modified in place — any "change" produces a new value instead. A string in Java or Python is immutable: `s.upper()` returns a new string, leaving the original untouched, which is why the same string object can be safely handed to a dozen callers without any of them needing to defend against another mutating it underneath them.

The benefit is aliasing safety. A [[Race Condition]] fundamentally requires shared mutable state — two threads can read the same immutable value all day with no coordination, because there is nothing to synchronize over; nobody is writing. Persistent data structures (structural-sharing trees used by Clojure's vectors and maps, or immutable.js) get the ergonomics of "just make a new one" cheap by sharing unchanged subtrees between the old and new versions instead of copying the whole structure, so immutability doesn't have to mean quadratic-copy overhead.

The trade-off is allocation: every "edit" is a new object, which pressures the garbage collector and can defeat cache locality compared to an in-place mutation. Languages differ on the default — Rust makes mutability an explicit opt-in (`mut`) enforced by the borrow checker; Haskell makes immutability the default and mutation the exception requiring an `IORef` or similar; JavaScript's `const` only freezes the binding, not the object it points to, which is a common source of code that's called "immutable" but silently isn't.

Immutability and [[Pure Function]]s reinforce each other: a pure function is easiest to write over immutable inputs, because there's no way for it to have caused an externally visible mutation even by accident. The two together are the usual foundation for equational reasoning — replacing an expression with its value without changing the program's meaning — which is much harder to claim once any part of the input could have been mutated mid-computation.

## See also
- [[Pure Function]]
- [[Race Condition]]
- [[Closure]]
- [[Hash Table]]
- [[Determinism]]
