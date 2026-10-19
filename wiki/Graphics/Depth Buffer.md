---
aliases:
  - Z-buffer
  - Z-buffering
  - Z-fighting
  - Depth testing
  - Reverse-Z
tags:
  - graphics
summary: A per-pixel record of the nearest surface drawn so far, which resolves visibility in rasterization without sorting the scene.
---
A **depth buffer**, or z-buffer, stores one depth value per pixel alongside the color image, recording how far away the nearest surface drawn so far at that pixel is. When [[Rasterization]] produces a new fragment, the GPU compares its depth with the stored value. If the new fragment is closer, it is drawn and the depth is updated. Otherwise it is thrown away. This *depth test* solves the hidden-surface problem, deciding which surface is in front, for any arrangement of triangles drawn in any order.

Before z-buffering, renderers had to sort geometry back to front and paint in that order (the *painter's algorithm*). Sorting is costly, and it fails outright for interpenetrating or cyclically overlapping triangles, where no correct order exists. The z-buffer, described by Edwin Catmull in 1974, replaces global sorting with a local per-pixel comparison. That makes it simple and endlessly parallel, at the cost of memory, which made it impractical until memory became cheap. It is the reason real-time 3D works the way it does. CSS faces a smaller version of the same problem, and solves it with the [[Stacking Context]] instead: an explicit ordering, closer to the painter's algorithm.

The depth buffer has characteristic failures:

- **Z-fighting.** Depth is stored with limited precision. Two surfaces at nearly the same depth, such as a decal on a wall or overlapping coplanar polygons, round to the same value, and they flicker as each wins on alternate pixels and frames.
- **Uneven precision.** Perspective projection spends most of the precision close to the camera, leaving distant geometry starved. Pushing the near clipping plane out helps a lot. *Reverse-Z* stores depth backwards in floating point, which nearly evens the distribution out, and most modern engines use it.
- **Transparency.** A depth buffer holds one surface per pixel, so it can't handle see-through layers. Transparent objects are still sorted and drawn after opaque ones, with their depth writes turned off.

The buffer is useful for more than visibility. Shadow maps are depth buffers rendered from the light's point of view. [[Ambient Occlusion]] in screen space reads it to find creases. A *depth pre-pass* fills it first so that expensive shading runs only on visible pixels, a form of [[Culling]] that [[Deferred Shading]] gets automatically.

## See also
- [[Stereoscopy]]
- [[Screen Space Reflections]]
- [[Barycentric Coordinates]]
- [[Isometric Projection]]
- [[Ray Casting]]
- [[Lens Flare]]
- [[Billboarding]]
- [[Shadow Volume]]
- [[Decal]]
- [[Order-Independent Transparency]]
