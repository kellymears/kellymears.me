---
aliases:
  - Gamma
  - Gamma encoding
  - Linear color
  - Transfer function
  - sRGB transfer function
  - Color banding
tags:
  - graphics
summary: The nonlinear encoding that spends a limited number of bits where human vision is most sensitive, and the source of a classic rendering bug when math is done on encoded values.
---
**Gamma correction** is the nonlinear mapping between a stored pixel value and the light it represents. In 8-bit sRGB, the value 128 does not mean half the light of 255. It means roughly a fifth. The encoding is deliberate. Human vision responds to light roughly logarithmically, far more sensitive to differences between dark shades than between bright ones. With only 256 levels per channel, a linear encoding would waste most of its codes on bright values the eye can barely tell apart and leave visible steps, *banding*, in the shadows. A gamma curve spends the codes where perception needs them.

The name comes from CRT monitors, whose output light followed a power law of input voltage with an exponent, *gamma*, of about 2.2. Encoding images with the inverse curve made them display correctly, and it happened to match perception, so the convention outlived the hardware. The sRGB standard formalized it in 1996 as a *transfer function*, a power curve of about 2.2 with a short linear segment near black.

The rendering rule that follows is simple and easy to break: **do math on light in linear space, store and display in gamma space.** Light adds linearly, so blending, lighting, blurring, and resizing are only physically correct on linear values. Doing them on encoded values produces well-known bugs:

- **Dark, muddy blends.** Averaging encoded black and white gives about 128, which displays as roughly 22% brightness instead of 50%. Gradients and anti-aliased edges look too dark, and image downscaling darkens fine detail.
- **Wrong lighting falloff.** Lighting computed on encoded colors looks harsh and over-contrasty, and [[Physically Based Rendering]] stops matching reality.
- **Doubled or missing correction.** Applying the curve twice washes images out, and missing it crushes them.

GPUs handle sRGB textures and framebuffers in hardware, converting to linear on read and back on write, so the bug usually comes from tagging data incorrectly, such as treating a normal map as color. [[High Dynamic Range]] replaces the sRGB curve with transfer functions such as PQ, designed for far brighter displays, and [[Tone Mapping]] decides how scene light maps into them. On the web, color spaces such as [[OKLCH]] go a step further, aiming for steps that are perceptually uniform in lightness as well as encoded efficiently. The curve is separate from the [[Color Gamut]], which sets which colors are representable rather than how brightness is spaced.

## See also
- [[Shading Model]]
- [[Linear Interpolation]]
- [[Weber-Fechner Law]]
- [[Image Sensor]]
- [[Color Scale]]
- [[Aliasing]]
- [[Color Contrast]]
- [[Dithering]]
- [[Alpha Compositing]]
- [[Chroma Subsampling]]
