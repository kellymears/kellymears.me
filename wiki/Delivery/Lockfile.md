---
aliases:
  - Lock file
tags:
  - delivery
summary: A generated file recording the exact dependency versions an install resolved to.
---
A **lockfile** records the exact resolved version of every direct and transitive dependency, so that installing from it reproduces the same tree on every machine. Manifests state ranges; lockfiles state facts. Committing one is what makes builds reproducible.

Lockfiles are generated artifacts and should be treated as such: regenerate rather than hand-edit, and review the diff for surprises rather than for style.

One structural detail causes recurring confusion. Lockfiles typically contain two kinds of information: an echo of the *declared* ranges from every manifest, and the map of *resolved* packages. Tightening a range in a manifest necessarily changes the first, so "the lockfile diff must be empty" is an impossible standard — the honest check is whether the resolved half changed. Diffing the resolution section alone distinguishes an intentional pin from an unintended re-resolution.

A second: how installed packages are laid out on disk is a property of the package manager's linking strategy, not of the lockfile, so reading a version out of an installed directory may be wrong or may find nothing. The lockfile's resolution map is the answer. See [[Package Manager]] and [[Monorepo]].

## See also
- [[Package Manager]]
- [[Semantic Versioning]]
- [[Determinism]]
- [[Supply Chain Security]]

## Related
- [[Bundler]]
- [[Silent Failure]]
- [[Module Graph]]
