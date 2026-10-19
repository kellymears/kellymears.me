---
aliases:
  - Typefaces
  - Serif
  - Sans-serif
  - Monospace
  - Font pairing
  - Type family
tags:
  - design
summary: A designed set of letterforms sharing one style, how typefaces are classified, how a typeface differs from a font, and how to choose and pair them for screens.
---
A **typeface** is a family of letterforms designed to share a consistent style: the same proportions, stroke contrast, and details across every character. Helvetica, Garamond, and Inter are typefaces. A **font**, strictly, is one specific instance of a typeface: in metal type, Garamond in 12-point bold was a physical case of letters, a font. In digital use, a font is the file that holds one weight and style, and the distinction has mostly blurred. A **type family** groups related styles, such as regular, italic, and bold, and [[Variable Fonts]] pack a whole range of weights and widths into one file.

Typefaces are commonly classified by their structure:

- **Serif.** Small strokes finish the ends of letters. Old-style serifs such as Garamond echo pen calligraphy; transitional and modern serifs such as Baskerville and Didot have sharper contrast between thick and thin strokes.
- **Sans-serif.** No finishing strokes. Grotesques such as Helvetica, geometric faces such as Futura, and humanist faces such as Gill Sans and Frutiger differ in how mechanical or hand-drawn their shapes feel. Helvetica became the emblem of [[Swiss Style]].
- **Slab serif.** Heavy, blocky serifs, as in Rockwell, first popular for posters.
- **Monospace.** Every character takes the same width, inherited from typewriters. Code uses it so columns align.
- **Display and script.** Faces made for large sizes or decoration.

The old claim that serifs are easier to read in print and sans-serifs on screens has weak evidence. Familiarity, size, spacing, and x-height, the height of lowercase letters, matter more. Large x-heights, open counters, and clearly distinct letters such as capital I, lowercase l, and the digit 1 make faces easier to read at small sizes, which is why many interface typefaces share those features. Good [[Kerning]] and [[Line Length]] matter as much as the face itself.

On screens, typefaces depend on [[Font Rendering]], which turns outlines into pixels, and on [[Web Font Loading]], which decides what people see while custom fonts download. Each weight is another file, so many sites limit themselves to a few weights or fall back on the system font stack.

**Font pairing** combines typefaces, usually a contrasting pair such as a serif for headings and a sans-serif for body text. Common rules: pair faces that differ clearly rather than nearly, match x-heights so they sit well together on a line, and limit a design to two or three families. A [[Typographic Scale]] then sets the sizes, and [[Visual Hierarchy]] comes from size, weight, and spacing more than from adding faces.

In a [[Design System]], typefaces are recorded as a [[Design Token]], so they change consistently across a product. Type choices carry [[Accessibility]] consequences too: thin weights, low contrast, and decorative faces exclude readers with low vision or reading differences.

## See also
- [[OpenType Features]]
- [[Drop Cap]]
- [[Paper Size]]
- [[Form Follows Function]]
