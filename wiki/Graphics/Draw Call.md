---
aliases:
  - Draw calls
  - Batching
  - Texture atlas
tags:
  - graphics
summary: A single request from the CPU asking the GPU to draw something, whose per-call overhead long limited how many separate objects a game could show.
---
A **draw call** is a single command from the CPU telling the GPU to draw a set of triangles with the current settings: which [[Shader]] to use, which textures, which blend mode, and which mesh. Rendering a frame means issuing a long list of them, often one or more per visible object, per material, per pass. The GPU can process triangles at enormous rates, but each draw call carries fixed overhead on the CPU side, where the driver validates state, translates commands, and submits work. For many years that overhead, not the GPU, decided how many separate objects a game could show.

In the era of Direct3D 9 and OpenGL, developers often worked to a budget of a few thousand draw calls per frame before the CPU became the bottleneck, and changing state between calls, especially switching shaders or textures, made each one more expensive. The problem is similar to the [[N+1 Query Problem]] in databases: many small round trips cost far more than one large one.

Engines developed standard techniques to reduce the count:

- **Batching.** Combine many objects that share a material into one mesh and draw them together.
- **Instancing.** Draw many copies of the same mesh, such as trees, rocks, crowds, or grass, in a single call, with a buffer of per-copy positions and colors.
- **Texture atlases.** Pack many small textures into one large image so objects that would need different textures can share a material and be batched.
- **Sorting by state.** Order draws to minimize expensive switches, grouping everything that uses the same shader.
- **Drawing less.** [[Culling]] skips objects that are off screen or hidden, often using a [[Bounding Volume Hierarchy]], and [[Level of Detail]] swaps distant objects for cheaper versions.

Newer graphics APIs, Vulkan, Direct3D 12, and Apple's Metal, all released around 2014 to 2016, were designed largely to cut this overhead. They make the application responsible for work the driver used to do, allow commands to be recorded on many CPU threads, and make individual draw calls much cheaper. The trade-off is complexity, and a [[API Translation Layer]] that maps an older API onto a newer one has to bridge the difference. One visible cost of the new model is that shader pipelines must be compiled up front, which surfaces as [[Shader Compilation Stutter]] when it isn't done ahead of time.

The latest step is *GPU-driven rendering*, in which the GPU itself decides what to draw through indirect draw commands, culling and building its own work lists without a round trip to the CPU. Large numbers of small effects, such as those in a [[Particle System]], are usually instanced or generated on the GPU for the same reason.

## See also
- [[Virtualized Geometry]]
- [[Portal Rendering]]
- [[Stencil Buffer]]
- [[Scene Graph]]
- [[Graphics Driver]]
- [[WebGPU]]
- [[Graphics API]]
