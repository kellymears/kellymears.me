---
aliases:
  - Vendored dependencies
  - Vendor directory
  - Vendored code
tags:
  - delivery
summary: Copying a project's third-party dependencies directly into its own repository, trading easy updates for builds that never depend on an outside registry being available or unchanged.
---
**Vendoring** means copying the source code of third-party dependencies into a project's own repository, often under a directory named `vendor/` or `third_party/`, instead of downloading them from a registry at build time. The project then builds from exactly the code it contains, with no network access needed.

The practice is old. Before package managers were common, copying libraries into a project was the default. It remains standard in some ecosystems: Go has built-in support with `go mod vendor`, many C and C++ projects bundle their libraries, and large companies with a [[Monorepo]] often vendor everything third-party into it as a matter of policy.

Benefits:

- **Builds that can't be broken from outside.** A registry outage, a deleted package, or a package replaced with a different version can't affect a vendored build. The 2016 left-pad incident, which broke thousands of builds when a tiny package was unpublished, didn't touch projects that had vendored it.
- **Reproducibility.** Every input is in [[Version Control]], so a checkout from years ago still builds, a property a [[Reproducible Build]] depends on.
- **Visibility.** Every line of third-party code shows up in diffs when dependencies change, so upgrades can be reviewed like any other change.
- **Local patches.** A bug in a dependency can be fixed immediately in the vendored copy without waiting for upstream.

Costs:

- **Repository size.** Dependencies can outweigh the project's own code many times over, slowing clones and cluttering searches.
- **Updates are manual.** Nothing pulls in security fixes automatically, so vendored code can quietly fall years behind. A known vulnerability may sit in a vendored copy long after the upstream fix.
- **Patch drift.** Local modifications make the next upgrade a [[Merge Conflict]] between your changes and upstream's, and unrecorded patches are easily lost.
- **Noise in review.** Large vendored updates bury meaningful changes in a [[Pull Request]].

Vendoring sits at one end of a spectrum. A [[Lockfile]] pins exact versions but still downloads them, protecting against unexpected upgrades but not against disappearing packages. Private registry mirrors cache dependencies within an organization, guarding against outages without bloating the repository. Vendoring offers the most control at the highest maintenance cost. Many teams choose a mirror plus a lockfile and vendor only code they need to patch.

Whatever the approach, the goal is the same: knowing exactly what third-party code runs and where it came from, a core concern of [[Supply Chain Security]]. A vendored copy should still be recorded in a [[Software Bill of Materials]], since copying code in doesn't remove its vulnerabilities or its license obligations, which matter especially for [[Copyleft]] code. Vendoring is one answer to [[Dependency Hell]], but it relocates the work of tracking upstream changes rather than eliminating it.

## See also
- [[Left-Pad Incident]]
- [[Git LFS]]
- [[Protestware]]
- [[Git Submodule]]
- [[Dynamic Linking]]
