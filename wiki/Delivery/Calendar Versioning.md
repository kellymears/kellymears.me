---
aliases:
  - CalVer
  - Date-based versioning
tags:
  - delivery
summary: Version numbers built from the release date, like Ubuntu 24.04, which tell users how old a release is but nothing about whether it breaks compatibility.
---
**Calendar versioning (CalVer)** builds version numbers from the release date rather than from the nature of the changes. Ubuntu 24.04 was released in April 2024. JetBrains IDEs are numbered 2024.1, 2024.2, and so on. Python's pip uses a two-digit year and a release counter. The name and a set of conventions were documented at calver.org in 2016, but projects had used dates for decades.

CalVer is less a single format than a family. Common pieces include:

- **YYYY or YY.** The full or short year.
- **MM.** The month, sometimes zero-padded.
- **MICRO.** A counter for multiple releases in the same period, or for patches.

Ubuntu uses YY.MM, Unity used YYYY.N, and Windows 10 used year-and-half labels like 21H2.

It contrasts with [[Semantic Versioning]], which encodes compatibility: a major version change means breaking changes, a minor version means new features, a patch means fixes. SemVer answers "is it safe to upgrade?" CalVer answers "how old is this?"

CalVer suits some projects better:

- **Time-based releases.** Projects on a [[Release Train]], releasing on a fixed schedule regardless of content, have no natural reason for a major or minor bump. The date is the most honest identifier.
- **Support windows.** When support is promised for a period of time, as in a [[Long-Term Support]] line, the version shows at a glance how long a release has left. Ubuntu's even-year April releases are its LTS versions.
- **Applications rather than libraries.** End users of an IDE or operating system care more about recency than about API compatibility, which matters mainly to code that depends on a library.
- **Projects where everything breaks something.** Large projects with many interfaces find that nearly every release breaks something for someone, an effect described by [[Hyrum's Law]], so a semantic major version would increment constantly and mean little.

The weaknesses mirror the strengths. A CalVer number says nothing about compatibility, so dependents cannot write meaningful version ranges and must read the [[Changelog]] for every upgrade. That makes it a poor fit for libraries consumed by a [[Package Manager]], where version ranges are how [[Dependency Hell]] is kept manageable. Projects using CalVer for libraries often supplement it with explicit [[Deprecation]] policies, promising that anything removed was first deprecated for a set number of releases.

Version numbers also carry marketing weight. A jump from version 3 to 4 implies a big change, whether or not there is one, while a date implies only that time has passed. Some projects adopt CalVer partly to escape the expectations attached to major versions.

Whatever the scheme, the goal is the same: a version number that answers the question its users most often ask. For libraries that question is usually compatibility; for applications it is usually age.

## See also
- [[Semantic Versioning]]
- [[Release Train]]
- [[Long-Term Support]]
- [[Backward Compatibility]]
