---
aliases:
  - Shaders
  - GLSL
tags:
  - graphics
summary: A small program run on the graphics processor for every vertex or every pixel.
---
A **shader** is a program executed on the graphics processor as part of the rendering pipeline. A *vertex* shader runs once per vertex and computes positions; a *fragment* (or pixel) shader runs once per covered pixel and computes colour. Compute shaders run general-purpose work outside the rendering pipeline entirely.

The mental model is massive data parallelism: the same tiny program runs for millions of elements simultaneously, with no communication between them. That constraint is what makes them fast and what makes branching expensive — divergent paths within a group of parallel invocations are executed serially.

Shaders are where nearly all visual character lives: lighting, shadowing, atmosphere, post-processing, colour grading, and the whole family of generative and glitch aesthetics. A fragment shader given only screen coordinates and time can produce complete animated imagery with no geometry at all, which is the basis of the demoscene and of shader-art communities.

Two practical notes. Precision and compiler optimisation settings change results — strict maths is slower and reproducible, fast maths is neither. And colour space handling is a persistent source of quiet error: an image tagged with the wrong profile lets display adjustments leak into exported output.

## See also
- [[Rasterization]]
- [[Voxel]]
- [[Determinism]]
- [[OKLCH]]
- [[Cellular Automaton]]

## Related
- [[Procedural Generation]]
- [[Seeded Randomness]]
- [[Roguelike]]
- [[L-System]]
- [[Reproducible Case]]
