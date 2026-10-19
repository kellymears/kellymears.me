---
aliases:
  - OpenType
  - Ligature
  - Ligatures
  - Tabular figures
  - Small caps
tags:
  - design
summary: The optional glyphs and substitution rules built into modern fonts, such as ligatures, small caps, and figures of equal width, which CSS can switch on for typography that print designers once set by hand.
---
**OpenType features** are optional typographic behaviors built into a font file. Modern fonts often contain far more than one shape per character: alternate letterforms, joined pairs of letters, several styles of numeral, and rules for when to substitute one for another. These features stay dormant until software turns them on. OpenType, the font format behind them, was developed by Microsoft and Adobe in the late 1990s and is now standard.

Each feature has a four-letter tag. Common ones:

- **Ligatures** (`liga`). Letter pairs that collide, such as *f* followed by *i* or *l*, are replaced with a single combined glyph. Standard ligatures are on by default in most text. Discretionary ligatures (`dlig`) are decorative and off by default.
- **Kerning** (`kern`). Pair-specific spacing adjustments, also usually on by default; see [[Kerning]].
- **Small caps** (`smcp`). Real capitals drawn at lowercase height with matching stroke weight, for acronyms and headings. Fake small caps, made by shrinking full capitals, look thin and spindly.
- **Old-style figures** (`onum`). Numerals that rise and descend like lowercase letters, so they sit comfortably in running text. **Lining figures** (`lnum`) are all cap height, suited to headings and tables.
- **Tabular figures** (`tnum`). Every digit the same width, so columns of numbers align and changing values, such as timers, prices, and counters, don't make text jitter. **Proportional figures** (`pnum`) give each digit its natural width, which reads better in prose.
- **Fractions** (`frac`), **slashed zero** (`zero`), and **case-sensitive forms** (`case`), which raise hyphens and parentheses to sit with capitals.
- **Stylistic sets** (`ss01` and up) and **contextual alternates** (`calt`), designer-defined variations. Script fonts use contextual alternates to connect letters naturally; programming fonts use them to draw arrows such as `=>` as single symbols.

In CSS, high-level properties such as `font-variant-numeric: tabular-nums` and `font-variant-caps: small-caps` turn features on readably; `font-feature-settings` sets raw tags when nothing higher-level exists. Features only work if the font includes them, and web fonts are often subset to cut file size, which can strip them out; see [[Web Font Loading]].

The engine that applies these rules is the text *shaper*; see [[Font Rendering]]. For Latin text, features are refinements. For Arabic, Devanagari, and many other scripts, the same mechanism is essential: letters change shape by position and combine, and text without shaping is unreadable; see [[Internationalization]].

Some interactions surprise people. Adding letter-spacing disables standard ligatures, since spaced letters no longer collide. Copying text with ligatures should yield the original letters, but poorly built PDFs sometimes produce strange characters instead; see [[Character Encoding]].

These features restore craft that print typesetters handled by hand. Used well, they're invisible: numbers line up, acronyms don't shout, and text reads evenly. They belong with [[Variable Fonts]] and the [[Typographic Scale]] as the tools for typesetting on screen rather than merely displaying text; see [[Typeface]].

## See also
- [[Helvetica]]
- [[Emoji]]
