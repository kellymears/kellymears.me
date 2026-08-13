---
aliases:
  - Coverage
tags:
  - testing
summary: The proportion of code executed by a test suite — a map of what is untested, not a measure of quality.
---
**Code coverage** is the fraction of a codebase executed while the tests run, reported per statement, per line, per function, and per branch. It is produced by [[Instrumentation]].

What it can tell you is narrow and genuinely useful: **which code no test has ever run.** Uncovered code is untested by definition. That is worth knowing.

What it cannot tell you is whether the covered code is *correct*. A test that executes a function and asserts nothing produces identical coverage to one that specifies it exactly. This is why coverage makes such a poor target — see [[Goodhart's Law]] and [[Coverage Gate]].

Two mechanical facts save a lot of confusion. **A failing test yields no coverage number at all**: the reporter aborts before writing its summary, so an unrelated red test produces an *absent measurement*, not a threshold failure. And **percentages are the wrong unit for diagnosis**; the underlying per-position records are what actually explain a shortfall, and a report format that emits them is usually one flag away.

Coverage also behaves oddly across multiple test environments measuring the same files, where a single logical position can end up recorded twice; see [[Branch Coverage]].

## See also
- [[Branch Coverage]]
- [[Coverage Gate]]
- [[Unreachable Code]]
- [[Instrumentation]]
- [[Module Graph]]
- [[Regression]]
- [[Test-Driven Development]]

## Related
- [[Unit Test]]
- [[Vacuous Truth]]
