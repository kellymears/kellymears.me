---
aliases:
  - Browser automation
  - Playwright
tags:
  - testing
summary: A real browser driven programmatically without a visible window.
---
A **headless browser** is a full browser engine controlled by a script rather than a person, with rendering happening off-screen. It is what makes it possible to test the things only a browser knows: layout, styling, focus, scrolling, and actual paint.

The essential distinction is between a headless *browser* and a simulated DOM. A simulated environment is fast and cannot evaluate layout, cascade, or focus, so tests that appear to check visual behaviour there are checking a model of it. When the question is visual or interactive, only a real engine answers it.

Automation has its own reliability discipline. **Set the viewport explicitly** — defaults are much narrower than real monitors, and layouts that overflow at desktop width look perfectly centred at the default. **Wait on conditions**, not durations. **Load fonts and disable animation** before capturing anything.

Two limits are worth knowing in advance. Synthetic events are not real user input: they do not feed the browser's native undo stack, and code gated on a genuine gesture will not run. And headless can differ from headed in real ways — a component that renders correctly in a headless capture and blank in a real browser is a genuine and well-documented category of bug, so a headless screenshot is not proof.

## See also
- [[Component Story]]
- [[Visual Regression Testing]]
- [[contenteditable]]
- [[Responsive Breakpoint]]
- [[Integration Test]]

## Related
- [[Unit Test]]
- [[Test Fixture]]
- [[Focus Management]]
- [[Test Double]]
- [[Stacking Context]]
