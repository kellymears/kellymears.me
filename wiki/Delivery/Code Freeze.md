---
aliases:
  - Feature freeze
  - Change freeze
  - Deployment freeze
  - Release freeze
tags:
  - delivery
summary: A period when changes to a codebase or production system are restricted, used to stabilize a release or protect a critical period, with costs that grow the longer it lasts.
---
A **code freeze** is a period during which changes to a codebase or production system are restricted. It comes in a few forms:

- **Feature freeze.** No new features are merged, but bug fixes continue. Common before a release, so remaining time goes to stabilization.
- **Code freeze.** Only critical fixes are allowed, each usually needing explicit approval.
- **Deployment or change freeze.** Nothing ships to production, regardless of how ready it is, often around busy periods such as holiday shopping, year-end financial close, or major events.

Freezes are a long-standing practice in projects with scheduled releases. Python, the Linux kernel, and many other open-source projects enter a feature freeze some weeks before each release, after which only fixes are accepted.

The rationale is risk reduction. Every change carries some chance of introducing a bug, so fewer changes mean fewer new bugs while testing finishes or while the cost of an outage is unusually high. A freeze also focuses attention: with no new features arriving, people turn to fixing what's there.

Freezes have real costs, and the costs rise with the length of the freeze:

- **Work piles up.** Changes waiting behind a freeze accumulate, and when it lifts, they all land at once, which is exactly the large, risky batch the freeze was meant to avoid. Incident rates often spike just after a freeze ends.
- **Branches diverge.** Work continues on branches that drift from the frozen line, leading to painful [[Merge Conflict]] resolution later.
- **Urgent fixes get harder.** If a security issue appears during a deployment freeze, teams must choose between breaking the freeze and leaving it unpatched.
- **Skills atrophy.** Teams that deploy rarely are less practiced at deploying, so freezes can make each release riskier, not safer.

Continuous delivery practitioners argue that the need for a freeze is itself a warning sign. If every change is small, tested in [[Continuous Integration]], deployed through a [[Deployment Pipeline]], released gradually with a [[Canary Release]], and quickly reversible with a [[Rollback]], the risk a freeze guards against is already low. The [[DORA Metrics]] research found that teams deploying more often also had lower failure rates and faster recovery, the opposite of what freeze logic suggests.

In practice, many organizations keep short, targeted freezes for genuinely high-stakes moments while otherwise shipping continuously. Alternatives soften the trade-off: a [[Feature Flag]] lets code deploy while the feature stays off, a release branch freezes one line while the main branch keeps moving, as in a [[Release Train]], and [[Trunk-Based Development]] keeps branches short so the post-freeze merge is small. An [[Error budget|error budget]] gives a more principled trigger: slow down when reliability is actually suffering, not because of the calendar.

## See also
- [[Release Train]]
- [[Continuous Deployment]]
- [[Rollback]]
- [[DORA Metrics]]
- [[Release Candidate]]
