---
aliases:
  - Opponent AI
  - Heuristic AI
tags:
  - play
summary: Computer opponents built to be interesting to play against rather than optimal.
---
**Game AI** is the design of computer-controlled opponents, and its goal is almost never to play optimally. An unbeatable opponent is not fun; a *legible* one — whose behaviour a player can read, predict, and outmanoeuvre — is.

The approaches range from hand-written heuristics through search (minimax, Monte Carlo tree search) to learned policies. For most games the heuristic approach is not a compromise: rules like "play the smallest legal combination", "hold high cards for emergencies", "pass when short-handed" produce readable, characterful play and are trivial to reason about.

The technique that gets the most out of that approach is **parameterising the same engine differently per opponent**. A shared decision procedure with per-opponent knobs — aggression, hoarding, risk tolerance — yields several distinct personalities from one implementation, and personalities are what make opponents memorable. [[Colony Sim]] takes the same idea to population scale: dozens of semi-autonomous colonists run one shared decision procedure against a stack of needs, and the player never scripts an individual, only the priorities and environment those needs read from.

The design point worth planning for is keeping the decision behind one interface: a function from game state to move. The whole strategy can then be replaced by search later without touching the game loop.

Legibility is also a presentation problem, not only a behaviour one. If a player cannot tell who acted, what they played, or why the turn changed, the opponent reads as arbitrary — announcing plays, naming participants, and pacing the rhythm of a turn does more for perceived intelligence than the decision procedure does.

## See also
- [[Trick-Taking Game]]
- [[Constraint Propagation]]
- [[Seeded Randomness]]
- [[Roguelike]]

## Related
- [[Procedural Generation]]
- [[Cellular Automaton]]
- [[L-System]]
- [[Determinism]]
- [[Voxel]]
- [[Shader]]
