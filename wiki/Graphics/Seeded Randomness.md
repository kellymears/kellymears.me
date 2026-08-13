---
aliases:
  - Seed
  - Daily puzzle
tags:
  - graphics
summary: Pseudorandom generation from an explicit seed, so any output is reproducible.
---
**Seeded randomness** means using a pseudorandom generator initialised from an explicit value, so the same seed always produces the same sequence. Everything described as "random" in software is this; the only question is whether the seed is recorded.

Recording it is what makes randomness compatible with engineering. A generated world, a shuffled deck, or a procedural layout becomes reproducible, so a bug in it can be reported, tested, and fixed. Without a seed, a defect in generated content is a story rather than a case. See [[Determinism]] and [[Reproducible Case]].

The pattern also has a direct product use: deriving the seed from the date gives everyone the same puzzle on the same day, which is the mechanic behind the daily-word-game genre. It creates a shared experience with no server, no accounts, and no coordination — the date *is* the coordination. Offering several difficulties per day is the same seed varied by a difficulty label.

Two cautions. A generator's *quality* matters for simulation and not much for games, but its *distribution* does — a naive modulo of a random integer into a range is subtly biased. And seeded does not mean secret: if the seed is derivable, so is the outcome, which matters the moment anything competitive rests on it.

## See also
- [[Determinism]]
- [[Procedural Generation]]
- [[Roguelike]]
- [[Reproducible Case]]
- [[Cellular Automaton]]
- [[Constraint Propagation]]
- [[L-System]]
- [[Game AI]]

## Related
- [[Voxel]]
- [[Trick-Taking Game]]
