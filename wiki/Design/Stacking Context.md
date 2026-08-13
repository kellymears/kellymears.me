---
aliases:
  - z-index
  - Layering
tags:
  - design
summary: The nested coordinate system that decides what paints above what, and why z-index often does nothing.
---
A **stacking context** is a region of the document within which elements are layered relative to one another. Contexts nest, and a child can never escape its parent's position in the ordering — which is why an element with an enormous z-index can still render beneath something with a small one.

Contexts are created by more things than most people expect: any positioned element with a z-index, but also opacity below one, transforms, filters, `will-change`, and several others. A transform added for an animation can therefore change layering with no styling change at all.

The practical discipline is to treat layering as a system rather than a per-component decision: a small set of named tiers (content, raised, scrim, overlay, bar, sheet) with numbers assigned once. Ad-hoc values escalate the same way specificity does.

Overlays are where this bites hardest, and the questions are specific. Does this overlay cover the whole viewport, or is it inset below persistent chrome? If it covers, it must out-layer that chrome or its own header renders occluded. Does the library's backdrop establish a tier, or is it transparent to layering — leaving anything beneath it still clickable, so clicks land, focus escapes, and dismissal routes to the wrong surface?

Occlusion is nearly invisible to component tests: role queries and accessibility checks still pass. Hit-testing catches it; so does looking.

## See also
- [[Portal]]
- [[Focus Trap]]
- [[Motion Design]]
- [[Visual Regression Testing]]

## Related
- [[Focus Management]]
- [[Component Story]]
- [[ARIA]]
- [[Keyboard Navigation]]
- [[Headless Component]]
- [[Document Object Model]]
