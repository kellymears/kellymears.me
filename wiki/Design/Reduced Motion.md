---
aliases:
  - prefers-reduced-motion
tags:
  - design
summary: An operating-system preference signalling that animation should be minimised, for real medical reasons.
---
**Reduced motion** is a user preference, exposed to the web as the `prefers-reduced-motion` media query, indicating that the person wants animation minimised. It exists because motion can trigger nausea, dizziness, and migraine in people with vestibular disorders — it is an accessibility requirement, not a taste setting.

Honouring it means degrading to a **static end state**, not to a faster animation. Content must still arrive; it simply arrives without the movement. An entrance that begins at zero opacity and is revealed by a suppressed animation leaves the content invisible — the failure mode that makes reduced-motion support worse than none.

Two implementation notes.

Animation libraries commonly offer a global reduced-motion setting, but such settings often exempt opacity as inherently motion-safe. That is reasonable for a fade and wrong for a *looping* pulse, which is exactly the kind of repeated movement the preference is about — so a looping effect must check the preference itself rather than relying on the global.

Test environments frequently emulate the preference by default, which means every animation assertion in an automated run is exercising the reduced path. A story asserting that something animates can only assert the settled end state, and asserting an identity transform means matching the explicit identity matrix rather than the absence of a transform.

## See also
- [[Motion Design]]
- [[Accessibility]]
- [[Component Story]]
- [[Staggered Animation]]
- [[Easing]]

## Related
- [[Color Contrast]]
- [[Progressive Enhancement]]
- [[Focus Management]]
- [[contenteditable]]
- [[Stacking Context]]
