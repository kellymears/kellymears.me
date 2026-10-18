---
aliases:
  - Anti-aliasing
  - Jaggies
  - MSAA
  - FXAA
  - Nyquist frequency
  - Moiré pattern
tags:
  - graphics
summary: The artifacts that appear when a continuous signal is sampled too coarsely, from jagged edges and shimmering textures to wagon wheels that spin backward.
---
**Aliasing** is what happens when a continuous signal is sampled too sparsely to capture it. Detail finer than the sampling rate doesn't simply disappear. It shows up disguised as a lower-frequency pattern that was never there, an *alias*. The Nyquist–Shannon sampling theorem gives the limit: to represent a frequency faithfully, you need to sample at more than twice that frequency. Anything above that limit folds back into false patterns.

In rendering, the pixel grid is the sampling rate. A diagonal triangle edge is a perfectly sharp boundary, and [[Rasterization]] with one sample per pixel turns it into a staircase, the "jaggies". Fine detail does worse. A distant fence, a striped shirt, or a high-frequency texture produces moiré patterns, and in motion those patterns crawl and shimmer from frame to frame. Thin geometry such as wires and foliage flickers in and out as it falls between sample points. The same effect appears outside graphics: the wagon wheel that seems to spin backward on film, a camera filming a screen, or the beat between a light's PWM rate and a camera shutter in [[LED Flicker]].

The remedies all amount to either sampling more or [[Image Resampling|filtering detail out before sampling]]:

- **Supersampling (SSAA)** renders at a higher resolution and averages down. It is correct and very expensive.
- **Multisample anti-aliasing (MSAA)** takes several coverage samples per pixel at geometry edges but shades each pixel once. It fixes edges cheaply but does nothing for shader or texture aliasing, and it fits poorly with [[Deferred Shading]].
- **Post-process filters (FXAA, SMAA)** find edges in the finished image and blur along them. They are fast, but they can soften the whole frame.
- **Temporal anti-aliasing (TAA)** jitters the sample position each frame and blends results across frames, gaining many samples over time. Modern [[Temporal Upscaling]] grows out of it. The cost is ghosting and smearing in motion.
- **Prefiltering** removes detail before it can alias. [[Mipmapping]] does this for textures, and [[Level of Detail]] does it for geometry.

[[Ray Tracing]] aliases too. Path tracers trade aliasing for noise by placing samples randomly within each pixel, since noise reads as grain while aliasing reads as structure.

## See also
- [[Halftone]]
- [[Interlacing]]
- [[Bresenham's Line Algorithm]]
- [[Blue Noise]]
- [[Timbre]]
- [[Screen Tearing]]
- [[Apparent Motion]]
