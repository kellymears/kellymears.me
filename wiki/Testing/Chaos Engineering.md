---
aliases:
  - Chaos Monkey
  - Fault injection
  - Game day
  - Resilience testing
tags:
  - testing
summary: Deliberately breaking parts of a running system to prove it survives failures that will eventually happen anyway.
---
**Chaos engineering** is the practice of injecting failures into a system on purpose to learn whether it tolerates them. Servers crash, networks partition, disks fill, and dependencies time out. In a large enough system, something is always failing. Rather than discovering how the system handles that during a real outage, chaos engineering tests it deliberately, at a time of the team's choosing, with people watching.

Netflix made the idea famous with **Chaos Monkey**, released around 2011 during its move to the cloud. It randomly terminated production servers during business hours. Engineers had to build services that shrugged off losing instances, because losing instances became routine. The broader Simian Army followed, adding injected latency and the loss of an entire data center region.

The discipline is framed as experimentation, not vandalism:

1. **Define steady state** with a measurable signal of normal behavior, such as successful orders per minute, from [[Observability]] data.
2. **Form a hypothesis** that steady state will survive a specific failure.
3. **Inject the failure**: kill a process, add latency, drop packets, exhaust memory, or revoke a credential.
4. **Compare against a control** and look for a difference. A difference is a finding.
5. **Limit the blast radius.** Start in staging or with a small slice of traffic, and have a fast way to stop the experiment.

Typical findings are the failures that resilience mechanisms were supposed to prevent. A retry without limits turns one slow dependency into a self-inflicted overload. A [[Circuit Breaker]] that was never configured to trip. A timeout set longer than the caller's own. A "redundant" replica that shares a single network switch. A failover path that hadn't been exercised in a year and no longer worked. Testing [[Leader Election]] or [[Database Replication]] under a forced partition reveals assumptions the [[CAP Theorem]] says must give way somewhere.

**Game days** bring the same idea to people and process: a team rehearses a simulated [[Incident Response|incident]], testing runbooks, alerting, and communication as well as software, and reviews the results in the spirit of a [[Blameless Postmortem]]. The underlying philosophy matches [[Fail Fast]]: failure is inevitable, so make it frequent, small, and visible rather than rare, large, and surprising. Production is the only environment exactly like production, which is why mature practitioners eventually run experiments there.

## See also
- [[Hardware-in-the-Loop]]
- [[Failure Mode and Effects Analysis]]
- [[Normal Accidents]]
- [[Risk-Based Testing]]
- [[Single-Event Upset]]
- [[Mean Time to Recovery]]
- [[Murphy's Law]]
