---
aliases:
  - Dead code elimination
tags:
  - web
summary: Statically removing exports that nothing imports, shrinking the shipped bundle.
---
**Tree shaking** is dead-code elimination for modules: the [[Bundler]] follows imports from the entry point, determines which exports are actually reachable, and drops the rest. It depends on static analysis, which is why it works for ES module syntax and generally does not for dynamic patterns the bundler cannot resolve.

It fails in predictable ways. A module with side effects at import time cannot be dropped even if none of its exports are used. A namespace import may defeat analysis, pulling in an entire library where a named import would have pulled one function. And a *barrel* file — a module that re-exports a whole directory — is a classic hazard: importing one small value through it can make the bundler include far more than intended, and, worse, can pull a component into an environment where it does not belong.

That last case has a non-obvious consequence beyond size. Routing a value import through a barrel that also exports components means those components load wherever the value is used — including in test environments, where the resulting double instrumentation can corrupt coverage numbers for files nobody touched. The rule of thumb: import a value from the package that owns it, not through an aggregating barrel.

## See also
- [[Code Splitting]]
- [[Module Graph]]
- [[Bundler]]
- [[Code Coverage]]
- [[Unit Test]]

## Related
- [[Test-Driven Development]]
- [[React Server Components]]
- [[Performance Budget]]
- [[Lazy Loading]]
