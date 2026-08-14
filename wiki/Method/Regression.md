---
aliases:
  - Regressed
tags:
  - method
summary: A previously working behavior that a change has broken.
---
A **regression** is a behavior that used to work and no longer does. The word carries an implicit accusation — something *we* changed caused this — which makes it the most useful and most misapplied label in a bug tracker.

Distinguishing a real regression from its impostors is most of the skill. An intermittent failure that clears on rerun is a [[Flaky Test]]. A failure that appears only on one machine is usually environmental — a different port, a different model tier, a different disk. A failure in a file the change never touched may be a [[Semantic Conflict]] with someone else's change, invisible to both diffs. Treating any of these as a regression sends you looking for a defect that is not there.

The tool that separates them is bisection: find the first revision at which the behavior differs. It converts an argument into an interval. Bisection depends on each revision being independently sound, which is one of the arguments for the [[Atomic Commit]].

Guarding against regressions is what a test suite is *for*, and the guard only exists if it has been seen to fail — see [[Falsifiability]]. A subtler case: a change can delete the only assertion that covered a property without deleting any code, so the property silently stops being checked. Nothing goes red; the net simply has a hole.

## See also
- [[Reproducible Case]]
- [[Code Coverage]]
- [[Version Control]]
- [[Root Cause Analysis]]
- [[Visual Regression Testing]]
