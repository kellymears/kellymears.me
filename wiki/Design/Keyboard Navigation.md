---
aliases:
  - Keyboard access
tags:
  - design
summary: Making every interactive affordance reachable and operable without a pointer.
---
**Keyboard navigation** is the requirement that everything doable with a pointer be doable from the keyboard. It serves people who cannot use a mouse, people using screen readers, and — not incidentally — anyone who prefers to keep their hands on the keys.

The baseline is that focus order follows a sensible reading order, every interactive element is reachable by Tab, the focused element is *visibly* focused, and standard keys do standard things: Enter and Space activate, Escape dismisses, arrow keys move within a composite widget like a menu or a radio group.

That last distinction is the one most often missed. Within a composite, Tab should move to the widget and arrow keys should move inside it — a menu with ten items should not require ten tab presses to pass. Getting this right is most of what [[Headless Component]] libraries provide.

Two design notes worth holding onto. A scrollable region containing nothing focusable is unreachable by keyboard and needs to be made focusable explicitly — a real failure that is invisible until something frames the region at a height that scrolls. And custom shortcuts should be discoverable and non-conflicting; single-letter accelerators are pleasant in a focused application and hostile anywhere text can be typed.

## See also
- [[Focus Management]]
- [[Accessibility]]
- [[Semantic HTML]]
- [[Terminal User Interface]]
- [[Focus Trap]]

## Related
- [[ARIA]]
- [[Portal]]
- [[Document Object Model]]
