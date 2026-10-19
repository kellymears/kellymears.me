---
aliases:
  - Alpha release
  - Early access
  - Perpetual beta
tags:
  - delivery
summary: The stages software passes through on the way to and after release, from internal alpha through public beta and release candidate to general availability, maintenance, and end of life, each with its own expectations of stability.
---
**The software release life cycle** describes the stages a version of software goes through, from early internal builds to general release and eventually retirement. The stage names signal how stable and complete the software is, and what users should expect.

The traditional sequence:

- **Pre-alpha** covers everything before formal testing: design, prototypes, and work in progress.
- **Alpha** is the first testable version, usually used internally. Features may be missing and bugs expected.
- **Beta** is feature-complete, or close to it, and opened to a wider group of testers outside the core team to find bugs and gather feedback; see [[Dogfooding]].
- **Release candidate** is a version that will ship unless serious problems turn up; see [[Release Candidate]].
- **General availability** is the official release. In the days of physical media, the equivalent milestone was release to manufacturing, when the final version went for duplication.

The names come from Greek letters, alpha and beta, and were in use at IBM by the 1950s and 1960s for stages of testing. They spread widely with personal computer software.

After release, the cycle continues. Bug fixes and security patches arrive in maintenance releases; see [[Hotfix]]. Some versions are designated for extended support; see [[Long-Term Support]]. Eventually a version reaches end of life, when its makers stop providing fixes, and users must move on; see [[Deprecation]].

Several practices have blurred these stages:

- **Perpetual beta.** Web services can update continuously, so some kept the beta label for years. Gmail famously did from 2004 to 2009.
- **Early access.** Games and other software increasingly sell unfinished versions to customers who accept rough edges in exchange for early play and influence on development. Steam launched an early access program in 2013.
- **Release channels.** Many projects publish several streams at once, such as nightly, beta, and stable, each moving forward on a schedule; see [[Release Train]] and [[Nightly Build]].
- **Gradual rollout.** Instead of one release moment, changes reach a growing share of users, with switches to turn features off; see [[Canary Release]] and [[Feature Flag]].

Version numbers often encode the stage. Semantic versioning, for instance, allows pre-release labels such as alpha and beta appended to a version, which sort before the final release; see [[Semantic Versioning]]. Package registries treat these differently from stable releases, so ordinary users don't install them by accident. Releases found to be broken after publication can be withdrawn; see [[Yanked Release]].

The stages also help teams decide when to stop adding features and focus on stability; see [[Code Freeze]]. Whatever names a team uses, the underlying question is the same: who should run this version, and what promises come with it?

## See also
- [[Waterfall Model]]
- [[Definition of Done]]
- [[Spiral Model]]
