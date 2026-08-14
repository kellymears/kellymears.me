---
aliases:
  - Dead branch
  - Dead code
tags:
  - testing
summary: Code no input can execute — usually a guard against a state the surrounding invariants forbid.
---
**Unreachable code** cannot be executed by any input. In its obvious form it is code after a return. In its interesting form it is a guard, a fallback, or an error branch protecting against a state the surrounding design makes impossible.

Unreachable branches are worth eliminating rather than tolerating for two reasons. They are noise — a reader cannot distinguish a real constraint from a defensive reflex, which is [[Chesterton's Fence]] in miniature. And under a strict [[Coverage Gate]] they are unfixable by testing, since no test can reach them.

Some recurring generators, and their structural fixes:

- **A strict compiler setting** making indexed access possibly-undefined forces a guard even when the key came from the same map's own keys. Iterating over entries rather than keys removes it, because the tuple type is not optional.
- **A defensive null check on a reference** whose invariant guarantees it exists. A non-null assertion compiles to nothing and removes the branch.
- **Independent optionals that always travel together** — a URL and its alternative text — create a "one present, one absent" case that no caller can produce. Modeling them as a single both-or-neither unit deletes it.
- **A default value** for a parameter every caller supplies.

Each fix removes the branch rather than testing it, which is the distinction that matters.

## See also
- [[Branch Coverage]]
- [[Defensive Default]]
- [[Coverage Gate]]
- [[Schema Validation]]
- [[Code Coverage]]

## Related
- [[Silent Failure]]
- [[Instrumentation]]
- [[Goodhart's Law]]
