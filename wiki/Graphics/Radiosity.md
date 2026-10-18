---
aliases:
  - Form factor
  - Color bleeding
tags:
  - graphics
summary: A lighting method borrowed from heat-transfer engineering in 1984 that splits a scene into patches and solves how much light each passes to every other, producing soft indirect light and color bleeding for diffuse surfaces.
---
**Radiosity** is a method for computing indirect light, the light that reaches a surface after bouncing off other surfaces rather than straight from a lamp. It was brought into computer graphics in 1984 by a group at Cornell University, Cindy Goral, Kenneth Torrance, Donald Greenberg, and Bennett Battaile, who adapted techniques engineers already used to calculate how heat radiates between surfaces; see [[Heat Transfer]]. The same paper introduced the [[Cornell box]], a simple room with one red wall and one green wall that is still used to test lighting algorithms.

The method works in three steps:

1. **Patches.** Every surface in the scene is divided into small flat patches; see [[Polygon Mesh]].
2. **Form factors.** For every pair of patches, a **form factor** records what fraction of the light leaving one arrives at the other. It depends on their distance, their angles to each other, and whether anything blocks the view between them; see [[Inverse-Square Law]].
3. **Solving.** Each patch's brightness is its own emission plus the light it receives from all others, times how much it reflects. That gives one equation per patch, and solving the whole system gives the light everywhere at once.

The result shows effects that direct lighting misses. Corners and crevices darken softly, shadows have gentle edges, and colored surfaces tint their neighbors: a red wall casts a pink glow onto a white floor, which is called **color bleeding**; see [[Ambient Occlusion]].

Radiosity assumes every surface is perfectly matte, scattering light equally in all directions; see [[Lambertian reflectance]]. That makes the answer independent of the viewer, so it can be computed once and then viewed from anywhere, which suited architectural walkthroughs. It also means radiosity can't produce mirror reflections, glossy highlights, or [[Caustics]]. It is a special case of the [[Rendering Equation]], published two years later, restricted to diffuse surfaces.

The cost is the number of patch pairs, which grows with the square of the patch count. Researchers soon made it practical. Cornell's hemicube method computed form factors using ordinary rasterization hardware, and **progressive refinement** shot light out from the brightest patches first, so an approximate image appeared quickly and improved as the calculation continued; see [[Rasterization]].

Games adopted radiosity for precomputed lighting. Quake II and Half-Life 2 both ran radiosity tools offline to bake indirect light into textures stored with each level; see [[Baked Lighting]]. Film and modern real-time renderers mostly moved to sampling light paths randomly, which handles every kind of surface; see [[Ray Tracing]] and [[Monte Carlo Method]]. Radiosity's ideas survive in light probes and in real-time global illumination systems that divide scenes into coarse patches or grids; see [[Physically Based Rendering]].

## See also
- [[Image-Based Lighting]]
- [[Volumetric Lighting]]
