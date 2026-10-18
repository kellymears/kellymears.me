---
aliases:
  - Vector image
  - Raster graphics
  - Bitmap
  - SVG
  - Scalable Vector Graphics
  - Resolution independence
tags:
  - graphics
summary: Images described as shapes and curves rather than a grid of pixels, so they stay sharp at any size, the basis of fonts, icons, logos, and maps.
---
**Vector graphics** describe an image as a set of geometric shapes: points, lines, [[Bézier Curve]] segments, and the fills and strokes applied to them. *Raster* graphics, or bitmaps, describe an image as a fixed grid of colored pixels. A vector circle is stored as a center and a radius. A raster circle is stored as whichever pixels happen to fall inside it. The difference decides what each is good for.

Vectors are *resolution independent*. Because the shapes are mathematical, they can be redrawn at any size, from a phone icon to a billboard, without losing sharpness. Scale a raster image up and the pixels show as blocks or blur. Vectors are also usually small for simple artwork and easy to edit, since every shape remains a separate object.

Their history starts with Ivan Sutherland's Sketchpad (1963), which let a user draw and manipulate shapes on a screen with a light pen. Early displays were sometimes vector hardware too: the electron beam traced lines directly instead of scanning a grid, giving arcade games such as *Asteroids* (1979) their glowing, razor-sharp outlines, which are notoriously hard to reproduce through [[Emulation]] on modern raster screens.

Vector formats are everywhere:

- **Fonts.** Every typeface is a set of vector outlines, so text stays crisp at any size and weight, including in [[Variable Fonts]].
- **Documents.** PostScript and PDF describe pages as vector shapes and text.
- **The web.** SVG, standardized by the W3C in 2001, is the format for icons, logos, charts, and illustrations that must look sharp on any screen and adapt to [[Dark Mode]] through CSS. It can be inlined or served as images, and unlike photographs it doesn't need the multiple sizes of [[Responsive Images]].
- **Maps and design.** Modern map tiles ship vector data drawn on the device, and illustration and interface design tools are built around vector editing.

Vectors are poor at photographs and natural textures, where detail doesn't reduce to clean shapes. They also have a cost at display time: every screen today is a pixel grid, so vector art must be converted to pixels through [[Rasterization]], with care to avoid jagged edges and [[Aliasing]]. Complex vector artwork can be slower to draw than a ready-made bitmap.

The line between the two has blurred. A [[Signed Distance Field]] stores shapes in a texture as distances to the nearest edge, letting games render text and icons with near-vector sharpness at any scale using a simple [[Shader]]. 3D graphics is fundamentally vector, built from triangles described by coordinates, until the final step turns it into pixels. A raster image scaled down needs [[Mipmapping]] or filtering to avoid shimmer, a problem vector art doesn't have.

## See also
- [[Bézier Curve]]
- [[Rasterization]]
- [[Signed Distance Field]]
- [[Aliasing]]
