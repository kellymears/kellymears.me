---
aliases:
  - Observer effect bug
  - Vanishing bug
tags:
  - testing
summary: A fault that changes or disappears when someone tries to observe it.
---
**Heisenbug** is a fault that changes behaviour or disappears entirely when someone tries to observe it — named, as a pun on the Heisenberg uncertainty principle, for the way the act of [[Instrumentation]] perturbs the very conditions the bug depends on. Adding a print statement, attaching a debugger, or running under a profiler changes timing, memory layout, or which optimisations the compiler applies, and any of those can close the window the bug needed.

The usual causes share a theme: behaviour that depends on something the source code does not fully determine. A [[Race Condition]] depends on the relative timing of concurrent operations, which logging and breakpoints both disturb. Uninitialised memory depends on whatever was already in a location before it was read, which shifts with stack layout and allocation history. Optimisation-dependent behaviour — a value read from a register versus reloaded from memory, a comparison the compiler proved always true — depends on flags a debug build typically turns off. This is why such a build so often fails to reproduce a bug seen in release: removing optimisation removes the condition the bug needed, making it look like it was never there rather than merely hidden. The same shift happens under load: contention and [[Resource Starvation]] surface interleavings that never occur on a quiet development machine.

The fault is still [[Nondeterminism]] in the ordinary sense — the same input does not reliably produce the same output — and it produces the same symptom as a [[Flaky Test]] in a test suite: intermittent failure that resists a single [[Reproducible Case]]. The strategies that work avoid perturbing the system: logging to a lock-free buffer instead of a synchronising output stream, execution recording that captures enough state to replay a run exactly, and [[Determinism|deterministic]] replay tooling built to reproduce a specific interleaving on demand — the same idea, applied to production failures, that [[Record and Replay Testing]] applies to test suites.

## See also
- [[Race Condition]]
- [[Flaky Test]]
- [[Nondeterminism]]
- [[Determinism]]
- [[Reproducible Case]]
