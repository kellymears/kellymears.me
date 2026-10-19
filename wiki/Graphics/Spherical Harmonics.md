---
aliases:
  - Spherical harmonic lighting
  - Precomputed radiance transfer
tags:
  - graphics
summary: A family of functions on the surface of a sphere, the spherical counterpart of sine waves, used in graphics to store the light arriving from every direction in a handful of numbers for cheap, soft environment lighting.
---
**Spherical harmonics** are a family of functions defined on the surface of a sphere, the spherical counterpart of the sine waves used to break a signal into frequencies. In graphics, they're a compact way to store how light arrives at a point from every direction, letting a renderer approximate soft, diffuse lighting from a whole environment with a handful of numbers.

The idea comes from mathematics and physics. Any reasonably smooth function on a circle can be written as a sum of sine waves of increasing frequency; see [[Fourier series]]. Spherical harmonics do the same for a sphere. They're arranged in bands: band 0 is a single constant, the same in all directions; band 1 has three functions that vary smoothly from one side to the other; band 2 adds five more with finer variation, and so on. They also describe electron orbitals and Earth's gravitational field; see [[Gravity]].

Lighting is a natural fit. The light reaching a point from all around is a function on a sphere; see [[Image-Based Lighting]]. For matte surfaces, which scatter light evenly, the result depends mostly on the broad, low-frequency shape of that function, since sharp details are blurred away by averaging over a hemisphere; see [[Shading Model]]. In 2001, Ravi Ramamoorthi and Pat Hanrahan showed that the first three bands, nine numbers per color channel, reproduce diffuse lighting from an environment with only small errors.

Games use this heavily. An engine places probes through a level, records the incoming light at each, and compresses it to nine coefficients per color; see [[Baked Lighting]]. A moving character then blends the nearest probes, so it's lit by light bounced from the environment it passes through; see [[Global illumination]] and [[Radiosity]]. Evaluating the harmonics in a shader takes only a few multiplications and additions; see [[Shader]].

**Precomputed radiance transfer**, introduced in 2002 by Peter-Pike Sloan and colleagues, extends the idea to soft shadows and interreflections. It stores how each point on a fixed object responds to each harmonic of distant light, so lighting can change at run time while the expensive part stays precomputed; see [[Rendering Equation]].

The limitation is the flip side of the compression. Low bands can't represent sharp features: a small, bright sun becomes a broad glow, and the approximation can ring, producing slightly negative light opposite a bright source. Shiny reflections need far more detail and use other methods; see [[Physically Based Rendering]].

The functions have found a new use in captured scenes. In Gaussian splatting, each splat stores its color as spherical harmonic coefficients, so its appearance changes with viewing angle; see [[Gaussian Splatting]]. Keeping only the strongest coefficients is a kind of lossy compression; see [[Data Compression]].

## See also
- [[Normal Mapping]]
- [[Fresnel Effect]]
