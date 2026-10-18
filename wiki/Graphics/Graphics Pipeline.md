---
aliases:
  - Rendering pipeline
  - Framebuffer
  - Fixed-function pipeline
tags:
  - graphics
summary: The sequence of stages a GPU runs to turn triangles into pixels, from transforming vertices through rasterization and shading to depth testing and blending, once fixed in hardware and now mostly programmable.
---
The **graphics pipeline** is the sequence of stages a GPU uses to turn a 3D scene described as triangles into a 2D image. Each stage takes the output of the one before, and the GPU runs every stage at once on different pieces of work, much as a processor overlaps instructions; see [[Instruction Pipelining]] and [[Graphics Processing Unit]].

A frame begins on the CPU, which sets up state and issues commands that each say, in effect, "draw these triangles with these settings"; see [[Draw Call]] and [[Graphics API]]. Then the GPU takes over:

1. **Vertex processing.** A small program runs once per vertex, moving it from the model's own coordinates into the camera's view and projecting it toward the screen; see [[Shader]].
2. **Optional geometry stages.** Tessellation can split triangles into finer ones for detail up close; see [[Tessellation]].
3. **Clipping and culling.** Triangles outside the view, or facing away from the camera, are discarded; see [[Culling]].
4. **Rasterization.** Each remaining triangle is converted into fragments, one per pixel it covers, with values such as color and texture coordinates blended across its surface; see [[Rasterization]].
5. **Fragment shading.** Another program computes each fragment's color, sampling textures and applying lighting; see [[Texture Mapping]].
6. **Output merging.** Each fragment is tested against the depth already stored, so nearer surfaces hide farther ones, and blended with what's there for transparency; see [[Depth Buffer]].

The result lands in a **framebuffer**, a block of memory holding one color per pixel, which is handed to the display when the frame is complete; see [[Swap Chain]].

Early GPUs ran a fixed-function pipeline: every stage was hardwired, and programmers could only choose among built-in lighting and texturing options. Programmable vertex and pixel shaders arrived around 2001, letting developers write their own stages. Later designs unified the hardware, so the same processing cores run whichever stage has work, and newer approaches replace the early geometry stages with more general compute-style programs.

The pipeline's order has consequences. Fragments are shaded before the depth test can reject them, so overlapping surfaces waste work; some engines therefore render geometry first and light it in a later pass; see [[Deferred Shading]]. Transparent objects must be drawn in the right order to blend correctly. And because each triangle is processed independently, effects that depend on the rest of the scene, such as reflections and shadows, need extra passes or tricks.

Ray tracing follows a different model, tracing paths of light from the camera into the scene rather than projecting triangles onto the screen, and modern GPUs run both, often in the same frame; see [[Ray Tracing]].

## See also
- [[Stencil Buffer]]
- [[Game Engine]]
