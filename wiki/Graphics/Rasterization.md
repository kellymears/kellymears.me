---
aliases:
  - Raster pipeline
  - Shadow mapping
tags:
  - graphics
summary: Converting geometry into pixels — the dominant real-time rendering approach.
---
**Rasterisation** determines which pixels a piece of geometry covers and shades them. It is the basis of essentially all real-time rendering: transform vertices into screen space, find covered pixels, run a [[Shader]] for each, and resolve visibility with a depth buffer. It is fast because it is embarrassingly parallel and because most geometry can be discarded early.

Its limitation is that a rasteriser sees one triangle at a time, so effects requiring knowledge of the whole scene — shadows, reflections, indirect light — must be approximated with extra passes.

**Shadow mapping** is the standard approximation for shadows: render the scene from the light's point of view, storing depth; then, when shading, transform each point into that space and compare. If it is further from the light than the stored value, it is shadowed. The technique is elegant and its artifacts are famous — surfaces shadowing themselves due to depth precision, which is corrected with a bias that must scale with surface slope, and blocky edges that follow from finite map resolution.

Performance work in a rasteriser is mostly about reducing draw calls and avoiding stalls where the processor and the graphics device wait on each other. Passing small per-draw values directly rather than through shared buffers removes a whole class of synchronisation hazard.

## See also
- [[Shader]]
- [[Voxel]]
- [[Determinism]]

## Related
- [[Procedural Generation]]
- [[Seeded Randomness]]
- [[Cellular Automaton]]
- [[Game Feel]]
- [[Roguelike]]
- [[Game AI]]
- [[L-System]]
