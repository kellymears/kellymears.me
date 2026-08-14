---
aliases:
  - TDD
  - Red green refactor
tags:
  - testing
summary: Writing a failing test first, making it pass, then improving the code with the test as a net.
---
**Test-driven development** is the practice of writing a failing test before the code that satisfies it, then writing the minimum implementation to pass, then refactoring with the test as protection. The cycle is usually named *red, green, refactor*.

The red step is the one that carries the value, and it is the one most often skipped. A test written after the implementation and added to a passing suite has never been observed to fail, so it might be asserting nothing at all — see [[Falsifiability]]. Writing it first makes the failure a precondition rather than a hope.

The secondary benefit is design pressure. Code that is hard to test from the outside is usually code with tangled dependencies or unclear boundaries, and the friction shows up before the design has calcified.

The main misuse is treating it as a mandate to test every function in isolation. Tests bound to internal structure make refactoring expensive — the suite breaks when the implementation changes even though behavior did not, which trains people to distrust it. Favoring tests at the seams that outlast implementations, and integration over unit tests on private helpers, keeps the suite an asset rather than a tax. See [[Integration Test]].

## See also
- [[Unit Test]]
- [[Assertion]]
- [[Regression]]
- [[Code Coverage]]

## Related
- [[Vacuous Truth]]
- [[Tree Shaking]]
- [[Root Cause Analysis]]
