---
aliases:
  - Zero Trust Architecture
  - ZTNA
tags:
  - networks
summary: Zero trust authenticates and authorizes every request individually, treating network location as no proof of anything.
---
**A zero trust network** verifies every request on its own merits — identity, device posture, context — rather than trusting it because it came from inside the office network or over a VPN. The older "castle and moat" model drew a hard perimeter: strong checks at the edge, and broad implicit trust for anything already inside it. Zero trust rejects that boundary entirely, on the reasoning that "inside the network" stopped being a meaningful trust signal once laptops, phones, cloud services, and remote work made the perimeter porous and, eventually, fictional.

The practical shift is that every request carries its own proof instead of borrowing it from network location. A request to an internal service authenticates with a short-lived, request-scoped credential (commonly a signed token like a [[JSON Web Token]], checked per call) and is authorized against policy that can weigh identity, device health, and even geography — rather than the older model where reaching the service on the internal network at all was implicitly sufficient. This is a big part of why VPNs are trending toward being replaced, not extended, by zero trust proxies: a traditional [[Virtual Private Network]] grants broad network-level access once connected, which is precisely the all-or-nothing trust boundary zero trust is designed to eliminate — access is per-application and per-request instead of per-network.

This also composes naturally with [[API Gateway]] architecture: a gateway is already positioned to check identity and policy on every call, which makes it a convenient enforcement point for zero trust rules without adding a separate hop. Micro-segmentation is the same idea applied to the network layer itself — instead of one flat internal network where any compromised host can reach any other, each service is isolated and every east-west connection between them is challenged just as skeptically as a connection from the outside world.

The honest cost is operational complexity: every service now needs to participate in authentication and policy checks that used to be implicit, which is a real tax on anything not built with it in mind from the start.

## See also
- [[Virtual Private Network]]
- [[API Gateway]]
- [[Caller ID Authentication]]
- [[IPv6]]
