---
aliases:
  - Texture
  - Textures
  - Texel
  - UV mapping
  - UV unwrapping
  - Texture coordinates
tags:
  - graphics
summary: Wrapping a 2D image onto a 3D surface by giving each vertex coordinates into the image, the technique that gives rendered objects their detail.
---
**Texture mapping** applies a 2D image, a *texture*, to the surface of a 3D model. Ed Catmull described the technique in his 1974 doctoral thesis. Instead of modeling every brick or freckle as geometry, a renderer paints detail onto relatively simple shapes, which is why it remains central to real-time graphics.

Each vertex of a [[Polygon Mesh]] carries *texture coordinates*, conventionally called U and V, giving a position in the image from 0 to 1. During [[Rasterization]], the GPU interpolates these coordinates across each triangle, and for every pixel a [[Shader]] looks up the matching point in the texture. A pixel of a texture is called a *texel*.

The interpolation has to account for perspective. Interpolating coordinates linearly in screen space makes textures warp and swim on surfaces angled away from the camera. The original PlayStation did exactly this, called *affine* texture mapping, and its wobbly walls are part of the console's look. Correct mapping divides by depth, as described under [[Perspective Projection]].

**UV unwrapping** is the artist's job of flattening a 3D surface onto the 2D image, like cutting and laying flat the skin of an orange. It can't be done without seams or stretching on curved shapes, the same problem as projecting the globe onto a flat map. Artists place seams where they'll be hidden and keep texel density even so no area looks blurrier than its neighbors.

Sampling the texture is a [[Image Resampling]] problem. When a texel covers several screen pixels, the renderer must interpolate, either blocky nearest-neighbor or smooth bilinear filtering. When many texels fall within one pixel, as on distant surfaces, sampling just one causes shimmering, which [[Mipmapping]] solves with prefiltered smaller copies.

Textures carry far more than color. Modern materials stack several maps per surface:

- **Normal maps** fake surface bumps by altering lighting directions, as described under [[Normal Mapping]].
- **Roughness and metalness maps** drive [[Physically Based Rendering]].
- **Lightmaps and occlusion maps** store precomputed shadows, as in [[Baked Lighting]] and [[Ambient Occlusion]].

Textures dominate video memory, so they're stored in *block compression* formats that the GPU decodes on the fly. Unlike JPEG, these formats compress every small block to a fixed size, so the GPU can jump straight to any texel; see [[Data Compression]]. Games combine many small textures into a [[Draw Call|texture atlas]] to cut overhead, and stream higher-resolution versions in as the camera approaches, with lower ones used at a distance as part of [[Level of Detail]]. Textures that arrive late cause visible *pop-in*.

Some surfaces skip stored images entirely. Procedural textures compute patterns in the shader from functions such as [[Perlin Noise]], and *triplanar mapping* projects textures from three axes so terrain needs no unwrapping.

## See also
- [[Caustics]]
