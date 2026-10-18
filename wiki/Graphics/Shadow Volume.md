---
aliases:
  - Stencil shadows
  - Carmack's reverse
  - Depth fail
tags:
  - graphics
summary: A shadowing technique that extrudes each object's silhouette away from the light and counts, per pixel, how many of those volumes a surface sits inside, giving pixel-sharp shadows famously used in Doom 3.
---
A **shadow volume** is the region of space an object blocks from a light: its silhouette, stretched away from the light to infinity. Anything inside that region is in shadow. The technique was described by Frank Crow in 1977, and for a few years in the early 2000s it was the most prominent way to render dynamic shadows in games.

The method works in three steps:

1. **Find the silhouette.** For each object, find the edges where triangles facing the light meet triangles facing away; see [[Polygon Mesh]].
2. **Extrude.** Stretch those edges away from the light, forming a closed volume of new polygons.
3. **Count.** Render the volumes without drawing them, using the stencil buffer, a per-pixel counter alongside the depth buffer. For each pixel, count how many volume faces lie in front of the visible surface, adding for faces entering a volume and subtracting for faces leaving one. A nonzero count means the surface is inside a shadow; see [[Depth Buffer]] and [[Graphics Pipeline]].

The simple version, counting faces in front of the surface, breaks when the camera itself is inside a shadow volume, because the entering face is behind the viewer. The fix counts the faces behind the surface instead, which works wherever the camera sits. Several people found it independently around 2000, and it became known as Carmack's reverse after John Carmack described it while developing *Doom 3*. Creative Labs held a patent on similar work, and id Software settled the question by adding support for Creative's audio technology to the game.

*Doom 3* (2004) used stencil shadows for every light in every scene, giving it a unified, dark look in which every object cast sharp shadows on every other. The strengths were exactness and consistency: shadows are pixel-accurate at any distance, with no blur or blocky edges.

The weaknesses won out:

- **Hard edges.** Real shadows soften with distance from the object and with larger lights, and shadow volumes produce only perfectly sharp ones; see [[Ambient Occlusion]].
- **Cost.** The volumes are huge, covering much of the screen many times over, and fill rate grows with scene complexity.
- **Geometry demands.** Meshes must be closed, and silhouettes must be recomputed whenever objects or lights move, which suits simple geometry poorly, especially detail added by normal maps or alpha-tested foliage; see [[Normal Mapping]].

Shadow mapping, introduced by Lance Williams in 1978, renders the scene from the light's view into a depth image and compares distances. It handles any geometry, scales better, and can be blurred into soft shadows, so it replaced volumes in nearly every engine; see [[Shadow mapping]]. Ray-traced shadows now offer exactness and softness together, at the cost of tracing rays; see [[Ray Tracing]] and [[Culling]].

## See also
- [[Volumetric Lighting]]
- [[Rendering Equation]]
