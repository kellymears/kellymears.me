---
aliases:
  - Instrumented code
tags:
  - testing
summary: Adding measurement to code so its execution can be observed, and the distortions that introduces.
---
**Instrumentation** is the practice of adding measurement machinery to code — counters, probes, tracing hooks — so that its behavior can be observed at runtime. Coverage tools instrument to record which lines ran; profilers instrument to record time; observability agents instrument to emit traces.

The trade-off is that **instrumentation changes what it measures**. Instrumented code is slower, sometimes dramatically, which turns a test that comfortably fits a timeout into one that intermittently does not. A timeout failure under coverage that never reproduces without it is an instrumentation artifact, not a defect — and treating it as one saves hours.

A second distortion is duplication. When the same source file is instrumented by two independent runners, the merged report can contain two records for the same position rather than one, and a position exercised in only one of the two runs shows as uncovered. The tell is arithmetically impossible output: full statement coverage alongside a function that never ran. The fix is structural — arrange for both runs to exercise the same position, or collapse two positions into one — not more tests.

Instrumentation also has its own failure modes to distinguish from real ones: a corrupted temporary directory produces errors that look like coverage collapse, and two concurrent runs in one working copy destroy each other's intermediate files.

## See also
- [[Code Coverage]]
- [[Observability]]
- [[Resource Starvation]]
- [[Flaky Test]]
- [[Branch Coverage]]
- [[Ground Truth]]

## Related
- [[Reproducible Case]]
- [[Vacuous Truth]]
- [[Unreachable Code]]
