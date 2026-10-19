---
aliases:
  - SPOF
  - Redundancy
tags:
  - testing
summary: Any part of a system whose failure alone brings the whole thing down, removed by adding redundancy, though hidden shared dependencies often turn out to be single points nobody listed.
---
A **single point of failure** is any component whose failure alone stops a whole system. A server with one power supply, a network with one link to the outside world, a company where only one person knows how to run payroll: each depends entirely on one thing working. The standard defense is **redundancy**, having more than one of whatever is critical so the others carry on when one fails.

Finding them is the hard part. The obvious ones, like a single database server, get attention early. The dangerous ones are hidden, because they're shared by things that look independent. Two data centers may both rely on the same naming service, the same certificate, or the same configuration system. Two backup systems may be in the same building. When that shared thing fails, the redundancy turns out to have been an illusion; see [[Common-Mode Failure]].

Many large outages trace to a hidden single point. A typo in one command took down a storage service that a large share of the web relied on; see [[Amazon S3 Outage of 2017]]. A configuration change cut off one company's network so completely that engineers couldn't reach the tools needed to fix it, and building access systems failed too; see [[Facebook Outage of 2021]]. A single faulty sensor feeding a flight control system without a cross-check helped bring down two airliners; see [[Boeing 737 MAX Groundings]].

Engineers find single points with structured analysis, asking what happens when each component fails; see [[Failure Mode and Effects Analysis]] and [[Fault Tree Analysis]]. They also find them empirically, by deliberately disabling parts of a running system to see what breaks; see [[Chaos Engineering]].

People can be single points too. A project that only one developer understands stops when that person leaves; see [[Bus Factor]]. Organizations counter this with documentation, cross-training and rotating responsibilities.

Redundancy isn't free. Each extra component costs money and adds new ways to fail, including the logic that decides which copy is in charge. Systems that switch between primary and backup must detect failures accurately, and a false alarm can cause more trouble than the fault itself; see [[Failure Detection]]. Charles Perrow argued that adding safety systems can increase complexity enough to create new accidents; see [[Normal Accidents]].

Redundancy also assumes failures are independent and random, like hardware wearing out; see [[Bathtub Curve]]. Software bugs don't work that way: two identical copies of a program will fail on the same input. Running different implementations side by side is one answer, with mixed results; see [[N-Version Programming]]. Where redundancy can't be added, designers aim for the failure to leave things safe; see [[Fail-Safe]].

## See also
- [[Galaxy Note 7 Recall]]
- [[Apollo 1 Fire]]
