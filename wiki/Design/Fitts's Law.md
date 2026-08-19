---
aliases:
  - Fitts' Law
tags:
  - design
summary: The time to hit a target shrinks with its size and grows with distance to it — so make frequent targets big and close.
---
**Fitts's Law** is a model from experimental psychology (Paul Fitts, 1954) predicting how long a pointing movement takes as a function of the target's size and its distance from the starting point. Formally, movement time scales with the log of distance over size — but the design consequence is simpler than the math: a button you want people to hit often and hit fast should be large and near wherever their pointer already is.

The clearest applications are the ones users never notice working. The screen edges and corners are effectively infinite in size, because the pointer stops at the boundary regardless of overshoot — which is why macOS puts the menu bar at the very top and why a browser's maximize button lives in the corner rather than a few pixels inset. A context menu that opens exactly under the cursor is exploiting the same law: distance to the first item is near zero.

It also explains why a small, rarely-used icon (say, a settings gear) is an acceptable design even though it violates the "make it big" instinct — the law is about time cost, and infrequent targets can absorb some cost. The failure mode is applying that logic backwards: shrinking a primary action, or a mobile tap target, because it "looks cleaner," while ignoring that the people using it hit it dozens of times a day. Touch interfaces raise the stakes further, since a finger is a blunter instrument than a cursor and the effective minimum size for reliable hits is larger than most visual designers expect.

Fitts's Law pairs naturally with [[Hick's Law]] — one governs how long it takes to move to a choice, the other how long it takes to decide among choices — and together they cover most of the time-cost side of interaction design.

## See also
- [[Hick's Law]]
- [[Affordance]]
- [[Progressive Disclosure]]
- [[Keyboard Navigation]]

## Related
- [[Gestalt Principles]]
