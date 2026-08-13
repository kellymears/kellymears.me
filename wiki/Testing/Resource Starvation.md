---
aliases:
  - Contention
  - CPU starvation
tags:
  - testing
summary: Failures caused by competition for a finite shared resource rather than by any defect.
---
**Resource starvation** is what happens when concurrent work competes for a finite resource — processor time, memory, disk, file descriptors, a spending limit — and something misses a deadline as a result. The failure looks like a defect and is not.

The diagnostic signature is consistent and worth memorising: **a timeout, never an assertion failure**, in a file unrelated to whatever changed, that passes in isolation. A test asserting something wrong fails the same way every time; a starved test fails on the timing and passes alone.

The commonest sources in a development environment are several test suites running at once, a development server's file watcher re-running a suite on every save by anyone, instrumented runs that are several times slower than uninstrumented ones, and continuous-integration runners with genuinely small disks. Disk exhaustion is especially deceptive: coverage tooling writing per-file data can consume a runner's free space in minutes, after which every subsequent error is a downstream symptom.

Responses that work: serialise rather than parallelise the contended step, give the starved run the machine, add retry only where the failure is known to be environmental, and — most valuable — record the resource state at failure time so the next occurrence is diagnosable rather than a mystery. See [[Observability]].

## See also
- [[Flaky Test]]
- [[Instrumentation]]
- [[Fan-Out and Fan-In]]
- [[Continuous Integration]]
- [[Process]]
- [[Token Budget]]

## Related
- [[Vacuous Truth]]
- [[Subagent]]
