---
aliases:
  - Instancing
  - Instanced rendering
  - Indirect drawing
tags:
  - graphics
summary: Drawing many copies of the same mesh in a single command, each with its own position and small variations, which lets a GPU render forests, crowds and asteroid fields without the processor issuing thousands of separate draw calls.
---
**GPU instancing** renders many copies of one mesh with a single draw command. Each copy, or instance, shares the same geometry and material but receives its own small set of data, typically a transformation matrix for position, rotation and scale, and perhaps a color or animation offset. The vertex shader reads the data for the instance it is drawing and places that copy accordingly; see [[Shader]] and [[Transformation Matrix]].

The problem it solves is overhead on the processor, not the graphics card. Every draw call makes the CPU validate state and talk to the driver. A scene with ten thousand trees drawn one call at a time can leave the CPU as the bottleneck while the GPU sits partly idle; see [[Draw Call]] and [[Graphics API]]. With instancing, the program uploads one buffer holding ten thousand transforms and issues one call. The GPU, built to process large batches in parallel, handles the rest.

Hardware instancing became widely available in the mid-2000s, through Direct3D 9-era graphics cards and OpenGL extensions, and is now a core feature of every modern API. Typical uses are anything numerous and repetitive: grass, foliage, rocks, buildings in a city, members of a crowd, bullets, and particles; see [[Particle System]] and [[Boids]].

Instancing has limits. All instances in a call share a mesh and a material, so variety comes from per-instance parameters such as tint, size or animation phase rather than different models. Distant objects should use simpler meshes, so engines usually group instances by level of detail and issue one instanced call per level; see [[Level of Detail]]. And drawing a million instances is wasteful if most are off screen or hidden; see [[Culling]].

That last problem led to **GPU-driven rendering**. With **indirect drawing**, the parameters of a draw call, including how many instances to render, are themselves stored in a GPU buffer. A compute shader can test every instance against the camera's view and the depth buffer, write only the visible ones to a list, and then render that list, without the CPU learning which objects survived. Systems that render enormous amounts of detail push the idea further, culling and drawing small clusters of triangles entirely on the GPU; see [[Virtualized Geometry]].

Ray tracing uses instancing too. A spatial structure built once for a mesh can be referenced many times with different transforms, so a forest of identical trees needs memory for only one tree plus a list of placements; see [[Bounding Volume Hierarchy]] and [[Ray Tracing]]. Film scenes rely on this to describe billions of leaves and grains of sand.

The idea resembles data-oriented design in engine code, where many entities with the same components are processed in one tight loop; see [[Entity Component System]] and [[SIMD]].

## See also
- [[Polygon Mesh]]
- [[Billboarding]]
