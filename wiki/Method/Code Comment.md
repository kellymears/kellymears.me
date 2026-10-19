---
aliases:
  - Comments
tags:
  - method
summary: Prose inside source code, useful only when it records a constraint the code cannot state.
---
A **code comment** is prose embedded in source. Whether a given comment earns its place has a sharp test, and it is not "does this explain the code":

> A comment worth keeping answers *what breaks if you rewrite this?* A comment worth cutting answers *why did this change?*

The second kind narrates the conversation that produced the line — "the port welded these together", "regression: previously returned null", "added for issue 412". It makes sense only to someone who read the change that introduced it, and it is exactly the information the version-control history already holds and holds better. See [[Provenance]].

The first kind records a constraint that is invisible from the code and will be reintroduced as a bug if removed: an ordering requirement, a platform quirk, a reason the obvious simplification does not work. That is the same category as [[Chesterton's Fence]] — a comment is the cheapest way to stop a future reader from tearing the fence down.

Two mechanical hazards. A comment stating a causal mechanism nobody verified is worse than none, because it inherits the credibility of the source file it lives in — see [[Plausible Mechanism]]. And a documentation block binds to whatever declaration follows it, so inserting a new declaration above one silently transfers the docs to the wrong thing.

## See also
- [[Documentation Rot]]
- [[Naming]]
- [[Code Review]]
- [[Chesterton's Fence]]
- [[Plain Language]]

## Related
- [[Technical Debt]]
- [[Linguistic Relativity]]
