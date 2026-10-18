---
aliases:
  - Painter's algorithm
  - Depth sorting
  - Depth peeling
  - Weighted blended OIT
tags:
  - graphics
summary: Why see-through surfaces are hard for a rasterizer, and the sorting, peeling, and approximation techniques that make glass, smoke, and foliage render correctly in any order.
---
**Order-independent transparency** (OIT) is the family of techniques that render overlapping see-through surfaces correctly no matter what order they are drawn in. It exists because ordinary transparency depends heavily on order, and a real-time renderer doesn't naturally draw things in the right one.

The problem comes from two facts. The [[Depth Buffer]] stores only one depth per pixel, the nearest opaque surface, so it can't track several layers of glass at once. And the standard "over" operator of [[Alpha Compositing]] isn't commutative: red glass in front of blue glass gives a different color from blue in front of red. Opaque objects can be drawn in any order because the depth test keeps the nearest one. Transparent ones need to be blended back to front.

The traditional answer is the **painter's algorithm**: draw opaque geometry first, then sort transparent objects by distance and draw them from farthest to nearest, the way a painter puts the background down first. It mostly works, and nearly every engine still does it for ordinary scenes, but it fails in known ways. Sorting is per object, not per pixel, so a large transparent object that both contains and surrounds others sorts wrongly. Intersecting surfaces have no correct order at all, and three objects can overlap cyclically. Sorting thousands of [[Particle System]] sprites every frame also costs time, and each one is usually its own [[Draw Call]].

True OIT techniques work per pixel:

- **A-buffers** (Loren Carpenter, 1984) store a list of every fragment at each pixel, then sort and blend the lists. Modern GPUs can build these as per-pixel linked lists, but memory is unbounded.
- **Depth peeling** (Cass Everitt, 2001) renders the scene several times, each pass peeling off the next-nearest layer. It is exact up to the number of passes and correspondingly slow.
- **Weighted blended OIT** (Morgan McGuire and Louis Bavoil, 2013) gives up exactness. It replaces "over" with a weighted average, which is commutative, weighting nearer and more opaque fragments more heavily. It runs in one pass and looks right for smoke and particles, though not for strongly colored stacked glass.
- **Stochastic transparency** draws each fragment opaque with a probability equal to its alpha, a form of screen-door [[Dithering]], and relies on multisampling or [[Temporal Upscaling]] to smooth the noise.

[[Ray Tracing]] sidesteps much of this, since a ray meets surfaces in depth order along its own path. [[Gaussian Splatting]] lives with it: millions of semi-transparent splats are re-sorted by depth every frame, using a fast GPU [[Sorting Algorithm]].

## See also
- [[Alpha Compositing]]
- [[Depth Buffer]]
- [[Deferred Shading]]
- [[Particle System]]
