---
aliases:
  - Warped noise
  - Noise warping
tags:
  - graphics
summary: A procedural technique that distorts the coordinates fed into a noise function with another noise function, turning blobby noise into swirling, folded patterns that resemble marble, smoke, and eroded rock.
---
**Domain warping** is a technique in procedural graphics in which the coordinates fed into a function are first distorted by another function, usually noise. Instead of looking up a noise value at a point directly, a program shifts the point by an amount taken from a second noise field, then looks it up there. The result swirls, folds, and flows, producing patterns that look like marble, smoke, clouds, or eroded rock; see [[Perlin Noise]].

Plain noise has a recognizable sameness. Even when layered at several scales, it produces blobby, evenly spread features; see [[Fractal]]. Natural textures aren't like that: rock strata bend, smoke curls, and marble veins stretch along old currents. Warping the input space bends the pattern the same way, so features that were round become streaked and twisted.

The idea is old. Ken Perlin's 1985 paper on noise used a related trick for marble, adding noise to the input of a sine wave so its stripes waver; see [[Generative Art]]. The graphics programmer Inigo Quilez popularized a recursive form in which the warp itself is warped: the output of one noise lookup offsets the next, which offsets the next, producing intricate, almost organic shapes from a few lines of code. Shader artists use it widely, and it's a staple of demoscene productions; see [[Shader]] and [[Demoscene]].

Domain warping is especially useful for landscapes. Warped noise gives mountains with ridges that wind instead of spreading evenly, and coastlines that meander; see [[Terrain Generation]] and [[Procedural Generation]]. It's also cheap: each warp is just more noise evaluations, so even a two-level warp costs only a few times the original.

The idea applies beyond noise. Any image can be warped by offsetting where its pixels are sampled, which is how heat haze, underwater wobble, and glass distortion effects work in games; see [[Post-Processing]]. Distorting the input of a distance function bends the shape it describes, letting ray-marched scenes twist and melt; see [[Signed Distance Field]] and [[Ray Marching]].

Warping resembles the effect of flow. Carrying a pattern along a moving fluid produces similar swirling structure, and fluid simulations generate the real thing; see [[Fluid Simulation]]. Domain warping fakes the look cheaply, without simulating anything over time, though it lacks the consistency of a real flow. Its swirls don't move coherently when animated unless the warp is designed to.

Control is the main drawback. Because the output depends sensitively on the warp, small parameter changes can transform a pattern, and artists often tune by trial and error. Fixing the random seed keeps results repeatable while they experiment; see [[Seeded Randomness]]. Combining warps with cell-based noise produces cracked and cellular textures as well; see [[Voronoi Diagram]].

## See also
- [[L-System]]
- [[Convolution]]
