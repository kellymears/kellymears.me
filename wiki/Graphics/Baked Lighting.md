---
aliases:
  - Lightmap
  - Lightmapping
  - Light baking
  - Light probe
  - Precomputed lighting
tags:
  - graphics
summary: Computing expensive lighting ahead of time and storing it in textures and probes, so a game can show soft bounced light it could never afford to calculate every frame.
---
**Baked lighting** is lighting computed ahead of time, during development, and stored so the game can simply look it up while running. The expensive part, tracing how light bounces between surfaces, happens once, in an offline process that may take minutes or hours. The result is saved as *lightmaps*, textures that record how much light falls on each part of each static surface. At runtime, the renderer just multiplies the surface's color by the stored light.

The payoff is lighting far better than the hardware could calculate live: soft shadows, color bleeding from a red wall onto a white floor, and the gentle bounce light that fills a room from a single window, a full global illumination solution at almost no runtime cost. *Quake* (1996) popularized lightmaps in 3D games, and its successors used radiosity, an algorithm that simulates light bouncing between surfaces, to compute them. Many celebrated-looking games have relied on carefully baked light.

The limitation is in the name: anything baked can't change. Lightmaps assume the lights and the geometry stay put. If a door opens, a wall is destroyed, or the sun moves for a day-night cycle, the baked light is wrong. Engines work around this in layers:

- **Light probes** store the incoming light at points scattered through a level, so moving characters and objects can pick up approximately correct bounced light from the nearest probes.
- **Reflection probes** capture the surroundings into a cube of images, giving shiny surfaces something plausible to reflect.
- **Mixed lighting** bakes indirect bounce light while computing direct light and shadows from key lights live, so a flashlight still works.
- **Baked visibility.** Some engines also precompute which areas can see which, so [[Culling]] can skip hidden rooms cheaply.

Baking has practical costs. Bake times slow iteration, since every lighting change means waiting. Lightmaps take memory and need careful texture layouts to avoid seams and leaks, and they are filtered with [[Mipmapping]] like any texture. [[Ambient Occlusion]] is often baked into textures for the same reason.

The idea is the graphics version of a general trade: precompute what doesn't change, and pay only for what does. It is the same reasoning behind [[Memoization]] and [[Static Site Generation]]. Real-time [[Ray Tracing]] and hybrid global illumination systems have reduced the need for baking, letting lighting respond to destruction and moving lights, but at a large cost in performance that [[Temporal Upscaling]] and denoising try to recover. Many games still bake where they can and compute live only where they must. The quality of either approach rests on the same physical models, the realm of [[Physically Based Rendering]], and both feed into [[Deferred Shading]] pipelines in modern engines.

## See also
- [[Ambient Occlusion]]
- [[Ray Tracing]]
- [[Physically Based Rendering]]
- [[Memoization]]
- [[Image-Based Lighting]]
