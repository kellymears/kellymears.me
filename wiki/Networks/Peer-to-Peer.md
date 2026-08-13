---
aliases:
  - P2P
tags:
  - networks
summary: An architecture where participants communicate directly rather than through a central server.
---
**Peer-to-peer** architecture has participants exchange data with each other directly rather than through a server. The appeal is structural: no server to run, no server to pay for, no server to be a bottleneck or a single point of failure, and no operator holding everyone's data.

The costs are equally structural. Participants must find each other, which usually requires *some* central component even in an otherwise decentralised design. Connectivity is unreliable — most participants sit behind network address translation and cannot accept incoming connections without traversal techniques. State lives on peers, so it disappears when they do, unless something replicates it; see [[Conflict-Free Replicated Data Type]]. And **nothing is authoritative**, which means rule enforcement is advisory: a determined participant can modify their own client.

That last point is a design decision rather than a defect. For a game among friends, client-side enforcement is a reasonable trade — the alternative is infrastructure nobody wants to run, and the threat model does not justify it. For anything competitive or valuable, it is not.

The pattern is at its best where the value is in the connection rather than in stored state, and where "no server I run" is a goal in itself rather than merely a cost saving.

## See also
- [[WebRTC]]
- [[Signaling Server]]
- [[Conflict-Free Replicated Data Type]]
- [[Eventual Consistency]]

## Related
- [[Idempotence]]
