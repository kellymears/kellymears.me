---
aliases:
  - Estimation uncertainty
tags:
  - method
summary: The observation that early estimates of a project's size can be off by a factor of four in either direction, narrowing only as decisions are made and work is done, so a single early number is misleading.
---
The **cone of uncertainty** describes how the range of possible outcomes for a project narrows over time. At the very start, a realistic estimate might be off by a factor of four in either direction: a job guessed at three months could take three weeks or a year. As requirements are settled, designs chosen, and work completed, the range shrinks, until at the end there is nothing left to estimate.

The idea comes from engineering and construction cost estimation in the 1950s and 1960s. Barry Boehm brought it into software in *Software Engineering Economics* (1981), and Steve McConnell named and popularized it in *Software Estimation* (2006). Drawn on a chart, the high and low bounds start far apart and converge toward the actual outcome, forming a sideways cone.

Two points are often missed:

- **The cone does not narrow by itself.** Time passing doesn't reduce uncertainty; decisions do. A project that never settles its scope, or keeps reopening design questions, stays at the wide end; see [[Feature Creep]].
- **The cone is the best case.** It shows how accurate a skilled estimator can be at each stage. Real estimates are often worse, and they tend to err in one direction, too low; see [[Planning Fallacy]].

The practical consequence is that a single number given at the start of a project is misleading. It hides a range, and the person who hears it usually remembers the optimistic end. Better approaches communicate the range:

- **Ranges and confidence.** "Two to five months, more likely toward the low end" carries more truth than "three months"; see [[Confidence Interval]].
- **Re-estimating at milestones.** Each stage narrows the cone, so estimates should be revised as decisions are made rather than defended.
- **Buying down uncertainty.** Prototypes and spikes on the riskiest parts are the fastest way to narrow the range, since the unknowns are where estimates go wrong; see [[Minimum Viable Product]].
- **Reference classes.** Comparing with how long similar past projects actually took corrects for optimism better than reasoning from the plan; see [[Fermi Estimation]].

Agile methods partly respond to the cone by refusing to estimate distant work in detail. Teams estimate the next few weeks closely and the rest roughly, and plan in short cycles so each one replaces guesses with results; see [[Agile Software Development]] and [[Story Points]].

The cone also explains why commitments made at the start of a project become sources of pressure later. When the early estimate was low by the usual factor, the gap shows up near the end, often as the long, slow finish described by the [[Ninety-Ninety Rule]], or as quietly accumulated shortcuts; see [[Technical Debt]]. Saying "we don't know yet, and here is when we will" is often the most accurate estimate available.

## See also
- [[Ambiguity Aversion]]
- [[Knightian Uncertainty]]
- [[Second-Order Thinking]]
- [[Scenario Planning]]
