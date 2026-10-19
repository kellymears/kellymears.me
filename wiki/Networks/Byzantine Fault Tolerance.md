---
aliases:
  - BFT
  - Byzantine fault
  - Byzantine Generals Problem
  - PBFT
  - Crash fault tolerance
tags:
  - networks
summary: The ability of a distributed system to reach agreement even when some participants lie or send conflicting messages, which costs more replicas and more messages than tolerating simple crashes.
---
A **Byzantine fault** is a failure in which a component doesn't just stop but behaves arbitrarily: it sends wrong data, tells different peers different things, or acts maliciously. **Byzantine fault tolerance** (BFT) is a system's ability to reach correct agreement despite some such participants. The name comes from a 1982 paper by Leslie Lamport, Robert Shostak and Marshall Pease, "The Byzantine Generals Problem".

In the paper's framing, several divisions of an army surround a city, and their generals communicate only by messenger. They must agree to attack together or retreat together. Some generals may be traitors who send "attack" to one colleague and "retreat" to another. Can the loyal generals still reach the same decision?

The answer sets the cost:

- With ordinary unsigned messages, tolerating *f* traitors requires at least **3f + 1** generals in total. With three generals and one traitor, the loyal two can't tell who is lying.
- With **signed messages**, using [[Public-Key Cryptography]], a traitor can't forge what others said, and agreement becomes possible with fewer loyal participants, though the message count is still high.

Compare **crash fault tolerance**, which assumes nodes only stop. Raft and Paxos, the common [[Consensus Algorithm]] choices, need **2f + 1** nodes to survive *f* crashes, since a majority [[Quorum]] always overlaps any other majority. BFT protocols need larger quorums, more rounds of messages and cryptographic checks on each one.

For years BFT was considered too slow for practice. Miguel Castro and Barbara Liskov's *Practical Byzantine Fault Tolerance* (PBFT, 1999) showed a replicated service could run with only modest overhead.

Where it is used:

- **Safety-critical control.** Aircraft flight computers and spacecraft run redundant computers that vote, since a faulty sensor or chip can produce plausible wrong values rather than nothing.
- **Blockchains.** Open networks where anyone can join must assume some participants are hostile. Bitcoin's proof of work reaches probabilistic agreement without knowing the participants, and many newer chains use PBFT-style protocols among a known set of validators. [[Merkle Tree]] roots let participants verify shared state cheaply.
- **Cross-organization systems** where no single party is trusted, the same assumption behind a [[Zero Trust Network]].

Most datacenter systems don't use BFT. Their nodes are run by one operator, so crash tolerance covers the realistic failures at lower cost. BFT also helps less against software bugs than it seems: if every replica runs the same code, a bug that corrupts one corrupts all, so the faults are correlated rather than independent. Running independently written implementations helps against that, as in N-version programming and [[Differential Testing]].

It differs from the Two Generals' Problem, covered under [[Delivery Guarantees]], which concerns unreliable messengers rather than dishonest participants. Both show that the network can't be trusted, as the [[Fallacies of Distributed Computing]] warn.

## See also
- [[Common-Mode Failure]]
- [[Blockchain]]
- [[Federated Learning]]
- [[Gray Failure]]
