---
aliases:
  - Blobby objects
  - Implicit surface
  - Isosurface
tags:
  - graphics
summary: Organic shapes made from overlapping fields of influence that merge smoothly when they come close, introduced for drawing molecules in 1982 and beloved by the demoscene for liquid, lava-lamp effects.
---
**Metaballs** are blobby shapes that merge smoothly into one another as they come close. Each metaball is a point surrounded by a field of influence that weakens with distance. The surface is drawn wherever the combined field of all the balls reaches a chosen threshold. Two balls far apart look like separate spheres. Brought together, they stretch toward each other, form a neck, and fuse into a single rounded shape, like drops of liquid.

Jim Blinn introduced the idea in 1982 while visualizing molecules, where electron density around atoms blends smoothly, calling them blobby objects. Several groups in Japan developed related techniques around the same time.

Metaballs are an example of an **implicit surface**: instead of listing vertices or triangles, the shape is defined as the set of points where some function equals a constant. Such a set is also called an isosurface. The field function for each ball is usually something that falls off smoothly and reaches zero at a fixed radius, so distant balls don't affect each other. Some versions use a falloff similar to physical fields; see [[Inverse-Square Law]].

Implicit surfaces handle some things easily that meshes find hard:

- **Topology changes.** Shapes can split and merge without anyone having to rebuild the connections between triangles; see [[Polygon Mesh]].
- **Blending.** Smooth unions come for free, rather than the hard seams of boolean operations; see [[Constructive Solid Geometry]].
- **Inside and outside.** Whether a point is inside is a quick calculation, useful for collision tests; see [[Collision Detection]].

They need conversion to be drawn. One approach samples the field on a grid and extracts triangles where the threshold is crossed, the job marching cubes was invented for, and the 2D version, marching squares; see [[Marching Cubes]] and [[Voxel]]. Another skips triangles and marches rays through the field until they reach the surface; see [[Ray Marching]]. Modern shaders often use signed distance functions combined with a smooth minimum operation that produces the same melting blend; see [[Signed Distance Field]] and [[Shader]].

Metaballs became a demoscene signature in the 1990s. Real-time liquid blobs were an impressive effect on modest hardware, and they appeared in countless demos; see [[Demoscene]].

They have practical uses too. Fluid simulations that track liquid as particles often turn those particles into a surface by treating each as a metaball, so splashes and droplets separate and rejoin naturally; see [[Fluid Simulation]] and [[Particle System]]. Modeling programs include metaball tools for sculpting organic shapes, and some games used them for creatures, slime, and soft bodies.

Their main drawbacks are control and cost. Exact shapes are hard to design by moving points around, and evaluating the field for many balls at many sample points is expensive without spatial acceleration; see [[Spatial Partitioning]].

## See also
- [[Soft Body Dynamics]]
- [[Linear Interpolation]]
