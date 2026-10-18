---
aliases:
  - Two Generals
  - Two Generals' Problem
  - Coordinated attack problem
tags:
  - networks
summary: The thought experiment proving that two parties can never be certain they agree when messages can be lost, the reason networked systems settle for probability and retries instead of certainty.
---
The **Two Generals Problem** is a thought experiment showing that agreement over an unreliable channel is impossible to guarantee. It was first described in 1975 and named by Jim Gray in 1978, and it is one of the first results every student of distributed systems meets.

Two armies are camped on hills on either side of a valley, with the enemy city between them. If both attack at the same time they win, and if only one attacks it is destroyed. The generals can communicate only by messengers who cross the valley, and any messenger may be captured. General A sends "attack at dawn." But A can't attack unless they know B received it, so B sends back a confirmation. Now B can't be sure the confirmation arrived, and without it, A won't attack, so B wants a confirmation of the confirmation. Every message needs an acknowledgment, which itself needs one, forever.

The proof is short. Suppose some protocol worked, and take its shortest successful run. The last message in it might be lost, and its sender can't tell. Since the sender acts the same either way, the protocol must succeed without that message, so a shorter run works too, which contradicts the assumption. No finite number of messages gives both sides certainty.

The problem is about **lost messages**, not dishonest ones. Its harder cousin, where some generals lie or send conflicting orders, is the problem of [[Byzantine Fault Tolerance]].

Real systems live with the impossibility rather than solving it:

- **Accept probability.** Sending many copies, or retrying until acknowledged, makes failure unlikely, though never impossible. The TCP handshake in [[TCP and UDP]] is a practical compromise, three messages that make agreement very likely and stop there.
- **Make duplicates harmless.** Since a sender can't tell whether a message or its acknowledgment was lost, it resends, so receivers must tolerate copies. That's why [[Idempotence]] matters and why exactly-once processing is built from at-least-once delivery plus deduplication, as described in [[Delivery Guarantees]].
- **Use timeouts.** A [[Failure Detection]] timer can't distinguish a slow peer from a dead one, the same uncertainty in another form.
- **Commit in phases.** [[Two-Phase Commit]] gets all participants to agree on a transaction outcome, but it can block indefinitely if the coordinator fails, an echo of the generals' dilemma.

The problem sits beside other impossibility results that shape the field, including the [[CAP Theorem]], which forces a choice during a [[Network Partition]], and the limits that every [[Consensus Algorithm]] works around. Its practical lesson matches the [[Fallacies of Distributed Computing]]: the network is not reliable, and protocols must be designed for messages that vanish.

## See also
- [[Logical Clock]]
- [[Exponential Backoff]]
- [[Quorum]]
- [[Halting Problem]]
