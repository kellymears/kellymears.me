---
aliases:
  - Fail loud
tags:
  - method
summary: Crash at the point of misconfiguration rather than degrading quietly into a wrong state.
---
**Fail fast** is the principle that a program should stop at the first moment it knows something is wrong, as close as possible to the cause, rather than continuing in a degraded state. The crash you get from a missing configuration value is not a defect — it is the signal you wanted.

The idea is easiest to see in its negation. A required setting read as `PORT ?? "3000"` will boot on a broken environment, bind the wrong port, and surface hours later as an authentication error nobody connects to the config. Reading it through a helper that throws on absence turns a mysterious downstream failure into a one-line startup error. See [[Defensive Default]] and [[Environment Variable]].

Fail fast is not a blanket ban on fallbacks. Coalescing an absent list to an empty list is a narrowing convenience with no hidden state. The distinction is whether the default can *stand in for a real value* and be wrong: identity, credentials, hosts, ports, and secrets should never have one.

There is a reporting corollary. When a step cannot do its job, it should say so rather than emit a plausible-looking result. A build that produces five empty pages should report failure, not "built five pages" — honest reporting is what makes the metric usable at all. See [[Goodhart's Law]].

## See also
- [[Silent Failure]]
- [[Monad]]
- [[Secret Management]]
- [[Observability]]
- [[Assertion]]
- [[Human in the Loop]]

## Related
- [[Unreachable Code]]
- [[Cron]]
