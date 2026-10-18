---
aliases:
  - Quorums
  - Majority quorum
  - Read quorum
  - Write quorum
  - Quorum consistency
tags:
  - networks
summary: The minimum number of replicas that must agree before a distributed system acts, chosen so that any two such groups overlap and the system can't contradict itself.
---
A **quorum** is the minimum number of members of a group that must take part before a decision counts. The word comes from legislatures, where a vote is valid only if enough members are present. In distributed systems, a quorum is the number of replicas that must acknowledge a read or write before the system treats it as done.

The core idea is overlap. In a cluster of five nodes, any two groups of three share at least one node. If every decision needs three votes, two conflicting decisions can't both pass, because the shared node would have to vote for both. A majority quorum is the smallest size with this property: more than half the nodes. This is how distributed systems avoid [[Network Partition]] split brain, since only one side of a split can hold a majority.

The arithmetic explains why clusters come in odd sizes:

- **Three nodes** need two to agree and survive one failure.
- **Five nodes** need three and survive two.
- **Four nodes** need three and still survive only one, so the fourth node adds cost without adding tolerance.

Quorums show up in two main forms.

- **Consensus.** [[Consensus Algorithm]] protocols such as Raft and Paxos commit a log entry once a majority has stored it, and a candidate becomes leader only with a majority of votes. See [[Leader Election]].
- **Read and write quorums.** In replicated databases in the style of Amazon's Dynamo, such as Cassandra, each item is stored on N replicas. A write waits for W of them to confirm, and a read asks R of them and takes the newest answer. If R + W > N, every read overlaps with the latest write and sees it. Setting W = 1 makes writes fast but risks losing them; setting R = 1 makes reads fast but they may be stale. See [[Database Replication]].

Quorums trade availability for safety. If too many nodes are unreachable, the system stops accepting writes rather than risk contradiction, the consistent choice in the [[CAP Theorem]]. Systems that prefer to keep working use *sloppy quorums*, accepting writes on whichever nodes are reachable and handing them back later, which leads to [[Eventual Consistency]].

Waiting for several replicas also costs time. A quorum operation finishes only when the slowest member of the quorum responds, so it inherits [[Tail Latency]] from its replicas, and placing replicas in distant regions adds [[Latency and Jitter]] to every write.

Quorum ideas reach beyond databases. A [[Gossip Protocol]] may require several independent reports before declaring a node dead, and Byzantine fault-tolerant systems, which tolerate members that lie, need larger quorums of more than two-thirds.

## See also
- [[Wide-Column Store]]
- [[N-Version Programming]]
- [[Token Ring]]
- [[CAP Theorem]]
- [[Byzantine Fault Tolerance]]
- [[Two Generals Problem]]
