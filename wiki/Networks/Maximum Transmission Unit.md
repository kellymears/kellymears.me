---
aliases:
  - MTU
  - Path MTU discovery
  - IP fragmentation
  - MSS clamping
  - Jumbo frames
tags:
  - networks
summary: The largest packet a network link will carry, and the silent failures that follow when a path's smallest link is smaller than the endpoints assume.
---
The **maximum transmission unit (MTU)** is the largest packet a network link can carry in one piece. For Ethernet, and therefore most of the internet, it is 1,500 bytes, a figure fixed in the early 1980s as a compromise between efficiency and the memory costs of the time, and preserved ever since by [[Path Dependence]]. Each packet spends some of those bytes on headers (20 for IPv4, 40 for IPv6, 20 or more for TCP), so the payload is smaller than the MTU.

A path across the internet crosses many links, and the path MTU is the smallest among them. Tunnels shrink it. A [[Virtual Private Network]], an IPv6-over-IPv4 tunnel, or DSL with PPPoE wraps every packet in extra headers, so a full-size inner packet no longer fits in the outer link. What happens to an oversized packet depends on the protocol:

- **Fragmentation.** IPv4 routers can split a packet into fragments that the destination reassembles. It works, but losing one fragment loses the whole packet, and many firewalls drop fragments outright.
- **Path MTU discovery.** Senders set the "don't fragment" flag. A router that can't forward the packet drops it and sends back an ICMP message saying how large packets may be, and the sender shrinks its packets. [[IPv6]] relies on this entirely, since IPv6 routers never fragment.

Path MTU discovery fails when a [[Firewall]] blocks ICMP, a common habit from an era when ICMP was considered dangerous. Then the large packets vanish without a trace, a **PMTU black hole**. The symptoms are distinctive and baffling. The connection opens, because the handshake packets are small. Small requests work. Then it hangs the moment something large is sent, such as a big web page, a file transfer, or an SSH session printing a long listing. It is a textbook [[Silent Failure]], and a classic hard-to-diagnose cause of "the VPN works but some sites don't load."

Workarounds include *MSS clamping*, in which a router rewrites TCP's maximum segment size during the handshake so both ends send smaller segments, and packetization-layer probing that tests sizes without relying on ICMP. [[QUIC]] avoids the issue by starting with conservatively small packets and probing upward itself.

Inside data centers, **jumbo frames** of around 9,000 bytes reduce per-packet overhead for bulk transfers, but every device on the path must agree, or the black hole returns. The MTU shows how assumptions baked into one layer propagate upward: applications rarely know it exists until it breaks them, the same quiet coupling [[Hyrum's Law]] describes.

## See also
- [[TCP and UDP]]
- [[Ethernet]]
- [[IPv6]]
- [[Internet Control Message Protocol]]
- [[Firewall]]
- [[Spanning Tree Protocol]]
- [[NAT Traversal]]
- [[OSI Model]]
