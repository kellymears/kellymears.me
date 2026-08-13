---
aliases:
  - Primitives
  - Box component
tags:
  - design
summary: The small set of typed components through which all interface markup is expressed.
---
A **UI primitive** is a low-level component that owns a category of markup and styling on behalf of everything above it — commonly a generic box, a text element, and a heading element, each rendering a configurable tag and accepting design decisions as typed properties rather than as free-form styling.

The rationale is boundary control. If raw elements with arbitrary styling are allowed anywhere in application code, every file is a place where the [[Design System]] can be bypassed. If they exist only inside the primitives, the system's coverage is enforceable by a rule that inspects markup rather than by review.

The consequence is that the primitives must grow. When a component needs a capability the primitives cannot express, the choice is to extend the primitive or to smuggle. Extending is more work and it is the point — the new capability becomes available, named, and reusable rather than local and invisible. This applies all the way down: even a small focused component should be built from the primitives, not from raw markup, or the exception becomes the precedent.

Growth has a cost worth planning for. A primitive that accumulates properties from several directions at once becomes a merge hotspot, and its property list is best kept in a predictable order so parallel additions combine cleanly.

## See also
- [[Design System]]
- [[Headless Component]]
- [[Utility-First CSS]]
- [[Semantic HTML]]
- [[Container Query]]

## Related
- [[Keyboard Navigation]]
- [[Design Token]]
- [[Accessibility]]
- [[ARIA]]
