---
aliases:
  - ICMP
  - Ping
  - Ping of death
tags:
  - networks
summary: The internet's error and diagnostic channel, which carries ping, makes traceroute possible, and tells senders when packets are too big, and which breaks things in quiet ways when firewalls block it.
---
The **Internet Control Message Protocol** (ICMP) is the internet's channel for errors and diagnostics. Defined in 1981 alongside IP itself, it lets routers and hosts report back to a sender when something goes wrong with a packet: the destination can't be reached, the packet lived too long, or it was too big to forward. ICMP messages ride inside IP packets but are not a transport like TCP or UDP. They have no ports and carry no application data; see [[TCP and UDP]].

The most familiar messages:

- **Echo request and reply.** A host that receives an echo request sends it back. The `ping` tool, written in 1983 and named after the sound of sonar, uses this to check whether a host is up and to measure round-trip time; see [[Latency and Jitter]].
- **Time exceeded.** A router that discards a packet because its hop limit reached zero reports back. Traceroute sends packets with limits of 1, 2, 3, and so on, and collects these reports to map each router along the path; see [[Time to Live]].
- **Destination unreachable.** No route exists, the host is down, or the port is closed; see [[IP Routing]].
- **Fragmentation needed.** A packet was too large for the next link and marked not to be split. Senders use these replies to discover the largest size a path can carry; see [[Maximum Transmission Unit]].

That last message is why blocking ICMP outright is a mistake. Administrators often drop it at the [[Firewall]] as a supposed security measure. Path size discovery then fails silently, small requests work, and connections hang the moment they send a full-size packet, a failure called a black hole that can take days to diagnose.

ICMP's reputation for danger came from the 1990s. The **ping of death** (1996) sent an echo request fragmented so that it reassembled into more than the 65,535 bytes IP allows, which crashed many operating systems. The smurf attack sent pings to a network's broadcast address with the victim's address forged as the source, so every host on that network replied to the victim at once; see [[Denial-of-Service Attack]]. Both were fixed long ago.

Ping results need care. Routers handle their own ICMP replies at low priority, so a traceroute hop that looks slow often just means that router is busy answering, not that traffic through it is slow. A host that ignores pings may still be serving, and one that answers may have a dead application, which is why services check health at the application layer instead; see [[Failure Detection]].

In IPv6, ICMP takes on more. ICMPv6 handles neighbor discovery, the job [[Address Resolution Protocol]] does in IPv4, and routers no longer fragment packets, so blocking it breaks basic connectivity outright; see [[IPv6]].

## See also
- [[OSI Model]]
- [[Packet Switching]]
- [[Packet Capture]]
