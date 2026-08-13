---
aliases:
  - Voxels
tags:
  - graphics
summary: A volumetric pixel — a value on a regular three-dimensional grid.
---
A **voxel** is the three-dimensional analogue of a pixel: a value sampled on a regular grid in space. Unlike a polygon mesh, which describes only surfaces, a voxel grid describes volume, so what is *inside* an object is represented as directly as its skin.

That property is what makes voxels attractive for destructible worlds, volumetric medical imaging, and terrain that can be dug into. It is also what makes them expensive: resolution costs memory cubically, so doubling detail multiplies storage by eight. Sparse structures — octrees, chunked grids, run-length encoding — exist entirely to avoid storing empty space.

Rendering a voxel grid usually means converting it to triangles rather than drawing cubes, since a naive cube per voxel produces enormous quantities of hidden geometry. *Greedy meshing* merges adjacent coplanar faces into larger quads, typically reducing triangle counts by an order of magnitude. The alternative is ray marching through the volume directly, which trades geometry cost for per-pixel cost.

The aesthetic dimension is separable from the technical one. Voxel art is a deliberate visual language — chunky, readable, legible at small sizes, and cheap to author — which is why it appears in games with no volumetric simulation at all.

## See also
- [[Rasterization]]
- [[Procedural Generation]]
- [[Shader]]
- [[Determinism]]

## Related
- [[Seeded Randomness]]
- [[Cellular Automaton]]
- [[Roguelike]]
- [[L-System]]
- [[Reproducible Case]]
- [[Game AI]]
