---
aliases:
  - Feature toggle
  - Flags
tags:
  - data
summary: A runtime switch that decouples shipping code from enabling behavior.
---
A **feature flag** is a runtime condition that turns behavior on or off without deploying. Flags are what make [[Trunk-Based Development]] and [[Continuous Deployment]] practical: unfinished work can be merged and deployed while remaining inert.

Their uses divide into *release* flags (temporary, removed once a feature is fully out), *operational* flags (permanent kill switches), *permission* flags (entitlements), and *experiment* flags (A/B allocation). Conflating them is how flag systems become unmanageable, since only the first kind should ever be deleted and only the last needs analytics.

Two implementation notes matter more than the mechanism.

**Gate at the narrowest point that is actually load-bearing.** If every affordance for a feature hangs off one component, one condition covers all of them. But hiding the interface is not sufficient — the write path must be gated too, or the capability is merely undiscoverable.

**Verify the off state positively.** An absent element is indistinguishable from a page that failed to load. Confirming that the *surrounding* interface is present on the same load is what makes "the flag is off" a real observation rather than an inference.

Flags accumulate. A flag whose feature has fully shipped is dead conditional logic in every path it touches, and removing it is real work that has to be scheduled.

## See also
- [[Trunk-Based Development]]
- [[Continuous Deployment]]
- [[Technical Debt]]
- [[Multi-Tenancy]]
- [[Draft and Published]]

## Related
- [[Relational Database]]
- [[Headless CMS]]
- [[Continuous Integration]]
- [[Documentation Rot]]
