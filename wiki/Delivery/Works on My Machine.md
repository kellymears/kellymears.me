---
aliases:
  - Dev container
  - Environment parity
tags:
  - delivery
summary: The classic developer defense for a bug nobody else can reproduce, and a symptom of environments that differ in invisible ways, addressed by pinning dependencies, containers, declarative setups, and treating CI as neutral ground.
---
**"Works on my machine"** is the phrase developers use when software behaves correctly in their own environment but fails for a colleague, a tester, a server, or a user. It's half excuse and half genuine puzzlement, and it's become a running joke in software culture, complete with mock certification badges. Behind the joke is a real problem: environments differ in ways that are hard to see.

Common culprits include:

- **Versions.** A different language runtime, compiler, library, or database version; see [[Dependency Hell]].
- **Configuration.** Environment variables, settings files, credentials, or feature switches present on one machine and not another; see [[Configuration Drift]].
- **Local state.** Leftover caches, build artifacts, databases with old data, or files that aren't tracked by version control.
- **Platform differences.** Case-insensitive file systems on one operating system, line endings, path separators; see [[Line Ending]].
- **Locale and time.** Time zones, languages, number formats, and character encodings; see [[Character Encoding]]. A test that passes in one time zone can fail in another when it assumes a date boundary.
- **Hardware and timing.** Faster or slower machines, or more processor cores, expose race conditions and timing assumptions that never show up on the developer's own computer.

The general remedy is to make environments explicit and reproducible instead of hand-assembled:

- **Lockfiles** pin exact dependency versions; see [[Lockfile]].
- **Containers** package an application with its runtime and libraries; see [[Containerization]].
- **Dev containers** define a development environment in a file kept in the repository, so editors and cloud workspaces can build the same setup for everyone.
- **Declarative tools** such as Nix describe entire environments precisely enough to rebuild them identically; see [[Reproducible Build]].
- **Infrastructure as code** keeps servers consistent; see [[Infrastructure as Code]].

The Twelve-Factor App methodology made keeping development, staging, and production as similar as possible an explicit principle; see [[Twelve-Factor App]]. Temporary preview environments, created fresh for each proposed change, narrow the gap further.

Continuous integration acts as neutral ground. If a change passes on a clean, standard build machine, "my machine" is no longer the reference; see [[Continuous Integration]]. When it fails there but not locally, the difference itself is a clue.

When a bug is reported, a reduced, self-contained reproduction helps separate the code from the environment; see [[Minimal Reproducible Example]]. Personal configuration files, shell settings, and editor plugins, carefully maintained, are part of the environment too, and the same discipline of versioning them applies; see [[Dotfiles]].

Reducing environment drift is also a matter of developer experience. New team members spend hours rather than days setting up, and fewer bugs turn out to be setup accidents; see [[Developer Experience]].

## See also
- [[Immutable Infrastructure]]
- [[Heisenbug]]
