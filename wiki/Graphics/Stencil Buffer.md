---
aliases:
  - Stencil test
  - Stencil mask
tags:
  - graphics
summary: A per-pixel integer stored beside the depth buffer that the GPU can test and update while drawing, used to mask rendering to arbitrary shapes for mirrors, portals, outlines, decals, and shadow volumes.
---
The **stencil buffer** is an extra value, usually eight bits, stored for every pixel alongside the [[Depth Buffer]]. It holds no color. Instead, the GPU can test it before drawing a pixel and update it afterward, which lets a renderer mark regions of the screen in one pass and restrict drawing to them, or away from them, in the next. It works like a paper stencil laid over the screen, cut into any shape the scene can draw; see [[Graphics Pipeline]].

The mechanics are simple. For each pixel a draw covers, the **stencil test** compares the stored value with a reference value set by the program, using a comparison such as equal, not equal, or less than. Pixels that fail aren't drawn. Separately, the program chooses what happens to the stored value in three cases, when the stencil test fails, when it passes but the depth test fails, and when both pass: keep it, zero it, replace it with the reference, increment it, decrement it, or invert its bits. Those few operations combine into a surprising range of effects; see [[Rasterization]].

Common uses:

- **Mirrors and portals.** First draw the mirror's shape, writing 1 into the stencil. Then draw the reflected scene with the test set to pass only where the stencil is 1, so the reflection appears only inside the frame.
- **Outlines.** Draw an object while writing 1 under it, then draw a slightly enlarged copy in a solid color only where the stencil is not 1. The result is a clean silhouette edge, used for selection highlights and stylized looks; see [[Cel Shading]].
- **Shadow volumes.** Shadow geometry is drawn into the stencil only, incrementing for faces entering a volume and decrementing for faces leaving it. Pixels left with a nonzero count are in shadow. The technique carried the hard-edged shadows of Doom 3; see [[Shadow Volume]].
- **Decals and masking.** Restricting a bullet hole or a painted marking to the surface it hit, or clipping a user interface element to a rounded panel; see [[Alpha Compositing]].

Counting also renders [[Constructive Solid Geometry]] directly: by counting how many surfaces of each solid lie in front of a pixel, the renderer can tell whether that point is inside a union, intersection, or difference without building the combined mesh.

Depth and stencil usually share memory, typically 24 bits of depth and 8 of stencil per pixel, and are cleared together each frame. Modern hardware tests both early, before running the pixel's [[Shader]], so masked pixels cost almost nothing. Deferred renderers use the stencil to mark which pixels each light touches, so lighting shaders run only where they matter; see [[Deferred Shading]].

## See also
- [[Order-Independent Transparency]]
- [[Culling]]
