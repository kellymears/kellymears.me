---
aliases:
  - Mock
  - Stub
  - Fake
tags:
  - testing
summary: A stand-in for a real dependency during a test — and the ways a stand-in can lie.
---
A **test double** replaces a real dependency during a test. The taxonomy, from Gerard Meszaros, distinguishes *stubs* (return canned answers), *mocks* (assert on how they were called), *fakes* (working but simplified implementations), and *spies* (record calls for later inspection).

The unifying risk is that **a double can be internally inconsistent in ways the real thing is not**. The clearest example: a fake data store whose create operation returns a record that its find operation cannot see. Every individual response is plausible; together they describe an impossible world. Code under test then behaves reasonably and produces nonsense — an agent that verifies its own write, sees nothing, and writes again. The test recorded something, but not what it was measuring. See [[Evaluation Harness]].

The rule that avoids most of this: **make the double a small consistent model rather than a set of independent canned answers.** A ten-line store where create, find, count, and update agree is usually less work than a pile of stubs, and it cannot lie about its own state.

The second risk is that a double drifts from the real interface, so the tests pass and production fails. Contract tests, shared type definitions, and preferring real implementations wherever they are cheap enough all reduce it.

## See also
- [[Test Fixture]]
- [[Record and Replay Testing]]
- [[Unit Test]]
- [[Vacuous Truth]]

## Related
- [[Nondeterminism]]
- [[Large Language Model]]
- [[Integration Test]]
- [[Fingerprint]]
