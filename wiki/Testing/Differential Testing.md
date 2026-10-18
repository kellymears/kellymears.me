---
aliases:
  - Back-to-back testing
  - Metamorphic testing
  - Metamorphic relation
  - Csmith
tags:
  - testing
summary: Testing by running the same input through several implementations and treating any disagreement as a bug, useful exactly when nobody knows the right answer.
---
**Differential testing** feeds the same input to two or more implementations of the same thing and compares their outputs. Wherever they disagree, at least one has a bug. William McKeeman named the technique in 1998 while testing C compilers at Digital Equipment Corporation. Its strength is that it sidesteps the oracle problem: you don't need to know the correct answer, only that implementations which should agree don't (see [[Test Oracle]]).

It works wherever multiple implementations exist:

- **Compilers.** Csmith, a 2011 tool from the University of Utah, generated random valid C programs, compiled them with different compilers, and compared the results. It found more than 325 previously unknown bugs in GCC and LLVM. A [[Compiler]] is a natural target, since many exist for one language and their correct output is hard to state.
- **Parsers and protocols.** JSON, URL, and [[Regular Expression]] libraries disagree surprisingly often on edge cases, and those disagreements become security holes when two components of one system parse the same input differently.
- **Versions.** Comparing a new version against the old one checks a refactoring or migration. Run against production requests, it becomes [[Shadow Traffic]].
- **Compatibility layers.** An [[Emulation]] layer or an [[API Translation Layer]] can be checked against the real system it imitates.
- **Optimized code.** A fast, complex implementation can be compared with a slow, obviously correct one, a pattern common in [[Property-Based Testing]].

Random input generation, as in [[Fuzzing]], pairs naturally with it, since the comparison supplies an oracle for inputs nobody has examined.

**Metamorphic testing**, introduced by T. Y. Chen and colleagues in 1998, applies the same idea to a single implementation. Instead of comparing two programs, it compares one program's outputs across related inputs, using *metamorphic relations* that must hold. A search with an added filter should return a subset of the original results. Sorting a shuffled list should give the same result as sorting the original. Rotating an image before classifying it should rarely change the label. Metamorphic testing has found bugs in search engines, compilers, scientific software, and machine-learning systems, all domains where exact expected outputs are unavailable.

The main practical difficulty is noise. Implementations can legitimately differ: in floating-point rounding, in the order of results, in timestamps, in error message wording, and in behavior the specification leaves undefined. Every legitimate difference must be normalized away, or real bugs drown in false alarms. [[Nondeterminism]] makes it harder still. Characterizing the old system first, as in a [[Characterization Test]], helps separate intended differences from regressions.

## See also
- [[N-Version Programming]]
- [[Fuzzing]]
- [[Shadow Traffic]]
- [[Golden File Testing]]
- [[Delta Debugging]]
