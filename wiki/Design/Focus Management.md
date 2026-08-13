---
aliases:
  - Focus
  - Return focus
tags:
  - design
summary: Deliberately controlling which element receives keyboard focus as an interface changes.
---
**Focus management** is the deliberate control of what has keyboard focus as the interface changes. For anyone navigating by keyboard or screen reader, focus *is* their position in the page — losing it means losing their place entirely, usually back at the top.

The obligations are straightforward to state. Opening an overlay moves focus into it. Closing it returns focus to whatever opened it. Removing the focused element moves focus somewhere sensible rather than letting it fall to the document body. Navigating to a new view announces and focuses the new content.

Return-focus is where implementations usually break, and the cause is subtle: capturing the currently focused element on open is not enough if the opener is *unmounted* while the overlay is showing. The captured node is detached by the time you try to restore, and focusing a detached node silently does nothing. The fix is an explicit reference to the *remounted* opener rather than a captured node.

A companion bug: a return-focus effect that also fires on first mount, with nothing having been opened, steals focus on every page load. Guarding on "has actually opened once" is the fix, and the case worth testing explicitly.

Component tests can catch a lot of this, provided the test harness reproduces the real structure — a demo whose opener stays mounted will pass while the real application is broken.

## See also
- [[Focus Trap]]
- [[Keyboard Navigation]]
- [[Accessibility]]
- [[Component Story]]
- [[Portal]]
- [[Document Object Model]]
- [[Headless Component]]
- [[contenteditable]]

## Related
- [[ARIA]]
- [[Semantic HTML]]
