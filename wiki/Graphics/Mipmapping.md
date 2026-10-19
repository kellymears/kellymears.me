---
aliases:
  - Mipmap
  - Mipmaps
  - Texture filtering
  - Anisotropic filtering
  - Trilinear filtering
tags:
  - graphics
summary: Storing a texture as a chain of progressively halved copies so that distant surfaces sample a pre-blurred version instead of shimmering.
---
**Mipmapping** stores each texture as a pyramid of copies, each half the width and height of the last: 1024×1024, 512×512, and so on down to a single pixel. When a surface is far away and one screen pixel covers many texture pixels (*texels*), the GPU reads from the smaller level that roughly matches, instead of the full-size original. The chain adds only a third to the texture's memory, since each level is a quarter the size of the one above. Lance Williams introduced it in 1983. "Mip" stands for *multum in parvo*, much in little.

The problem it solves is [[Aliasing]]. Without mipmaps, a distant brick wall samples a single texel per pixel from a texture full of detail too fine for the pixel grid. Which texel gets chosen changes with every tiny camera movement, so distant surfaces shimmer and crawl, and regular textures break into moiré patterns. Averaging all the covered texels per pixel would be correct but far too slow. A mipmap precomputes those averages once. Choosing the right level is a constant-time lookup, the same trade as [[Memoization]]: spend memory once to avoid repeated work.

Filtering sits on top of the level choice:

- **Bilinear filtering** blends the four nearest texels within one level.
- **Trilinear filtering** also blends between the two nearest levels, hiding the visible seams where one level hands over to the next.
- **Anisotropic filtering** handles surfaces seen at a steep angle, such as a road stretching away from the camera. A pixel's footprint there is a long, thin shape, so it takes several samples along the long axis. Without it, roads and floors turn blurry a short way ahead.

The same idea appears elsewhere. [[Level of Detail]] is mipmapping for geometry. [[Responsive Images]] on the web serve the right resolution for the display instead of shrinking a huge image in the browser. Virtual texturing and streaming systems treat the mip chain as a cache hierarchy, loading only the levels a view actually needs. [[Temporal Upscaling]] complicates the picture: rendering at a lower internal resolution and reconstructing upward means textures must be sampled with a bias toward sharper mip levels, or the output looks soft.

## See also
- [[Space-Filling Curve]]
- [[Map Projection]]
- [[Texture Compression]]
- [[Memoization]]
- [[Prefix Sum]]
- [[Shader]]
- [[Normal Mapping]]
- [[Baked Lighting]]
- [[Vector Graphics]]
- [[Texture Mapping]]
