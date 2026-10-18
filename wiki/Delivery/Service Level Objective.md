---
aliases:
  - SLO
  - Service level indicator
  - SLI
  - Service level agreement
  - SLA
  - Error budget
tags:
  - delivery
summary: A target for how reliable a service should be, measured from the user's point of view, and the error budget that turns the gap between the target and perfection into a shared decision about risk.
---
A **service level objective (SLO)** is a target for how reliable a service should be over a period, such as "99.9 percent of requests succeed within 300 milliseconds, measured over 28 days." The idea was popularized by Google's *Site Reliability Engineering* book in 2016 and is now a standard way to talk about reliability.

Three related terms are easy to confuse:

- **Service level indicator (SLI).** The measurement itself: the share of requests that succeed, the share served under a latency threshold, or the share of data that is fresh. Good indicators measure what users experience, usually at the [[Load Balancing]] layer or in the client, not internal signals like CPU use.
- **Service level objective (SLO).** The target for that indicator. It is an internal goal the team chooses.
- **Service level agreement (SLA).** A contract with customers that carries consequences, such as refunds, when it's missed. SLAs are usually set looser than SLOs so the team notices trouble before it costs money.

The most useful idea attached to SLOs is the **error budget**. If the objective is 99.9 percent, the remaining 0.1 percent is the amount of failure the service is allowed: about 43 minutes of full downtime in a 30-day month, or an equivalent number of failed requests. While budget remains, the team can ship quickly and take risks. When the budget is spent, the agreed response is to slow down: pause risky launches and put effort into reliability until the budget recovers.

The budget turns an argument between speed and stability into arithmetic. It also makes the point that 100 percent is the wrong target. Each extra nine costs far more than the last, users can't tell the difference past a point because their own networks and devices fail more often, and a service that never fails is probably changing too slowly. Teams track delivery speed and failure rates together, as in [[DORA Metrics]], for the same reason.

Practical habits that go with SLOs:

- **Alert on budget burn.** Page someone when the budget is being consumed fast enough to run out soon, rather than on every error spike. This cuts noisy alerts that wake people for nothing; see [[Incident Response]].
- **Spend the budget deliberately.** A [[Canary Release]] limits how much budget a bad change can consume, and planned maintenance can be scheduled against it.

SLOs depend on good measurement, the territory of [[Observability]]. They also depend on the services underneath: a service can be no more reliable than the dependencies it calls in sequence, which is one reason designs add a [[Circuit Breaker]] and graceful degradation so a failing dependency costs part of the budget instead of all of it.

## See also
- [[Status Page]]
- [[Dashboard]]
- [[Andon Cord]]
- [[Margin of Safety]]
- [[Synthetic Monitoring]]
- [[Site Reliability Engineering]]
- [[Microservices]]
- [[Load Shedding]]
