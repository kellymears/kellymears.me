---
aliases:
  - Characterization tests
  - Legacy code
  - Pinning test
  - Seam
tags:
  - testing
summary: A test that records what existing code actually does, right or wrong, so it can be changed safely, the first step in taming code that has no tests.
---
A **characterization test** records what a piece of existing code actually does, not what it should do. Michael Feathers named the idea in *Working Effectively with Legacy Code* (2004), a book that defined *legacy code* bluntly as code without tests. Such code is risky to change because nobody can tell whether a change broke something. Characterization tests are the way out: before changing anything, pin down current behavior so any change to it becomes visible.

The procedure is deliberately mechanical:

1. Call the code with some input and write an assertion with a placeholder expected value.
2. Run the test and let it fail. The failure message reveals what the code actually returned.
3. Paste the actual value into the assertion, so the test passes.
4. Repeat with more inputs until the behavior you are about to change is covered.

The result is a description of the system as it is, bugs included. That is intentional. If the existing code rounds money incorrectly, the characterization test asserts the incorrect rounding. Fixing the rounding is a separate, deliberate change, made after the refactoring and with its own test, not an accident discovered in production. Real users and downstream systems may depend on the odd behavior, as [[Hyrum's Law]] predicts, and a characterization test keeps the team from assuming that no one does. Before removing a strange behavior, find out why it exists: [[Chesterton's Fence]].

For code with large or complex outputs, the same idea scales up as a golden master: run many inputs through the system, record all the outputs, and compare against the recording after each change, as in [[Golden File Testing]] and [[Snapshot Testing]]. When the old and new versions can run side by side, the comparison is [[Differential Testing]].

Getting legacy code under test is often the hard part. Feathers introduced the idea of *seams*, places where behavior can be changed without editing the code there, such as an injected dependency or an overridable method. Seams let a [[Test Double]] stand in for databases, networks, and clocks so the code can run in a test at all.

Characterization tests are a means, not an end. Once code is refactored and understood, they are best replaced or supplemented with tests that state intended behavior, in the style of [[Test-Driven Development]]. They are a practical alternative to the rewrite from scratch, which tends to lose undocumented behavior and fall into the [[Second-System Effect]]. They also help pay down [[Technical Debt]] incrementally.

## See also
- [[Fax]]
- [[Clean Room Design]]
- [[Testability]]
- [[Branch by Abstraction]]
- [[Ariane 5 Flight 501]]
- [[Year 2000 Problem]]
