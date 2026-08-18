---
aliases:
  - Blue-Green Release
tags:
  - delivery
summary: Running two identical production environments and switching traffic between them instead of upgrading one in place.
---
**Blue-Green Deployment** keeps two identical production environments, conventionally called blue and green. One serves live traffic while the other sits idle or gets the new version. Once the idle environment is deployed and checked, a router or load balancer flips traffic to it in one move. The old environment stays up, untouched, as an instant rollback target.

The appeal is that the cutover is a single atomic switch rather than a rolling upgrade of live instances, so there is no window where some requests hit old code and others hit new code against a half-migrated environment. If the new version misbehaves, flipping back is as fast as flipping forward — no redeploy, no rebuild, just repointing traffic.

The cost is doubled infrastructure, at least for the overlap window: two full environments' worth of compute, and — the sharper trap — a shared database that both versions must speak to correctly, since only the application layer duplicates cleanly. A schema change that the old version can't read breaks the instant-rollback promise the whole pattern is built on. See [[Database Migration]] for the discipline this forces: migrations must be backward-compatible for at least one release before the old code is retired.

It's a coarser instrument than [[Canary Release]], which shifts a small percentage of traffic and watches before going further. Blue-green is all-or-nothing per switch; canary is gradual and self-limiting. Teams often use both — canary to de-risk the release, blue-green (or a router flip) to make the eventual full cutover instant and reversible.

## See also
- [[Canary Release]]
- [[Rollback]]
- [[Zero-Downtime Deployment]]
- [[Feature Flag]]

## Related
- [[Database Migration]]
- [[Immutable Infrastructure]]
