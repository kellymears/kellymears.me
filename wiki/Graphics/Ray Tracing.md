---
aliases:
  - Path Tracing
  - Ray Tracer
tags:
  - graphics
summary: Renders images by tracing individual light paths through a scene instead of projecting geometry onto a screen.
---
**Ray tracing** generates an image by firing a ray from the camera through each pixel and following it into the scene, testing for intersections with geometry and then recursing along reflected, refracted, or shadow rays. Where rasterization asks "which pixels does this triangle cover," ray tracing asks "what does this pixel actually see," which is why it handles reflections, refractions, and accurate shadows without the special-case hacks rasterizers need for each.

**Path tracing** is the physically grounded extension: instead of a handful of deterministic bounce rays, it fires many randomly sampled rays per pixel and averages the results, approximating the full rendering equation by Monte Carlo integration. More samples reduce noise at the cost of time, which is why early frames of a path-traced render look grainy and converge toward a clean image as samples accumulate — the noise is the estimator's variance made visible.

Both approaches live or die on acceleration structures. Testing every ray against every triangle is intractable at scene scale, so renderers build a bounding volume hierarchy (BVH) or similar spatial index that lets a ray skip whole branches of geometry with one bounding-box test. GPU ray tracing hardware (Nvidia's RT cores, equivalents elsewhere) exists specifically to accelerate that traversal and intersection work.

Real-time ray tracing in games is almost never pure — it is a hybrid where rasterization draws the primary visible surfaces cheaply and ray tracing is reserved for a few expensive effects (reflections, ambient occlusion, global illumination), run at reduced sample counts and cleaned up with a denoiser trained to hallucinate a plausible converged image from a noisy one.

## See also
- [[Rasterization]]
- [[Physically Based Rendering]]
- [[Signed Distance Field]]
- [[Level of Detail]]
- [[Seeded Randomness]]

## Related
- [[Determinism]]
