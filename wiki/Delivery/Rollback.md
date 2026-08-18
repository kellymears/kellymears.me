---
aliases:
  - Rolling Back
tags:
  - delivery
summary: Reverting a running system to a previous known-good version, as distinct from fixing forward.
---
**Rollback** reverts a deployed system to a previous version after a release turns out to be bad. It is the release-time counterpart to [[Rebase]]-and-revert in source control: instead of rewriting history, you redeploy an artifact that already worked. The whole point is speed — a rollback exists to stop the bleeding *now*, not to diagnose or fix the underlying bug, which can happen afterward at normal pace.

How fast a rollback is depends entirely on what has to move to make it happen. Repointing a load balancer between two live [[Blue-Green Deployment]] environments is close to instant. Redeploying a previous container image is a build-free but not zero-time operation. Worst is anything that touched shared state: a [[Database Migration]] that dropped a column can't be rolled back by redeploying old code if that code now queries a column that no longer exists. This is why migrations are written to be backward-compatible for at least one release — rollback safety is designed in ahead of the release, not improvised during the incident.

The alternative discipline is "fix forward": rather than reverting, ship a fix as fast as possible on top of the bad release. Fixing forward is sometimes forced — when the bad release already committed side effects (sent emails, charged cards) that reverting the code can't undo — and sometimes chosen, when the team judges a targeted fix is faster or safer than an untested revert. Neither approach is universally correct; picking between them under incident pressure is exactly the kind of decision a rehearsed rollback plan exists to make routine instead of improvised.

## See also
- [[Blue-Green Deployment]]
- [[Canary Release]]
- [[Database Migration]]
- [[Rebase]]

## Related
- [[Zero-Downtime Deployment]]
- [[Immutable Infrastructure]]
