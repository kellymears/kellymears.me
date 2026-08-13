---
aliases:
  - Game of Life
  - Cellular automata
tags:
  - graphics
summary: A grid of cells whose states evolve by a local rule applied simultaneously everywhere.
---
A **cellular automaton** is a grid of cells, each in one of a finite set of states, updated in discrete steps by a rule that depends only on a cell's own state and its neighbours'. All cells update simultaneously.

Conway's Game of Life is the famous instance: cells live or die by neighbour count, and the result generates gliders, oscillators, and structures capable of universal computation. The point it demonstrates — that extremely simple local rules produce unbounded global complexity — is the reason automata matter beyond recreation.

They are practically useful for cave and terrain generation, fluid and fire approximation, crowd flow, and ecological simulation. A multi-species variant with predation, reproduction, and decay produces an evolutionary arms race whose visual behaviour is genuinely unpredictable, which is exactly what makes it good generative art.

Two implementation notes. **Simultaneity is load-bearing**: updating in place lets a cell see its neighbour's new state, which produces a different and usually wrong system. Double-buffering is the fix. And **boundary handling is a design decision** — wrapping the grid into a torus, treating edges as permanently dead, or clamping each produce visibly different behaviour at the margins.

## See also
- [[Procedural Generation]]
- [[Seeded Randomness]]
- [[Shader]]
- [[Constraint Propagation]]
- [[L-System]]

## Related
- [[Roguelike]]
- [[Determinism]]
- [[Voxel]]
- [[Game AI]]
