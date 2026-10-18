---
aliases:
  - Linearizability
  - Jepsen
  - Consistency checking
tags:
  - testing
summary: Testing whether a distributed system really behaves like a single copy of its data, by recording concurrent operations under injected faults and checking whether any valid sequential order could explain them.
---
**Linearizability** is the strongest common consistency guarantee for a distributed system. It means every operation appears to take effect instantly at some point between when it was sent and when it returned, so the system behaves as if there were a single copy of the data. If one client's write finishes before another client's read begins, the read must see that write. Maurice Herlihy and Jeannette Wing defined it in 1990.

Many databases, queues, and coordination services claim it or something close. **Linearizability checking** tests whether they actually deliver it, and has found serious bugs in widely used systems.

The best-known work is **Jepsen**, a testing tool and series of analyses by Kyle Kingsbury, begun in 2013. A Jepsen test typically:

- **Runs a real cluster** of the system under test across several nodes.
- **Issues concurrent operations** from many clients: reads, writes, compare-and-set, queue operations, or transactions.
- **Injects faults** while they run: network partitions, clock jumps, process crashes and pauses; see [[Network Partition]] and [[Chaos Engineering]].
- **Records a history** of every operation, with its start time, end time, and result, including operations whose outcome is unknown because of a timeout.
- **Checks the history** against a model of what the system promises.

The check is the hard part. A history is linearizable if there exists some ordering of the operations that respects real time and is valid for a single-copy object, such as a register where each read returns the most recent write. Searching for that ordering is computationally hard in general, so checkers like Knossos and later Elle use clever pruning, or check weaker but more scalable properties of transaction histories. The checker acts as the [[Test Oracle]].

Jepsen analyses have found lost writes, stale reads, split-brain leaders, and transactions that violated their documented isolation levels in a long list of databases. Common causes include relying on clocks being in sync, mishandled leader elections, and acknowledging writes before they were safely replicated; see [[Logical Clock]], [[Consensus Algorithm]], and [[Isolation Level]]. Many findings were gaps between documentation and behavior, which made the reports influential in how vendors described their guarantees.

Linearizability checking complements other approaches:

- **Formal methods** prove that a design is correct before it's built; see [[Formal Verification]].
- **Simulation testing** runs the real code in a controlled, repeatable environment where faults and timing are under test control; see [[Deterministic Simulation Testing]].
- **Property-based testing** generates operation sequences and checks invariants, a smaller-scale version of the same idea; see [[Property-Based Testing]].

The approach has a lesson beyond databases: a system's guarantees are only as good as the evidence for them, and that evidence must include faults. Systems that work on a healthy network may behave differently during a partition; see [[CAP Theorem]] and [[Eventual Consistency]].

## See also
- [[Race Condition]]
- [[Two-Phase Commit]]
- [[Byzantine Fault Tolerance]]
