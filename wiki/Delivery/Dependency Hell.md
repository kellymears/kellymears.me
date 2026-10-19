---
aliases:
  - Diamond dependency
  - Transitive dependency
  - Transitive dependencies
  - Version conflict
  - Dependency pinning
tags:
  - delivery
summary: The tangle that results when software depends on packages that depend on other packages, with conflicting version requirements, unexpected upgrades, and more code than anyone chose.
---
**Dependency hell** is the collection of problems that arise when software relies on many external packages, each with its own dependencies and version requirements. The name dates from the Linux distributions of the 1990s and early 2000s, where installing one package could demand specific versions of a dozen libraries that conflicted with what was already installed.

Most of the trouble comes from **transitive dependencies**: the dependencies of your dependencies. A project that directly uses ten packages may pull in hundreds or thousands in total. Each is code someone else maintains, on their own schedule, and almost nobody reviews all of it.

Typical problems:

- **The diamond.** Your app uses libraries A and B, and both depend on C, but A needs C version 1 and B needs C version 2. If only one version of C can be loaded, one of them breaks. Some ecosystems, such as npm, allow multiple copies to coexist, trading conflicts for duplicated code; others, such as Python, must find one version that satisfies everyone or fail.
- **Unexpected upgrades.** Version ranges like "any 2.x" let a fresh install pick up a newer release than the one tested. If that release breaks something, despite [[Semantic Versioning]] promising otherwise, builds fail with no change to your own code.
- **Abandoned packages.** A deep dependency stops being maintained, leaving known bugs or vulnerabilities with no fix.
- **Breaking changes everywhere.** Upgrading one package to get a fix may require upgrading others that depend on it, cascading through the tree.

The main defenses work at different layers:

- **Lockfiles.** A [[Lockfile]] records the exact version of every package, transitive ones included, so installs are repeatable. Upgrades become deliberate, reviewable changes rather than accidents.
- **Version constraints and solvers.** A [[Package Manager]] treats compatible versions as a constraint problem and searches for a set that satisfies every requirement. In general this search is NP-complete, which is why dependency resolution can be slow or produce confusing errors.
- **Automated update tools** open regular pull requests for new versions, keeping each upgrade small instead of letting years of drift accumulate.
- **Fewer dependencies.** Each package is a long-term commitment. The 2016 left-pad incident, when an 11-line package was unpublished and broke builds worldwide, showed how much rests on tiny dependencies.
- **[[Vendoring]]**, copying dependencies into the repository, trades updates for control.

Dependencies are also a security surface. Each one can be compromised, typosquatted, or taken over by a new maintainer, which is why [[Supply Chain Security]] and a [[Software Bill of Materials]] have become routine. And since every package's observable behavior is something others depend on, [[Hyrum's Law]] means even careful maintainers break someone when they change.

## See also
- [[Technology Radar]]
- [[Software Rot]]
- [[Node.js]]
- [[License Compatibility]]
- [[Dynamic Linking]]
- [[Automated Dependency Updates]]
- [[Build Matrix]]
- [[ES Modules]]
