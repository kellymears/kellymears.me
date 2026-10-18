---
aliases:
  - Artifact registry
  - Package registry
  - Container registry
  - Build artifact
  - Artifact promotion
tags:
  - delivery
summary: The store for the built outputs of software, such as packages, container images, and binaries, so the exact thing that was tested is the exact thing that ships.
---
An **artifact repository** stores the built outputs of software: compiled binaries, library packages, container images, mobile app bundles, and static site builds. Source code lives in [[Version Control]]; what gets built from it lives here, versioned and addressable, ready to deploy or install.

The distinction matters because building is not free and not always repeatable. If every deploy rebuilt from source, the result could differ from what was tested, because a dependency updated, a compiler changed, or the build environment drifted. The principle of *build once, deploy many* says to build each version a single time, store the result, and move that same artifact through every stage. The thing that passed the tests in staging is byte for byte the thing that runs in production. A [[Reproducible Build]] makes rebuilding safe in principle; an artifact repository makes it unnecessary.

Registries come in a few kinds:

- **Public package registries**, such as npm, PyPI, crates.io, and Maven Central, which a [[Package Manager]] installs from.
- **Container registries**, which store images as layers identified by content hash. An image can be referenced by a movable tag like `latest` or by its digest, which never changes, a distinction that matters for [[Immutable Infrastructure]].
- **Private and proxy registries**, which hold a company's internal packages and cache public ones. A proxy keeps builds working when the public registry is slow or down, and records exactly what was fetched.

**Artifact promotion** moves a build between stages by changing its status or copying it between repositories: from a development repository, to staging, to a release repository. The [[Deployment Pipeline]] promotes only artifacts that passed each gate, so production can pull only from the release repository. Promotion records also show which builds reached which environment, and [[Rollback]] becomes a matter of redeploying a previous artifact that is still stored.

Registries are a frequent target of attacks, which makes them central to [[Supply Chain Security]]:

- **Typosquatting** publishes malicious packages under names close to popular ones.
- **Dependency confusion** publishes a public package with the same name as a private one, at a higher version, hoping a misconfigured install will prefer it.
- **Account takeover** of a maintainer pushes a malicious version of a real package.

Defenses include signing artifacts, attaching build provenance and a [[Software Bill of Materials]] to each one, pinning dependencies by hash in a [[Lockfile]], and scoping private package names so they can't collide with public ones.

Storage grows quickly, since every build of every branch produces artifacts. Retention policies delete old snapshots while keeping anything released, much as [[Garbage Collection]] keeps only what is still referenced.

## See also
- [[Containerization]]
- [[Vendoring]]
- [[Twelve-Factor App]]
- [[Content Delivery Network]]
