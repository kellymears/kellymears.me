---
aliases:
  - Great Firewall
  - Deep packet inspection
  - Domain fronting
  - Server Name Indication
tags:
  - networks
summary: How governments and networks block or filter what people can reach online, by blocking addresses, tampering with DNS, and inspecting traffic, and the circumvention techniques that keep evolving against them.
---
**Internet censorship** is the deliberate blocking or filtering of what people can reach or publish online. It ranges from blocking a few gambling sites to China's **Great Firewall**, the largest and most sophisticated national filtering system, and includes the total internet shutdowns some governments impose during protests and exams.

The techniques, roughly from crudest to most sophisticated:

- **IP blocking.** Drop traffic to a server's address. Cheap, but blunt, since many unrelated sites can share one address behind a [[Content Delivery Network]].
- **DNS tampering.** Make resolvers return a false address or nothing for blocked names; see [[Domain Name System]] and [[DNS Cache Poisoning]]. Easy to evade by using another resolver, and encrypted DNS hides which name was looked up; see [[DNS over HTTPS]].
- **Inspecting connections.** Even with HTTPS, the opening of a connection reveals which site a browser wants, in a field called **Server Name Indication** (SNI), so one server can host many sites; see [[Transport Layer Security]]. Censors read it and cut the connection, often by injecting fake reset packets. Encrypted Client Hello, a newer extension, hides it.
- **Deep packet inspection.** Equipment examines traffic contents and patterns, identifying protocols by their behavior, even when encrypted, and blocking or slowing anything that looks like a [[Virtual Private Network]] or circumvention tool; see [[Firewall]].
- **Shutdowns.** Withdrawing a country's routes, or ordering mobile networks off, cuts everything at once; see [[Border Gateway Protocol]].

Circumvention evolves alongside:

- **VPNs and proxies** route traffic through a server elsewhere.
- **Tor** bounces traffic through several volunteers' relays, and its "bridges" are unlisted entry points, distributed carefully so censors can't simply block them all; see [[Onion Routing]].
- **Disguise.** Tools make traffic look like something censors won't block: random noise, video calls, or ordinary HTTPS.
- **Domain fronting** put an allowed domain in the visible SNI and the real, blocked destination inside the encrypted request, so blocking it meant blocking a whole cloud provider. Major cloud providers disabled it around 2018.

The underlying dynamic is collateral damage. Censors want to block a tool without blocking things the economy depends on, so circumvention hides inside traffic too valuable to block, and censors adapt by blocking more broadly or by detecting subtler patterns; see [[Information Asymmetry]].

Censorship works partly through people's own expectations: those who believe they're watched say less, whatever is actually blocked; see [[Spiral of Silence]]. And blocking something often draws attention to it; see [[Streisand Effect]].

Measurement projects run tests from volunteers' devices worldwide, recording what's blocked where, so censorship can be documented even when it isn't announced; see [[Observability]].

## See also
- [[End-to-End Principle]]
- [[Net Neutrality]]
