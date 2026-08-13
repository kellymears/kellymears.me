---
aliases:
  - Contrast ratio
  - WCAG contrast
tags:
  - design
summary: The measured luminance difference between foreground and background, and the accessibility floor it must clear.
---
**Colour contrast** is the ratio between the relative luminance of text and its background. The Web Content Accessibility Guidelines set floors — commonly 4.5:1 for body text and 3:1 for large text and meaningful non-text elements — below which text becomes hard or impossible for many people to read.

Two things about it are consistently underappreciated.

**It constrains design decisions, not just checks them.** A brand colour that fails against its intended background is not a validation error to be waived; it means one of the two has to change. A shade specified by a designer may need to be lightened to clear the floor on a dark surface, and that is a real deviation to record rather than quietly ignore.

**It is measured on the final rendered state.** A colour that passes at rest can fail mid-transition, which is why an automated accessibility sweep run at the wrong moment reports contrast violations on text that is simply part-way through a fade. Elements that pulse or breathe in opacity can never pass while carrying text — the same effect applied to a decorative element hidden from assistive technology is fine.

Contrast is one of the few accessibility criteria a machine can genuinely evaluate, which makes it the one worth automating hardest. See [[Accessibility]].

## See also
- [[OKLCH]]
- [[Dark Mode]]
- [[Accessibility]]
- [[Motion Design]]
- [[Staggered Animation]]

## Related
- [[Reduced Motion]]
- [[Design Token]]
- [[Progressive Enhancement]]
- [[Easing]]
