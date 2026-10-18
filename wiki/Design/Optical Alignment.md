---
aliases:
  - Optical adjustment
  - Overshoot
  - Hanging punctuation
  - Optical margin alignment
  - Visual center
tags:
  - design
summary: Adjusting shapes and positions by eye rather than by measurement, because what is geometrically aligned often looks wrong to human perception.
---
**Optical alignment** is the practice of positioning and sizing elements so they *look* aligned, balanced, or equal, even when that means making them measurably unequal. A circle and a square of the same height do not look the same size, a play triangle centered by its bounding box looks off-center, and text centered exactly in a button looks too low. Designers correct for these illusions by eye.

Type design offers the clearest examples:

- **Overshoot.** Round letters such as O and C, and pointed ones such as A and V, extend slightly above the cap height and below the baseline, typically by a few percent. Without overshoot, an O sitting on the same lines as an H looks smaller.
- **Stroke contrast.** Horizontal strokes are drawn thinner than vertical ones, since equal thicknesses make horizontals look heavier.
- **Spacing.** Letter spacing is set by visual area, not by distance between bounding boxes, which is why pairs such as AV need [[Kerning]].
- **Optical sizes.** Small text needs looser spacing and sturdier details than large text, so many typefaces ship separate designs for different sizes, now often as an optical size axis in [[Variable Fonts]].

The same corrections apply to interface layout:

- **Icons in containers.** A play triangle placed in a circle must be shifted right of center, toward its point, so its visual mass sits centered. Shapes in an icon set are sized individually so circles, squares, and triangles appear equally heavy, part of good [[Iconography]].
- **Text in buttons.** Bounding boxes include space for accents and descenders, so mathematically centered text often sits visually low. Many designers nudge it up, or use CSS `text-box` trimming to crop to the cap height.
- **Visual center.** The perceived center of a page or frame sits slightly above the geometric center, so content placed exactly at the middle looks like it is sinking. Classic book layouts give the bottom margin more space.
- **Edges.** Round or pointed shapes aligned to a straight edge look indented, so they are pushed slightly past it.

**Hanging punctuation** is the textual version. Quotation marks, hyphens, and bullets at the start or end of a line are set partly outside the margin, so the edge of the letters looks straight. Gutenberg's Bible did this in the 1450s; CSS offers a `hanging-punctuation` property with limited browser support.

The principle connects to [[Gestalt Principles]]: perception groups and weighs shapes by visual mass, not by coordinates. A [[Grid System]] provides the measured structure, and optical adjustments make it look right. [[Swiss Style]] designers were strict about the grid and still adjusted by eye.

This is why a pixel-perfect build can look worse than the mockup: the designer nudged by eye, and the developer reset it to the numbers.

## See also
- [[Kerning]]
- [[Gestalt Principles]]
- [[Iconography]]
- [[Grid System]]
