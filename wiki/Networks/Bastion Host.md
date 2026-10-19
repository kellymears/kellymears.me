---
aliases:
  - Jump server
  - Jump box
  - Jump host
tags:
  - networks
summary: A deliberately exposed, heavily hardened server that acts as the single gateway into a private network, so administrators connect through one closely watched door instead of exposing every internal machine to the internet.
---
A **bastion host** is a computer placed at the edge of a network and built to withstand attack, because it's the one machine outsiders are allowed to reach. The name borrows from fortification, where a bastion is the projecting part of a wall that takes the brunt of an assault. Firewall designers adopted the term around 1990, when the first published descriptions of internet firewalls appeared; see [[Firewall]].

The modern version is usually called a **jump server** or jump box. Internal servers sit in a private network segment with no direct route from outside; see [[Subnet]] and [[Network Address Translation]]. An administrator first connects to the bastion, typically over an encrypted shell, and from there "jumps" to the machine they need. Modern shell clients can chain the two hops automatically, so the detour is nearly invisible in daily use; see [[Secure Shell]]. Windows environments do the same with remote desktop gateways; see [[Remote Desktop]].

The design concentrates risk in order to manage it. Instead of hundreds of machines each accepting logins from the internet, one does, which shrinks what an attacker can target; see [[Threat Modeling]]. That single door can then get the strongest protections:

- **Minimal software.** Everything not needed for relaying connections is removed, since each extra program is another potential flaw.
- **Strong authentication**, usually keys or certificates plus a second factor, with password logins disabled; see [[Multi-Factor Authentication]].
- **Narrow permissions**, so each person can reach only the systems their job requires; see [[Least Privilege]].
- **Thorough logging**, often including full recordings of sessions, so that every action taken through the gateway can be reviewed later; see [[Audit Log]].
- **Restricted reachability**, such as accepting connections only from a company VPN or known addresses, which keeps it out of the constant background of automated scans; see [[Virtual Private Network]] and [[Port Scanning]].

The bastion is also a single point of failure in two senses. If it goes down, administrators may be locked out during an emergency, so organizations keep a redundant one or a break-glass procedure. If it's compromised, the attacker holds the keys to everything behind it, which is why credentials for internal systems shouldn't be stored on it.

The pattern has been partly overtaken by **zero trust** approaches, which drop the idea of a trusted inside reached through one gate. Every request is authenticated and authorized on its own, often through an identity-aware proxy that grants short-lived access to a specific server; see [[Zero Trust Network]]. Cloud providers now offer managed session services that provide jump-server benefits without a machine to maintain.

A bastion looks superficially like a honeypot, since both face attackers directly. The difference is intent: a honeypot invites intrusion to study it, while a bastion is built to refuse it.

## See also
- [[Honeypot]]
- [[Denial-of-Service Attack]]
