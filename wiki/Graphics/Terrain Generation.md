---
aliases:
  - Heightmap
  - Diamond-square algorithm
  - Hydraulic erosion
tags:
  - graphics
summary: Creating landscapes by algorithm rather than by hand, usually as a grid of heights shaped with layered noise and then weathered by simulated erosion, the basis of open-world maps and endless game worlds.
---
**Terrain generation** is the creation of landscapes by algorithm. Games, films, and simulations need mountains, valleys, and coastlines far larger than artists could sculpt by hand, so they generate them from rules and random numbers, then let artists refine the result; see [[Procedural Generation]].

The most common representation is a **heightmap**: a grid in which each cell stores the ground's elevation, often saved as a grayscale image with brighter pixels higher. A heightmap is compact and easy to render as a mesh, but it can't represent overhangs, caves, or arches, since each point has exactly one height. Worlds that need those use 3D grids instead and extract surfaces from them; see [[Voxel]] and [[Marching Cubes]].

Early methods subdivided recursively. The **diamond-square algorithm** starts with heights at the corners of a square, sets the center to their average plus a random offset, then repeats on ever-smaller squares, reducing the randomness at each level. The result is a rough, mountainous surface with detail at every scale; see [[Fractal]].

Modern generators mostly sum layers of smooth noise: a low-frequency layer for continents and ranges, then layers of higher frequency and lower amplitude for hills, ridges, and rocks; see [[Perlin Noise]]. Shaping functions sharpen ridges, flatten plains, or carve terraces. Each generator is driven by a seed, so the same world can be regenerated exactly from one number; see [[Seeded Randomness]].

Noise alone looks wrong to the eye, because real landscapes are shaped by water. Rivers cut valleys that branch and join, slopes shed sediment into fans and flat plains, and drainage connects everything. **Hydraulic erosion** simulates this: virtual raindrops fall on the terrain, flow downhill, pick up sediment where fast, and drop it where they slow. Thousands of iterations turn bland noise into believable mountains. Thermal erosion separately collapses slopes too steep to stand.

Beyond shape, generators assign rock, grass, snow, and sand by height, slope, and moisture, and split the world into regions such as forest or desert, often using cells around scattered points; see [[Voronoi Diagram]]. Textures are blended across the surface by those same rules; see [[Texture Mapping]].

Rendering large terrain needs care. Distant ground is drawn with fewer triangles, and detail is added near the camera; see [[Level of Detail]] and [[Tessellation]]. Infinite worlds generate chunks on demand as the player approaches and discard them behind.

Terrain shapes gameplay: sightlines, routes, and landmarks matter more than geological accuracy; see [[Open World Design]] and [[Level Design]]. Many games combine generated terrain with hand placement. Real elevation data from satellites and surveys provides another source, used in flight simulators and maps; see [[Photogrammetry]].

## See also
- [[Sandbox Game]]
- [[Fluid Simulation]]
