---
aliases:
  - Headless UI
  - Unstyled primitives
tags:
  - design
summary: A component supplying behavior and accessibility with no styling of its own.
---
A **headless component** provides the hard parts of an interactive control — keyboard handling, focus management, ARIA wiring, positioning, scroll locking — and no appearance whatsoever. The consumer supplies every pixel.

The appeal is that the difficult, easy-to-get-wrong half is shared while the differentiating half stays local. Getting a combobox's keyboard model, screen-reader semantics, and typeahead right is weeks of work and identical for everyone; its look is neither.

Choosing between libraries in this space tends to come down to the shape of their APIs rather than their feature lists. A single-value control that insists on an array type forces every consumer into an awkward unwrap. A control that exposes a "committed" event distinct from a continuous one is far easier to wire to expensive updates than one that fires on every increment. Whether the library ships any stylesheet at all determines whether adoption is a like-for-like swap or a visual migration.

The recurring hazards are portalling — see [[Portal]] — and honesty about types. A handler documented as receiving a value may genuinely receive nothing when the underlying list changes out from under the selection; typing that away rather than handling it produces a crash in a rare, real case.

## See also
- [[UI Primitive]]
- [[Accessibility]]
- [[ARIA]]
- [[Focus Management]]
- [[Keyboard Navigation]]
- [[Design System]]

## Related
- [[Semantic HTML]]
- [[Focus Trap]]
