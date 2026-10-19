---
aliases:
  - FMEA
  - FMECA
  - Risk priority number
tags:
  - testing
summary: A structured, bottom-up review that lists every way each part of a system could fail, what each failure would cause, and how serious it would be, used in engineering since the 1940s to find weak points before they fail in use.
---
**Failure mode and effects analysis** (FMEA) is a systematic method for identifying ways a system can fail and judging what each failure would cause. A team works through every component or function, asks how it could fail, and traces the consequences upward through the system. The goal is to find and fix serious weaknesses before a product is built or released.

The method was formalized by the United States military in 1949 and adopted by NASA for the Apollo program in the 1960s. It is now standard in automotive, aerospace, medical devices, and manufacturing. A variant with an added assessment of criticality is called FMECA.

A typical FMEA works through a table, one row per failure mode:

1. **Item or function.** A part of the system, such as a valve, a sensor, or a software service.
2. **Failure mode.** How it could fail: stuck open, stuck closed, giving wrong readings, timing out.
3. **Effects.** What happens locally, at the next level up, and to the user.
4. **Causes.** What could produce the failure.
5. **Current controls.** Existing tests, inspections, or safeguards that would prevent or catch it.
6. **Ratings and actions.** Severity, likelihood, and detectability, each scored, followed by planned fixes.

Many FMEAs multiply the three scores, each from 1 to 10, into a **risk priority number** and work on the highest first. This practice has been widely criticized. The scores are rankings rather than measurements, so multiplying them is mathematically dubious, and very different risks can produce the same number. A catastrophic but rare failure can rank below a trivial frequent one. The 2019 automotive FMEA handbook replaced the number with an "action priority" table that weighs severity first. Teams also learn to tune scores to get the result they want; see [[Goodhart's Law]] and [[Risk-Based Testing]].

FMEA is **bottom-up**: it starts from individual parts and asks what their failures would cause. Its counterpart, [[Fault Tree Analysis]], is **top-down**, starting from an undesired event and working back to causes. The two complement each other, and safety programs often use both; see [[Safety Case]].

It considers failures one at a time, so it misses combinations and interactions between components; see [[Normalization of Deviance]] for how small problems combine. It depends on the team imagining failure modes, so unknown ones stay unknown.

Software teams use lighter versions. Reviewing a design by asking what happens when each dependency is slow, down, or returns garbage is an informal FMEA; see [[Circuit Breaker]] and [[Watchdog Timer]]. Deliberately injecting those failures tests the answers; see [[Chaos Engineering]]. Imagining a project has already failed prompts a similar search; see [[Pre-mortem]]. When failures do occur, investigation works backward; see [[Root Cause Analysis]] and [[Incident Response]].

## See also
- [[Single Point of Failure]]
- [[Common-Mode Failure]]
- [[Citicorp Center Engineering Crisis]]
- [[Tacoma Narrows Bridge]]
