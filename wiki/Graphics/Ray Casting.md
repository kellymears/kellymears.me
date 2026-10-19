---
aliases:
  - Raycaster
  - Wolfenstein 3D
  - Digital differential analyzer
tags:
  - graphics
summary: Drawing a scene by sending one ray per screen column or pixel and finding the first thing it hits, the trick behind early-1990s pseudo-3D games and still the basic query for hit tests and line of sight.
---
**Ray casting** is a rendering technique that draws a scene by sending one ray from the eye for each column or pixel of the screen and finding the first thing it hits. Unlike [[Ray Tracing]], it stops there: no reflections, and no light bouncing on to other surfaces. The name also covers the general operation, used throughout games, of asking "what does this line hit first?"

Its most famous use is the pseudo-3D engine of early-1990s first-person games. Wolfenstein 3D (1992) stored each level as a flat grid of square cells, each either empty or wall; see [[Tile Map]]. To draw a frame, the engine cast one ray per screen column across the grid from the player's position. The distance to the wall each ray hit set the height of that column's vertical strip, tall for near walls and short for far ones, which gives correct [[Perspective Projection]] in a world where every wall is vertical and every floor flat.

The tricks that made it fast:

- **Grid stepping.** Rather than creep along the ray in small increments, the algorithm, a digital differential analyzer, jumps from one grid line to the next, checking only the cells the ray actually crosses. The cost per ray depends on how far it travels, not on how many walls exist; see [[Bresenham's Line Algorithm]].
- **Fixed-point math.** Processors of the time had slow or no floating-point units, so engines used scaled integers and precomputed tables of sines and tangents; see [[Fixed-point arithmetic]].
- **Fisheye correction.** Using the raw distance along each ray bends straight walls into curves, so engines measure distance perpendicular to the view plane instead.
- **Texture columns.** Where a ray strikes a wall picks one vertical slice of the wall texture, stretched to the column's height; see [[Texture Mapping]].
- **Sprites.** Enemies and items are flat images scaled by distance and clipped against a one-dimensional buffer of wall distances, a simple [[Depth Buffer]]; see [[Sprite]].

The limits follow from the design. Walls must stand on a grid at right angles, floors can't slope, and the player can't look up or down. Doom (1993) dropped the grid for walls at any angle and varying floor heights, sorting walls with [[Binary space partitioning]] instead of casting rays. Terrain engines of the same era, such as the Comanche helicopter games, cast rays across a height grid to draw rolling landscapes; see [[Voxel]].

Ray casting in the general sense never went away. Games cast rays to test whether a shot hits, whether an enemy can see the player, and what the mouse points at in a 3D scene; see [[Collision Detection]] and [[Fog of War]]. [[Ray Marching]] extends the idea to shapes described by distance functions.

A grid ray caster remains a popular first graphics project.

## See also
- [[First-Person Shooter]]
- [[Portal Rendering]]
