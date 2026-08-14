---
aliases:
  - Stale docs
  - Doc drift
tags:
  - method
summary: Documentation that has drifted from the system it describes, and is now worse than none.
---
**Documentation rot** is the gradual divergence of written descriptions from the system they describe. It is not a tidiness problem: confidently wrong documentation is more expensive than absent documentation, because a reader trusts it and spends time hunting for a thing that no longer exists.

Rot has a structural cause. Code and its description live in different files, change through different actions, and are validated by different gates — usually none, for the description. The general remedy is to reduce the number of places a fact is stated. A tool's own description, shipped in the same declaration as its implementation, cannot drift; a catalog of tools maintained in a separate document will. Generating reference material from the source of truth beats maintaining a parallel copy.

Where duplication cannot be removed, it can be *checked*. A rule requiring every module to be named in a sibling document, or a build step that regenerates types and fails on any difference, converts drift into a red build. See [[Continuous Integration]] and [[Schema Drift]].

Rot also afflicts prose *inside* source files. A docblock is only attached to a declaration by adjacency, so inserting anything above it silently reassigns it to the wrong neighbor — see [[Code Comment]].

## See also
- [[Code Comment]]
- [[Deprecation]]
- [[Technical Debt]]
- [[Provenance]]
- [[Plausible Mechanism]]
- [[Chesterton's Fence]]

## Related
- [[Code Review]]
- [[Agent Memory]]
