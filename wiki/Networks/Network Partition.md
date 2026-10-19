---
aliases:
  - Split Brain
  - Split-brain
  - Partition
  - Fencing token
  - STONITH
tags:
  - networks
summary: A network failure that splits a cluster into groups that can't reach each other but keep running, and the split brain that follows when each side thinks it is in charge.
---
A **network partition** happens when a failure splits a distributed system into groups of machines that can each talk among themselves but not to the other groups. Every machine is still running. From inside each group, the machines on the other side look exactly as if they had crashed, and there is no way to tell the difference. That ambiguity is what makes partitions hard.

Partitions are not rare. A failed switch, a misconfigured [[Firewall]] rule, a severed cable between data centers, or a long garbage-collection pause that makes one machine stop answering for a few seconds can all cause one. Studies of production outages have found partitions behind many serious failures, often in software that had never been tested against them, one of the [[Fallacies of Distributed Computing]] in action.

The [[CAP Theorem]] states the core trade-off: during a partition, a system must choose between consistency and availability. A consistent system refuses requests on the side that can't confirm it has the latest data. An available system keeps answering on both sides and accepts that they will diverge, to be reconciled later through [[Eventual Consistency]] or a [[Conflict-Free Replicated Data Type]].

The worst outcome is **split brain**: each side elects its own leader, both accept writes, and the data diverges in ways that may be impossible to merge cleanly. Two database primaries each taking orders, or two nodes each believing they hold a lock, can corrupt data or double-process work. The defenses:

- **Quorums.** A group may act only if it contains a majority of the cluster. Two halves can't both hold a majority, so at most one side continues. [[Consensus Algorithm]] protocols such as Raft and Paxos are built on this, which is why clusters use odd numbers of nodes. See [[Quorum]].
- **Leases.** A leader holds authority only for a limited time and must renew it, so a cut-off leader steps down when its lease runs out, as long as clocks behave. See [[Leader Election]].
- **Fencing tokens.** Each new leader gets a higher number, and storage rejects writes carrying an older one, so a stale leader that wakes up late can't do damage.
- **STONITH.** "Shoot the other node in the head": the surviving side cuts power to the node it can't reach before taking over, guaranteeing it really is gone.

After the partition heals, the system must reconcile. Replicas compare what they missed, using [[Logical Clock]] timestamps or [[Merkle Tree]] comparisons to find differences, a job shared with [[Database Replication]] repair and [[Gossip Protocol]] anti-entropy.

Partition behavior is hard to test because it depends on timing. Kyle Kingsbury's Jepsen project became famous for partitioning real databases and finding lost writes their documentation said couldn't happen. [[Chaos Engineering]] and [[Deterministic Simulation Testing]] inject partitions on purpose.

## See also
- [[Network Topology]]
