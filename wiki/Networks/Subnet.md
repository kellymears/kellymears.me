---
aliases:
  - Subnetting
  - CIDR
  - Classless Inter-Domain Routing
  - Subnet mask
  - IP address
  - DHCP
tags:
  - networks
summary: A block of IP addresses that share a common prefix, written in CIDR notation such as 192.168.1.0/24, which decides what a device can reach directly and what it must send through a router.
---
A **subnet** is a contiguous block of IP addresses that share the same leading bits, the *prefix*. Every IP address splits into a network part, which identifies the subnet, and a host part, which identifies a device within it. Devices on the same subnet talk to each other directly. Traffic for anywhere else goes to a *default gateway*, the router.

**CIDR notation** writes a subnet as an address and a prefix length: `192.168.1.0/24` means the first 24 of the 32 bits are fixed, leaving 8 bits, or 256 addresses, for hosts. Two of those are reserved, the all-zeros network address and the all-ones broadcast address, so 254 are usable. The older *subnet mask* says the same thing in dotted form: `/24` is `255.255.255.0`.

CIDR (Classless Inter-Domain Routing, 1993) replaced *classful* addressing, which handed out only three sizes: class A networks of 16 million addresses, class B of 65,536 and class C of 256. An organization needing 300 addresses had to take a class B and waste most of it. Variable-length prefixes allowed blocks sized to need and slowed IPv4 exhaustion.

Prefixes also make routing scale:

- **Longest-prefix match.** A router's table maps prefixes to next hops, and a packet follows the most specific matching entry. Routers do this lookup with structures related to the [[Trie]], in specialized hardware.
- **Aggregation.** An ISP holding `198.51.0.0/16` can announce that single prefix to the rest of the internet instead of thousands of customer routes, which keeps the global [[Border Gateway Protocol]] table manageable.

On a local network, **DHCP** (Dynamic Host Configuration Protocol) hands each joining device an address from the subnet's pool, along with the mask, the gateway and the [[Domain Name System|DNS]] servers. Addresses are leased for a limited time and renewed while the device stays. Within the subnet, devices find each other's hardware addresses by broadcasting ARP queries, which is why broadcasts and [[Multicast]] usually stay within one subnet.

Subnets are also a security boundary. Separating cameras, guests and servers into their own subnets, with a [[Firewall]] between them, limits what a compromised device can reach, an application of [[Least Privilege]]. [[Zero Trust Network]] designs go further and stop treating any subnet as trusted.

Common trouble spots:

- **Overlapping ranges.** Two networks both using `192.168.1.0/24` can't be joined by a [[Virtual Private Network]] without renumbering or translation.
- **Running out.** A `/24` for a growing office or cloud network fills up, and resizing a subnet means changing every device's addressing.
- **Private ranges behind [[Network Address Translation]]** hide the subnet layout from the outside but make inbound access harder.

[[IPv6]] uses the same notation with a standard `/64` per subnet, which holds more addresses than the entire IPv4 internet, so subnets there are never sized by scarcity.

## See also
- [[Wake-on-LAN]]
- [[IP Routing]]
- [[Loopback]]
- [[Software-Defined Networking]]
- [[Multicast DNS]]
