---
aliases:
  - Testing pyramid
  - Testing trophy
  - Ice cream cone anti-pattern
  - Test portfolio
tags:
  - testing
summary: The guideline that a test suite should have many fast, narrow tests and progressively fewer slow, broad ones, and the arguments over what shape is actually right.
---
The **test pyramid** is a model for balancing a test suite. Mike Cohn described it in 2009: a wide base of [[Unit Test]] cases that are fast, cheap, and precise, a narrower middle of [[Integration Test]] or service tests, and a small top of [[End-to-End Test]] cases through the UI. Moving up the pyramid, each test gives more realistic confidence but runs slower, breaks more often, and points less clearly at the cause of a failure. The shape follows from that trade: put most of the checks where they are cheap, and reserve the expensive ones for what only they can catch.

The anti-pattern it warns against is the **ice cream cone**: a suite that is mostly manual or end-to-end testing with a thin layer of unit tests. These suites take hours, fail for reasons unrelated to the change, and accumulate [[Flaky Test]] failures until developers learn to rerun rather than read them. Feedback slows, and [[Continuous Integration]] turns into waiting.

The pyramid has been challenged, mostly over the middle:

- **The testing trophy**, from Kent C. Dodds, argues that integration tests give the best confidence per cost for typical web applications, so the middle should be the widest layer, with [[Static Analysis|static analysis]] such as type checking as the base.
- **Over-mocked unit tests** can pass while the system is broken. A unit suite full of [[Test Double]] objects verifies how code calls its collaborators, not that the collaboration works, and refactoring breaks such tests without breaking behavior.
- **Definitions blur.** "Unit" can mean one function or one module with its real dependencies, so teams arguing about shapes are often arguing about vocabulary.

The durable lesson is about the trade-offs, not the triangle. Each test should sit at the lowest level that can catch the failure it guards against. Logic belongs in fast tests, wiring in integration tests, and only critical user journeys in E2E. [[Contract Testing]] covers service boundaries without full environments. A [[Code Coverage]] number says nothing about whether the shape is right, and treating it as the goal invites [[Goodhart's Law]]. [[Mutation Testing]] is a better check on whether the base actually catches anything.

## See also
- [[Humble Object]]
- [[End-to-End Test]]
- [[Contract Testing]]
- [[Test-Driven Development]]
