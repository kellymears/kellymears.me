---
aliases:
  - Routing
  - Routing table
  - Default gateway
  - Longest prefix match
  - Router
  - OSPF
tags:
  - networks
summary: How each router on the internet decides where to send a packet next, using a table of address prefixes, the longest matching one, and protocols that keep those tables current.
---
**IP routing** is how a packet finds its way across networks it knows nothing about. No device holds a map of the whole internet. Each router makes one local decision, which neighbor to hand the packet to next, and the packet reaches its destination through a chain of such decisions. This is the core of [[Packet Switching]]: every packet is routed independently, and two packets in the same conversation can take different paths.

Each router keeps a **routing table**, a list of address prefixes and where to send traffic for each. A home router's table is tiny: the local [[Subnet]] is delivered directly over [[Ethernet]] or Wi-Fi, and everything else goes to one entry, the *default gateway*, which is the internet provider. Routers in the internet's core instead carry the full table, nearly a million prefixes for IPv4.

When several entries match, the router picks the **longest prefix match**, the most specific one. A route for `10.1.2.0/24` beats one for `10.0.0.0/8`, which beats the default route `0.0.0.0/0`. Doing this lookup in nanoseconds, millions of times per second, is why core routers use specialized hardware, often a kind of [[Trie]] in silicon.

Routing tables are filled in two ways:

- **Static routes** are typed in by an administrator. That's simple and predictable, but they can't react when a link fails.
- **Routing protocols** let routers tell each other what they can reach. Inside one organization, link-state protocols such as OSPF flood the network's topology to every router, and each computes shortest paths with [[Dijkstra's Algorithm]]. Between organizations, the [[Border Gateway Protocol]] exchanges reachability and policy rather than distance, since networks choose routes by business relationships as much as by speed.

Because every decision is local, routing can go wrong locally. A misconfigured router can send traffic in a loop, which is why each packet carries a [[Time to Live]] that counts down at every hop until the packet is discarded. Traceroute uses that same counter to reveal each hop. Routes can also be asymmetric, so a reply may come back along a different path from the request.

Several ideas build on routing. [[Anycast]] announces the same address from many places and lets routing pick the nearest, which is how a [[Content Delivery Network]] and public DNS resolvers stay close to users. [[Network Address Translation]] rewrites addresses at the edge so many devices can share one public IP, and a [[Virtual Private Network]] adds routes that send selected traffic through an encrypted tunnel. Mesh network protocols route between peers without fixed infrastructure.

## See also
- [[Spanning Tree Protocol]]
- [[Internet Control Message Protocol]]
- [[Network Topology]]
- [[Loopback]]
