---
aliases:
  - WFC
  - Model synthesis
tags:
  - graphics
summary: A procedural generation algorithm that builds large patterns from a small example by repeatedly fixing the most constrained cell and propagating the consequences.
---
**Wave function collapse** (WFC) is a [[Procedural Generation]] algorithm that produces large images, maps, or 3D structures that locally resemble a small example. Maxim Gumin published it on GitHub in 2016, building on Paul Merrell's earlier *model synthesis* (2007). Its name borrows loosely from quantum mechanics, where a system holds several possible states until measured. There is no physics in it. It is [[Constraint Propagation]] with a randomized choice order.

The algorithm works on a grid:

1. **Learn the rules.** Either an artist supplies a set of tiles and says which may sit next to which, or the algorithm reads a sample image and records every small pattern, say 3×3 pixels, and which patterns appear beside each other and how often.
2. **Start in superposition.** Every cell of the output may hold any pattern.
3. **Observe.** Pick the cell with the fewest remaining options, specifically the lowest Shannon entropy, a measure from [[Information Theory]] that accounts for how common each option is. Choose one option at random, weighted by frequency.
4. **Propagate.** Remove options from neighboring cells that are no longer compatible, and from their neighbors in turn, until nothing changes.
5. **Repeat** until every cell has one option.

Choosing the lowest-entropy cell is the same heuristic a person uses on a Sudoku: fill the most constrained square first, because it is least likely to be wrong. It keeps contradictions rare, but not impossible. When a cell runs out of options, simple implementations restart from scratch, and better ones use [[Backtracking]] to undo recent choices.

The appeal for designers is control by example. Instead of writing generation code, they draw a sample or a [[Tile Map]] tileset with adjacency rules, and the output follows the sample's local style. Constraints can be pinned too: a cell can be fixed to "door" or "water" before generation, and the rest of the map arranges itself around it.

Oskar Stålberg made it famous in games. *Bad North* (2018) builds its islands with it, and *Townscaper* (2020) runs it interactively, so each block a player places makes the surrounding houses, roofs, and stairs re-solve into a consistent town. *Caves of Qud* uses it for some of its ruins.

WFC has clear limits. It enforces only local rules, so it can't guarantee that a dungeon is connected or that a level has a beginning and an end. Those global properties need a separate check or a hybrid generator, which is why [[Roguelike]] level generators usually combine it with other methods, as they do [[Cellular Automaton]] caves. With [[Seeded Randomness]], a given seed always yields the same result, which helps testing and sharing.

## See also
- [[Constraint Propagation]]
- [[Procedural Generation]]
- [[Tile Map]]
- [[Backtracking]]
