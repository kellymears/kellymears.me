---
aliases:
  - Procgen
tags:
  - graphics
summary: Creating content algorithmically rather than authoring it by hand.
---
**Procedural generation** produces content — terrain, buildings, layouts, textures, text — by algorithm rather than by hand. Its appeal is leverage: a generator that is a few hundred lines can produce an unbounded amount of material, and can produce it differently for every player or every visit.

The trade is control. Handmade content is exactly what someone intended; generated content is a distribution, and the interesting engineering is in shaping that distribution. Most of the work in a real generator is constraint and curation rather than randomness: rules about what may sit next to what, minimum and maximum counts, and hand-authored elements slotted into generated frames.

Two structural concerns recur.

**Repetition is the enemy of the illusion.** A pool of variants repeats visibly far sooner than intuition suggests, because the eye is good at noticing recurrence — a pool of four reads as obviously repeating well before a scene is full. Variation has to be layered: variants plus placement plus small per-instance perturbation.

**Generation should be [[Seeded Randomness|seeded]]**, so that any output can be reproduced from its seed. Without that, a bug in generated content is unreportable and untestable.

Determinism also enables *incremental* generation: extending a world without regenerating what already exists requires that the same inputs always produce the same region.

## See also
- [[Seeded Randomness]]
- [[L-System]]
- [[Determinism]]
- [[Voxel]]
- [[Cellular Automaton]]
- [[Roguelike]]

## Related
- [[Shader]]
- [[Constraint Propagation]]
- [[Reproducible Case]]
