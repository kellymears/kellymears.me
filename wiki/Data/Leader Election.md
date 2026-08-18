---
aliases:
  - Master election
tags:
  - data
summary: The process a distributed system uses to pick one node to coordinate, and to notice and replace it when it dies.
---
**Leader election** is the process by which a group of nodes agrees on one of themselves to act as the coordinator for some duty — accepting writes, sequencing events, owning a lock — and, crucially, detects when that leader has failed and elects a replacement. Almost every system with a single primary and multiple replicas needs this somewhere: a [[Database Replication|replicated database]] needs to know which node currently accepts writes, and a cluster of worker processes doing the same job needs exactly one of them running a scheduled task rather than all of them or none.

The mechanism nearly always rests on a [[Consensus Algorithm]] like Raft, because "pick a leader" is really "get every node to agree on the same leader despite messages arriving late or not at all," which is the exact problem consensus protocols solve. A common building block is the **lease**: a node holds leadership only until a time-bounded lease expires, and must keep renewing it to stay leader, which bounds how long a network partition can leave two nodes each believing they're the leader.

That dual-leader scenario — **split brain** — is the failure mode leader election exists to prevent, and the one that shows up when it's implemented wrong. If a network partition isolates the current leader from the rest of the cluster, and the rest elects a new one, the old leader may keep acting as leader from its own isolated point of view, accepting writes nobody else will ever see. Correct implementations guard against this with fencing tokens or lease timeouts strict enough that an isolated leader stops trusting itself before a majority elsewhere can safely proceed without it.

## See also
- [[Consensus Algorithm]]
- [[Database Replication]]
- [[CAP Theorem]]
- [[Two-Phase Commit]]
