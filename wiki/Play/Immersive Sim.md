---
aliases:
  - Immersive simulation
  - Systemic design
tags:
  - play
summary: A design tradition that simulates consistent rules rather than scripting outcomes, so solutions the designer never planned still work.
---
**Immersive sim** describes the tradition running from *Ultima Underworld* and *Thief* through *Deus Ex*, *Prey* and, in a turn-based register, *Baldur's Gate 3*. Its commitment is to simulate a small number of rules consistently across the whole world rather than to script the outcome of each encounter. If water conducts electricity, it conducts electricity everywhere, including in the puzzle the designer did not consider.

**The payoff is a solution space larger than the design document.** A locked door yields to the key, the lockpick, the vent above it, the guard who can be persuaded to open it, or the wall beside it if the wall is breakable — and crucially, to combinations nobody enumerated. This is emergence in the ordinary sense: consistent local rules producing global behaviour that was not specified, the same phenomenon a [[Cellular Automaton]] demonstrates with far less machinery. The designer's job shifts from authoring paths to authoring rules and then verifying that the space they open is navigable.

That shift is expensive, and the expense is mostly in verification. A scripted encounter has one path to test; a systemic one has a combinatorial space no test plan covers, so studios lean on internal [[Observability]] and heavy playtesting to find the states players actually reach. The genre's characteristic bugs are [[Race Condition]]-shaped — two systems interacting in an order nobody sequenced — and its characteristic triumphs are the same events reported by delighted players instead of the bug tracker. Distinguishing the two before shipping is genuinely hard, which is why the tradition prizes [[Determinism]] in its simulation layer: a systemic outcome that cannot be reproduced cannot be judged.

**The failure mode is a dominant strategy.** If one systemic answer works everywhere, the space collapses to a single path and the simulation becomes ornamentation — the player has optimised the fun out, and [[Goodhart's Law]] has been served by the design's own generality. The countermeasure is not to remove the strategy but to make contexts differ enough that its cost varies. Doing that well requires the world to communicate its rules without a tutorial, which is why the tradition leans so heavily on [[Environmental Storytelling]] and [[Diegetic Interface]] work: a player can only exploit a system they can perceive, and a simulation nobody can read is indistinguishable from a script.

## See also
- [[Game AI]]
- [[Environmental Storytelling]]
- [[Diegetic Interface]]
- [[Ludonarrative Dissonance]]
- [[Procedural Generation]]
