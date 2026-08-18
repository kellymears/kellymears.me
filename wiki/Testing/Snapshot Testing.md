---
aliases:
  - Snapshot Test
tags:
  - testing
summary: Comparing a component or output's current rendering against a saved baseline, flagging any difference for a human to accept or reject.
---
**Snapshot testing** captures a rendered output — a React component's serialized DOM tree, a CLI's stdout, a data structure's JSON form — and saves it as a baseline file the first time a test runs. Every subsequent run re-renders the same input and diffs the fresh output against the saved snapshot; a mismatch fails the test and shows the diff, and a human decides whether the change is an intended update (and re-saves the snapshot) or a regression (and fixes the code instead). Jest popularized the pattern for React components, though the technique generalizes to anything with a serializable, deterministic output.

The appeal is coverage-per-effort: one snapshot test captures an entire render tree's worth of assertions without anyone writing them by hand, which is exactly what makes the pattern risky as well as cheap. A change to shared markup can invalidate dozens of snapshots at once, and the fastest way through a wall of failing snapshots is often to blindly re-approve all of them — at which point the test suite has stopped checking anything, since "current output matches saved output" degenerates to "current output matches whatever was last blindly approved." This is the same failure [[Golden File Testing]] risks, and for the same reason: an assertion that a human can approve without reading is an assertion that eventually gets approved without reading.

Snapshot testing works best on structurally stable output where a diff is easy to read and rare enough that each one gets real attention — a component's markup shape, a config file's generated form — and works worst on output that changes often for unrelated reasons, like a full DOM tree with volatile whitespace or generated ids, where noise drowns the signal. The mitigation most teams converge on is scoping snapshots narrowly (a component's props-driven output, not a whole page) and treating every snapshot update as a diff worth actually reading in code review, not a checkbox to wave through.

## See also
- [[Golden File Testing]]
- [[Component Story]]
- [[Visual Regression Testing]]
- [[Assertion]]
