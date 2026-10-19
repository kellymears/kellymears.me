---
aliases:
  - One-way door
  - Two-way door
tags:
  - method
summary: Sorting decisions by whether they can be undone, so that easily reversed choices are made quickly by the people closest to them and irreversible ones get slow, careful deliberation, plus the engineering habit of making more decisions reversible.
---
A **reversible decision** is one whose effects can be undone at reasonable cost if it turns out wrong. Distinguishing reversible from irreversible choices is one of the most useful ways to decide how much care a decision deserves.

The framing was popularized by Jeff Bezos in his 2015 letter to Amazon shareholders, which called them Type 1 and Type 2 decisions. Irreversible, high-stakes choices are **one-way doors**: once through, you can't come back, so they deserve slow, deliberate analysis. Most decisions are **two-way doors**: if you don't like what's on the other side, you walk back. These should be made fast, by small groups or individuals close to the problem. The danger he identified was organizations using the heavy process for everything as they grow, becoming slow and timid.

The asymmetry has a simple logic. For a reversible decision, the cost of being wrong is the cost of undoing it plus a little lost time; spending weeks to be more certain often costs more than an occasional reversal; see [[Opportunity Cost]] and [[Satisficing]]. For an irreversible decision, the cost of being wrong has no ceiling, so caution pays; see [[Margin of Safety]]. Getting the classification wrong fails both ways: deliberating endlessly over trivial choices, or rushing one that can't be taken back.

Typical one-way doors include deleting data without backups, public announcements, firing someone, signing long contracts, choosing a database or public API that others will build on, and anything involving safety or trust. Typical two-way doors include most interface changes, internal tools, pricing experiments, and the order of work on a backlog.

Much of modern software practice is about turning one-way doors into two-way ones:

- **Feature flags** let new code ship turned off and switch off instantly; see [[Feature Flag]].
- **Gradual rollout** exposes a change to a small share of users first; see [[Canary Release]].
- **Rollback** returns to the previous version when a release goes wrong; see [[Rollback]].
- **Reversible migrations** change a database schema in steps that can each be undone, rather than one destructive change; see [[Database Migration]].
- **Undo** in interfaces lets users act without fear, which is better than confirmation dialogs; see [[Undo]].
- **Small releases** of a minimal version test a direction before committing to it; see [[Minimum Viable Product]].

Reversibility also cuts against a common bias. Judging whether to continue should depend on the cost of changing course now, not on what has already been spent; see [[Sunk Cost Fallacy]].

Not everything that looks reversible is. Trust, reputation, and users' habits rebuild slowly even after a change is reverted, and data that leaked can't be recalled. Asking what can't be undone before acting is itself a kind of inversion; see [[Inversion]] and [[Pre-mortem]].

## See also
- [[OODA Loop]]
- [[Cost-Benefit Analysis]]
- [[Scenario Planning]]
