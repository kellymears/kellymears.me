---
aliases:
  - Alpha channel
  - Alpha blending
  - Premultiplied alpha
  - Porter-Duff
  - Over operator
tags:
  - graphics
summary: Combining images using a fourth channel that records each pixel's opacity, the arithmetic behind transparency, layering, and smooth edges.
---
**Alpha compositing** combines images using an *alpha channel*, a fourth value stored with each pixel's red, green, and blue that records how opaque the pixel is, from 0 for fully transparent to 1 for fully opaque. Alvy Ray Smith and Ed Catmull developed the integrated alpha channel in the late 1970s. In 1984, Thomas Porter and Tom Duff defined an algebra of compositing operators, now called the **Porter-Duff** operators.

The most common operator is **over**: put image A on top of image B. Each resulting pixel is A's color weighted by A's alpha, plus B's color weighted by whatever A lets through. Other operators cut images by each other's shapes, such as *in*, *out*, and *atop*, which is how masks and clipping work.

**Premultiplied alpha** stores color already multiplied by alpha. A half-transparent red pixel is stored as half-intensity red with alpha 0.5. This makes the over operation simpler and, more importantly, makes filtering correct. With straight alpha, a fully transparent pixel can still hold a color, often black or white, and when an image is scaled or blurred that hidden color bleeds into the edges, leaving dark or light fringes around sprites and icons. Premultiplied alpha avoids the problem in [[Image Resampling]] and [[Mipmapping]], which is why game engines and compositors use it internally.

Order matters. The over operator isn't commutative: A over B differs from B over A. In 3D rendering this creates a long-standing problem. Opaque objects can be drawn in any order, because the [[Depth Buffer]] keeps the nearest surface, but transparent ones must be sorted back to front and blended in order. Sorting fails when transparent objects intersect, and [[Deferred Shading]] has no room to store several overlapping surfaces per pixel, so engines draw transparent objects in a separate pass. *Order-independent transparency* techniques exist but cost memory or accuracy. [[Particle System]] effects like fire often use *additive* blending instead, which ignores order.

Compositing also has a color-space subtlety. Blending should happen in linear light, but much software blends gamma-encoded values directly, which makes edges between bright and dark colors look too dark; see [[Gamma Correction]].

Alpha is everywhere in interfaces. A desktop [[Compositor]] layers translucent windows and shadows; browsers composite CSS opacity in groups defined by the [[Stacking Context]]; video editors key out green screens into alpha. Smooth edges themselves are a form of alpha: an anti-aliased edge pixel is partly covered, so its coverage is blended like opacity, as discussed under [[Aliasing]]. Text works the same way, with each glyph rendered as a coverage mask, as described under [[Font Rendering]].

Alpha has limits in what it can represent. A single value per pixel can't express colored glass that tints what's behind it differently for each color, which requires separate transmission per channel.

## See also
- [[Lens Flare]]
- [[Sprite]]
- [[GIF]]
- [[Stencil Buffer]]
- [[Order-Independent Transparency]]
