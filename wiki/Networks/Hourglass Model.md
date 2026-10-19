---
aliases:
  - Narrow waist
  - Spanning layer
  - IP on everything
tags:
  - networks
summary: The shape of the internet's architecture, with many link technologies below and many applications above a single thin layer, IP, in the middle, which lets both sides evolve independently and makes the middle itself almost impossible to change.
---
The **hourglass model** describes the internet's architecture as an hourglass. At the wide bottom are many ways to move bits: copper, fiber, radio, satellite. At the wide top are many applications: email, the web, video, games. In between, at the narrow waist, is a single common layer, the Internet Protocol, which every network below carries and every application above relies on; see [[OSI Model]].

The narrowness is the point. Because IP asks very little of the networks beneath it, only to carry packets on a best-effort basis, almost any link technology can carry it; see [[Ethernet]] and [[Wi-Fi]]. Routers in the middle need not understand what the packets carry, only where they are going, so they stay simple and the network stays indifferent to the applications using it. Because applications need to know only IP, they work across every one of those networks without change. New link technologies and new applications can therefore appear independently, without coordination, which is a large part of why the internet absorbed so many innovations it was never designed for; see [[End-to-End Principle]] and [[Packet Switching]].

The phrase became widely used after Steve Deering's 2001 talk to the internet's main standards body, "Watching the Waist of the Protocol Hourglass," which pointed out that the waist had begun to grow. Vint Cerf's slogan "IP on everything" summarized the strategy. Later work by Micah Beck framed it more generally: the thinner and more general the shared layer, the more diverse the uses built on it.

The same logic appears beyond networking. A shipping container lets any ship or truck carry any cargo; the Unix idea that everything is a file let many programs work with many devices; compilers route many source languages to many processors through one shared intermediate form; see [[Everything is a file]] and [[Compiler]]. In each, agreement on a small middle frees both ends.

The cost is that the waist is extraordinarily hard to change, because everything depends on it. Replacing it would mean changing every host and router at once, and nobody is in a position to coordinate that. The upgrade from IPv4 to IPv6, begun in the 1990s, is still incomplete decades later; see [[IPv6]]. Worse, the effective waist has crept upward. Firewalls, load balancers, and other middleboxes along the path came to expect particular transport protocols and ports, so in practice new protocols must travel over TCP or UDP, and often over HTTPS on port 443, which is why QUIC was built on top of UDP rather than as a new transport; see [[QUIC]] and [[Hypertext Transfer Protocol]].

Every behavior of the waist becomes something someone depends on, which is why hourglass designs are both powerful and rigid; see [[Hyrum's Law]] and [[Postel's Law]].

## See also
- [[Leaky Abstraction]]
- [[Network Topology]]
- [[File Transfer Protocol]]
