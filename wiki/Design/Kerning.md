---
aliases:
  - Letter-spacing
  - Tracking
tags:
  - design
summary: The per-pair adjustment of horizontal space between two specific letters, distinct from uniform spacing applied across a whole string.
---
**Kerning** is the adjustment of horizontal spacing between a specific pair of letters, applied because their shapes interact awkwardly at the font's default spacing — an uppercase "A" next to a "V" left at default advance widths leaves an ugly gap that isn't visible between, say, "H" and "I". A well-built font ships a kerning table of thousands of these pair-specific corrections, and rendering it correctly is table-lookup, not computation: the font, not the browser or the designer, defines how much closer "AV" sits than "AH."

This is the detail that trips people up: kerning is not the same thing as **tracking** (uniform letter-spacing applied evenly across a whole run of text, which CSS exposes as `letter-spacing`), even though both get called "kerning" colloquially and both are commonly grouped under the umbrella *letterspacing*. Tracking is a single number applied everywhere; kerning is a lookup table applied per-pair, and turning kerning off (`font-kerning: none` in CSS, occasionally used deliberately for a display face designed without it in mind) removes only the pair corrections, leaving the base advance widths untouched.

Good kerning is invisible — it reads as "this text just looks right" rather than as a feature anyone notices — which makes it a craft detail that separates a font tested at production sizes from one that was never checked at display scale, where kerning errors are most visible (logotypes, headlines, anywhere letters get large enough that a gap becomes conspicuous). It's also one of the areas [[Variable Fonts]] complicate: a kerning table built for one weight doesn't necessarily hold at another, so a variable font's kerning has to interpolate across the same axes the letterforms do, or gaps reappear at intermediate weights nobody explicitly tested.

## See also
- [[Variable Fonts]]
- [[Typographic Scale]]
- [[Grid System]]
