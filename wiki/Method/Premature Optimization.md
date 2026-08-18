---
aliases:
  - Root of All Evil
tags:
  - method
summary: Spending effort making code fast before you know where it's actually slow trades clarity for speed you may not need.
---
**Premature Optimization** is the practice of tuning code for performance before measurement has shown that performance is actually the constraint, or before you know which part of the system is the constraint. Donald Knuth's line — "premature optimization is the root of all evil" — is usually quoted as a blanket argument against caring about performance early, which overshoots what he actually said: the full sentence targets optimizing the wrong 97% of a program while ignoring the critical 3%, not optimization itself.

The cost isn't just wasted effort on code that turns out not to matter — it's that optimized code is usually harder to read, harder to change, and more tightly coupled to assumptions about the data it runs on than the straightforward version would have been. Manually unrolling a loop, hand-inlining a function, or reaching for a lock-free data structure all trade general-purpose clarity for a specific performance property, and that trade is only worth making where the property is actually needed. Paying it everywhere means every future reader pays the readability tax, for a speed benefit that in most of the codebase nobody will ever notice or measure.

The corrective isn't "never think about performance" — it's sequencing: write the clear version first, profile a realistic workload to find where time is actually spent, and then optimize the specific hot path the profiler points to, backed by a before/after measurement so you know the change actually helped. This is the same discipline [[Ground Truth]] argues for generally — a guess about which function is slow is a report, a profiler trace is the measurement — and skipping straight to optimization is a form of the [[Streetlight Effect]], tuning the part of the code that's easiest to reason about rather than the part the data says is actually costly.

The rule has a real boundary, worth stating so it doesn't get taken as absolute: some decisions are far cheaper to make well upfront than to retrofit later — a database schema, a public API's shape, an algorithm with quadratic behavior on inputs you already know will be large. Premature optimization is about micro-tuning ahead of evidence, not about ignoring an architectural choice whose cost is already knowable without a profiler.

## See also
- [[Ground Truth]]
- [[Streetlight Effect]]
- [[Big-O Notation]]
- [[Overfitting]]

## Related
- [[Technical Debt]]
