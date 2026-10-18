---
aliases:
  - Light transport
  - BRDF
  - Bidirectional reflectance distribution function
  - Global illumination equation
tags:
  - graphics
summary: James Kajiya's 1986 equation describing how light leaves every point in a scene, the exact target that every rendering technique approximates.
---
The **rendering equation** describes how much light leaves a point on a surface in a given direction. James Kajiya published it in 1986, unifying earlier rendering methods as special cases of one formula. Every photorealistic rendering technique is a way of approximating its solution.

In words, the light leaving a point toward the viewer equals the light the surface emits itself, plus all the light arriving from every direction in the hemisphere above the point, each weighted by how much the surface redirects light from that incoming direction toward the viewer, and by the angle of arrival.

That weighting function is the **BRDF**, the bidirectional reflectance distribution function, defined by Fred Nicodemus in 1965. It encodes a material's look: a matte surface's BRDF spreads light evenly, a mirror's sends it in one direction, and brushed metal stretches highlights along its grain. [[Physically Based Rendering]] is largely about choosing BRDFs that obey physics: conserving energy, being reciprocal, and including the [[Fresnel Effect]]. Classic formulas such as Phong are crude BRDFs; see [[Shading Model]].

The equation is recursive, which is what makes it hard. The light arriving at a point is light leaving other points, each of which depends on light arriving at *them*. Light bounces indefinitely, so a red wall tints a white floor, and a sunlit room is lit mostly by light that has bounced several times. This indirect light is **global illumination**, and it's much of what makes images look real.

The equation has no closed-form solution for real scenes, so renderers approximate it:

- **Path tracing**, proposed by Kajiya in the same paper, solves it with the [[Monte Carlo Method]]: trace random light paths from the camera, bouncing at each surface according to the BRDF, and average many samples per pixel. With enough samples it converges to the right answer, but noisy images need denoising; see [[Ray Tracing]].
- **[[Rasterization]]** computes direct lighting cheaply and fakes the rest: ambient terms, [[Ambient Occlusion]] for contact darkening, and screen-space tricks.
- **Precomputation.** [[Baked Lighting]] solves the equation offline for static scenes, and [[Image-Based Lighting]] captures incoming light from the environment in a texture.
- **Radiosity**, an earlier method from heat transfer engineering, solves the matte-surfaces-only case.

The equation also has deliberate omissions. It handles surfaces, not participating media such as fog, smoke, and skin; extending it to volumes gives the volume rendering equation, needed for [[Subsurface Scattering]] and the methods of [[Ray Marching]]. It treats light as rays, so wave effects such as diffraction and interference are absent. And it assumes light arrives instantly.

Real-time graphics spent decades approximating global illumination. Hardware ray tracing and neural denoisers since 2018 made real-time path tracing possible in some games, bringing interactive rendering closer to solving Kajiya's equation directly.

## See also
- [[Inverse-Square Law]]
- [[Refraction]]
- [[High Dynamic Range]]
- [[Volumetric Lighting]]
