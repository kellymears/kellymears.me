---
aliases:
  - MTTR
  - MTBF
  - Mean time between failures
  - Time to restore
tags:
  - delivery
summary: The average time it takes to restore service after a failure, the metric behind the shift from trying never to fail to recovering quickly, and why averages of incident durations mislead.
---
**Mean time to recovery** (MTTR) is the average time between a failure starting and normal service being restored. It comes from reliability engineering, where it was paired with **mean time between failures** (MTBF), the average time a system runs before something breaks. Together they give a simple formula for availability: the fraction of time a system is up is MTBF divided by MTBF plus MTTR.

The formula shows there are two ways to improve availability: fail less often, or recover faster. Traditional operations focused on the first, through careful change control, redundant hardware, and long testing cycles; see [[Change Advisory Board]]. Software delivery increasingly favors the second. In complex systems some failure is inevitable, and effort spent on fast detection, easy [[Rollback]], and practiced response often buys more than effort spent preventing every possible fault.

That shift is visible in the [[DORA Metrics]], which use time to restore service as one of their two stability measures. Teams that deploy small changes frequently tend to recover fastest, since a small change is easier to diagnose and undo; see [[Continuous Deployment]].

Recovery time breaks into stages, each with its own fixes:

- **Detect.** How long until someone or something notices? Better alerts and [[Synthetic Monitoring]] shorten this.
- **Diagnose.** How long to understand what's wrong? Good [[Observability]] and recent-change history help.
- **Mitigate.** How long to stop the damage? Rollbacks, [[Feature Flag]]s, and traffic shifting often restore service before the root cause is known.
- **Coordinate.** Clear roles, runbooks, and communication keep people from working at cross purposes; see [[Incident Response]].

The "R" is ambiguous. It can mean repair, recovery, restore, respond, or resolve, and teams using the same acronym often measure different intervals. Comparing MTTR across organizations is usually meaningless.

The average itself is also a problem. Incident durations are highly skewed: most are short, and a few last many hours or days. In such data the mean is dominated by rare long incidents and swings widely from quarter to quarter, regardless of whether anything improved. An analysis of thousands of public incident reports concluded that MTTR is too noisy to track reliably and suggested looking at the distribution, or studying individual incidents in depth instead; see [[Blameless Postmortem]].

Like any target, MTTR can be gamed. Closing incidents quickly, splitting one long incident into several short ones, or declaring recovery before users would agree all improve the number without improving anything real; see [[Goodhart's Law]].

The more durable idea is the design goal behind the metric: build systems and teams that expect failure and are good at recovering from it; see [[Site Reliability Engineering]] and [[Service Level Objective]].

## See also
- [[Status Page]]
- [[Bathtub Curve]]
- [[Knight Capital Incident]]
