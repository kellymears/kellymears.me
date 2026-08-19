---
aliases:
  - Truck factor
  - Lottery factor
tags:
  - delivery
summary: The number of people who would have to leave before a project stalls.
---
**Bus factor** is the number of people who would have to become unavailable — the metaphor is being hit by a bus — before a project stalls for lack of anyone who understands it. A project with a bus factor of one has exactly one person who can fix a given class of bug or explain why a piece of it works the way it does; losing that person loses not just effort but knowledge nobody else has.

The number is not headcount. A team of twelve can have a bus factor of one if eleven of them only touch code that the twelfth person wrote, reviewed, and alone understands. What it measures is the concentration of *undocumented* knowledge — reasoning that lives in one head rather than in a comment, a design note, or a commit message anyone can read. Written-down reasoning keeps a bus factor high even when only one person currently does the work, because anyone competent could pick it up from what is left behind.

That reframing points to what actually raises the number. Writing things down is necessary but not sufficient — [[Documentation Rot]] means a note goes stale the moment the code it describes changes underneath it — so the interventions that hold up are built into the workflow rather than treated as separate effort: [[Code Review]] that requires the reasoning behind a change to be legible to a second person, not just the diff; a history that preserves [[Provenance]] so a future maintainer can trace why something is the way it is; [[Code Comment]] and [[Naming]] chosen for a stranger's benefit rather than the author's; and rotating ownership deliberately rather than letting whoever wrote a subsystem first stay its permanent sole owner. The alternative is a codebase full of the unexplained constraint [[Chesterton's Fence]] warns against, compounding with [[Conway's Law]]: a team drawn too narrowly around a component concentrates its architecture and its knowledge in the same few people.

## See also
- [[Documentation Rot]]
- [[Code Review]]
- [[Provenance]]
- [[Conway's Law]]
- [[Chesterton's Fence]]
- [[Commons-Based Peer Production]]
- [[Peter Principle]]
