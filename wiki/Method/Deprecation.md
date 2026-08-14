---
aliases:
  - Deprecated
tags:
  - method
summary: Marking something as superseded and scheduled for removal, without removing it yet.
---
**Deprecation** is the practice of declaring an interface obsolete — still working, but no longer recommended, and slated for removal — so dependants have a window to migrate. It is the compromise between breaking people immediately and carrying an alternative forever. The window is worth the trouble because dependants rely on more than the documented interface: [[Hyrum's Law]] observes that with enough users, every observable behaviour of a thing is depended on by somebody, so the population affected by a removal is never fully knowable in advance.

A deprecation is only useful if it names three things: what replaces the old thing, when it will be removed, and how to tell whether you are affected. Deprecations lacking those degrade into permanent decoration, which is [[Technical Debt]] wearing a warning label.

The removal half is where deprecations actually fail. Retiring a component leaves residue that no compiler catches: doc comments referring to the departed symbol, tests keyed on a shape that no longer exists (and which therefore silently walk nothing), change descriptions narrating work that has been undone, and configuration entries that still advertise a value nothing reads. A search for the retired name across the whole repository — including commit messages and documentation, not just source — is the step that finds them. See [[Silent Failure]] and [[Schema Drift]].

Version numbering is how deprecations are communicated at the package boundary; see [[Semantic Versioning]].

## See also
- [[Documentation Rot]]
- [[Technical Debt]]
- [[Semantic Versioning]]
- [[Regression]]

## Related
- [[Root Cause Analysis]]
- [[Semantic Conflict]]
- [[Package Manager]]
