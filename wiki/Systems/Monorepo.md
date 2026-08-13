---
aliases:
  - Workspaces
  - Monorepository
tags:
  - systems
summary: Several packages developed in one repository with shared tooling and atomic cross-package changes.
---
A **monorepo** holds multiple packages in one repository. The alternative — one repository per package — is often called polyrepo.

The decisive advantage is the **atomic cross-cutting change**: modifying a shared library and every consumer in a single commit, reviewed together and validated together. In separate repositories the same change is a publish, a version bump, and a coordination problem, during which the two sides are inconsistent.

The costs scale with size. Tooling must understand the package graph to avoid rebuilding and retesting everything on every change. Checkouts get large. Ownership needs to be expressed explicitly, since directory structure no longer implies it.

Package managers support the pattern through *workspaces*: a root manifest listing member packages, dependencies between them resolved locally rather than fetched. Two details follow. Dependency-update tooling generally scans the root and traverses the workspace list, so configuring it to scan each package directory as well produces duplicate proposals that all rewrite the same lockfile and conflict with each other. And the on-disk layout of installed packages depends on the linker strategy, so reading a version from a directory may find nothing; the [[Lockfile]] is the answer.

## See also
- [[Package Manager]]
- [[Lockfile]]
- [[Module Graph]]
- [[Version Control]]

## Related
- [[Supply Chain Security]]
- [[Semantic Versioning]]
- [[Bundler]]
- [[Silent Failure]]
