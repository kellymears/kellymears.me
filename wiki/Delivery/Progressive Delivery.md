---
aliases:
  - Progressive rollout
  - Staged rollout
  - Percentage rollout
  - Blast radius
tags:
  - delivery
summary: Releasing a change to a growing share of users while watching its effect, so problems are caught when they affect few people and the rollout halts automatically.
---
**Progressive delivery** releases a change gradually, to a small group of users first and then to more, with each step gated on evidence that the change is healthy. The term was coined around 2018 by James Governor of the analyst firm RedMonk to describe what teams were doing beyond [[Continuous Deployment]]: deploying constantly, but controlling who sees each change and how fast.

The key idea is limiting **blast radius**, the number of users affected if something goes wrong. A bug that reaches 1 percent of users for ten minutes is an incident report; the same bug reaching everyone for an hour is an outage. Problems that testing misses, from performance on real data to edge cases in rare configurations, surface at small scale where they're cheap.

A typical rollout looks like this:

1. **Internal users first**, often the team itself; see [[Dogfooding]].
2. **A small percentage of real traffic**, perhaps 1 percent, while dashboards compare error rates and latency against the old version.
3. **Larger steps**, such as 5, 25, 50, and 100 percent, with a pause and a check between each.
4. **Automatic halt and reversal** if metrics cross a threshold, often tied to [[Service Level Objective]] targets.

It builds on familiar techniques:

- **[[Canary Release]]** routes a fraction of traffic to new instances at the infrastructure level.
- **[[Feature Flag]]** systems control exposure in code, per user or per group, so deploying and releasing become separate decisions.
- **[[Rolling Deployment]]** replaces instances gradually, a coarse form of the same control.
- **[[Shadow Traffic]]** sends copies of real requests to a new version with no user exposure at all.
- **[[AB Testing]]** uses the same machinery to measure whether a change helps, not just whether it breaks.

Mobile app stores offer staged rollouts too, releasing an update to a growing percentage of devices. Because mobile updates can't be rolled back once installed, that staging matters even more there.

Automating the decisions is what distinguishes progressive delivery from cautious manual releases. Analysis tools compare the new version's metrics with the baseline and promote or abort without a person watching graphs. This requires good [[Observability]]: if you can't tell whether the 1 percent is suffering, the gradual rollout only spreads the problem slowly.

Gradual exposure has limits. Some failures, such as a database migration or a change to shared data, affect everyone the moment they run, whatever percentage of traffic sees new code. Users can also see inconsistent behavior across devices or sessions while a rollout is in progress. And small samples hide rare problems: a bug hitting one request in a million may not appear at 1 percent. [[Incident Response]] stays necessary, but there are fewer incidents to respond to.

## See also
- [[Patch Tuesday]]
- [[CrowdStrike Outage]]
- [[Site Reliability Engineering]]
- [[Testing in Production]]
- [[Change Advisory Board]]
