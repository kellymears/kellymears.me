---
aliases:
  - Strangler fig
  - Strangler pattern
  - Strangler fig application
  - Incremental rewrite
tags:
  - delivery
summary: Replacing a legacy system gradually by routing one piece of functionality at a time to a new system that grows around the old one, instead of attempting a risky big-bang rewrite.
---
The **strangler fig pattern** replaces an old system gradually. A new system is built alongside the old one, and functionality moves over one piece at a time, with a routing layer sending each request to whichever system currently handles it. Over months or years the new system takes on more and the old one less, until the old one can be switched off.

Martin Fowler named it in 2004 after strangler figs he saw in Australian rainforests. These vines germinate in the branches of a host tree, send roots down to the ground, and slowly grow around the host until they stand on their own, often after the host has died and rotted away inside.

The alternative is the big-bang rewrite: build a full replacement and switch over in one go. Rewrites often fail. The old system keeps changing while the new one is built, so the target moves. The old system encodes years of undocumented behavior that the new one misses, a hazard captured by [[Chesterton's Fence]]. And nothing ships until everything does, so the project delivers no value until the risky final cutover. Fred Brooks warned that a replacement tends to be overdesigned, the [[Second-System Effect]], and Netscape's decision to rewrite its browser from scratch in the late 1990s is often cited as a cautionary example.

The strangler approach avoids these problems:

- **A routing layer.** A [[Reverse Proxy]] or [[API Gateway]] in front of both systems decides, per route or feature, where requests go. Users don't see the switch.
- **Small slices.** Each migrated piece is small enough to ship, verify, and reverse. A [[Feature Flag]] or a [[Canary Release]] can send a fraction of traffic to the new path first.
- **Verification.** Running both systems on the same requests and comparing results, as with [[Shadow Traffic]], catches differences before users do. Tests that pin down existing behavior, a [[Characterization Test]] suite, make the old system's quirks explicit.
- **Data last, or carefully.** Shared databases are the hardest part, and data is usually moved with techniques like [[Change Data Capture]] or [[Expand and Contract]] steps.

The pattern has costs. Running two systems for a long time means duplicate operations and integration work between them, and some migrations stall at 80 percent, leaving both systems alive indefinitely. Picking the first slice matters: something valuable but low-risk builds confidence and proves the routing.

The approach fits [[Gall's Law]], which observes that working complex systems evolve from working simple ones. It treats replacement as a series of small, reversible deployments rather than one irreversible leap, the same principle behind [[Trunk-Based Development]] and continuous delivery. It also pays down [[Technical Debt]] in installments while the business keeps running.

## See also
- [[Microservices]]
- [[Gall's Law]]
