---
aliases:
  - Frustum culling
  - Occlusion culling
  - Backface culling
  - Visibility culling
  - Potentially visible set
tags:
  - graphics
summary: Skipping work for anything that cannot appear in the final frame, which is most of a scene most of the time.
---
**Culling** is the practice of not rendering what can't be seen. At any moment, most of a game world is behind the camera, outside the [[Perspective Projection|field of view]], hidden behind walls, or facing away. Drawing it anyway wastes vertex processing, shading, and memory bandwidth on pixels that the [[Depth Buffer]] will throw away. The fastest geometry is geometry never sent to the GPU, so culling is often worth more than any amount of shader optimization.

The main kinds work at different scales:

- **Backface culling.** In a closed mesh, triangles facing away from the camera are always hidden by the front side. The GPU detects them from their vertex winding order and drops them, roughly halving triangle work for free.
- **Frustum culling.** The camera sees a truncated pyramid, the *view frustum*. Objects whose bounding box lies entirely outside it are skipped. A [[Bounding Volume Hierarchy]] or other spatial structure rejects whole regions at once rather than testing every object.
- **Occlusion culling.** Objects inside the frustum but hidden behind others are the hard case, since visibility depends on the scene itself. Approaches include hardware occlusion queries, a *hierarchical z-buffer* built from the previous frame's depth, and precomputed **potentially visible sets**. Quake precomputed, for each region of a level, which other regions could possibly be seen from it, which made its large indoor levels run on 1996 hardware.
- **Small-object and distance culling.** Objects that would cover less than a pixel or two are dropped entirely, the far end of [[Level of Detail]].

Culling is conservative by design. A false positive, culling something actually visible, causes a pop-in bug as objects appear late. A false negative only costs time. Errors in occlusion systems that use last frame's data show up as brief flashes of missing geometry when the camera whips around quickly.

Modern engines move culling onto the GPU itself, where compute shaders or mesh shaders test thousands of small clusters of triangles in parallel each frame. Game design meets culling at the level of the map: corridors, doors, and switchback paths are partly occlusion tools, and the [[Fog of War]] of strategy games hides information the renderer would otherwise have to draw. In [[Ray Tracing]], culling becomes the acceleration structure's job, since any ray can travel anywhere in the scene. The general principle, finding the cheapest test that rules out the most work, reappears in [[Bloom Filter]] lookups and database indexes.

## See also
- [[Clipping]]
- [[Virtual Scrolling]]
- [[Stencil Buffer]]
- [[Scene Graph]]
- [[Virtualized Geometry]]
- [[Shadow Volume]]
- [[Portal Rendering]]
- [[Baked Lighting]]
