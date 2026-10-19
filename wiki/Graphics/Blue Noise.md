---
aliases:
  - Poisson disk sampling
  - Stochastic sampling
  - Void and cluster
tags:
  - graphics
summary: Randomness with the clumps removed, whose evenly spread points and fine-grained error make dithering, sampling, and object placement look natural.
---
**Blue noise** is random-looking noise with almost no low-frequency content: its energy sits at high frequencies, so it has no clumps and no large gaps. Points scattered by blue noise look evenly spread but irregular, like the cells of a honeycomb that has been shaken. The name follows the color analogy for noise spectra, where white noise has equal energy at all frequencies and blue light sits at the high-frequency end.

The contrast with white noise is the point. Points placed independently at random, as a plain [[Pseudorandom Number Generator]] gives them, clump together and leave holes, because independence means nothing prevents two points landing next to each other. Clumps are low-frequency structure, and the eye picks them out immediately. Blue noise removes them while keeping the irregularity that prevents regular patterns.

Nature found it first. In 1983 John Yellott showed that the cone cells outside the fovea of a monkey's retina are arranged in a blue-noise pattern. A regular grid of sensors would cause [[Aliasing]], producing false patterns from fine detail; an irregular but even layout turns that error into faint noise instead.

Graphics uses blue noise in several ways:

- **[[Dithering]].** Robert Ulichney's *Digital Halftoning* (1987) argued that the best dither patterns have blue-noise error. His void-and-cluster method (1993) generates threshold textures that dither an image with fine, uniform grain and none of the crosshatch look of ordered dithering.
- **Sampling.** **Poisson disk sampling** places points randomly but no closer than a minimum distance. Robert Bridson's 2007 algorithm does it in linear time, and it is the standard way to scatter trees, rocks, and grass in [[Procedural Generation]] without obvious clusters.
- **Rendering noise.** [[Ray Tracing]], [[Ambient Occlusion]], soft shadows, and volumetric effects estimate integrals from a few random samples per pixel. Using blue noise for those samples doesn't reduce the total error, but it distributes the error as high-frequency grain, which looks better and is far easier for denoisers and [[Temporal Upscaling]] to filter away. Spatiotemporal blue noise extends the idea across frames.

The perceptual reasoning is general. Human vision is least sensitive to error at the highest spatial frequencies, so moving error there hides it, which is the same principle behind noise shaping in audio. Blue noise isn't more accurate than white noise; it puts the inaccuracy where it's least visible.

Generating good blue noise is slow, so it is usually precomputed into a small tiling texture and reused with [[Seeded Randomness]] offsets. Related point sets include [[Voronoi Diagram]] relaxation, which nudges points toward the centers of their cells to even out spacing, and the smooth fields of [[Perlin Noise]], which aim at a different, lower-frequency look.

## See also
- [[Foveated Rendering]]
- [[Low-Discrepancy Sequence]]
- [[Halftone]]
- [[Importance Sampling]]
- [[Volumetric Lighting]]
