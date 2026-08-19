---
aliases:
  - Immutable Servers
tags:
  - delivery
summary: Replacing servers wholesale on every change instead of patching them in place.
---
**Immutable Infrastructure** treats deployed servers as disposable artifacts: any change — a config tweak, a dependency bump, a code deploy — produces a whole new server image, and the old one is destroyed rather than edited. Nobody SSHes in to patch a running box. If something is wrong, the fix is a new image built from a known starting point, not an ad hoc change layered onto whatever state the server happens to be in.

The problem this solves is configuration drift: a fleet of servers hand-patched over months accumulates differences nobody documented, until no two are quite the same and nobody can say with confidence what's actually running. A server built by manually applying updates is only as reproducible as someone's memory of what updates got applied. An immutable image, by contrast, is built once from a versioned definition — see [[Infrastructure as Code]] — so the image *is* the documentation, and building it again from the same definition produces the same server — provided the definition pins its inputs, since a floating base image or an unpinned package repository can drift underneath an otherwise identical build.

It also makes rollback trivial in the same way [[Blue-Green Deployment]] does: the previous image still exists, untouched, so reverting is redeploying it rather than trying to undo whatever the last patch did. [[Containerization|Containers]] pushed this idea further than virtual machines did, because a container image is cheap enough to rebuild for every commit, not just every release.

The tradeoff is that anything genuinely needing in-place mutation — a long-lived cache warmed over hours, a stateful service that can't cheaply restart — fights this model, which is why immutable infrastructure pairs naturally with pushing state out to managed databases and object stores, leaving the compute layer free to be thrown away.

## See also
- [[Infrastructure as Code]]
- [[Blue-Green Deployment]]
- [[GitOps]]
- [[Zero-Downtime Deployment]]

## Related
- [[Rollback]]
