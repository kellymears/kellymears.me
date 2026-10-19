---
aliases:
  - Shift-right testing
  - Production testing
tags:
  - testing
summary: Deliberately verifying software against real traffic, data, and infrastructure after deployment, accepting that no pre-production environment fully matches production and managing the risk instead.
---
**Testing in production** means deliberately verifying software in the live environment, with real traffic, real data, and real infrastructure. The phrase once sounded like a confession of skipping tests. It's now a recognized practice, often called **shift-right testing**, the counterpart to catching problems earlier in development; see [[Shift-Left Testing]].

The argument for it is that production can't be fully reproduced anywhere else. Staging environments differ in scale, data, configuration, traffic patterns, and the behavior of third-party services. Some failures only appear under real load, with real users doing unexpected things, or after weeks of uptime. Every system is tested in production eventually, by its users. The question is whether that happens on purpose, with safeguards and good instruments, or by accident.

The practice is a set of techniques for limiting damage while learning from reality:

- **Progressive rollout.** Release to a small share of users or servers first, watch the metrics, then widen; see [[Canary Release]] and [[Progressive Delivery]].
- **Feature flags.** Deploy code dark, then enable it for internal users, a percentage, or specific accounts, with a quick off switch; see [[Feature Flag]].
- **Shadow traffic.** Copy real requests to the new version and compare its responses without returning them to users; see [[Shadow Traffic]].
- **Synthetic checks.** Run scripted transactions against production continuously to catch outages before users do; see [[Synthetic Monitoring]].
- **Experiments.** Compare versions on real users with controlled splits; see [[AB Testing]].
- **Fault injection.** Break things deliberately in production to verify resilience; see [[Chaos Engineering]].
- **Internal use first.** Have the team use the release before customers do.

These depend on good instruments. Testing in production is only safe if the team can see what's happening, through metrics, logs, and traces, and can tell a bad release from a good one quickly; see [[Observability]]. Automated rollback when error rates or latency cross a threshold turns a canary into a real safety net; see [[Rollback]] and [[Service Level Objective]].

It also needs care with data and users. Test accounts, synthetic orders, and probe traffic must be marked so they don't trigger real shipments, bill real cards, or distort analytics. Experiments on users raise ethical questions about consent, and some domains, like medical devices or payments, demand much stronger pre-production assurance.

Testing in production doesn't replace earlier testing. Unit, integration, and end-to-end tests still catch most bugs cheaply; production verification catches what they can't. The two together form a feedback loop: incidents and surprises found in production become regression tests, so the same failure is caught earlier next time; see [[Regression Testing]].

## See also
- [[Non-Destructive Testing]]
- [[Mars Pathfinder Priority Inversion]]
- [[GitLab Database Incident]]
