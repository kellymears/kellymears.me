---
aliases:
  - Denoiser
  - Monte Carlo denoising
  - Ray Reconstruction
tags:
  - graphics
summary: Turning a speckled image rendered from a handful of random light samples into a clean one, by filtering across neighboring pixels and past frames, the step that makes real-time ray tracing possible.
---
**Denoising** in rendering is the step that turns a speckled image, computed from too few random samples of light, into a clean one. It is what made real-time ray tracing practical: games can afford only one or two rays per pixel, and the raw result looks like a photo taken in near darkness.

The noise comes from how physically based light is computed. The [[Rendering Equation]] says a pixel's brightness is an integral over all the light arriving from every direction. Path tracers estimate it by sampling random directions and averaging; see [[Monte Carlo Method]] and [[Ray Tracing]]. The error shrinks only with the square root of the sample count, so halving the noise takes four times the rays. Film renderers once spent thousands of samples per pixel; denoising lets them stop at dozens.

The main approaches:

- **Spatial filtering.** Average each pixel with its neighbors, but only those that belong to the same surface. Guide buffers holding depth, normals, and the unlit surface color stop the blur at edges and keep texture detail sharp, a cross-bilateral or edge-aware filter; see [[Convolution]].
- **Temporal accumulation.** Reproject the previous frame's result onto the current one using motion vectors and blend it in, so samples pile up across frames. When something moves or appears for the first time, the history is wrong and must be thrown away; see [[Temporal Upscaling]].
- **Variance guidance.** The widely used SVGF method (2017) tracks how noisy each pixel has been and filters noisy pixels harder than stable ones.
- **Learned denoisers.** A [[Neural Network]] trained on pairs of noisy and converged renders predicts the clean image. Film studios adopted these around 2017, and in 2023 NVIDIA's Ray Reconstruction folded denoising into its upscaler so one network handles both.

Separate effects need separate treatment. Shadows, reflections, and diffuse bounce light have different noise patterns, so engines often denoise each before combining them. Sample placement matters too: spreading random samples evenly with [[Blue Noise]] makes the remaining error finer grained and easier to filter.

The artifacts have their own vocabulary. **Ghosting** is history that should have been discarded, a trail behind moving objects. **Boiling** is low-frequency blotches that crawl across surfaces as the filter fails to settle. **Overblur** smears contact shadows and fine reflections into flat patches, and the soft indirect lighting that made the image look natural is the first thing lost; see [[Ambient Occlusion]].

Denoising also changed how renderers are designed. Rather than tracing enough rays for a clean image, modern engines trace the fewest they can and spend the budget on reconstruction, alongside upscaling and [[Frame Generation]]. The image on screen is increasingly an estimate built from sparse samples rather than a direct computation; see [[Physically Based Rendering]].

## See also
- [[Screen Space Reflections]]
- [[Dithering]]
- [[Image Sensor]]
- [[Photon]]
