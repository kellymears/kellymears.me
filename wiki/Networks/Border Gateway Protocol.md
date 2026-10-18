---
aliases:
  - BGP
  - Autonomous system
  - BGP hijacking
  - Route leak
  - RPKI
tags:
  - networks
summary: The protocol by which the internet's independent networks tell each other which addresses they can reach, holding the internet together on a basis of trust.
---
The **Border Gateway Protocol (BGP)** is how the internet's independent networks tell each other which addresses they can reach. The internet is not one network but roughly 75,000 *autonomous systems* (ASes): ISPs, cloud providers, universities, and large companies, each running its own network. BGP is the protocol they use to announce routes to their neighbors: "I can deliver traffic for these address blocks, and here is the path of networks it will take." Each AS picks the routes it prefers and passes some on, and the global routing table, close to a million entries for IPv4, emerges from that exchange.

BGP chooses paths by policy, not by speed. Networks prefer routes through customers who pay them over routes through peers they exchange traffic with for free, and both over providers they pay. Path length matters only after business relationships. That is why traffic can take surprising detours, and why [[Latency and Jitter]] between two nearby cities can depend on which networks have agreed to connect.

BGP's design, from 1989, assumed the networks on it were trustworthy. Any AS can announce any address block, and neighbors largely believe it. That trust fails in recognizable ways:

- **Route leaks.** A network mistakenly re-announces routes it learned, attracting traffic it can't carry. In 2019 a small ISP's leak sent a large share of a major CDN's traffic through a steel company's network for hours.
- **Hijacks.** A network announces addresses it doesn't own, deliberately or by mistake. In 2008, Pakistan Telecom tried to block YouTube domestically by announcing a more specific route for its addresses, and the announcement spread worldwide, taking YouTube offline for about two hours.
- **Self-inflicted outages.** In 2021 Facebook withdrew its own BGP routes during maintenance, making its DNS servers unreachable and taking Facebook, Instagram, and WhatsApp offline for about six hours, along with the internal tools engineers needed to fix it.

Defenses are being deployed slowly. **RPKI** lets address owners publish signed statements of which AS may originate their addresses, using [[Public-Key Cryptography]], so networks can reject invalid announcements. Filtering customer announcements catches many leaks. Adoption is uneven, since it only works when many networks participate, a [[Collective Action]] problem.

BGP is also a tool. [[Anycast]] announces the same addresses from many locations and lets BGP route each user to the nearest, which is how [[Content Delivery Network]] edges and public DNS resolvers work. DDoS mitigation services redirect a victim's traffic by announcing its routes. BGP's slow, policy-driven convergence is part of why the internet tolerates link failures well but recovers from mistakes badly.

## See also
- [[Anycast]]
- [[Content Delivery Network]]
- [[Domain Name System]]
- [[Collective Action]]
- [[Latency and Jitter]]
- [[Mesh Network]]
- [[IPv6]]
- [[Subnet]]
- [[Internet Exchange Point]]
- [[Submarine Cable]]
