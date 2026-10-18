---
aliases:
  - Measure (typography)
  - Characters per line
  - Line height
  - Reading width
tags:
  - design
summary: How many characters fit on one line of text, which typographers keep to roughly 45 to 75 so readers can track from the end of one line to the start of the next.
---
**Line length**, called the *measure* by typographers, is the width of a block of text, usually counted in characters per line. It has a large effect on how comfortable text is to read. Lines that are too long make it hard for the eye to find the start of the next line; lines that are too short break the text into choppy pieces and force constant jumps back.

Reading isn't a smooth sweep. The eyes move in quick jumps called *saccades*, pausing briefly on words, and at the end of each line they make a long return sweep to the start of the next. On a very long line, that return is more likely to land on the wrong line. On a very short one, the returns come so often that reading rhythm breaks, and words get split awkwardly by hyphenation or ragged edges.

Typographers converged on a range long ago. Robert Bringhurst's *The Elements of Typographic Style* (1992) recommends 45 to 75 characters for a single column of text, with 66 often cited as ideal. The Web Content Accessibility Guidelines include a related recommendation at their strictest level: no more than 80 characters per line, or 40 for Chinese, Japanese, and Korean text.

The web made bad line lengths easy. Early fluid layouts stretched text to fill the window, producing lines of 150 characters or more on wide monitors. Modern CSS offers a direct fix: the `ch` unit is roughly the width of one character, so `max-width: 65ch` keeps a text column readable at any screen width. A [[Container Query]] can adjust type size to the space a text block actually has, and a [[Responsive Breakpoint]] can change the layout around it.

Line length is tied to **line height**, the vertical distance between lines, also called leading. Longer lines need more line height so the eye can follow them back; short lines can be tighter. Body text usually sits between 1.4 and 1.6 times the font size. Choosing sizes and line heights together is part of a [[Typographic Scale]].

Other factors shift the ideal:

- **Typeface.** Wider fonts carry fewer characters per line at the same width, and [[Variable Fonts]] allow fine-tuning width.
- **Size and distance.** Phone text is read closer, so shorter lines feel normal.
- **Purpose.** Captions, sidebars, and code have different needs.

Good line length is one of the cheapest improvements to readability, and it supports [[Accessibility]] for readers with dyslexia or low vision, who are more affected by long lines. It works alongside [[White Space]] in margins, consistent columns from a [[Grid System]], and careful [[Web Font Loading]] so the measure doesn't jump when the final font arrives.

## See also
- [[Dyslexia]]
- [[Golden Ratio]]
- [[Text Truncation]]
- [[Speed Reading]]
- [[Banner Blindness]]
- [[Pseudolocalization]]
- [[Text Justification]]
