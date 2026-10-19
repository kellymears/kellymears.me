---
aliases:
  - Common cause failure
  - Common-cause failure
tags:
  - testing
summary: The simultaneous failure of supposedly independent backups from one shared cause, such as a flood, a fire or a design flaw, which defeats redundancy and is underestimated by any analysis that assumes components fail independently.
---
A **common-mode failure** happens when several components meant to back each other up fail together from the same cause. Redundancy works only if the copies fail independently. If one event can take them all out at once, the system has effectively a single point of failure, however many copies it has; see [[Single Point of Failure]].

The arithmetic shows why it matters. If one pump fails one time in a thousand, two independent pumps should both fail only one time in a million. But if a shared cause, such as a power supply, a flood or a bad batch of parts, can disable both, the real chance of losing both is far higher, and it's set by that shared cause. Safety analyses that multiply independent probabilities can overstate reliability by orders of magnitude; see [[Fault Tree Analysis]] and [[Expected Value]].

Shared causes come in a few families. **Environmental** ones hit everything in one place: a flood, fire, earthquake or overheating room. **Design** ones affect identical parts in the same way, so a flaw in one copy is a flaw in all. **Human** ones come from the same person or procedure handling every copy, like a technician who calibrates all the sensors with the same mistake. And **dependencies** that redundant systems quietly share, such as a common power feed or cable route, tie their fates together.

Real cases are numerous. At a nuclear plant in Alabama in 1975, a worker using a candle to check for air leaks set fire to cable insulation, and the fire spread through a tray where control cables for redundant safety systems ran side by side. At Fukushima in 2011, a tsunami flooded backup generators placed in the same low basements; see [[Fukushima Daiichi Nuclear Disaster]]. On the airliner lost over the Atlantic in 2009, all the speed sensors iced over in the same weather at the same moment; see [[Air France Flight 447]].

Software is especially exposed, because copies of the same program contain the same bugs. Running the same code on three computers protects against hardware faults, not logic errors. Writing several independent versions to vote on results was tested in a well-known 1986 experiment, which found that separately written programs tended to fail on the same difficult inputs; see [[N-Version Programming]].

Defenses work by making copies genuinely different and separate. **Diversity** uses different designs, manufacturers or technologies for each backup. **Separation** places them in different locations or fire zones. Analysis methods ask explicitly what single event could defeat several barriers at once; see [[Failure Mode and Effects Analysis]] and [[Safety Case]].

Common-mode thinking also explains why failures cascade across organizations that share suppliers or software; see [[Cascading Failure]] and [[CrowdStrike Outage]].

## See also
- [[Normal Accidents]]
- [[Fail-Safe]]
- [[Chaos Engineering]]
