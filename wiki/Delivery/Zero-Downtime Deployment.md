---
aliases:
  - Zero Downtime Deploys
tags:
  - delivery
summary: Deploying a new version while the service keeps serving every request, with no maintenance window.
---
**Zero-Downtime Deployment** ships a new version of a running service without a window where it stops responding. No maintenance page, no dropped connections, no "back in five minutes." It's less a single technique than a name for the property that several techniques jointly produce: [[Blue-Green Deployment]]'s traffic switch, [[Canary Release]]'s gradual shift, or a rolling restart that takes instances out of a load balancer's rotation one at a time, waits for each new instance to pass a health check, and only then moves to the next.

The part that's easy to get right and easy to skip is *in-flight requests*: a naive deploy that kills the old process the instant the new one starts drops whatever requests were mid-flight on the old one. The fix is a drain period — stop routing *new* requests to an instance, let its in-flight requests finish on their own, then terminate it — which is why health checks and load-balancer deregistration delays matter as much as the deploy mechanism itself.

The harder part, and the one that actually causes outages labeled "the deploy broke it," is that during a rolling deploy two versions of the application are serving traffic simultaneously, against the same database. A schema change, an API contract change, or a serialized message format that the old version can't read turns "zero downtime" into "the old instances start erroring while the new ones roll out." See [[Database Migration]]: the discipline of expand-then-contract — add the new column or field first, deploy code that can read both, only remove the old one in a later release — exists specifically to make this overlap survivable.

## See also
- [[Blue-Green Deployment]]
- [[Canary Release]]
- [[Rollback]]
- [[Database Migration]]

## Related
- [[Immutable Infrastructure]]
- [[Continuous Deployment]]
