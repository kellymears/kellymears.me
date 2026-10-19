---
aliases:
  - Isosurface Extraction
tags:
  - graphics
summary: Converts a scalar field sampled on a 3D grid into a triangle mesh by classifying each cube's corners.
---
**Marching cubes** is an algorithm for turning a volumetric scalar field — voxel density, an MRI scan, a metaball blob, terrain noise — into an explicit triangle mesh. It walks the field one cube of eight neighboring grid points at a time, classifies each corner as inside or outside a chosen threshold value, and looks up a precomputed triangulation for that inside/outside pattern, then interpolates the exact vertex positions along the cube's edges based on how close each corner's value is to the threshold.

There are 2⁸ = 256 possible corner configurations, but symmetry collapses them to 15 distinct cases in the original lookup table, each specifying which edges the surface crosses and how to triangulate that crossing. The "marching" is literal: the cube steps through the whole grid, one cell at a time, stitching a continuous mesh out of purely local decisions.

The classic algorithm has known **ambiguous cases** — configurations where the 15-case table can produce a hole or a non-manifold seam because two diagonal corners agree while their shared face disagrees on which way the surface should connect. Later variants (marching tetrahedra, dual contouring) resolve this by subdividing further or by placing vertices differently, at the cost of more triangles or more complex geometry.

Marching cubes is the standard bridge from implicit or volumetric representations — a [[Signed Distance Field]], a density field from procedural terrain, a segmented CT scan — into a mesh a conventional rasterizer or physics engine can consume. It is why "extract a surface" and "run marching cubes" are near-synonyms in graphics and scientific visualization.

## See also
- [[Signed Distance Field]]
- [[Voxel]]
- [[Ray Tracing]]
- [[Cellular Automaton]]

## Related
- [[Procedural Generation]]
