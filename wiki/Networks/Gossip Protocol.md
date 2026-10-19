---
aliases:
  - Gossip
  - Epidemic protocol
  - Anti-entropy
  - SWIM
tags:
  - networks
summary: Spreading information through a cluster by having each node periodically share what it knows with a few random peers, the way rumors and infections spread.
---
A **gossip protocol** spreads information through a group of machines the way rumors spread through a crowd. Periodically, each node picks a few other nodes at random and exchanges what it knows with them. Those nodes pass it on in their next round, and so on. Because the number of informed nodes roughly multiplies each round, news reaches the whole cluster in a number of rounds proportional to the logarithm of the cluster size. A thousand nodes are covered in a handful of rounds, with no central coordinator. The approach is also called an *epidemic protocol*, since the mathematics comes from the spread of infections. It was introduced for database replication at Xerox PARC in 1987.

Gossip's strengths come from its randomness and redundancy:

- **No single point of failure.** There is no coordinator to crash. Any node can start a rumor and any node can relay it.
- **Robustness.** Messages are lost, nodes fail, and the network partitions, but with redundant random exchanges, information eventually gets around failures.
- **Bounded load.** Each node talks to a fixed number of peers per round regardless of cluster size, so the protocol scales smoothly.

The costs are the reverse of those strengths. Propagation is probabilistic and takes several rounds, so different nodes see updates at different times, and the system is only [[Eventual Consistency|eventually consistent]]. Redundant messages waste some bandwidth. Gossip spreads information well, but it can't make a cluster agree on a single decision. That takes a [[Consensus Algorithm]] or [[Leader Election]].

Common uses:

- **Membership and failure detection.** Nodes gossip about who is alive. The SWIM protocol, used in tools such as HashiCorp's Serf and Consul, has nodes probe random peers and ask others to confirm before declaring a node dead, which avoids false alarms from a single slow link.
- **Anti-entropy repair.** Replicas periodically compare data, often by exchanging hash summaries, and copy over whatever the other is missing. Cassandra and DynamoDB-style databases use this to heal [[Database Replication]] divergence.
- **State dissemination.** Spreading configuration, cluster metadata, or load information. Blockchain and [[Peer-to-Peer]] networks gossip transactions and blocks.

Gossip pairs naturally with data that merges cleanly. A [[Conflict-Free Replicated Data Type]] can be gossiped in any order and still converge. [[Logical Clock]] stamps such as vector clocks help nodes decide which version of a piece of gossip is newer. The protocol is the network version of how information moves through social groups, with the same weakness: a false rumor spreads just as efficiently as a true one, as with an [[Availability Cascade]].

## See also
- [[Herd Immunity]]
- [[Distributed Hash Table]]
- [[Wide-Column Store]]
- [[Blockchain]]
- [[Antibiotic Resistance]]
- [[Morris Worm]]
- [[Multicast]]
