---
aliases:
  - Perspective-correct texture mapping
  - PlayStation texture warping
tags:
  - graphics
summary: A fast but inaccurate way of applying textures that interpolates linearly across the screen and ignores perspective, responsible for the warping, swimming textures of many original PlayStation games.
---
**Affine texture mapping** is a fast but inaccurate way of applying an image to a polygon, interpolating texture coordinates linearly across the screen without accounting for perspective. It produces the warping, swimming textures familiar from many games on the original PlayStation, released in 1994, whose hardware supported only this method.

Texture mapping assigns each corner of a triangle a position in an image, then fills the triangle's pixels by looking up the image at interpolated positions; see [[Texture Mapping]] and [[Barycentric Coordinates]]. The simple way is to interpolate those coordinates in screen space, stepping evenly across each row of pixels; see [[Linear Interpolation]]. That's correct if the triangle faces the camera squarely. Under perspective, though, equal steps across the screen don't match equal steps across the surface: the far part of a receding floor is compressed on screen, so its texture should be too; see [[Perspective Projection]].

Affine mapping ignores this. The texture is spread as though the triangle lay flat on the screen, so straight lines in the texture bend where triangles meet, and patterns slide across surfaces as the camera moves. The error is worst for large triangles seen at steep angles, such as walls and floors close to the camera. Small, distant triangles barely show it, which is why the flaw was easy to miss in screenshots and glaring the moment the camera moved.

The fix is **perspective-correct** mapping. Texture coordinates divided by depth do vary linearly across the screen, so the renderer interpolates those values along with the reciprocal of depth, then divides at each pixel to recover the true coordinates. That costs a division per pixel, which was expensive on mid-1990s hardware. Software renderers compromised: Quake, released in 1996, did the full correction only every 16 pixels and interpolated linearly in between, which was close enough to be invisible. Other games split large polygons into smaller ones, shrinking the error at the cost of more geometry; see [[Tessellation]] and [[Polygon Mesh]].

The PlayStation's look came from other shortcuts too. It had no depth buffer, so polygons were sorted, sometimes wrongly, and it snapped vertices to whole pixels, so models jittered as they moved; see [[Depth Buffer]] and [[Painter's algorithm]]. The Nintendo 64, released in 1996, corrected perspective and filtered textures in hardware, so its textures looked blurrier but steadier; see [[Mipmapping]].

By the late 1990s, graphics hardware had made perspective-correct mapping universal; see [[Graphics Processing Unit]]. Today the wobble is an aesthetic choice. Games evoking the era emulate affine textures, vertex snapping, and low resolution deliberately in shaders, part of a wider revival of retro rendering; see [[Pixel Art]] and [[Shader]].

## See also
- [[Mode 7]]
- [[Rasterization]]
