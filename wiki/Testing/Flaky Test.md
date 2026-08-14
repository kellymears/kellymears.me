---
aliases:
  - Flake
  - Intermittent failure
tags:
  - testing
summary: A test that passes and fails on identical input, and the most corrosive thing a suite can contain.
---
A **flaky test** fails intermittently on unchanged code. Its real cost is not the failed run but the habit it teaches: once a suite has flakes, every failure gets a rerun before it gets a diagnosis, and real defects ship because they looked like flakes.

Flakes have a small number of causes, and identifying which one is at play is most of the work.

**Timing.** An assertion racing an asynchronous update. Waiting for a condition rather than a duration fixes it; a fixed sleep only moves it.
**Ordering.** Shared state between tests, so a test passes alone and fails after a sibling.
**Contention.** A timeout that only blows under load, which is [[Resource Starvation]] and not a defect at all.
**Environment.** Disk exhaustion, a cold build cache, a development server holding a port.
**Non-determinism** in the system under test — clock, randomness, iteration order.

Two diagnostic rules earn their keep. An **identical** failure across repeated runs of the same revision is a real gap, not a flake; rerunning cannot make it pass. A failure that disappears the moment logging or a debugger is added is a [[Heisenbug]], and the instinct to instrument harder is what keeps it hidden. And a flake at a ten percent rate needs roughly twenty consecutive green runs before "fixed" means anything — one green run proves nothing. See [[Nondeterminism]].

## See also
- [[Race Condition]]
- [[Resource Starvation]]
- [[Determinism]]
- [[Reproducible Case]]
- [[Bundler]]
- [[Instrumentation]]
- [[Regression]]

## Related
- [[Ground Truth]]
- [[Visual Regression Testing]]
