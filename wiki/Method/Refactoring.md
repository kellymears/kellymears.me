---
aliases:
  - Refactor
  - Code smell
  - Rule of three
  - Boy Scout rule
tags:
  - method
summary: Changing the structure of code without changing what it does, in small verified steps, so that the next change becomes easy.
---
**Refactoring** is changing the internal structure of code without changing its behavior. Renaming a variable, extracting a function, splitting a module, or replacing a conditional with a lookup table are all refactorings. The program does exactly what it did before, but it's easier to understand and to change. The term was popularized by Martin Fowler's 1999 book, which catalogued dozens of named, mechanical transformations, each small enough to verify.

The discipline is in the definition. A refactoring changes structure *or* behavior, never both at once. Mixing a cleanup with a bug fix produces a diff that no reviewer can check, and if something breaks, nobody can tell which part caused it. Separating them keeps every step safe and every [[Code Review]] legible.

Refactoring needs a safety net. Without tests, there's no way to know that behavior stayed the same. In [[Test-Driven Development]] it's a built-in step: write a failing test, make it pass, then refactor with the tests green. For untested legacy code, the first step is often a *characterization test* that records what the code currently does, right or wrong, often as a [[Snapshot Testing]] baseline. Modern editors automate many refactorings, such as renames and extractions, by working on the Abstract Syntax Tree instead of the text, and a [[Type Inference]] system catches many mistakes the moment they happen.

Some guidelines practitioners lean on:

- **Code smells.** Long functions, duplicated logic, vague names, and classes that know too much are signs that structure is fighting the next change. [[Naming]] is often the cheapest fix.
- **The rule of three.** Duplicate something once, and tolerate it. The third time, extract the shared part. Abstracting too early guesses at a pattern that hasn't appeared yet.
- **The Boy Scout rule.** Leave code a little cleaner than you found it, which pays down [[Technical Debt]] continuously instead of in rare, risky cleanups.
- **Make the change easy, then make the easy change.** Kent Beck's advice is to refactor first so the feature becomes a small addition.

The main risks are scope and timing. A refactor that grows into a rewrite stops being safe, since a rewrite discards behavior nobody wrote down, the trap of the [[Second-System Effect]]. Large structural changes are better done incrementally behind a stable interface, as in the strangler fig pattern. Refactoring code before understanding why it's shaped that way can remove something load-bearing, which is the warning of [[Chesterton's Fence]]. And polishing code nobody needs to change is a form of [[Premature Optimization]] applied to design.

Refactoring is how code stays changeable over years. Teams that never do it accumulate structure that resists every feature, and every change gets slower.

## See also
- [[Code Formatter]]
- [[Yak Shaving]]
