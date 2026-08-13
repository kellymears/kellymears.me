---
aliases:
  - Pixel diffing
  - Screenshot testing
  - Snapshot testing
tags:
  - testing
summary: Comparing rendered output against a stored baseline to catch unintended visual change.
---
**Visual regression testing** captures a rendering — usually a screenshot, sometimes a serialised tree — and compares it against a stored baseline, failing on difference. It catches the large class of visual defects that no assertion describes, and it is the only practical way to verify a refactor that is supposed to change nothing visible.

Snapshot testing of serialised output is the same idea in text form, and shares the same weakness: a snapshot records what the code *did*, not what it *should do*, so a wrong output is happily enshrined by an unthinking update. Reviewing the diff rather than blessing it is the entire discipline.

For pixel comparison the practical problems are all about determinism. Fonts must be loaded, animation disabled, device pixel ratio fixed, and remote images avoided — any of which will otherwise produce differences unrelated to the change. A useful sanity check is to capture the same code twice and confirm the difference is zero; if it is not, the harness is not measuring the code.

Two traps recur. A static server that rewrites URLs can silently serve an error page for every capture, producing a baseline of identically-sized images that look fine in aggregate — check that file sizes vary. And a wrapper applied to some renders and not others produces an offset that fails everything for one reason.

## See also
- [[Component Story]]
- [[Headless Browser]]
- [[Determinism]]
- [[Regression]]
- [[Responsive Breakpoint]]
- [[Test Fixture]]
- [[Stacking Context]]

## Related
- [[Integration Test]]
- [[Reproducible Case]]
