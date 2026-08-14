---
aliases:
  - Ability-gated map
  - Search action game
tags:
  - play
summary: A handcrafted world structured as a lock-and-key graph, where new abilities reopen old space rather than extending it.
---
**Metroidvania** names a structure rather than a setting: a single continuous world, largely accessible from the start, partitioned by obstacles that specific abilities remove. The player explores until blocked, finds an ability elsewhere, and returns. The compound name credits *Metroid* and *Symphony of the Night*, and the form reaches *Hollow Knight* largely unchanged, because the structure is the appeal.

**The map is a directed graph and the abilities are its edges.** Every gate is a dependency, and the designer's real artifact is the dependency order — which is why the genre resists [[Procedural Generation]] more stubbornly than most. A generator can lay out rooms, but the satisfaction lives in a wall passed in the first hour turning out to be the back of a room reached in the fifth, and that has to be authored. The reasoning is [[Constraint Propagation]] over a [[Module Graph]]: adding a gate constrains everything downstream, and one misordered edge either strands the player or lets them skip an act.

**The genre's distinctive pleasure is retroactive.** Space already traversed changes meaning when a new ability arrives, so progress is measured in reinterpretation rather than in new ground — the same satisfaction a [[Backlink]] provides in a [[Knowledge Graph]], where an old note's value is created by a new one pointing at it. This is why the map screen is load-bearing rather than a convenience: it is where the player's model is externalised, and an entry with a poor map gets called frustrating for reasons players misattribute to its level design.

Two forces pull against the form. Sequence breaking — reaching a gate's far side without its key — is a failure of the dependency order that expert players treat as its highest expression, and designers increasingly sanction rather than patch it. And the backtracking that gives the structure meaning is a cost in the player's time, which is why fast travel arrives late and sparingly: remove enough of the return trip and the graph flattens into a corridor. The genre's [[Game Feel]] burden is unusually high for the same reason, since a world you are asked to re-cross must be pleasant to move through — a demand it shares with the [[Immersive Sim]], where the space is likewise re-entered rather than consumed.

## See also
- [[Soulslike]]
- [[Environmental Storytelling]]
- [[Game Feel]]
- [[Procedural Generation]]
- [[Knowledge Graph]]
