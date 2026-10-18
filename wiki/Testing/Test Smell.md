---
aliases:
  - Test smells
  - Assertion roulette
  - Mystery guest
  - Eager test
  - Fragile test
  - Arrange-Act-Assert
tags:
  - testing
summary: Recurring patterns in test code that make tests hard to read, slow, brittle, or unreliable, and the structure that avoids most of them.
---
A **test smell** is a pattern in test code that suggests a deeper problem, by analogy with code smells in regular code. The term was introduced by Arie van Deursen and colleagues in a 2001 paper on refactoring test code, and Gerard Meszaros catalogued dozens more in *xUnit Test Patterns* (2007). A smell isn't always a bug; it's a sign that a test will be harder to trust, maintain, or diagnose than it should be.

Common smells:

- **Assertion roulette.** Many [[Assertion]] calls with no messages, so a failure doesn't say which check broke or why.
- **Eager test.** One test checks many behaviors at once. When it fails, the cause is unclear, and the first failure hides the rest.
- **Mystery guest.** The test depends on an external file, database row, or shared [[Test Fixture]] that isn't visible in the test, so the reader can't tell what data it uses.
- **Fragile test.** The test breaks when unrelated details change, such as the exact wording of a message or the order of keys, often from over-specified [[Snapshot Testing]] or from verifying internal calls.
- **Over-mocking.** So many dependencies are replaced with a [[Test Double]] that the test checks the mock setup more than the real code, and passes even when the real integration is broken.
- **Sleeping test.** A fixed wait such as `sleep(2)` stands in for waiting on a real condition, making the test slow and a likely [[Flaky Test]].
- **Interdependent tests.** Tests that pass only in a certain order because one leaves state behind for the next, violating [[Test Isolation]].
- **Assertion-free test.** Code runs but nothing is checked, which raises [[Code Coverage]] without verifying anything, a case of [[Goodhart's Law]].

Many smells disappear with a simple structure called **Arrange-Act-Assert**: set up the inputs, perform one action, then check the result, with each part visible in the test. A reader should be able to see what is being tested and why it should pass without opening other files.

Smells matter because tests are read far more often than written, usually by someone trying to understand a failure under time pressure. A suite full of smells accumulates [[Technical Debt]]: developers stop trusting failures, rerun them until they pass, or delete tests that seem more trouble than they're worth. [[Mutation Testing]] exposes weak tests from a different angle, by showing which bugs a suite fails to catch.

Smells in test code are usually fixed the same way as in regular code: extract helper functions for setup, name things clearly, split eager tests into focused ones, and replace hidden shared data with explicit builders. A [[Unit Test]] that reads as a short, plain example of how the code should behave doubles as documentation.

## See also
- [[Test Data Builder]]
- [[Parameterized Test]]
- [[Solitary and Sociable Tests]]
- [[Pesticide Paradox]]
