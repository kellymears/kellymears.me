---
aliases:
  - SDF
  - Distance Field
tags:
  - graphics
summary: A function giving the distance to the nearest surface, signed so inside and outside are distinguishable.
---
A **signed distance field** is a function that, for any point in space, returns the shortest distance to a surface — positive outside the shape, negative inside, zero exactly on the boundary. A sphere's SDF is trivial (distance to center minus radius); a scene's SDF is usually a composition of simpler ones combined with min, max, and smoothing operators.

The payoff is a rendering technique called **ray marching**: instead of solving for an exact intersection, a ray steps forward by whatever distance the field currently reports, which is guaranteed safe because no surface can be closer than that. Repeat until the distance is near zero (a hit) or the ray has traveled too far (a miss). This trades exact geometric intersection math for a handful of field evaluations, which is why so much demoscene and shader-art work — entire animated scenes with no vertex buffer at all — is built this way, evaluated per-pixel in a fragment shader.

SDFs compose unusually well. A **smooth minimum** between two fields blends their shapes with a rounded seam instead of a hard union, which is the standard trick behind procedural "metaball" blobs and organic-looking generative forms. Surface normals fall out for free too, as the gradient of the field, so lighting needs no separate normal data.

SDFs also back most GPU and game-engine text rendering (Valve's 2007 technique and its multi-channel successors): a glyph stored as a distance field stays crisp across a wide range of scales and rotations, unlike a fixed-resolution bitmap, because the renderer can re-threshold the same field at arbitrary zoom instead of interpolating pixels — though the field itself is still finite-resolution, so corners soften at extreme magnification, which is what multi-channel SDFs exist to fix. Mainstream OS and browser text stacks still rasterize outlines per size instead.

## See also
- [[Ray Tracing]]
- [[Marching Cubes]]
- [[Voxel]]
- [[Shader]]

## Related
- [[Procedural Generation]]
