---
aliases:
  - Canny
  - Sobel operator
  - Hysteresis thresholding
tags:
  - graphics
summary: A multi-stage algorithm from 1986 that finds thin, continuous edges in an image by smoothing, measuring gradients, keeping only local maxima and linking strong and weak edges, and still a standard step in image processing.
---
The **Canny edge detector** finds the edges in an image, the places where brightness changes sharply, and reports them as thin, connected lines. John Canny described it in a 1986 paper that began by asking what a good edge detector should do. Canny set three criteria: find real edges while reporting few false ones, place each close to its true position, and mark each only once rather than as a thick band.

It runs in four stages:

1. **Smoothing.** The image is blurred with a Gaussian filter to suppress noise, which would otherwise produce countless tiny false edges. The blur radius sets the scale of edges detected; see [[Convolution]].
2. **Gradient.** Small kernels estimate how fast brightness changes horizontally and vertically at each pixel. The **Sobel operator**, a pair of 3-by-3 kernels proposed in 1968, is the usual choice. Together they give the strength of the edge and the direction it runs.
3. **Non-maximum suppression.** Edges in the gradient image are several pixels wide. Each pixel is compared with its two neighbors across the edge, along the gradient direction, and kept only if it is the strongest of the three. This thins every edge to a single pixel.
4. **Hysteresis thresholding.** Two thresholds are applied. Pixels above the high one are definite edges; pixels below the low one are discarded. Pixels in between are kept only if they connect to a definite edge, like flooding outward from strong pixels; see [[Flood Fill]]. This keeps faint stretches of real edges while rejecting isolated noise, and is the main reason Canny's results look continuous.

The method has few parameters, the blur size and the two thresholds, and works well across many kinds of images, which is why it is a default in computer vision libraries. Typical uses include finding the outline of a document in a phone photo, detecting lane markings, and measuring parts in industrial inspection. Edge maps also guide image editing and stylized rendering, such as drawing outlines for a cartoon look; see [[Cel Shading]] and [[Bilateral Filter]].

Its limits come from what it measures. It responds to any sharp change in brightness, so shadows, reflections and textures such as grass produce edges, while the boundary between two objects of similar brightness may produce none. Choosing thresholds remains a judgment call, and a single blur scale cannot capture both fine and coarse edges. Since the mid-2010s, neural networks trained on human-drawn outlines have learned to find object boundaries rather than brightness changes; see [[Object Detection]] and [[Image Sensor]].

Edge detection also appears in other contexts: video encoders, image upscalers and anti-aliasing filters look for edges to decide where to spend effort; see [[Aliasing]] and [[Optical Flow]].

## See also
- [[Unsharp Masking]]
- [[Histogram Equalization]]
- [[Computer Vision]]
