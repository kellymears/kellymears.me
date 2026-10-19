---
aliases:
  - Staging
  - Test environment
  - Pre-production
  - Deployment environment
tags:
  - testing
summary: A copy of production where changes are deployed and checked before they reach real users, and why the differences between staging and production keep letting bugs through.
---
A **staging environment** is a copy of the production system where changes are deployed and checked before real users see them. Most teams run a chain of environments: developers' local machines, a shared development or test environment, staging, and production. Each step is meant to be closer to production than the last, so problems surface where they are cheap to fix.

Staging catches problems that tests on a single machine can't:

- **Integration.** Services, databases, queues, and third-party APIs connected together, as in an [[Integration Test]] at full scale.
- **Configuration.** Environment variables, secrets, feature flags, and infrastructure settings that only exist in deployed systems.
- **Deployment itself.** Whether the build starts, a [[Database Migration]] runs cleanly, and a rollback works.
- **Human review.** Product owners and testers click through new features, as in [[Acceptance Testing]] and exploratory testing, and a smoke test confirms the basics after each deploy.

The value of staging depends on how closely it matches production, and it never matches perfectly. The [[Twelve-Factor App]] calls this goal dev/prod parity. Common gaps include:

- **Data.** Staging has less data, cleaner data, or old data. Bugs triggered by one customer's odd record, or a table with a hundred million rows, never appear. Copying production data creates privacy risk unless it is masked, since it contains [[Personal Data]], so many teams rely on seed data instead.
- **Traffic.** Staging sees a few testers, not thousands of concurrent users, so contention, race condition bugs, and capacity problems hide. [[Load Testing]] tries to close this gap.
- **Drift.** Long-lived staging environments are patched by hand and drift from production, the problem described under [[Configuration Drift]]. [[Infrastructure as Code]] and immutable infrastructure reduce it.
- **Scale and topology.** Fewer servers, smaller instances, and a single region hide problems that only appear across many.

Shared staging also becomes a bottleneck. Several teams deploy competing changes to one environment, breaking each other's tests and queueing for access. An [[Ephemeral Environment]], a short-lived copy created for each pull request, avoids the queue.

Because staging can't fully reproduce production, many teams combine it with techniques for testing safely in production itself: [[Canary Release]] sends a small share of real traffic to new code, [[Feature Flag]] toggles hide unfinished work, [[Shadow Traffic]] replays real requests against new code without returning its responses, and synthetic monitoring runs scripted checks against the live site. These approaches, sometimes called shifting right, complement rather than replace pre-production checks.

The trade-off is cost and confidence. A staging environment that mirrors production well is expensive to run and maintain, and one that doesn't gives false reassurance. The useful question is not "did it pass staging?" but "what kinds of failures could staging have caught, and what still needs another safeguard?"

## See also
- [[GitLab Database Incident]]
- [[Year 2000 Problem]]
- [[Testing in Production]]
