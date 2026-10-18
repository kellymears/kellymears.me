---
aliases:
  - Design for testability
  - Controllability
  - Hard-to-test code
tags:
  - testing
summary: How easily a piece of software lets tests control its inputs and observe its behavior, a property of design rather than of tests, and one that tends to coincide with good design generally.
---
**Testability** is the degree to which a system lets tests control what goes into it and observe what comes out. It is a property of the code under test, not of the tests. Some code can be tested in a few lines; other code doing the same job needs a database, a real clock, and a network.

The idea comes from hardware. Chip designers in the 1970s and 80s found that complex circuits couldn't be tested from their pins alone, so they added **design for testability**: extra circuitry, such as scan chains and the boundary-scan standard JTAG, that let testers set internal states and read them out. Software borrowed the two key properties:

- **Controllability.** Can a test put the component into the state it wants and give it the inputs it wants?
- **Observability.** Can a test see what the component did, including its effects and failures? See [[Observability]].

Code becomes hard to test in recognizable ways:

- **Hidden inputs.** Reading the current time, random numbers, environment variables, or global state means the test can't control them; see [[Fake Clock]] and [[Seeded Randomness]].
- **Hard-wired dependencies.** A class that creates its own database connection can't be given a fake; see [[Dependency Injection]] and [[Test Double]].
- **Mixed logic and effects.** Business rules buried inside code that sends email or writes files can't be checked without doing those things; see [[Humble Object]].
- **Swallowed results.** Code that logs errors and continues, or returns nothing, gives a test nothing to assert on; see [[Assertion]].
- **Nondeterminism.** Concurrency and timing make results vary from run to run; see [[Flaky Test]].

The remedies are a recognizable style. Push effects to the edges and keep the core as functions of their inputs; see [[Pure Function]]. Pass dependencies in rather than reaching for them. Make time and randomness explicit parameters. Return values and errors instead of only logging them; see [[Logging]]. Whole systems can be built so that every source of nondeterminism is injectable; see [[Deterministic Simulation Testing]].

Testable code tends to be well-designed code in general, with small interfaces, clear responsibilities, and few hidden dependencies. That's one argument for writing tests first: an awkward test reveals an awkward design while it's still cheap to change; see [[Test-Driven Development]]. An awkward [[Test Smell]] often points at the code, not the test.

Existing code that was never designed for testing needs a way in. Michael Feathers called a place where behavior can be changed without editing the code a seam, and getting legacy code under test usually starts by finding or creating one; see [[Characterization Test]].

Testability has costs. Extra indirection for the sake of tests can make code harder to read, so the aim is enough seams to test the important behavior, not an interface for every class.

## See also
- [[Determinism]]
