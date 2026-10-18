---
aliases:
  - DORA
  - Four key metrics
  - Deployment frequency
  - Change failure rate
  - Lead time for changes
tags:
  - delivery
summary: Four research-backed measures of software delivery, two for speed and two for stability, and the finding that the best teams are better at both rather than trading one for the other.
---
The **DORA metrics** are four measures of how well a team delivers software, developed by the DevOps Research and Assessment program. Starting in 2014, Nicole Forsgren, Jez Humble, and Gene Kim surveyed tens of thousands of practitioners for the annual State of DevOps reports, and published their findings in the 2018 book *Accelerate*. Google acquired DORA that year and continues the research.

The four key metrics split into two for throughput and two for stability:

- **Deployment frequency.** How often the team ships to production.
- **Lead time for changes.** How long a change takes to go from [[Commit]] to running in production.
- **Change failure rate.** The share of deployments that cause a failure needing a fix, a hotfix, or a [[Rollback]].
- **Time to restore service.** How long it takes to [[Incident Response|recover]] when something breaks, renamed *failed deployment recovery time* in 2023.

A fifth measure, reliability, was added in 2021 to capture whether the service meets its operational targets.

The headline finding was that speed and stability are not a trade-off. The conventional view held that moving faster meant breaking more, so careful organizations should deploy rarely. The data showed the opposite: teams that deployed most often also had the lowest failure rates and recovered fastest, while slow, infrequent deployers did worst on everything. Small, frequent changes are easier to test, review, and diagnose, and a team that deploys daily has practiced the process far more than one that deploys quarterly.

The research also identified practices that predict good results. These include [[Continuous Integration]], [[Trunk-Based Development]] with short-lived branches, automated testing, a reliable [[Deployment Pipeline]], loosely coupled architecture, and [[Observability]] good enough to spot problems quickly. Techniques that limit the damage of a bad release, such as a [[Canary Release]] or a [[Feature Flag]] that can switch a change off, improve stability without slowing anything down. Culture mattered as well: teams with a high-trust, blameless approach to failure, like the [[Blameless Postmortem]], performed better.

The metrics are easy to misuse. They describe a team's delivery system, not individual performance, and ranking people by deployment count invites [[Goodhart's Law]]: splitting changes artificially, or declining to record failures. They also measure delivery, not whether the software delivered is valuable, since a team can ship the wrong thing very efficiently. DORA's own guidance is to track the metrics over time within a team, use them to find bottlenecks, and avoid comparing unlike teams against each other. Overloaded [[Code Review]] queues and long-lived [[Pull Request]] branches are common causes of long lead times, and accumulated [[Technical Debt]] often shows up as a rising change failure rate.

## See also
- [[Mean Time to Recovery]]
