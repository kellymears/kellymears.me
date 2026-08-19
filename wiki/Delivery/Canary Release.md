---
aliases:
  - Canary Deployment
  - Canary
tags:
  - delivery
summary: Shipping a change to a small slice of traffic first, and only widening it once that slice looks healthy.
---
**Canary Release** ships a new version to a small fraction of production — a percentage of users, one region, one instance — before rolling it out everywhere. The name comes from the caged canary miners carried into tunnels: an early, cheap warning of a problem before it reaches everyone. If error rates, latency, or business metrics on the canary slice look wrong, the rollout stops or reverses, and the vast majority of traffic never saw the bad version.

The mechanism is usually traffic-splitting at a load balancer, service mesh, or [[Feature Flag]] layer, with the split widened in steps — 1%, 10%, 50%, 100% — each gated on the previous step's metrics staying within bounds. This is different from [[Blue-Green Deployment]]'s single all-or-nothing switch: a canary is gradual and self-correcting, catching problems statistical monitoring can see before a human notices, at the cost of a rollout that takes longer and requires real [[Observability]] to be worth doing at all.

Canary releases only work if the metrics being watched are the ones that would actually catch the regression. A canary judged only on HTTP 500 rates will sail through a change that silently corrupts data or degrades a business metric nobody's dashboarding. The discipline is choosing the right signal, not just having *a* signal — and having automated rollback wired to it, since a human watching a dashboard at 2am is not a release strategy.

It composes naturally with [[Continuous Deployment]]: a pipeline that ships every merged commit to production needs exactly this kind of graduated, monitored exposure to make "every commit" survivable.

## See also
- [[Blue-Green Deployment]]
- [[Feature Flag]]
- [[Rollback]]
- [[Continuous Deployment]]

## Related
- [[Zero-Downtime Deployment]]
