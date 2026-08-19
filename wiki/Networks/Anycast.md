---
aliases:
  - Anycast Routing
tags:
  - networks
summary: Anycast announces the same IP address from many locations and lets normal routing send each client to the nearest one.
---
**Anycast** is a routing technique where the same IP address is advertised from multiple, geographically separate locations, and ordinary internet routing (BGP) delivers each client's traffic to whichever announcement is topologically nearest — with no client-side awareness that a choice was even made. It's a one-to-nearest-of-many relationship, distinct from unicast (one-to-one) and [[Multicast]] (one-to-every-subscriber).

The mechanism is almost boring in its simplicity: routers already pick the shortest path to a destination as their basic job, and anycast just exploits that by making "the destination" ambiguous — several data centers claim to *be* address X, and each router along the way forwards toward whichever claim looks closest by its own metrics. No DNS trickery, no client redirect, no extra round trip; the routing fabric itself does the geo-selection for free.

This is exactly how most [[Domain Name System]] root servers and major [[Content Delivery Network]] operators work: a CDN's edge IP is the same number everywhere on Earth, and a user in Tokyo and a user in Toronto both connect to "the same" address while actually landing on different physical machines, purely because BGP routed them differently. It also gives a natural DDoS mitigation property — attack traffic aimed at one anycast address gets spread across every location advertising it, diluting the impact instead of concentrating it on a single target the way a unicast IP would.

The tradeoff is that anycast routing can be unstable for long-lived connections: BGP paths can change mid-session and silently redirect a client to a different physical server, which is fine for stateless UDP lookups (DNS queries) but awkward for a stateful TCP connection expecting to keep talking to the same backend for its whole lifetime — one reason CDNs still terminate TCP at the edge and manage state carefully behind it.

## See also
- [[Content Delivery Network]]
- [[Domain Name System]]
- [[Multicast]]
- [[Load Balancing]]
- [[IPv6]]
