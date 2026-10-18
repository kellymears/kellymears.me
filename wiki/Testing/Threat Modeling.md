---
aliases:
  - STRIDE
  - Attack tree
  - Attack surface
  - Trust boundary
tags:
  - testing
summary: A structured way of asking what could go wrong with a system's security before an attacker answers it, by drawing where data flows, marking where trust changes, and walking each crossing through a list of threats.
---
**Threat modeling** is the practice of systematically working out how a system could be attacked, ideally while it is still being designed, so that defenses are built in rather than bolted on. It is the security counterpart of design review, and the cheapest point to catch a flaw; see [[Shift-Left Testing]].

The security author Adam Shostack reduces it to four questions. What are we working on? What can go wrong? What are we going to do about it? Did we do a good job? Most methods are ways of answering the second question thoroughly instead of by inspiration.

A common approach starts with a diagram of how data moves: users, processes, data stores, and the flows between them. Lines are then drawn wherever the level of trust changes, such as between a browser and a server, a server and its database, or an application and a third-party service. These **trust boundaries** are where attacks happen, since data crossing them may come from someone hostile.

Each crossing is then examined with a checklist. Microsoft's **STRIDE**, developed by Loren Kohnfelder and Praerit Garg in 1999, names six categories:

- **Spoofing.** Pretending to be someone else; countered by authentication.
- **Tampering.** Modifying data or code; see [[SQL Injection]].
- **Repudiation.** Denying having done something; countered by records that can't be altered; see [[Audit Log]].
- **Information disclosure.** Leaking data to people who shouldn't see it.
- **Denial of service.** Making the system unavailable; see [[Rate Limiting]].
- **Elevation of privilege.** Gaining powers one shouldn't have; see [[Least Privilege]].

**Attack trees**, popularized by Bruce Schneier in 1999, take the attacker's goal as the root and break it into the alternative ways to achieve it, each with its own subgoals. Annotating leaves with cost or difficulty shows the cheapest path, which is the one a rational attacker takes. The structure mirrors safety engineering's [[Fault Tree Analysis]], and asking how each component could be abused resembles [[Failure Mode and Effects Analysis]].

The **attack surface** is the sum of points where an attacker can try to enter or extract data: open ports, input fields, file parsers, and dependencies. Reducing it, by removing features, closing ports, and dropping unused libraries, often does more than hardening what remains; see [[Dependency Confusion]].

Threat models need updating as systems change. Language-model agents that read untrusted web pages, for example, created a new boundary where text can act as instructions; see [[Prompt Injection]].

Threat modeling is a thought exercise, so its blind spots are the team's blind spots. Testing the result against a real adversary catches what imagination missed; see [[Penetration Testing]] and [[Adversarial Review]]. Imagining that a breach has already happened and asking how is a useful prompt; see [[Pre-mortem]].

## See also
- [[Risk-Based Testing]]
- [[Cross-Site Request Forgery]]
- [[MicroVM]]
