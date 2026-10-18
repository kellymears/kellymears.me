---
aliases:
  - Theseus's paradox
  - Grandfather's axe
  - Identity over time
tags:
  - meaning
summary: The ancient puzzle of whether a ship whose every plank has been replaced is still the same ship, and its modern echoes in bodies, bands, cities, and software rewritten piece by piece.
---
The **Ship of Theseus** is a puzzle about identity over time. Plutarch, writing around 100 CE, reported that the Athenians preserved the ship in which the hero Theseus had returned from Crete, replacing each plank as it rotted. Philosophers argued over whether, once every original plank was gone, it was still the same ship. The folk version is a grandfather's axe that has had three new handles and two new heads.

Thomas Hobbes sharpened the puzzle in the 17th century. Suppose someone collects the discarded planks and reassembles them. Now there are two ships, one continuous in form and use and one made of the original material. Which is the Ship of Theseus?

Philosophers have offered several answers:

- **Continuity.** Identity follows gradual, connected change. The repaired ship is the original because there was never a moment it stopped being the ship.
- **Material.** Identity lies in the stuff, so the reassembled ship is the original.
- **Convention.** "Same" is settled by purpose and context, with no further fact to find. For a museum the old planks matter, and for a navy the working ship does; see [[Prototype Theory]].
- **Four-dimensionalism.** Objects extend through time as well as space, and the question is only which stretch of that history a name picks out.

The puzzle shades into the sorites paradox, the paradox of the heap. No single plank changes the ship, yet all of them together seem to, so there may be no sharp line to find.

Modern versions are everywhere. Many of the body's cells are replaced over months or years, though most neurons last a lifetime, and memories are rebuilt each time they're recalled; see [[Neuroplasticity]] and [[False Memory]]. Bands tour under their old name with no founding members left, and sports clubs keep their identity through complete changes of players, owners, and sometimes cities.

Software is an especially clear case. A codebase rewritten one module at a time keeps its name, users, and history, though no original line survives; see [[Refactoring]] and [[Strangler Fig Pattern]]. Version control records the continuity explicitly, since every commit names its parent; see [[Git]]. Programming languages separate two kinds of sameness, equal contents and the same object, and [[Immutability]] sidesteps the puzzle by making a new object for every change; see [[Persistent Data Structure]]. Content-addressed systems name things by a hash of their contents, so any change at all produces a new identity; see [[Merkle Tree]].

Museums face the question directly. A restored locomotive or aircraft may contain little of its original material, and conservators argue over how much replacement is acceptable before an artifact becomes a replica. Keeping old software running raises the same problem, since emulators and migrated files replace everything but the behavior; see [[Digital Preservation]].

## See also
- [[Trolley Problem]]
- [[Semantic Change]]
- [[Retcon]]
