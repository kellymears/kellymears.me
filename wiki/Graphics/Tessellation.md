---
aliases:
  - Tessellation shader
  - Displacement mapping
  - Hardware tessellation
tags:
  - graphics
summary: Subdividing coarse geometry into many smaller triangles on the GPU, so curved surfaces and displaced detail can be generated where and when they are needed.
---
**Tessellation** is the subdivision of a surface into smaller polygons. In real-time graphics it usually means *hardware tessellation*: the [[Graphics Processing Unit]] takes a coarse [[Polygon Mesh]] and splits each patch into many triangles on the fly, so geometric detail is created at draw time instead of being stored and uploaded.

DirectX 11 and OpenGL 4.0, both from 2009 and 2010, added three pipeline stages for it:

- A **hull shader** (a tessellation control shader in OpenGL) decides how finely to divide each patch, typically by how large it will appear on screen.
- A fixed-function **tessellator** generates the new vertices in a regular pattern.
- A **domain shader** (tessellation evaluation) positions each new vertex, for example by evaluating a [[Bézier Curve]] surface or by reading a height texture.

That last option is **displacement mapping**: moving vertices along the surface normal by an amount read from a texture. It differs from [[Normal Mapping]], which only fakes bumps by changing the lighting. Displacement changes the actual silhouette, so cobblestones stick up from the road and occlude each other. Dense tessellation plus displacement made terrain, water, and stone the showcase of early DirectX 11 benchmarks.

The appeal is adaptive detail. The same patch can be split into a handful of triangles when far away and thousands when close, a continuous form of [[Level of Detail]] without visible popping between models. Curved surfaces stay curved at any distance, and memory and bandwidth hold only the coarse cage, while the GPU builds the rest each frame.

The problems were practical. GPUs shade pixels in 2×2 blocks, so triangles smaller than a few pixels waste most of that work, and over-tessellation became a performance trap. *Crysis 2* (2011) was criticized for tessellating flat concrete barriers and an invisible ocean into millions of triangles. Heavy displacement also cracks along seams where adjacent patches disagree about height.

The film industry got there first. Pixar's REYES architecture, behind RenderMan from the 1980s, diced every surface into *micropolygons* smaller than a pixel before shading. Catmull–Clark subdivision (1978) is still the standard for smoothing a modeled cage into a curved surface.

In games, the fixed tessellation stages have been largely overtaken. Mesh shaders, introduced with NVIDIA's Turing architecture in 2018, let a compute-style [[Shader]] generate geometry in any pattern. Unreal Engine 5's Nanite goes further, streaming clusters of pre-built micro-triangles and drawing the smallest with a software rasterizer, because hardware [[Rasterization]] handles pixel-sized triangles poorly. The goal hasn't changed: put triangles where the viewer can see them and nowhere else.

## See also
- [[NURBS]]
- [[Affine Texture Mapping]]
- [[Marching Cubes]]
- [[Draw Call]]
- [[Barycentric Coordinates]]
- [[Terrain Generation]]
- [[Graphics Pipeline]]
- [[Utah Teapot]]
