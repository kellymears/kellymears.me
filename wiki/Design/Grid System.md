---
aliases:
  - Layout Grid
  - Column Grid
tags:
  - design
summary: A shared set of columns, gutters, and alignment lines that constrains where content can sit, so unrelated layouts still read as one system.
---
**Grid system** is a structural framework of columns, gutters, and margins that a layout's content is placed onto, so that spacing and alignment decisions are made once, at the system level, rather than re-improvised on every screen. The modern typographic grid comes out of the Swiss/International Typographic Style of the mid-20th century (Josef Müller-Brockmann's *Grid Systems in Graphic Design*, 1981, is the canonical reference), and the same logic that organized a print poster's margins now organizes a responsive web layout's breakpoints.

On the web, the grid usually means a fixed number of columns (12 is the conventional default, since it divides cleanly into halves, thirds, and quarters) with a gutter width between them, implemented today with CSS Grid or Flexbox rather than the float-based hacks that preceded them. The practical payoff shows up in consistency users never consciously register: two unrelated pages built on the same grid share the same rhythm of alignment even if a human never compared them side by side, because both were constrained by the same column boundaries rather than eyeballed independently.

Grids interact directly with [[Responsive Breakpoint]]s — a 12-column grid at desktop width commonly collapses to 4 columns at tablet and a single column at mobile, and the content's column-span assignments have to be redefined at each breakpoint rather than just visually shrinking. They also give [[Gestalt Principles]] something concrete to work with: alignment along a shared grid line is one of the strongest proximity/common-region cues going, which is why misaligned elements read as "off" even to someone who couldn't say why.

The main risk of a grid system is treating it as decoration rather than constraint — a grid that every layout quietly ignores whenever it's inconvenient isn't providing consistency, it's providing the appearance of a system without the discipline one requires.

## See also
- [[Responsive Breakpoint]]
- [[Gestalt Principles]]
- [[Typographic Scale]]
- [[Design System]]

## Related
- [[Container Query]]
