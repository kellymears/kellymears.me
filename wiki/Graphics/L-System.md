---
aliases:
  - Lindenmayer system
tags:
  - graphics
summary: A rewriting grammar that generates branching structures by repeated substitution.
---
An **L-system** is a formal grammar introduced by the biologist Aristid Lindenmayer to model plant growth. It consists of an alphabet, an initial string, and a set of rewriting rules applied to *every* symbol simultaneously at each iteration. Interpreting the resulting string as drawing instructions produces a structure.

Parallel rewriting is what distinguishes it from an ordinary grammar and what makes it a good model for growth: every part of the organism develops at once. A handful of rules and half a dozen iterations produce ferns, trees, and shells with remarkable fidelity.

Extensions broaden the range considerably. *Stochastic* rules choose among alternatives probabilistically, so no two instances are identical. *Context-sensitive* rules depend on neighboring symbols, allowing signals to propagate through the structure. *Parametric* systems attach values to symbols, so lengths and angles evolve rather than being fixed.

Beyond botany, L-systems generate road networks and street grids — the recursive branching of a main road into secondaries into local streets is naturally expressed as rewriting. Making that usable for a simulated city usually means quantizing the output to a grid and generating incrementally, so that the layout is stable and extendable rather than regenerated whole.

## See also
- [[Procedural Generation]]
- [[Cellular Automaton]]
- [[Seeded Randomness]]

## Related
- [[Roguelike]]
- [[Determinism]]
- [[Constraint Propagation]]
- [[Game AI]]
- [[Voxel]]
- [[Shader]]
- [[Trick-Taking Game]]
