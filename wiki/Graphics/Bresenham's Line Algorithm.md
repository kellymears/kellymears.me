---
aliases:
  - Line drawing
  - Midpoint circle algorithm
  - Xiaolin Wu's line algorithm
tags:
  - graphics
summary: A way to draw a straight line on a pixel grid using only integer addition and comparison, by tracking how far the true line has drifted from the pixels chosen so far.
---
**Bresenham's line algorithm** decides which pixels to light to draw a straight line between two points on a grid, using only integer addition, subtraction, and comparison. Jack Bresenham developed it at IBM in 1962 to drive a pen plotter and published it in 1965. Versions of it still run inside graphics hardware, font renderers, and games.

The problem is that a mathematical line passes between pixel centers. A line from (0, 0) to (10, 4) rises 0.4 for each step to the right, so at every column the program must pick the pixel nearest the true line. The obvious approach computes the height at each column and rounds, which needs multiplication and fractions; see [[Linear Interpolation]]. On early machines, fractional math was slow or missing; see [[Floating-Point Arithmetic]].

Bresenham's insight was to track only the error. For a shallow line, the algorithm steps one pixel right each time and keeps a running total of how far the true line has drifted above the current row. When that error passes half a pixel, it steps up a row and subtracts one. Multiply everything by twice the horizontal distance and every quantity becomes a whole number, so the inner loop is one addition, one comparison, and sometimes a subtraction. Steep lines swap the roles of the axes, and the other directions follow by symmetry.

The same carry-the-error idea shows up elsewhere:

- **Circles.** The midpoint circle algorithm draws one eighth of a circle with the same integer bookkeeping and mirrors it to get the rest.
- **Dithering.** Pushing each pixel's rounding error onto its neighbors is the same move in two dimensions; see [[Error diffusion]].
- **Even spacing.** Spreading 7 events across 10 slots is the same problem, and Bresenham-style counters handle it in rhythm generators and schedulers.

The output is jagged, because each pixel is either on or off; see [[Aliasing]]. In 1991 Xiaolin Wu published a variant that lights two pixels per column, splitting brightness by distance to the true line, which gives smooth lines nearly as cheaply.

Line drawing is the simplest case of [[Rasterization]], and modern GPUs fill triangles with related edge-stepping rules; see [[Graphics Processing Unit]]. Games use grid lines for more than drawing. Roguelikes trace them across a [[Tile Map]] to decide what a character can see or shoot, and grid-based engines step along rays the same way; see [[Roguelike]] and [[Ray Casting]].

The algorithm is a classic of efficient computing: it replaces arithmetic the hardware does badly with arithmetic it does well, without giving up exactness; see [[Fixed-point arithmetic]].

## See also
- [[Turtle Graphics]]
- [[Affine Texture Mapping]]
- [[Bitwise Operation]]
- [[Vector Display]]
- [[Numerical Stability]]
