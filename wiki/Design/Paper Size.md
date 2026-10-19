---
aliases:
  - ISO 216
  - A4
  - US Letter
tags:
  - design
summary: The standard sheet sizes behind printing and page layout, from the metric A series, whose square-root-of-two proportions survive every halving, to the North American Letter size that keeps software defaults and printer errors in two camps.
---
**Paper sizes** are standardized sheet dimensions, and the world mostly divides into two systems: the international **A series** defined in ISO 216, whose A4 sheet is the default for most countries, and the North American system, whose **Letter** sheet, 8.5 by 11 inches, is the default in the US, Canada, and a few other countries; see [[Internationalization]].

The A series rests on one clever ratio. Its sheets have sides in the proportion of 1 to the square root of 2, about 1 to 1.414. That is the only ratio that survives cutting a sheet in half across its long side: the two halves have the same proportions as the original. The German scientist Georg Christoph Lichtenberg noted the property in 1786, and the German standards body adopted it in 1922 as DIN 476, after work by the engineer Walter Porstmann. It became international standard ISO 216 in 1975.

The system is built from one anchor: an A0 sheet has an area of one square meter. Halving it gives A1, halving again A2, and so on, so A4 is a sixteenth of a square meter, 210 by 297 millimeters. Consequences that follow:

- **Scaling is exact.** Two A4 pages fit side by side on an A3 sheet, and a photocopier reduces A3 to A4 at a fixed 71 percent without margins changing shape.
- **Weight is easy to compute.** Paper is sold by grams per square meter, so a sheet of 80-gram A4 weighs 5 grams.
- **Families fit together.** The B series sits between A sizes, and C-series envelopes are sized to hold A sheets: an A4 sheet fits flat in a C4 envelope.

US Letter has no such system. Its origins are murky, and Legal and Tabloid sizes have different proportions, so scaling between them leaves margins or crops. The US federal government standardized its own forms on Letter only in the early 1980s. The mismatch persists because every printer, file, and filing cabinet reinforces it; see [[Path Dependence]].

For designers the difference matters more than it looks. A4 is narrower and taller, so a layout made for one system and printed on the other is cropped or shrunk. Word processors default by locale, and documents traveling between countries regularly print with clipped footers or "paper size mismatch" errors.

Page proportions shape layout traditions too. Book designers have long used other ratios, and the A-series ratio is often confused with the golden ratio, which is about 1.618, not 1.414; see [[Golden Ratio]]. Grid-based layout and modular type scales also work by repeated, consistent proportions; see [[Grid System]] and [[Typographic Scale]]. On the web, print stylesheets can set the page size and margins for printing, a rarely used corner of CSS; see [[Responsive Breakpoint]].

## See also
- [[Movable Type]]
- [[White Space]]
- [[Aspect Ratio]]
- [[Arts and Crafts Movement]]
- [[Blackletter]]
