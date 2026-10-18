---
aliases:
  - CODEOWNERS
  - Code ownership
  - Ownership file
tags:
  - delivery
summary: A file that maps parts of a repository to the people or teams responsible for them, so the right reviewers are requested automatically and every path has someone accountable.
---
**Code owners** are the people or teams responsible for specific parts of a codebase. Most hosting platforms support a file, usually named `CODEOWNERS`, that maps file paths to owners using [[Glob]] patterns. When a [[Pull Request]] touches files matching a pattern, the listed owners are automatically requested as reviewers, and branch rules can require their approval before merging.

A simple file might look like this, with later rules taking precedence over earlier ones:

- `*` owned by a core maintainers team, as the default.
- `/docs/` owned by the documentation team.
- `/src/payments/` owned by the payments team.
- `*.sql` owned by the database team.

The mechanism solves several problems at once:

- **Finding the right reviewer.** In a large repository, especially a [[Monorepo]], authors often don't know who understands a given directory. Ownership makes that explicit and automatic.
- **Accountability.** Every path has someone responsible for its quality, its dependencies, and its alerts. Code nobody owns tends to decay, since no one feels entitled to fix it or obliged to.
- **Guarding sensitive areas.** Security-critical code, build configuration, and deployment files can require approval from specific experts. Owning the ownership file itself prevents anyone from quietly removing a requirement.

Ownership has trade-offs. Required approvals from busy teams slow changes down, and a change that touches many directories may need sign-off from many owners, which encourages people to avoid cross-cutting improvements. Strong ownership can also harden into territory, where teams resist changes from outsiders, the opposite of collective ownership practices that let anyone improve any code. Many organizations land in between: owners are consulted and must approve, but anyone may propose changes.

Ownership files also go stale. Teams reorganize and people leave, and an ownership file listing departed engineers or dissolved teams routes reviews into a void. Keeping it accurate is a small ongoing chore, a form of [[Documentation Rot]] prevention, and some teams check it automatically, for example by verifying that every listed owner still exists.

Ownership data is useful beyond reviews. It tells an [[Incident Response]] process whom to page when a component fails, shows which teams carry the most code relative to their size, and exposes paths owned by a single person, a [[Bus Factor]] risk. Ownership boundaries also tend to mirror team boundaries, an instance of [[Conway's Law]], so restructuring one usually means restructuring the other.

Owners do not replace good review practice. A required approval is only as meaningful as the attention behind it, and rubber-stamped approvals give the appearance of oversight without the substance; see [[Code Review]]. Ownership works best paired with automated checks in [[Continuous Integration]], so reviewers can focus on design and intent rather than style.

## See also
- [[Developer Certificate of Origin]]
- [[Inner Source]]
- [[Team Topologies]]
- [[Benevolent Dictator for Life]]
- [[Branch Protection]]
- [[Bug Triage]]
