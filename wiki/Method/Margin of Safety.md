---
aliases:
  - Safety factor
  - Factor of safety
tags:
  - method
summary: Building in more capacity than the expected load requires, from bridges designed for several times their rated weight to schedules with slack, because the estimates of both load and strength are uncertain.
---
A **margin of safety** is the gap between what a system can withstand and what it is expected to face. Engineers express it as a **factor of safety**: a beam designed to hold four times its rated load has a factor of four. The margin exists because both sides of the comparison are estimates, and estimates are wrong.

Uncertainty enters from many directions:

- **Loads.** Crowds, snow, wind, and traffic are predicted from records, and records miss extremes; see [[Black Swan]].
- **Materials.** Steel and concrete vary from batch to batch, and they weaken over time through corrosion and repeated stress; see [[Material Fatigue]].
- **Models.** Calculations simplify reality, and the simplifications hide behavior the designer didn't consider; see [[Map and Territory]].

Typical factors reflect how much is unknown and how bad failure would be. Aircraft structures use about 1.5, because weight is costly and materials and loads are well characterized. Buildings use more, and elevator cables and lifting equipment use high factors, often 5 or more, because failure is catastrophic and wear is hard to see.

The 1940 collapse of the Tacoma Narrows Bridge shows the limits of a margin. It was built with adequate strength against the loads its designers calculated, but wind set up a twisting oscillation they hadn't modeled. A margin protects against errors in the quantities you considered, not against failure modes you never thought of.

The phrase entered investing through Benjamin Graham, who in *The Intelligent Investor* (1949) advised buying assets only well below their estimated value, so that errors in the estimate wouldn't turn into losses. The same logic applies far beyond bridges and stocks:

- **Schedules.** Plans with no slack fail on the first surprise, so realistic schedules include buffers; see [[Planning Fallacy]] and [[Cone of Uncertainty]].
- **Capacity.** Servers run at 100 percent utilization have no room for a traffic spike, and queues grow explosively as utilization approaches full; see [[Queueing Theory]].
- **Reliability targets.** An error budget states how much unreliability is acceptable, a margin teams can spend on change; see [[Service Level Objective]].
- **Code.** Validating inputs and handling unexpected states is a margin against callers who don't behave as documented; see [[Defensive Default]].

Margins invite erosion. Because a system with a margin usually works fine when pushed past its nominal limit, people come to treat the margin as spare capacity, and each successful overrun makes the next one feel safe. Investigators of the Challenger disaster described exactly this drift; see [[Normalization of Deviance]]. A margin only protects if it is left alone.

Margins also have costs: extra weight, idle capacity, slower schedules. Choosing one is a judgment about how uncertain the estimates are and how much failure would cost, not a fixed rule; see [[Opportunity Cost]].

## See also
- [[Cost-Benefit Analysis]]
- [[Antifragility]]
- [[Scenario Planning]]
- [[Inversion]]
- [[Sensitivity Analysis]]
