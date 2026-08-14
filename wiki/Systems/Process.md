---
aliases:
  - Processes
  - PID
tags:
  - systems
summary: A running program with its own memory, environment, and identity.
---
A **process** is an instance of a running program, with its own memory space, its own copy of the environment it inherited, and a numeric identity. Processes form a tree: each is spawned by a parent and can outlive it.

Working with them from a script has a few sharp edges.

**Names are not what you think.** The process name is the executable's name, which can differ from an application's display name — commonly by capitalization. A pattern matching the wrong one silently matches nothing, and a command that reports "stopped" without having stopped anything is worse than an error, because the next step proceeds on a false premise.

**Substring matching is dangerous.** A pattern intended for one program matches any command line containing it, including unrelated system processes whose names happen to include the substring. Matching the executable exactly is the safe form.

**Something may restart it.** A process under a supervisor comes back immediately when killed, so "stop" and "kill" are different operations: a clean quit exits successfully and stays down, while a signal looks like a crash and triggers a restart.

Diagnosing contention needs per-process detail rather than an aggregate load figure, which lags and never says which program is responsible. See [[Resource Starvation]].

## See also
- [[Shell]]
- [[Daemon]]
- [[Port]]
- [[Observability]]

## Related
- [[Instrumentation]]
- [[Cron]]
- [[Vacuous Truth]]
- [[Truncation Bias]]
- [[Silent Failure]]
