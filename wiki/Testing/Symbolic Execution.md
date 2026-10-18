---
aliases:
  - Concolic testing
  - Dynamic symbolic execution
  - Path explosion
  - SMT solver
  - KLEE
tags:
  - testing
summary: Running a program on symbols instead of concrete values, then using a constraint solver to find inputs that drive it down each path, including the ones that crash.
---
**Symbolic execution** runs a program with symbolic inputs instead of real values. Rather than setting `x = 5`, it treats `x` as an unknown and tracks expressions built from it. At each branch, such as `if (x > 10)`, it explores both sides and records the condition that leads to each: `x > 10` on one side, `x <= 10` on the other. By the end of a path it has a *path condition*, the set of constraints an input must satisfy to follow that path.

A constraint solver then turns each path condition into a concrete input. Modern tools use *SMT solvers*, such as Z3, which decide whether a set of logical and arithmetic constraints can be satisfied and produce an example if so. The result is a test input for every path explored, including paths that reach an assertion failure, a division by zero, or an out-of-bounds access. That makes symbolic execution a way to reach high [[Branch Coverage]] systematically instead of by luck.

James King described the idea in 1976, but it became practical only once solvers improved in the 2000s. Two milestones:

- **Concolic testing.** DART (2005) and later tools run the program on a concrete input while tracking symbolic constraints alongside it ("concolic" combines concrete and symbolic). To explore a new path, the tool negates one branch condition and solves for an input that takes the other side. Concrete values let it handle calls the solver can't model, such as system libraries.
- **KLEE.** Released in 2008 by Cristian Cadar, Daniel Dunbar, and Dawson Engler, it generated tests for the GNU Coreutils, the standard command-line tools, reaching higher coverage than their hand-written test suites and finding bugs that had gone unnoticed for over a decade.

The central problem is **path explosion**. Every branch can double the number of paths, and loops multiply them without limit, so whole programs can't be explored exhaustively. This is no accident: deciding what a program does on all inputs runs into the [[Halting Problem]], and the constraints themselves can be hard to solve, touching the territory of the [[P versus NP Problem]]. Tools cope with search heuristics, time limits, and by focusing on parts of the code.

Symbolic execution sits between [[Fuzzing]], which is fast and shallow and struggles with exact checks such as a magic number in a header, and [[Formal Verification]], which proves properties for all inputs but needs much more human effort. Hybrid fuzzers use a solver only when random mutation gets stuck behind such a check. Like any test generator, it needs a [[Test Oracle]] to know what counts as wrong, and it pairs naturally with a [[Sanitizer]] that turns silent memory errors into detectable ones.

## See also
- [[Fuzzing]]
- [[Formal Verification]]
- [[Branch Coverage]]
- [[Halting Problem]]
