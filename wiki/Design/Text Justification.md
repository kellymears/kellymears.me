---
aliases:
  - Justified text
  - Hyphenation
  - Ragged right
  - Widows and orphans
tags:
  - design
summary: Setting text flush with both margins by stretching the spaces between words, which looks orderly in print but opens gaps and rivers without good line breaking and hyphenation, and is harder for some readers.
---
**Justified text** lines up with both the left and right margins, so a column of text forms a clean rectangle. To make each line exactly fill the column, the spaces between words stretch or shrink. The alternative, **ragged right** or flush left, keeps word spaces constant and lets line endings vary.

Justification is as old as printing. Gutenberg's Bible of the 1450s reached its even margins partly through many alternative letter forms and abbreviations, choosing narrower or wider versions to make a line fit.

The cost of justification falls on the spaces. When a line contains few words, or a long word won't fit, the remaining space is spread across the few gaps, leaving holes. Holes that line up vertically through several lines form **rivers** of white running down the paragraph. Narrow columns make it worse, which is why newspapers lean heavily on hyphenation; see [[Line Length]] and [[White Space]].

Line breaking decides the quality:

- **Greedy breaking** fills each line with as many words as fit and moves on, never revisiting a decision. Browsers have traditionally done this, so a tight line can be followed by a loose one; see [[Greedy Algorithm]].
- **Paragraph-wide breaking** considers every possible set of break points and picks the one with the least total ugliness. Donald Knuth and Michael Plass published this approach in 1981 for the TeX typesetting system, using [[Dynamic Programming]] to make it fast. It is a large part of why TeX output looks even.

**Hyphenation** gives line breaking more options. Frank Liang's 1983 method, written for TeX, learns patterns of letters where words may break, and its pattern files still drive hyphenation in most software, browsers included. Hyphenation rules differ by language, which is why automatic hyphenation on the web only works when the page declares its language; see [[Internationalization]].

Other scripts justify differently. Arabic can stretch letter connections rather than spaces, and Chinese and Japanese set characters on an even grid, adjusting spacing between characters.

Fine typesetting goes further, letting punctuation hang slightly into the margin and stretching letter widths imperceptibly so lines fill without big gaps; see [[Optical Alignment]] and [[Kerning]].

**Widows and orphans** are related faults: a paragraph's last line stranded at the top of a new column or page, its first line left alone at the bottom, or a single short word on the paragraph's final line. CSS now offers a "pretty" text-wrap setting that rebalances the end of paragraphs to avoid that last case.

Readability is the case against justification on screens. Uneven spacing disrupts reading rhythm, and dyslexia style guides recommend left-aligned text; see [[Dyslexia]]. The strictest level of the web accessibility guidelines asks that text not be justified; see [[Accessibility]]. The Swiss typographers favored ragged right for its even texture; see [[Swiss Style]].

## See also
- [[Typeface]]
- [[Movable Type]]
- [[Drop Cap]]
- [[Blackletter]]
