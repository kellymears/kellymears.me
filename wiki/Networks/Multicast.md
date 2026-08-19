---
aliases:
  - IP Multicast
tags:
  - networks
summary: Multicast sends one stream to a group of subscribed receivers at once, letting the network fan it out instead of the sender.
---
**Multicast** lets a sender transmit a single stream that reaches every member of a subscribed group, with the fan-out handled by routers along the way rather than by the sender copying the data once per recipient. This sits between unicast (one sender, one receiver, one copy per pair) and broadcast (everyone on the local segment gets it whether they want it or not) — multicast is "everyone who asked, and only them, however many there are."

The addressing is what makes this work: a multicast group is a reserved IP address range (224.0.0.0–239.255.255.255 in IPv4) that receivers join by sending a membership request (IGMP), and routers use that membership information to decide which physical links actually need a copy of the traffic, pruning branches of the network where no subscriber exists. The sender emits one stream regardless of how many receivers there are — a hundred subscribers cost the sender the same one-stream bandwidth as one subscriber, with the replication cost pushed onto the network fabric instead.

This is why multicast has historically mattered for things like live TV distribution over managed networks and financial market-data feeds, where the same data goes to thousands of receivers simultaneously and unicasting it individually would multiply the sender's bandwidth need by the subscriber count. It doesn't work over the open internet the way unicast does, though — most ISPs don't route multicast traffic between networks, so it's mostly confined to networks under single administrative control (a campus, a data center, a cable provider's own infrastructure).

[[Anycast]] is sometimes confused with multicast but solves the opposite problem: anycast routes one client to the *nearest single* instance of a service, while multicast routes one sender's stream to *every* subscribed receiver at once.

## See also
- [[Anycast]]
- [[IPv6]]
- [[Streaming Response]]
