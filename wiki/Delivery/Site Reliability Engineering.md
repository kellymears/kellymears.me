---
aliases:
  - SRE
  - Toil
  - Four golden signals
  - Golden signals
tags:
  - delivery
summary: Running operations as a software engineering problem, with error budgets deciding when to ship, a cap on manual toil, and blameless learning from failure.
---
**Site reliability engineering (SRE)** is an approach to running production systems that treats operations as a software problem. Ben Treynor Sloss started it at Google in 2003 and described it as what happens when you ask a software engineer to design an operations team. Google's 2016 book *Site Reliability Engineering* spread the practices widely.

Its central idea is that reliability is a feature with a cost, and that 100 percent is the wrong target. Users cannot tell the difference between very high reliability and perfect reliability, because their own networks and devices fail more often, while each additional nine costs dramatically more. So SRE sets a target and manages to it.

The main practices:

- **Service level objectives and error budgets.** A [[Service Level Objective]] sets a reliability target, such as 99.9 percent of requests succeeding. The remaining 0.1 percent is the *error budget*. While budget remains, teams ship freely; when it is spent, releases slow and work turns to reliability. This replaces arguments between developers and operations with a shared number.
- **Capping toil.** *Toil* is manual, repetitive, automatable work that scales with the service and produces no lasting value, such as restarting servers by hand or running the same fix every week. Google's SRE teams aim to keep it under half their time, spending the rest on engineering that removes it, through automation and [[Infrastructure as Code]].
- **Monitoring that matters.** The *four golden signals* are latency, traffic, errors, and saturation. Latency is tracked by percentiles, since averages hide the slow requests captured by [[Tail Latency]]. Alerts should fire on symptoms users feel, not every internal blip, to avoid the alarm fatigue covered under [[Habituation]]. Broader [[Observability]] supports diagnosis.
- **Incidents and learning.** Structured [[Incident Response]] with clear roles, followed by a [[Blameless Postmortem]] that looks for system causes rather than culprits.
- **Safe change.** Most outages follow changes, so SRE favors gradual rollouts such as a [[Canary Release]], fast [[Rollback]], and limits on how much can change at once.
- **Sustainable on-call.** Limits on pages per shift and enough people in rotation, because exhausted engineers make incidents worse.

SRE also tests reliability deliberately, through [[Chaos Engineering]] and disaster-recovery exercises, and checks user-facing paths from outside with [[Synthetic Monitoring]].

The relationship to DevOps is often summarized with Google's line that SRE is one concrete implementation of DevOps ideas. DevOps names a culture of shared ownership between development and operations; SRE prescribes specific practices, metrics, and team structures. The [[DORA Metrics]] measure outcomes both care about.

SRE adopted badly becomes an operations team renamed. Without error budgets that actually gate releases, a toil cap that is enforced, and the authority to push back on unreliable launches, the title changes and the work does not.

## See also
- [[Platform Engineering]]
- [[Failure Mode and Effects Analysis]]
- [[Configuration Drift]]
