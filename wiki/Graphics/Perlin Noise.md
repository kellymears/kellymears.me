---
aliases:
  - Gradient noise
  - Simplex noise
  - Coherent noise
  - Fractal noise
  - Octave noise
tags:
  - graphics
summary: Ken Perlin's smoothly varying pseudorandom function, invented to make computer graphics look less machine-made, and still the basis of procedural terrain, clouds, and fire.
---
**Perlin noise** is a smoothly varying pseudorandom function, a kind of randomness that changes gradually from point to point instead of jumping, so it looks natural rather than like television static. Ken Perlin developed it in the early 1980s after working on the film *Tron* (1982), frustrated by how clean and machine-like computer imagery looked. He published it in 1985, and in 1997 received an Academy Award for Technical Achievement for its impact on film effects.

The method is *gradient noise*. Space is divided into a grid. Each grid point is assigned a pseudorandom direction, its gradient. To find the noise value at any position, the algorithm looks at the surrounding grid points, measures how the position lines up with each gradient, and blends the results with a smooth easing curve. Because neighboring points share grid corners, the output varies continuously, with features roughly one grid cell across. Since the gradients come from a hash of the grid coordinates, the same input always gives the same output, so a world can be regenerated from a seed (see [[Seeded Randomness]]).

A single layer of noise looks like soft blobs. The characteristic natural look comes from **octaves**: adding several layers, each at double the frequency and roughly half the amplitude of the last. Broad hills get smaller bumps, which get smaller pebbles. This sum, often called fractal noise or fractal Brownian motion, mimics the self-similar detail of coastlines, mountains, and clouds.

Uses are everywhere in procedural content:

- **Terrain.** Heightmaps for open worlds, from flight simulators to block-built [[Voxel]] games, start from layered noise, often shaped further and meshed with [[Marching Cubes]] for caves and overhangs. See [[Procedural Generation]].
- **Textures.** Marble, wood grain, clouds, fire, and water are classic [[Shader]] effects built from noise, computed on the fly with no stored image.
- **Motion.** Gentle noise drives grass swaying in wind, a flickering flame, or a handheld camera's drift, and noise-based screen shake feels better than purely random jitter, part of [[Game Feel]].

Perlin introduced *simplex noise* in 2001, which uses triangles instead of squares, has fewer directional artifacts, and scales better to higher dimensions. A patent on simplex noise in 3D and higher led others to create OpenSimplex as an alternative until it expired in 2022. Simpler *value noise* blends random values instead of gradients and looks blockier.

Noise is one of several procedural building blocks. An [[L-System]] grows branching plants by rewriting rules, a [[Cellular Automaton]] evolves cave-like patterns from local neighbors, and a [[Signed Distance Field]] describes shapes that noise can then roughen. Perlin noise is the opposite of the uniform, uncorrelated noise used in [[Dithering]], whose job is to be invisible.

## See also
- [[Voronoi Diagram]]
- [[Ray Marching]]
- [[Blue Noise]]
- [[Generative Art]]
- [[Fractal]]
