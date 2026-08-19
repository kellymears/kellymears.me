---
aliases:
  - Gestalt Psychology
  - Law of Proximity
  - Law of Similarity
tags:
  - design
summary: A set of perceptual rules describing how the eye groups discrete elements into wholes before conscious analysis begins.
---
**Gestalt principles** are a set of descriptive rules from early-20th-century perceptual psychology (Wertheimer, Koffka, Köhler) explaining how the visual system groups separate marks into unified shapes and structures automatically, before any deliberate interpretation. The name comes from the German for "shape" or "form," and the founding claim — the whole is perceived before, and differently from, the sum of its parts — is what makes the principles useful for interface design rather than just visual art: layout can be read as structure without a single word of labeling.

The most load-bearing principles for UI work are proximity (elements placed close together are read as related — this is why whitespace between a form's sections does more organizational work than borders do) and similarity (elements sharing color, shape, or size are read as the same category, which is why a design system's buttons all look like buttons). Common region groups items inside a shared boundary — a card — regardless of their internal spacing. Figure-ground determines what reads as content versus backdrop, and it's the principle a modal dialog exploits when it dims everything behind it.

The practical failure mode is accidental grouping: putting a label closer to the wrong field, or giving unrelated controls the same color, silently tells users those things belong together even though nothing was ever said explicitly. Because these principles operate below conscious attention, they can't be argued away with better copy — the fix is always structural (spacing, alignment, grouping), never textual.

Gestalt grouping is the perceptual substrate that a [[Design System]]'s spacing scale and component library are built to exploit consistently, and it's also why a well-structured [[Grid System]] reads as ordered even before anyone examines its content.

## See also
- [[Design System]]
- [[Grid System]]
- [[Typographic Scale]]
- [[Affordance]]

## Related
- [[Hick's Law]]
