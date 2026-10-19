---
aliases:
  - Normal accident theory
  - Tight coupling
  - Interactive complexity
  - System accident
tags:
  - testing
summary: Charles Perrow's 1984 argument that in systems both complex and tightly coupled, serious accidents are inevitable rather than freak events, because failures will interact in ways no one foresaw and spread faster than people can respond.
---
**Normal Accidents** is a 1984 book by the sociologist Charles Perrow, and the theory it introduced. Its claim is that in some systems serious accidents are not caused by unusual negligence or bad luck. They are a normal property of the system: given enough time, they will happen, however careful the operators are.

Perrow developed the idea after the 1979 accident at the Three Mile Island nuclear plant in Pennsylvania, where a stuck valve, a misleading indicator light, maintenance that had left backup pumps isolated, and operators acting on an incorrect picture of the reactor combined into a partial meltdown. None of the failures was dramatic alone. The accident lay in how they interacted.

He classified systems along two dimensions:

- **Interactive complexity.** In a linear system, parts affect each other in expected, visible sequences. In a complex one, they interact in unplanned ways, through shared components, feedback, and indirect information, so operators cannot see what is happening; see [[Feedback Loop]] and [[Observability]].
- **Coupling.** A loosely coupled system has slack: delays, buffers, and alternative ways to get things done. A tightly coupled one has none, so a failure spreads before anyone can intervene; see [[Cascading Failure]].

Systems that are complex and tightly coupled, such as nuclear plants, chemical plants, and space missions in his examples, will eventually have what he called **system accidents**: multiple small failures meeting in a way that designers did not anticipate. A university, complex but loosely coupled, has plenty of surprises but time to absorb them. A dam is tightly coupled but linear, so its failures are easier to foresee.

Perrow's most uncomfortable point concerned safety measures. Adding alarms, backups, and automatic safeguards adds components, and so adds new ways for things to interact. Redundancy can hide failures and encourage operators to run closer to the edge; see [[Ironies of automation]] and [[Risk Compensation]]. He concluded that some technologies, nuclear weapons and nuclear power among them, might be better abandoned.

Critics in the high-reliability school pointed to aircraft carriers and air traffic control, which run tightly coupled systems with very few accidents through training, redundancy, and a culture of reporting. The debate shaped later safety thinking, including the [[Swiss cheese model]].

For software, the theory explains why large distributed systems fail in surprising ways despite thorough testing. Tests examine anticipated interactions; normal accidents come from unanticipated ones. Engineers respond by adding slack, through [[Backpressure]], timeouts, and the [[Circuit Breaker]], and by provoking failures deliberately to find hidden interactions before they find themselves; see [[Chaos Engineering]]. After an accident, the theory warns against blaming the last operator in the chain; see [[Hindsight Bias]].

## See also
- [[Space Shuttle Challenger Disaster]]
- [[Three Mile Island Accident]]
- [[Cynefin Framework]]
- [[Just Culture]]
- [[Chernobyl Disaster]]
