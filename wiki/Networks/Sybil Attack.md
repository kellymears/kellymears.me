---
aliases:
  - Sybil
  - Sock puppet
  - Sybil resistance
tags:
  - networks
summary: Subverting a system that counts participants by creating many fake identities, a problem shown in 2002 to be unavoidable without some central authority or cost per identity, and behind fake reviews, vote stuffing, and attacks on peer-to-peer networks.
---
**A Sybil attack** subverts a system by creating many fake identities that one party controls. Any system that counts participants, whether voting, ranking, or routing through randomly chosen peers, assumes each identity is a separate person or machine. Break that assumption and a single attacker looks like a crowd.

The name comes from a 2002 paper by John Douceur at Microsoft Research, after a 1973 book about a woman treated for multiple personalities. Douceur showed that in an open network with no central authority vouching for identities, an attacker can always present many identities unless participants are assumed to have equal resources and to check each other at the same time, conditions that real networks don't meet.

Peer-to-peer systems were the original concern:

- **Taking over lookups.** In a [[Distributed Hash Table]], each node is responsible for part of the key space. An attacker who creates enough nodes near a target key can control who finds it, or surround a victim so all its neighbors are fakes, an eclipse attack.
- **Watching anonymity networks.** Anonymous routing picks relays at random; an adversary running many relays raises the chance of controlling both ends of a path. Tor has repeatedly removed large groups of relays run by single unknown operators; see [[Onion Routing]].
- **Outvoting.** Agreement protocols that tolerate a fraction of faulty members fail when one party controls most of the members; see [[Byzantine Fault Tolerance]] and [[Quorum]].

The same attack runs on social systems. Fake accounts leave reviews, inflate follower counts, stuff polls, and make a fringe view look popular; see [[Astroturfing]] and [[Social Proof]]. Online, these accounts are called sock puppets.

Defenses all make identities costly or scarce:

- **A central authority** issues identities, as a company verifies a phone number or document. It works, at the cost of privacy and a single point of control; see [[SMS]].
- **Resource tests** make each identity cost something hard to fake in bulk, such as solving a puzzle or doing computation; see [[CAPTCHA]] and [[Blockchain]].
- **Rate limits** cap what each address or account can do, although attackers rent many addresses; see [[Rate Limiting]].
- **Social graphs** exploit the fact that fake accounts easily connect to each other but struggle to form many links to real users.
- **Reputation over time** gives new identities little weight until they've behaved well for a while.

None is complete, and each pushes attackers toward the next weakness. Spam works the same way, since email addresses are free; see [[Email Spam]]. Federated networks face it at the server level, where anyone can stand up a new server; see [[Federation]].

## See also
- [[Peer-to-Peer]]
- [[Wiki]]
