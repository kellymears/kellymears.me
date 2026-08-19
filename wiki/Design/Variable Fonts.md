---
aliases:
  - Variable Font
  - OpenType Font Variations
tags:
  - design
summary: A single font file that encodes a continuous design space, letting weight, width, and other axes be set to any value at runtime.
---
**Variable fonts** are a font format (standardized in 2016 as an extension to OpenType, backed jointly by Apple, Google, Microsoft, and Adobe) that stores an entire family — every weight from Thin to Black, every width from Condensed to Expanded — as one file with continuously interpolatable axes, rather than as a separate static file per weight. Where a traditional family might ship Regular, Medium, Bold, and Black as four 200KB files, a variable font can ship the whole range, plus every value in between, in a file often smaller than the sum of those four statics.

The axes are just numbers on a defined range: `wght` (weight) commonly runs 100–900, `wdth` (width) is a percentage, `opsz` (optical size) adjusts letterforms for the size they'll be rendered at rather than just scaling them, and type designers can define custom axes for anything else the design space supports — a slant axis, a "roundedness" axis, whatever the source drawings interpolate cleanly between. In CSS this surfaces as `font-variation-settings` or, for the standard axes, `font-weight: 375` — a value no static family could ever offer, because 375 was never drawn as its own file.

The design payoff beyond file size is that weight and width become animatable and responsive rather than fixed choices baked in at build time: a heading can nudge two points heavier on hover, or a design token can compute `wght` from viewport width the same way a [[Typographic Scale]] computes size from it. That turns typography from a small palette of discrete choices into a continuous parameter, which is also why variable fonts pair naturally with motion work — animating between two static weights used to mean a cross-fade or a jarring cut; a variable font can genuinely interpolate the letterforms.

## See also
- [[Typographic Scale]]
- [[Kerning]]
- [[Design Token]]
- [[Motion Design]]
- [[Web Font Loading]]
