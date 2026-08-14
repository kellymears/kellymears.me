---
aliases:
  - Animation
  - UI animation
tags:
  - design
summary: Using movement to communicate change, continuity, and hierarchy rather than to decorate.
---
**Motion design** in interfaces is the use of animation to make change legible: where a thing came from, what belongs to what, whether an action registered. Motion that does not answer one of those questions is decoration, and decoration has a cost in attention, in code, and in bytes.

Treating motion as a system rather than per-component styling is what keeps it coherent. A small vocabulary — a handful of named entrance styles, an on/off choice for stagger, bounded distance and duration — behaves like a [[Design Token]] set: authors pick from it, and the result is consistent because the options are.

Several constraints shape any real implementation.

**Reduced motion is not optional.** See [[Reduced Motion]].

**Entrances break no-script rendering.** An animation starting at zero opacity means the content is invisible until scripts run, so any surface required to work without JavaScript can only animate on interaction. See [[Progressive Enhancement]].

**Animation libraries cost bytes**, and the cost is per route. Splitting the feature set so only the used capabilities load is the difference between a few kilobytes and tens of them; see [[Performance Budget]].

**Some effects cannot take a transform.** A toolbar positioned from a measured rectangle is corrupted by a transform, so it has to fade rather than lift — a physical constraint, not a preference.

## See also
- [[Uncanny Valley]]
- [[Easing]]
- [[Staggered Animation]]
- [[Color Contrast]]
- [[Stacking Context]]

## Related
- [[Component Story]]
- [[Accessibility]]
