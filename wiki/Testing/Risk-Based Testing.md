---
aliases:
  - Test prioritization
  - Risk matrix
  - Risk-based test planning
tags:
  - testing
summary: Deciding where to spend testing effort by weighing how likely each part of a system is to fail against how much a failure there would hurt.
---
**Risk-based testing** allocates testing effort in proportion to risk, rather than evenly. Testing is never complete, since even small programs have more paths and inputs than any suite can cover, so every team is already choosing what to test. Risk-based testing makes that choice explicit.

Risk has two factors:

- **Likelihood**: how probable a defect is. New code, complex code, code that changes often, code written under deadline, and code with a history of bugs all score high. Integration points with other systems are perennial trouble.
- **Impact**: how much a failure costs. Payments, authentication, data integrity, safety, legal compliance, and anything on the main path every user walks score high. A misaligned icon in a settings page scores low.

Teams often place features on a simple *risk matrix*, likelihood on one axis and impact on the other, and test the top-right corner hardest. High-risk areas get several techniques layered together: thorough unit and [[Integration Test|integration tests]], [[Property-Based Testing]], fuzzing, review by a second person, and [[Exploratory Testing]] sessions. Low-risk areas might get a smoke test and nothing else.

Likelihood can be estimated from evidence rather than gut feeling. Version control history shows which files change most and which changes most often get fixed afterward. Code that is both complex and frequently changed, a *hotspot*, is where defects cluster. [[Bug Triage]] records show which areas keep producing severe bugs, and [[Crash Reporting]] shows which ones fail in the field. These signals tend to follow a skewed distribution, with a small share of files producing most defects, so even rough data sharpens priorities.

Risk-based thinking also explains why uniform targets mislead. A [[Coverage Gate]] demanding 80 percent everywhere spends effort on trivial getters as eagerly as on billing logic, and turns coverage into a number to hit, a case of [[Goodhart's Law]]. Measuring code coverage per risk area, or using [[Mutation Testing]] on the critical modules only, puts the rigor where it pays.

The same lens applies at release time. [[Test Impact Analysis]] selects tests by what a change touched; risk-based ordering runs the tests guarding high-impact paths first, so the most important failures surface soonest. Release strategies trade testing for controlled exposure: a canary release limits impact when likelihood can't be driven lower before shipping.

The weakness is that risk assessment is a judgment, and judgments carry bias. Teams overweight risks that bit them recently, an [[Availability Heuristic]], and underweight unfamiliar failure modes. Revisiting the assessment after incidents, as part of a [[Blameless Postmortem]], keeps it tied to what actually went wrong.

## See also
- [[Threat Modeling]]
- [[Pairwise Testing]]
- [[Galaxy Note 7 Recall]]
- [[Spiral Model]]
