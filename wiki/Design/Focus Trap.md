---
aliases:
  - Modal focus
tags:
  - design
summary: Confining keyboard focus inside a modal surface so it cannot wander behind it.
---
A **focus trap** confines keyboard navigation to a modal region: tabbing past the last focusable element wraps to the first, and nothing outside can be reached until the surface closes. Without it, keyboard and screen-reader users tab straight out of a dialog and into content that is visually covered.

A correct trap does more than cycle tab. It must also hide the rest of the document from assistive technology, or the screen reader's virtual cursor wanders behind the modal even though tabbing cannot. Whether the rest is marked hidden from the accessibility tree or made genuinely inert matters: only the latter also blocks pointer events.

**Stacked overlays** are where traps get genuinely hard. When a second dismissable surface opens over a first, a single Escape reaches both handlers — the outer one, registered first, closes first, collapsing everything and stranding return focus on an element that no longer exists. The clean pattern is for the topmost surface to opt into claiming the event in the capture phase and mark it handled, with lower surfaces skipping anything already handled. Making capture the *default* breaks a different contract, where a child field legitimately swallows Escape before its container sees it.

Layering compounds this: a backdrop that does not establish a real layer leaves lower surfaces clickable, so focus escapes physically even when the trap is logically correct. See [[Stacking Context]].

## See also
- [[Focus Management]]
- [[Portal]]
- [[ARIA]]
- [[Keyboard Navigation]]

## Related
- [[Headless Component]]
- [[Accessibility]]
- [[Semantic HTML]]
- [[Document Object Model]]
