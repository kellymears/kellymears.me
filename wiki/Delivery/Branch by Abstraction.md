---
aliases:
  - Abstraction branch
tags:
  - delivery
summary: Replacing a large component on the main branch by first putting an interface in front of it, then building the new implementation behind that interface while the old one keeps working, so the change never needs a long-lived branch.
---
**Branch by abstraction** is a technique for making a large, slow change to a codebase without leaving the main branch. Instead of cutting a version-control branch that drifts for months, the team creates a "branch" inside the code itself: an abstraction that both the old and new implementations sit behind. Paul Hammant named it in 2007, and it is the standard answer to the objection that [[Trunk-Based Development]] can't handle big replacements.

The steps:

1. **Find the seam.** Identify every caller of the component being replaced. Where callers reach into it directly, the work starts by routing them through one place, with tests pinning the current behavior; see [[Characterization Test]].
2. **Introduce the abstraction.** Put an interface in front of the old component and move the callers onto it. Nothing changes in behavior, so each step can merge and ship as ordinary [[Refactoring]].
3. **Build the new implementation behind it.** The replacement grows in the same codebase, compiled and tested on every commit, but no user reaches it yet.
4. **Switch over gradually.** A [[Feature Flag]] or configuration value picks which implementation each caller, request, or customer gets, so the new one can take a small share of traffic first; see [[Canary Release]].
5. **Delete the old implementation**, and often the abstraction too, once nothing uses the old path.

Every intermediate state is releasable. That is the point: the team gets [[Continuous Integration]] in its real sense, everyone's work merged daily, while a change that takes months is underway. The alternative, a long-lived branch, accumulates a [[Merge Conflict]] with everything else on main, and the final merge becomes its own project; see [[Branching Model]].

The technique is the in-process cousin of two others. The [[Strangler Fig Pattern]] does the same thing at the level of whole systems, with a router in front of an old application rather than an interface in front of a module. [[Expand and Contract]] does it for database schemas and APIs, where old and new shapes coexist until every reader moves. All three trade a single risky cutover for a series of small, reversible steps.

The abstraction can do more than switch. Running both implementations on the same input and comparing the results, while still returning the old one, finds differences before any user sees them; see [[Shadow Traffic]].

The costs are real. For a while the code has two implementations to maintain, a flag to test both ways, and an extra layer of indirection. If the migration stalls, that layer becomes permanent [[Technical Debt]], so teams that use the technique count the removal as part of the work. It also needs some way to choose the implementation at runtime, usually [[Dependency Injection]] or a factory.

## See also
- [[Big Rewrite]]
- [[Feature Branch]]
