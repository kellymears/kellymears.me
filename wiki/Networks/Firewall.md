---
aliases:
  - Firewalls
  - Packet filter
  - Stateful firewall
  - Default deny
  - Web application firewall
  - WAF
tags:
  - networks
summary: A filter that allows or blocks network traffic by rule, the oldest perimeter defense, and less sufficient on its own than it used to be.
---
A **firewall** filters network traffic according to rules, allowing some packets and connections and blocking others. The name comes from building construction, where a firewall is a barrier that stops fire spreading between sections. Network firewalls appeared in the late 1980s as the internet grew from a research network into something that needed defending.

They come in several kinds, each looking deeper into traffic:

- **Packet filters** judge each packet by its header: source and destination address, protocol, and [[Port]]. They are fast and simple but blind to context.
- **Stateful firewalls** track connections, so a reply to a request the inside made is allowed back in while unsolicited inbound traffic is blocked. Nearly all firewalls today, including those in home routers and operating systems, are stateful.
- **Application-layer firewalls** understand protocols such as HTTP. A *web application firewall* (WAF) inspects requests for attack patterns such as SQL injection and [[Cross-Site Scripting]], usually deployed at a [[Reverse Proxy]] or [[Content Delivery Network]].
- **Host firewalls** run on each machine, such as Linux's netfilter, controlled by tools like iptables, nftables, and ufw, or the Windows Firewall.

Good rule sets start from **default deny**: block everything, then allow what is needed. It is the network form of [[Least Privilege]] and a [[Defensive Default]]. Each open port is something an attacker can reach, so minimizing exposure narrows the target. Default allow with a list of things to block always lags behind what attackers try.

Firewalls have well-known failure modes:

- **Breaking things silently.** Blocking ICMP wholesale breaks path discovery and causes black holes in [[Maximum Transmission Unit]] handling. Blocking a port a service needs causes timeouts rather than clear errors, a classic [[Silent Failure]]. Many "the network is broken" mysteries are firewall rules, from LAN discovery protocols such as [[Multicast]] to peer-to-peer media.
- **Rule rot.** Rules accumulate over years, nobody remembers why each exists, and nobody dares remove them, a [[Chesterton's Fence]] problem at scale.
- **The perimeter fallacy.** A firewall at the edge protects only against traffic that crosses the edge. Once an attacker is inside, through phishing, a compromised laptop, or a cloud service, a flat internal network offers no resistance.

That last weakness drove the move to [[Zero Trust Network]] designs, which treat every connection as untrusted regardless of where it comes from. Firewalls remain valuable, but as one layer among several rather than the wall around a trusted interior. [[NAT Traversal]] exists largely because firewalls and NAT block the unsolicited inbound connections peer-to-peer applications need.

## See also
- [[File Transfer Protocol]]
- [[Port Knocking]]
- [[Honeypot]]
