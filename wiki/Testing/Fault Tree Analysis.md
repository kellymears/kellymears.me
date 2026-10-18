---
aliases:
  - Fault tree
  - Minimal cut set
tags:
  - testing
summary: A top-down method that starts from one undesired event and draws a tree of the combinations of failures that could cause it, joined by AND and OR gates, to find the weakest combinations and estimate how likely the event is.
---
**Fault tree analysis** is a top-down method for working out how a system could reach a specific failure. It starts with one undesired event at the top, such as "the reactor overheats" or "the brakes fail," and breaks it into the events that could cause it, then the causes of those causes, down to basic failures of individual parts.

H. A. Watson of Bell Labs developed the method in 1962 to evaluate the launch control system of the Minuteman nuclear missile, where an accidental launch had to be shown to be almost impossible. It became central to nuclear power safety after a 1975 US study used fault trees to estimate the probability of reactor accidents.

The tree is built from logic gates:

- **OR gate.** The event above happens if any one of the events below happens. A pump stops if its motor fails or its power supply fails.
- **AND gate.** The event above happens only if all the events below happen. Cooling is lost only if the main pump and the backup pump both stop.

The key output is the set of **minimal cut sets**: the smallest combinations of basic failures that together cause the top event. A cut set with a single member is a single point of failure, the most urgent kind of weakness.

Given failure rates for the basic events, the tree also yields a probability for the top event, by multiplying through AND gates and adding through OR gates; see [[Monte Carlo Method]] for simulating harder cases. Those numbers depend on an assumption that is often wrong: that the basic failures are **independent**. Two backup pumps installed together, from the same batch, maintained by the same crew, fed by the same power, tend to fail together. These common-cause failures can make the real risk many times higher than the arithmetic says; see [[Confounding]] and [[RAID]], whose disks fail in clusters for the same reason.

Fault trees complement [[Failure Mode and Effects Analysis]], which works bottom-up from individual parts. A fault tree focuses on one outcome and finds combinations; FMEA covers every part but considers failures one at a time. Safety arguments often cite both; see [[Safety Case]].

The same structure is used after the fact, working back from an accident to its contributing causes; see [[Root Cause Analysis]] and [[Five Whys]]. Accidents usually need several defenses to fail at once, which a tree with AND gates makes visible; see [[Normalization of Deviance]].

Security teams use **attack trees**, a variant in which the top event is an attacker's goal and the branches are ways to reach it; see [[Adversarial Review]]. The limits are shared: a tree contains only the failures someone thought to draw; see [[Pre-mortem]].

## See also
- [[Decision Tree]]
- [[Byzantine Fault Tolerance]]
- [[Normal Accidents]]
- [[Threat Modeling]]
- [[Boeing 737 MAX Groundings]]
