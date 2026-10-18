---
aliases:
  - Lerp
  - Interpolation
  - Inverse lerp
  - Lerp smoothing
tags:
  - graphics
summary: Blending between two values by a fraction, the one-line function behind animation, texture filtering, and color mixing, and the common frame-rate bug in using it for smoothing.
---
**Linear interpolation**, almost always shortened to **lerp**, finds a value partway between two others. Given a start *a*, an end *b*, and a fraction *t* from 0 to 1, the result is a + (b − a) × t. At t = 0 it returns *a*, at 1 it returns *b*, and at 0.5 the midpoint. It is probably the most used function in graphics and animation.

Lerp works on anything that can be added and scaled: positions, colors, sizes, angles. Animating an object from one point to another over a second is a lerp with *t* rising from 0 to 1. Feeding *t* through a curve first, rather than using it directly, produces acceleration and deceleration, the job of [[Easing]] functions.

Several useful relatives:

- **Inverse lerp.** Given a value between *a* and *b*, find the *t* that produces it. It turns a range into a percentage.
- **Remap.** An inverse lerp from one range followed by a lerp into another, converting any range to any other.
- **Bilinear and trilinear interpolation.** Lerping in two or three dimensions. Texture sampling blends the four nearest pixels bilinearly, and [[Mipmapping]] adds a third lerp between mipmap levels.
- **Curves.** A [[Bézier Curve]] can be drawn entirely by repeated lerps, de Casteljau's algorithm: lerp between control points, then between those results, until one point remains.
- **Slerp.** Rotations do not lerp correctly, since straight-line blends between orientations change speed and distort, so rotations use spherical interpolation of a [[Quaternion]].

What space you lerp in matters. Colors blended in gamma-encoded values produce muddy, dark midpoints, because the encoding is not linear in light; correct blending converts to linear light first, as described under [[Gamma Correction]]. Perceptual spaces such as OKLCH give even-looking gradients, which is why modern CSS lets designers choose the interpolation space for gradients and color mixing.

A common bug is **lerp smoothing**. Code that runs `x = lerp(x, target, 0.1)` every frame makes *x* glide toward the target, easing out naturally. But it moves 10 percent of the remaining distance *per frame*, so the motion is faster at 144 fps than at 30, the frame-rate dependence that a fixed-step [[Game Loop]] avoids. The fix is to make the fraction depend on elapsed time, using exponential decay: t = 1 − e^(−rate × Δt). Freya Holmér's 2024 talk popularized the fix.

There is also a numerical subtlety. The form a + (b − a) × t can miss *b* slightly at t = 1 because of [[Floating-Point Arithmetic]], while (1 − t) × a + t × b hits both ends exactly but can be non-monotonic. C++20's `std::lerp` guarantees both.

Interpolating between known samples also lets [[Frame Generation]] and [[Temporal Upscaling]] create in-between images.

## See also
- [[Bresenham's Line Algorithm]]
- [[Autoencoder]]
- [[Keyframe Animation]]
- [[Image Sensor]]
- [[Barycentric Coordinates]]
- [[Transformation Matrix]]
