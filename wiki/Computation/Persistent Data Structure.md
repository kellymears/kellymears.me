---
aliases:
  - Persistent data structures
  - Structural sharing
  - Hash array mapped trie
  - HAMT
  - Functional data structure
tags:
  - computation
summary: Data structures that preserve every previous version when changed, sharing unchanged parts between versions so "copying" is cheap.
---
A **persistent data structure** keeps its previous versions when it is modified. Instead of changing the structure in place, an update returns a new version, and the old version remains valid and unchanged. Here "persistent" means preserving history, not storing to disk.

The naive way to get this is to copy everything on every change, which is far too slow for large structures. The trick that makes persistence practical is **structural sharing**: the new version reuses all the parts of the old one that didn't change. Consider a balanced tree of a million items. Changing one item requires new copies of only the nodes on the path from the root to that item, about twenty nodes, while the new root points to all the other unchanged subtrees of the old version. Both versions exist, and they share almost everything.

James Driscoll, Neil Sarnak, Daniel Sleator, and Robert Tarjan formalized general techniques in 1986, and Chris Okasaki's *Purely Functional Data Structures* (1998) became the standard reference. Common designs:

- **Linked lists.** The simplest case: adding to the front creates one new node pointing to the old list, which stays intact.
- **Balanced trees.** Path copying, as above, gives persistent maps and sets with logarithmic updates.
- **Hash array mapped tries (HAMTs).** Phil Bagwell's 2001 design is a [[Trie]] keyed on chunks of each key's hash, with nodes of up to 32 children. Trees are so shallow that lookups take only a few steps. Clojure, introduced in 2007, made HAMT-based vectors and maps its defaults.

Persistence is what makes [[Immutability]] practical. In functional languages values never change, so data structures must be persistent to be efficient. The benefits follow directly:

- **Cheap snapshots and undo.** Every version is a snapshot. Undo is keeping a list of previous roots.
- **Safe sharing.** A version can be handed to another thread or function without defensive copying, since nobody can change it. This removes a whole class of [[Race Condition]] bugs.
- **Fast change detection.** If two references point to the same node, everything beneath is identical. UI libraries exploit this to skip unchanged parts of the tree when updating a [[Virtual DOM]].

The costs are real. Each update allocates new nodes, putting pressure on [[Garbage Collection]], and pointer-heavy trees have worse Locality of Reference than flat arrays, so persistent structures are typically slower than mutable ones by a constant factor.

The same ideas appear outside programming languages. Git stores history as a persistent tree in which each commit shares unchanged files and directories with its parent, an instance of a Merkle Tree. File systems and databases that use [[Copy-on-Write]] get cheap snapshots the same way, and [[Event Sourcing]] keeps every past state reconstructible by never overwriting.

## See also
- [[Undo]]
- [[Git Object Model]]
