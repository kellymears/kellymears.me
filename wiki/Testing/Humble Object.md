---
aliases:
  - Humble object pattern
  - Humble dialog
  - Functional core, imperative shell
  - Functional core
tags:
  - testing
summary: Pulling the logic out of code that is hard to test, such as UI, threads, and I/O, into a plain object that is easy to test, leaving the boundary too thin to need testing.
---
The **humble object** pattern makes hard-to-test code testable by splitting it in two. The logic moves into a plain object that can be tested quickly and directly. What remains at the hard boundary, the part that touches a screen, a thread, a network socket, or hardware, becomes so thin and simple that it barely needs testing. Gerard Meszaros named the pattern in *xUnit Test Patterns* (2007), building on Michael Feathers' 2002 essay "The Humble Dialog Box."

Some code resists testing because of where it runs, not because of what it does:

- **User interfaces.** Logic inside a dialog or view can only be exercised by rendering the UI and simulating clicks.
- **Concurrency.** Logic inside a thread or callback is entangled with timing, inviting a [[Race Condition]].
- **I/O and hardware.** Logic mixed with database calls, files, or device drivers needs those resources present.

In each case the fix is the same. Move every decision into an object that takes inputs and returns outputs, then leave the boundary to do nothing but translate: read the inputs, call the logic, apply the result. A dialog box becomes a view that forwards events to a presenter and displays what it is told. The presenter holds all the rules and is tested with ordinary [[Unit Test]] code.

Gary Bernhardt's 2012 talk "Boundaries" stated a broader version: **functional core, imperative shell**. The core is made of [[Pure Function]] code over [[Immutability|immutable]] values, making every decision. The shell is a thin layer of side effects that gathers data, calls the core, and acts on what it returns. The core needs no mocks at all, since it has no dependencies to replace, and the shell has so few branches that a handful of [[Integration Test]] cases covers it.

The pattern explains several common designs:

- **Presentational components.** Front-end components that render only from their inputs can be tested and previewed in isolation, as in a [[Component Story]].
- **Reducers.** State updates written as functions of old state and an action can be tested without the UI.
- **Ports and adapters.** Domain-centered architectures apply the pattern to a whole system.

It shifts the [[Test Pyramid]] toward cheap tests: most checks become fast unit tests, and the few slow tests confirm only the wiring.

It also reduces reliance on the [[Test Double]]. Heavy mocking often signals logic tangled with dependencies, and a humble object untangles it. On legacy code, a [[Characterization Test]] usually comes first, pinning behavior before the logic is extracted.

The cost is an extra layer and the discipline to keep the shell humble. Logic that creeps back into the boundary is untested again, and teams sometimes exclude the shell from [[Code Coverage]] on the assumption it stayed thin.

## See also
- [[Test Double]]
- [[Pure Function]]
- [[Unit Test]]
- [[Test Pyramid]]
- [[Solitary and Sociable Tests]]
