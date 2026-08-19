---
aliases:
  - Distributed consensus
  - Raft
  - Paxos
tags:
  - data
summary: A protocol that gets a majority of unreliable, independent nodes to agree on one value, surviving any minority failing.
---
A **consensus algorithm** is a protocol that lets a group of independent nodes agree on a single value or sequence of values, even when some nodes crash, restart, or are temporarily unreachable — as long as a majority stays reachable. It's the mechanism underneath [[Leader Election]], replicated logs, and distributed configuration stores: anywhere multiple nodes need one agreed-upon truth without a single node being unilaterally trusted to declare it.

Paxos, first published in 1998, was the foundational protocol and is notoriously difficult to understand and implement correctly — enough so that its own author wrote a second paper, "Paxos Made Simple," trying to explain the first one. Raft, published in 2014, was designed explicitly as an easier-to-reason-about equivalent, breaking consensus into separately understandable sub-problems (leader election, log replication, safety) rather than Paxos's more unified but opaque proof. Raft's approachability is a large part of why it now backs etcd, Consul, and CockroachDB, among others.

The core guarantee any consensus algorithm provides is safety under partial failure: a decision, once made, is never silently reversed even if the node that helped make it later disappears, and progress only requires a majority (a quorum) rather than every node — which is precisely how it survives the blocking problem that [[Two-Phase Commit]] has, since a failed *minority* never freezes the rest. The trade is latency and complexity: every agreed value costs a round of majority voting, and running one correctly, with the right edge cases around network partitions and stale leaders, is genuinely hard to get right from scratch, which is why nearly everyone reaches for an existing implementation rather than writing one.

## See also
- [[Leader Election]]
- [[Two-Phase Commit]]
- [[CAP Theorem]]
- [[Database Replication]]
