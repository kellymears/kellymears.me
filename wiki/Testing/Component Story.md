---
aliases:
  - Storybook
  - Story
tags:
  - testing
summary: An isolated rendered instance of a component, usable as documentation, a workbench, and a test.
---
A **component story** is a single named example of a component in a particular state, rendered in isolation. The pattern is most associated with Storybook, where stories serve three purposes at once: a development workbench, living documentation, and — when they carry an interaction script and assertions — a test.

The third use is the one that changes how a suite is structured. A story that drives real interactions in a real browser tests focus, layout, styling, and accessibility, none of which a simulated DOM can evaluate honestly. For anything visual, a story is a better test than a unit test.

Practical hazards worth knowing:

- **Portalled content is not inside the component's container**, so a query scoped to that container will not find an open menu or dialog. Query the document instead. See [[Portal]].
- **The runner has a default canvas width** that is rarely the round number you would guess, so a responsive element can be absent by default. Pin a viewport where width matters.
- **Documentation tooling can silently overwrite a spread configuration object**, dropping opt-outs — and that tooling frequently does not run under the test runner, so no assertion inside a story can ever catch it.
- **Navigating away** — clicking a real link — tears down the runner's page and silently skips the remaining files.

## See also
- [[Visual Regression Testing]]
- [[Headless Browser]]
- [[Integration Test]]
- [[Accessibility]]
- [[Reduced Motion]]
- [[Responsive Breakpoint]]
- [[Focus Management]]

## Related
- [[contenteditable]]
- [[Test Fixture]]
