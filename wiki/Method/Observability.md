---
aliases:
  - Observable system
tags:
  - method
summary: How much of a system's internal state can be inferred from what it emits.
---
**Observability** is the degree to which a system's internal state can be determined from its outputs — logs, metrics, traces, and whatever else it emits. The term comes from control theory; in software it names the difference between a system you can ask questions of and one you can only guess about.

It is distinct from monitoring. Monitoring answers questions you thought to ask in advance ("is the error rate above two percent?"). Observability is what lets you answer a question nobody anticipated, which is what real incidents demand.

Practically it is built from small deliberate choices. Emitting the resolved configuration at startup rather than assuming it. Logging which credential a tool actually used rather than which one you configured. Recording free disk space at the moment a job fails, so the next occurrence is diagnosable rather than mysterious. Writing a decision log for a gate so "it skipped" and "it passed" are distinguishable afterwards.

Poor observability produces a characteristic waste: hours spent reconstructing state that the system could have told you in one line. It is also what makes [[Silent Failure]] possible — a failure with no emission is invisible by construction.

## See also
- [[Instrumentation]]
- [[Ground Truth]]
- [[Silent Failure]]
- [[Reproducible Case]]
- [[Resource Starvation]]
- [[Root Cause Analysis]]
- [[Cron]]
- [[Fail Fast]]

## Related
- [[Daemon]]
- [[Vacuous Truth]]
