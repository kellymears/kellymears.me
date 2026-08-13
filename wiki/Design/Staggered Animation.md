---
aliases:
  - Stagger
  - Sequenced entrance
tags:
  - design
summary: Offsetting the start of sibling animations so a group reveals in sequence.
---
**Staggered animation** offsets each item in a set by a small increasing delay, so a list or grid arrives in sequence rather than all at once. It communicates that the items are a group, gives the eye an order to follow, and makes a large reveal feel deliberate instead of abrupt.

The parameters worth controlling are the per-item delay (typically tens of milliseconds — large enough to read as sequence, small enough not to feel slow), the direction, and the total: a stagger over forty items becomes a wait. Capping the cumulative delay, or staggering groups rather than individuals, keeps it usable at scale.

Architecturally, stagger belongs to the *container*, not the item. The parent knows the order and the count; children that each compute their own delay cannot stay coherent when the set changes. This is the same argument that makes an inherited animation configuration workable: the container orchestrates, and children remain ignorant of animation entirely.

Two testing notes. Automated accessibility checks that run immediately after an interaction will read mid-fade text as a contrast failure, so a staggered entrance needs to be settled before the sweep — see [[Color Contrast]]. And under [[Reduced Motion]] the sequence should collapse to the end state rather than merely running faster.

## See also
- [[Motion Design]]
- [[Easing]]
- [[Component Story]]

## Related
- [[Accessibility]]
- [[Progressive Enhancement]]
- [[Focus Management]]
