---
aliases:
  - Unpublish
  - Retracted version
tags:
  - delivery
summary: Marking a published package version as one that should no longer be chosen, without deleting it, so existing builds keep working while new installs avoid it, the compromise registries reached after deletion proved too destructive.
---
A **yanked release** is a package version its maintainers have withdrawn from normal use without deleting it. Package managers stop selecting it for new installs, but anything that already pinned that exact version can still download it. Yanking is how a registry lets maintainers take back a broken or dangerous release without breaking every build that depends on it; see [[Package registry]].

The distinction matters because deletion is destructive. In March 2016, a developer unpublished all their packages from npm, including an eleven-line one called left-pad. Thousands of projects depended on it indirectly, and their builds failed across the industry within hours; see [[Left-Pad Incident]]. npm then restricted unpublishing: it is allowed only shortly after publishing and when nothing depends on the package. Maintainers who want to warn people off an old version mark it deprecated instead, which prints a warning but still installs; see [[Deprecation]].

Other ecosystems built yanking in from the start or added it later:

- **Rust's crates.io.** A yanked version is ignored when resolving new dependencies, but a project whose [[Lockfile]] already names it still builds. Yanks can be undone.
- **Python's package index.** Since 2019, a yanked file is skipped by installers unless a requirement pins that exact version.
- **Go modules.** A module's author can publish a retraction listing bad versions. The public module proxy caches versions permanently, so nothing can really be deleted, and the retraction appears as a warning.

Two rules usually come with yanking. A version number, once published, is never reused, even after a yank, so a version always refers to the same content; see [[Immutability]] and [[Semantic Versioning]]. And a yank doesn't remove the version from machines that already have it, so a release that leaked a secret or contained malicious code needs more than a yank: the secret must be revoked, and security advisories must tell people to upgrade; see [[Secret Management]].

When to yank is a judgment call:

- **Yank** a release that is broken on install, has a severe security flaw, or broke compatibility by accident in what should have been a minor version; see [[Breaking change]] and [[Hyrum's Law]].
- **Don't yank** merely to discourage use of an old but working version, since that strands users who pinned it for good reasons.

Malicious packages are a separate case. Registries remove them outright, because keeping compromised code installable is worse than breaking builds; see [[Event-stream Incident]] and [[Typosquatting]].

The fix for a bad release is nearly always a new release with a higher number, published right after the yank, so that users who update move past the bad version; see [[Rollback]] and [[Reproducible Build]].

## See also
- [[Dependency Hell]]
- [[Software Bill of Materials]]
