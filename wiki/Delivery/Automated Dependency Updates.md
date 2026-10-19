---
aliases:
  - Dependabot
  - Renovate
  - Dependency bot
  - Dependency updates
tags:
  - delivery
summary: Bots that open pull requests whenever a dependency releases a new version, how they keep upgrades small and security patches fast, and how they turn into noise or a supply-chain risk when misconfigured.
---
**Automated dependency updates** are tools that watch a project's dependencies and open a [[Pull Request]] whenever a new version is released. Each request bumps the version in the manifest and [[Lockfile]], links the release notes, and lets [[Continuous Integration]] show whether anything broke. Dependabot, founded in 2017 and acquired by GitHub in 2019, and Renovate, started the same year, are the best known.

The core idea is that upgrades are cheaper in small, frequent steps. A project that ignores updates for two years faces a single enormous upgrade, with breaking changes stacked on breaking changes and no idea which one caused a failure. That backlog is a form of [[Technical Debt]], and it can end in [[Dependency Hell]]. A bot that proposes each version as it ships keeps every step small and attributable.

The bots usually serve two purposes:

- **Security updates.** When a vulnerability is published for a dependency in use, the bot opens a request to the fixed version. When the Log4Shell vulnerability hit Java logging in December 2021, teams with automated updates and good test coverage patched in hours rather than weeks. A [[Software Bill of Materials]] serves the same need for shipped artifacts.
- **Version updates.** Routine upgrades to keep current, which make security updates easier when they come, since the gap to the fixed version is small.

Configuration determines whether the bot helps or hinders:

- **Grouping.** One request per package per release floods a repository. Grouping related packages, or all minor updates for the week, keeps the volume reviewable.
- **Scheduling.** Updates batched weekly are easier to absorb than a constant stream.
- **Automerge.** Patch and minor updates that pass all checks can merge automatically, trusting [[Semantic Versioning]]. That trust is only as good as the test suite, and [[Hyrum's Law]] guarantees some "compatible" releases will break someone.
- **Ownership.** Routing requests to the team that owns each part of the codebase, via [[Code Owners]], keeps them from going stale.

Unreviewed bot requests are a familiar failure. Dozens pile up, nobody merges them, and the team learns to ignore the notifications, a case of the alarm fatigue covered under [[Habituation]]. The bot then provides only the illusion of maintenance.

Automation also creates a [[Supply Chain Security]] risk. If an attacker publishes a malicious version of a popular package, a bot that automerges within minutes installs it everywhere. Several attacks have spread this way. A common defense is a cooling-off period, waiting days after a release before proposing it, so compromised versions are caught and pulled before they arrive.

Projects that need stability over currency often pair the bots with a [[Long-Term Support]] line of a dependency, receiving only security fixes. Reading the linked [[Changelog]] remains the reviewer's job; the bot can show what changed, not whether it matters.

## See also
- [[Software Rot]]
- [[License Compatibility]]
