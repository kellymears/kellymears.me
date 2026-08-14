---
aliases:
  - Convergence
tags:
  - networks
summary: A guarantee that replicas converge given no further updates, without guaranteeing when.
---
**Eventual consistency** is the weakest useful consistency guarantee: in the absence of new updates, all replicas will eventually agree. It says nothing about how long that takes or what anyone sees meanwhile.

It exists because of the CAP theorem's trade: a distributed system experiencing a network partition must choose between remaining available and remaining consistent. Choosing availability means accepting that different participants temporarily see different things.

For many systems that is obviously correct. A cached page, a feed, a counter, a search index — all tolerate being briefly behind. For others it is obviously wrong; a balance check that can be stale is not a balance check.

The design work is in making inconsistency *legible* rather than pretending it away. Showing when something was last updated, reflecting a local change immediately while it propagates, and reconciling honestly when the answer arrives are all better than an interface that implies certainty it does not have.

A specific, easily-missed instance: a cache whose scope is a single process behaves like a shared cache in development and like nothing at all across several instances, so a value written by one worker is invisible to the rest. That is eventual consistency with an eventuality of *never*. See [[Cache Invalidation]].

## See also
- [[Conflict-Free Replicated Data Type]]
- [[Cache Invalidation]]
- [[Peer-to-Peer]]
- [[Idempotence]]

## Related
- [[WebRTC]]
- [[Signaling Server]]
- [[Determinism]]
- [[Write-Ahead Logging]]
