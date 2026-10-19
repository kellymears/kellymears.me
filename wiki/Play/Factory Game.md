---
aliases:
  - Automation game
  - Production chain game
tags:
  - play
summary: A genre whose core verb is building the machine that plays the game, turning the player into a systems engineer.
---
**Factory game** describes a genre — *Factorio*, *Satisfactory*, the *Anno* series — whose central verb is not acting but arranging for action to happen without you. The player begins by mining a resource by hand and ends by supervising a continent-scale system they no longer touch directly. The genre's real subject is the transition between those states, which is the same transition every engineer makes when they stop doing a task and start automating it. [[Colony Sim]] runs the same indirect-control production chain toward a different end, swapping the throughput metric for a population's needs but keeping the chain-reaction failure mode intact.

**The production chain is the unit of design.** Raw inputs feed machines that emit intermediates, which feed other machines, and a finished good is the leaf of a dependency tree. This is a [[Module Graph]] made physical, and it fails in the same ways: a change deep in the tree propagates outward, an unnoticed cycle deadlocks, and the practical constraint is almost never the total capacity but the single slowest edge. Players learn to reason about throughput rather than quantity — a lesson in asymptotics that [[Big-O Notation]] states formally and a stalled assembler states viscerally. A line that idles because its input arrives too slowly is literal [[Resource Starvation]].

The genre's most transferable lesson is about diagnosis. A factory that has stopped presents as one symptom — nothing is coming out — with a cause far upstream, so players build gauges, alarms and sample chests, arriving at [[Observability]] by necessity rather than instruction. Debugging a stalled line is [[Root Cause Analysis]] with a walkable spatial dimension, teaching players to trust the instruments over the intuition.

**Spaghetti is technical debt with a footprint.** The early layout that works becomes the obstruction that later throughput cannot route around, and the player faces the familiar choice between patching around it and tearing it out — [[Technical Debt]] rendered in belts, where the interest payment is measured in walking distance. The related pleasure is watching a designed system produce behavior its designer did not specify, which is the same pleasure [[Cellular Automaton]] rules offer in a thinner medium, and it is why these games sustain hundreds of hours where their nominal content would suggest a dozen.

## See also
- [[Procedural Generation]]
- [[Determinism]]
- [[Constraint Propagation]]
- [[Idle Game]]
- [[Meta-Progression]]
