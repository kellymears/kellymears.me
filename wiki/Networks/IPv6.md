---
aliases:
  - Internet Protocol version 6
tags:
  - networks
summary: IPv6 exists mainly to end address scarcity, with a large enough space that per-device NAT becomes optional.
---
**IPv6** is the successor to IPv4, and its headline change is address space: 128 bits instead of 32, which is the difference between roughly 4 billion addresses and roughly 340 undecillion. IPv4 exhaustion was predictable decades in advance and IPv6 was designed to solve it outright rather than patch around it, but adoption has been slow precisely because [[NAT Traversal]] and address-sharing techniques kept IPv4 usable well past its intended lifespan.

The space is large enough to change the deployment model, not just extend it. Under IPv4, home networks share one public address across many devices via NAT, and that translation layer is why [[NAT Traversal]] is a whole discipline in the first place. Under IPv6, every device can plausibly get its own globally routable address, which removes the NAT layer entirely — a return to the original end-to-end internet model where any two hosts can address each other directly, no relay or hole-punching required. This is also why some engineers view widespread IPv6 as slowly obsoleting parts of the [[Peer-to-Peer]] and [[WebRTC]] connectivity toolchain that exists specifically to work around NAT.

IPv6 addresses look different enough to trip people up: eight groups of four hex digits separated by colons, with runs of zeros collapsible to `::` once per address. Autoconfiguration (SLAAC) lets a device generate its own address from the network prefix and its interface identifier without a DHCP server, which is a meaningful operational simplification at scale.

Dual-stack — running IPv4 and IPv6 side by side — has been the transition strategy for over a decade, and it's the reason both protocols still need to be understood: a client and server can each prefer a different one, and "happy eyeballs" algorithms race both to pick whichever connects first.

## See also
- [[NAT Traversal]]
- [[TCP and UDP]]
- [[Domain Name System]]
- [[Anycast]]
- [[Zero Trust Network]]
