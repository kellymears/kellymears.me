---
aliases:
  - Deferred rendering
  - G-buffer
  - Forward rendering
  - Forward+
  - Clustered shading
tags:
  - graphics
summary: Rendering scene geometry into intermediate buffers first and computing lighting afterward, so lighting cost scales with pixels rather than with objects times lights.
---
**Deferred shading** splits rendering into two passes. The geometry pass draws every object once, but instead of computing final colors it writes the ingredients of lighting into a set of screen-sized textures called the **G-buffer**: base color, surface normal, roughness, metalness, and depth. The lighting pass then reads those buffers and computes lighting for each pixel, once, against every light that reaches it.

The alternative, **forward rendering**, lights each object as it is drawn. With many lights, its cost grows with objects times lights, and any pixel drawn several times by overlapping objects is lit several times, with all but the last result thrown away. Deferred shading fixes both. The [[Depth Buffer]] has already resolved visibility by the time lighting runs, so only visible pixels are lit, and each light only touches the screen area it affects. Scenes went from a handful of dynamic lights to hundreds, which is why deferred shading dominated game engines from the late 2000s.

The trade-offs are real:

- **Memory and bandwidth.** A G-buffer at 4K is several full-screen textures written and read every frame, and on mobile GPUs that bandwidth is the main cost.
- **Transparency.** The G-buffer holds one surface per pixel, so glass, smoke, and water still need a separate forward pass.
- **Anti-aliasing.** Hardware MSAA multiplies the G-buffer size, so deferred engines rely on post-process and temporal [[Aliasing]] fixes, and later on [[Temporal Upscaling]].
- **Material variety.** Every material must fit the G-buffer's fixed format, which pushes engines toward one shared material model, conveniently the one [[Physically Based Rendering]] provides.

Modern engines often use **forward+** or **clustered shading** instead: a light-culling pass bins lights into screen tiles or 3D clusters, then a forward pass lights each pixel against only the lights in its cluster. It keeps forward rendering's flexibility and MSAA with deferred-like light scaling. Many engines run a hybrid, deferred for opaque surfaces and forward+ for transparent ones.

The underlying idea is separating what is visible from how it looks, decoupling an expensive computation from the count of things that might need it. It is a form of [[Lazy Evaluation]]: do the expensive work only for results that will survive. Screen-space effects such as [[Ambient Occlusion]] and reflections fall out of it, since the G-buffer already holds normals and depth for every pixel.

## See also
- [[Shading Model]]
- [[Rasterization]]
- [[Culling]]
- [[Order-Independent Transparency]]
- [[Swap Chain]]
- [[Screen Space Reflections]]
- [[Shader]]
- [[Subsurface Scattering]]
- [[Post-Processing]]
