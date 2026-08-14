---
aliases:
  - Easing curve
  - Timing function
tags:
  - design
summary: The curve mapping elapsed time to progress, and the main reason motion feels right or wrong.
---
**Easing** is the function describing how an animation's progress relates to elapsed time. Linear motion — constant velocity — looks mechanical because nothing physical moves that way; everything real accelerates and decelerates.

The standard vocabulary is *ease-out* for things entering (fast start, gentle settle, feels responsive), *ease-in* for things leaving (gentle start, quick exit, feels decisive), and *ease-in-out* for things moving between two on-screen positions. Spring-based motion parameterises stiffness and damping instead of duration, which produces movement that reads as physical and responds naturally to interruption.

Most "the animation feels off" complaints are easing complaints rather than duration complaints. A characteristic one: a curve that decelerates too abruptly makes an animation appear to *stop and hang* mid-flight before continuing. The fix is smoothing the transition between the fast and slow portions, not making the whole thing faster.

Duration still matters and the useful range is narrow. Under roughly 100 milliseconds motion is not perceived as motion; beyond roughly 500 it begins to feel like waiting. Larger objects and longer distances justify longer durations, which is why a single global duration rarely serves everything — and why two deliberately different durations in one composite animation can be correct rather than a bug.

## See also
- [[Motion Design]]
- [[Staggered Animation]]
- [[Reduced Motion]]
- [[Rhythm Game]]

## Related
- [[Component Story]]
- [[Color Contrast]]
- [[Accessibility]]
- [[Progressive Enhancement]]
- [[Game Feel]]
