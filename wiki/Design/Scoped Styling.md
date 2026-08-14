---
aliases:
  - Style scoping
  - Theme scope
tags:
  - design
summary: Confining a set of style decisions to a subtree so the same component can look different in different contexts.
---
**Scoped styling** confines a set of design decisions to a region of the document — typically by declaring [[CSS Custom Property]] values under an attribute selector, so any element inside that region resolves tokens differently from elements outside it.

It is what makes one component library serve two visual languages at once: an editing interface with its own chrome tokens rendered around content styled by a tenant's own tokens, or a dark toolbar floating over a light page.

The rules that make it work are unforgiving. **A utility that references a scoped token must itself be inside the scope.** Putting the scope marker on an inner element while the outer element carries the tokenized utilities produces an outer element whose radius, shadow, and color resolve to nothing — and it fails silently, in ways a pixel comparison hides in the antialiasing. **Portalled content leaves the scope**, so an overlay rendered at the document body must re-declare the marker itself. And **the theme mapping must substitute at point of use**, or the token resolves at the root where the scope does not exist.

The corresponding test discipline is to assert *computed* values — the actual resolved radius and color — not merely that a class is present. A class that resolves to nothing is present.

## See also
- [[CSS Custom Property]]
- [[Design Token]]
- [[Portal]]
- [[Dark Mode]]
- [[Silent Failure]]
- [[Utility-First CSS]]
- [[Cascade]]

## Related
- [[Root Cause Analysis]]
- [[OKLCH]]
