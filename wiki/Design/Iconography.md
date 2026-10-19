---
aliases:
  - Icon
  - Icons
  - Pictogram
  - Isotype
  - Icon font
tags:
  - design
summary: The design and use of small symbolic images in interfaces and signage, which are quick to recognize when familiar and surprisingly ambiguous when not.
---
**Iconography** is the design of small symbolic images, and the system of rules for using them. Interface icons, road signs, and airport pictograms compress an idea into a glyph recognizable at a glance, ideally across languages.

The modern tradition starts with Otto Neurath's **Isotype** in 1920s Vienna, a system of standardized pictograms designed with the artist Gerd Arntz to make statistics readable by anyone. In 1974 the American Institute of Graphic Arts produced a set of 34 transport symbols for the US Department of Transportation, the toilets, exits, and baggage icons still seen in airports. Interfaces took the idea to screens: the Xerox Star in 1981 introduced a desktop of document and folder icons, and Susan Kare's icons for the 1984 Macintosh, drawn on a 32-by-32 pixel grid, defined the look of personal computing.

Icons work through resemblance or convention, and convention is the stronger of the two. A magnifying glass for search, a house for home, a gear for settings, and a trash can for delete are recognized because they are everywhere, not because they are self-explanatory. Many survive their referents: the floppy disk still means save to people who have never touched one, a link to the physical world that [[Skeuomorphism]] makes explicit.

Beyond a handful of conventions, icons are ambiguous. A star might mean favorite, rate, or featured; a heart might mean like or save. Usability research consistently finds that unlabeled icons slow people down and get misread, so the safest practice is to **pair icons with text labels**. When space forbids labels, a [[Tooltip]] helps desktop users but not touch users, and every icon-only button still needs an accessible name via `aria-label` or visually hidden text, part of [[ARIA]]. Purely decorative icons should be hidden from screen readers.

A coherent icon set follows shared rules:

- **Consistent grid and stroke.** Icons drawn on the same grid, with the same stroke width and corner radius, read as one family, the [[Gestalt Principles]] of similarity at small scale.
- **Optical balance.** A circle drawn the same size as a square looks smaller, so shapes are adjusted by eye, as described under [[Optical Alignment]].
- **Pixel alignment.** At small sizes, strokes snapped to whole pixels render crisply instead of blurring, a concern of [[Font Rendering]].
- **One metaphor per meaning.** The same idea always gets the same icon across the product, managed through the [[Design System]].

Web icons moved from image sprites to **icon fonts**, which scaled but broke accessibility and showed missing-glyph boxes when the font failed, to inline SVG, now standard, since [[Vector Graphics]] scale, take CSS styling, and carry accessible names. An icon is a signifier in the sense of [[Affordance]]: it promises what will happen, and it only works if the promise is understood.

## See also
- [[Calligraphy]]
- [[Recycle Bin]]
- [[Favicon]]
- [[Desktop Environment]]
- [[Emoji]]
