---
aliases:
  - Barycentric coordinate
  - Barycentric interpolation
  - Edge function
tags:
  - graphics
summary: Describing a point inside a triangle as a weighted mix of its three corners, the arithmetic GPUs use to decide which pixels a triangle covers and to blend everything across its surface.
---
**Barycentric coordinates** describe a point inside a triangle by three weights, one per corner, that add up to 1. The center of the triangle is (⅓, ⅓, ⅓); a corner is (1, 0, 0); a point on an edge has a zero weight for the opposite corner. Any point in the triangle's plane can be written this way, and the point lies inside the triangle exactly when all three weights are between 0 and 1. August Möbius introduced them in 1827, the name coming from *barycenter*, the center of mass: the weights are the masses you'd put on each corner to balance the triangle at that point.

The weights have a geometric meaning. Draw lines from the point to each corner, splitting the triangle into three smaller ones. Each weight is the area of the small triangle opposite its corner, divided by the whole triangle's area. Computing those areas uses a simple cross-product expression called an **edge function**, which also tells which side of an edge a point is on.

That makes barycentric coordinates the workhorse of [[Rasterization]]:

- **Coverage.** To decide which pixels a triangle covers, the GPU evaluates the three edge functions at each pixel center. All positive means inside. The test is cheap and runs in hardware.
- **Interpolation.** Every vertex carries attributes: color, texture coordinates, normals, and depth. The value at any pixel is the weighted mix of the three vertices' values, using the pixel's barycentric weights. This is how [[Texture Mapping]] finds which texel to sample and how smooth shading blends normals across a face; see [[Shading Model]].
- **Depth.** The interpolated depth is written to the [[Depth Buffer]] to decide which surface is in front.

Perspective adds a wrinkle. Weights computed in screen space don't match the triangle's true 3D proportions, because distant parts are compressed by [[Perspective Projection]]. Interpolating texture coordinates directly in screen space makes textures appear to bend and swim, a famous artifact of the original PlayStation, which lacked perspective correction. The fix is to interpolate attributes divided by depth, then divide back per pixel, a step modern GPUs do automatically.

Barycentric coordinates appear outside rendering too:

- **[[Ray Tracing]].** The Möller–Trumbore algorithm tests whether a ray hits a triangle by solving for the barycentric coordinates of the hit point, then reuses them to interpolate surface attributes.
- **[[Collision Detection]].** Finding the closest point on a triangle, or testing whether a point is inside one, uses the same weights.
- **Meshes.** Placing objects on a [[Polygon Mesh]] surface, such as scattering grass, picks random barycentric weights per triangle.

They generalize: a point in a tetrahedron has four weights, and blending between any set of points works the same way. Barycentric weights are [[Linear Interpolation]] extended from two points to three or more.

## See also
- [[Tessellation]]
- [[Graphics Pipeline]]
- [[Transformation Matrix]]
- [[NURBS]]
