---
aliases:
  - Fixtures
  - Test data
tags:
  - testing
summary: The prepared data or state a test runs against.
---
A **test fixture** is the prepared input a test needs: a sample record, a rendered document, a seeded database, a drawn image. Fixtures are where a surprising number of tests go quietly wrong, because a fixture chosen for convenience can make an assertion meaningless.

The failure has a general shape: **the fixture already satisfies the property being asserted, for reasons unrelated to the code**. A layout test using an image wider than its container passes whether or not the layout code works, because a shrink-to-fit box and a spanning box produce the same width in that case. Drawing a deliberately narrow fixture makes the two outcomes different, and the assertion real. A scroll test in a container with no height constraint passes vacuously. See [[Vacuous Truth]].

Two further notes. Fixtures should be *local and deterministic* where the assertion is about behaviour — a remote image introduces network variance and decode noise into what should be a pure comparison. And a helper that merges overrides into a base fixture must merge *before* pruning explicitly-absent keys, or every attempt to blank a field silently keeps the base value and every negative-path test becomes a happy path.

## See also
- [[Test Double]]
- [[Determinism]]
- [[Seed Data]]
- [[Visual Regression Testing]]
- [[Record and Replay Testing]]
- [[Integration Test]]

## Related
- [[Unit Test]]
- [[Nondeterminism]]
