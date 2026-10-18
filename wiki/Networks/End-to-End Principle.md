---
aliases:
  - End-to-end argument
  - End-to-end arguments
  - Dumb network
  - Protocol ossification
tags:
  - networks
summary: The design argument that functions like reliability and security belong at the endpoints of a communication rather than inside the network, which shaped the internet's simple core.
---
The **end-to-end principle** holds that functions which can only be done correctly with knowledge held by the endpoints of a communication, the applications at each end, should be implemented there rather than inside the network that connects them. Jerome Saltzer, David Reed, and David Clark set out the argument in their 1984 paper "End-to-End Arguments in System Design," and it became one of the defining ideas of internet architecture.

Their central example is careful file transfer. Even if every network link checks for errors, a file can still be corrupted on the sender's disk, in a buggy buffer, or on the way to the receiver's storage. The only way to know the file arrived intact is for the receiving application to verify it against the sender's checksum, a [[Hash Function]] comparison done end to end. Since that check is needed anyway, building perfect reliability into the network is redundant. The network can still help, for instance by retransmitting lost packets on a noisy link, but only as a performance optimization, not a guarantee.

Applied to the internet, this led to a deliberately simple core. IP routers just forward packets on a best-effort basis. Reliability, ordering, and flow control live in endpoints, in TCP or in the application (see [[TCP and UDP]]), and so do encryption and authentication, through [[Transport Layer Security]]. A simple network that doesn't need to understand applications let new ones appear without anyone's permission. The web, voice calls, video streaming, and [[Peer-to-Peer]] systems all ran over a network not designed for them.

The principle has been eroded in practice. *Middleboxes*, devices in the path that inspect or modify traffic, such as [[Firewall]] appliances, address translators that make [[NAT Traversal]] necessary, and transparent proxies, all assume particular protocols. They drop anything unfamiliar, which makes it nearly impossible to deploy new transport protocols, an effect called *protocol ossification*. [[QUIC]] was designed around this: it runs over UDP, which middleboxes already pass, and encrypts almost all of its headers so devices in the path can't depend on them. [[IPv6]] was partly meant to restore end-to-end addressing that NAT had broken.

The idea has policy echoes. Net neutrality arguments draw on it, holding that the network should carry packets without favoring particular applications. In software design more broadly, it resembles advice to put checks where the knowledge lives: a [[Reverse Proxy]] can retry a request, but only the application knows whether retrying is safe, which takes [[Idempotence]] and agreed [[Delivery Guarantees]]. Its preference for a simple core that leaves complexity at the edges is a cousin of [[Worse Is Better]].

## See also
- [[Delay-Tolerant Networking]]
- [[Onion Routing]]
- [[Net Neutrality]]
