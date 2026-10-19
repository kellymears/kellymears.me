---
aliases:
  - Edge-preserving smoothing
  - Joint bilateral upsampling
  - Guided filter
tags:
  - graphics
summary: An image filter that smooths noise while keeping edges sharp by averaging each pixel only with neighbors that are both nearby and similar in value, used in photo denoising, tone mapping, beauty filters and real-time rendering.
---
Blurring an image with a Gaussian kernel replaces each pixel with a weighted average of its neighbors, with nearer neighbors counting more. That removes noise, but it also blurs edges, because pixels on opposite sides of a boundary get averaged together; see [[Convolution]]. A **bilateral filter** adds a second weight. Each neighbor counts according to how close it is in space and how close it is in value. A pixel on the far side of a strong edge has a very different brightness, so it receives almost no weight, and the edge survives while flat regions are smoothed.

The name refers to those two weights, one for distance and one for intensity. Carlo Tomasi and Roberto Manduchi presented the filter under that name in 1998, though similar ideas had appeared earlier.

Because the weights depend on the image content, the bilateral filter is not a convolution, and a straightforward implementation is slow for large radii. Faster versions approximate it, for example by sorting pixels into a coarse three-dimensional grid of position and brightness, blurring the grid, and reading results back. That approach, the bilateral grid, made the filter fast enough for real-time video.

Uses include:

- **Noise reduction.** Smoothing flat areas such as skin or sky while keeping detail at boundaries; see [[Denoising]]. Beauty filters in camera apps lean heavily on it, which is why heavily filtered faces look waxy.
- **Tone mapping.** An influential 2002 method by Frédo Durand and Julie Dorsey split a high dynamic range image into a smooth base layer, obtained with a bilateral filter, and a detail layer. Compressing only the base layer reduces contrast without flattening texture; see [[Tone Mapping]] and [[High Dynamic Range]].
- **Stylization.** Repeated filtering flattens images into regions of nearly uniform color, a painted or cartoon look, often combined with edge outlines; see [[Cel Shading]] and [[Canny Edge Detector]].
- **Guided upsampling.** In a **joint** or **cross bilateral** filter, the edge weights come from a second image. A low-resolution depth map or ambient occlusion buffer can be upsampled using a full-resolution color or depth image as a guide, so that results snap to the true edges; see [[Ambient Occlusion]] and [[Dynamic Resolution Scaling]]. Real-time denoisers for path tracing use the same idea, guided by surface normals and depth; see [[Ray Tracing]].

The filter has known flaws. Strong smoothing can create a staircase effect, turning gentle gradients into flat bands, and enhancing the detail layer can produce halos and reversed gradients near edges. The guided filter, introduced in 2010, avoids some of these and runs in time independent of the radius. Many other edge-aware methods followed; see [[Unsharp Masking]] and [[Histogram Equalization]].

## See also
- [[Post-Processing]]
- [[Image Sensor]]
- [[Computer Vision]]
