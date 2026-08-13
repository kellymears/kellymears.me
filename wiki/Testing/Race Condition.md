---
aliases:
  - Race
tags:
  - testing
summary: A defect whose occurrence depends on the relative timing of concurrent operations.
---
A **race condition** occurs when the correctness of a result depends on the order in which concurrent operations happen to complete. Races are the archetypal intermittent bug: they reproduce on slow machines and vanish on fast ones, or the reverse.

The web platform generates a particular family of them. A build tool's dependency scan finishing mid-run triggers a page reload that aborts whatever was in flight — so a random file fails, never the same one twice, and never on a fast local machine that wins the race every time. A resize observer's first callback lands a frame or two after mount, too late to prevent a visible jump and early enough to fight a user who has already scrolled. A framework re-rendering a subtree that a browser mutated directly diffs against a stale model.

Concurrent *processes* race in the same way over shared resources: two test runs in one working copy destroying each other's temporary files, two workers deriving the same port, two agents editing one directory.

The general remedies are to remove the shared resource (separate working copies, unique filenames), to make the ordering explicit (wait on an observable condition, not a duration), or to make the operation idempotent so order stops mattering. See [[Idempotence]].

## See also
- [[Flaky Test]]
- [[Multi-Agent Orchestration]]
- [[Git Worktree]]
- [[Determinism]]
- [[Bundler]]
- [[Reproducible Case]]
- [[Fan-Out and Fan-In]]

## Related
- [[Ground Truth]]
- [[Token Budget]]
