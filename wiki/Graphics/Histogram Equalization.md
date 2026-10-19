---
aliases:
  - CLAHE
  - Contrast stretching
  - Adaptive histogram equalization
  - Histogram matching
tags:
  - graphics
summary: An image adjustment that redistributes brightness values so they spread evenly across the available range, revealing detail in murky or washed-out pictures, used in medical imaging and computer vision, with an adaptive variant that keeps it from amplifying noise.
---
An image's histogram counts how many pixels sit at each brightness level. A foggy photograph crowds its pixels into a narrow band of grays, and an underexposed one piles them up near black. Either way, much of the available range goes unused and detail is hard to see; see [[Histogram]].

**Contrast stretching** is the simple fix. Map the darkest pixel to black and the brightest to white, and scale everything in between linearly. It helps when values sit in one narrow band, but does nothing when a few stray pixels already reach both ends.

**Histogram equalization** goes further. It remaps each brightness level according to the fraction of pixels at or below it, the image's cumulative distribution. A level below which 30 percent of pixels fall becomes 30 percent gray. The result has a roughly flat histogram, with crowded ranges spread apart and sparse ones squeezed together, so contrast goes where most of the picture lives. The mapping is computed once as a table and then applied to every pixel.

It's effective but blunt. On a photograph it often looks harsh and unnatural, flattening tonal relationships and amplifying noise in smooth regions such as sky, because those dense ranges are stretched the most; see [[Denoising]]. It's mainly a tool for seeing rather than for beauty. Radiologists, microscopists and satellite analysts use it to bring out structure in X-rays, cell images and terrain, and computer vision systems often apply it before detecting features, so lighting differences matter less; see [[Image Sensor]].

A single global mapping also fails on images with distinct regions, such as a bright window in a dark room, since one curve can't suit both. **Adaptive histogram equalization** computes a separate mapping for each small tile and blends between neighboring tiles so seams don't show. Left alone, it over-amplifies noise in flat tiles. The standard version, **CLAHE**, for contrast-limited adaptive histogram equalization, clips each tile's histogram at a ceiling and spreads the excess across all levels before equalizing, which limits how steep the mapping can get. It was developed for medical imaging in the 1980s and is now standard in image processing libraries.

The same reasoning shapes how wide-range images are squeezed onto a screen. Some tone mapping operators allocate output levels according to the scene's luminance histogram, and games build a luminance histogram every frame to drive automatic exposure, the way eyes adjust on walking into a dark room; see [[Tone Mapping]], [[High Dynamic Range]] and [[Dark Adaptation]]. A cousin, **histogram matching**, remaps one image's tones to follow another's distribution, which helps match shots for color grading; see [[Post-Processing]].

Equalization works on brightness. Applying it separately to red, green and blue shifts colors, so it's normally applied to a lightness channel instead; see [[HSL and HSV]].

## See also
- [[Unsharp Masking]]
- [[Computer Vision]]
- [[Bilateral Filter]]
- [[Canny Edge Detector]]
