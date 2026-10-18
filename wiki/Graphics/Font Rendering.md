---
aliases:
  - Text rendering
  - Font hinting
  - Subpixel rendering
  - ClearType
  - Glyph
  - Text shaping
tags:
  - graphics
summary: Turning outline fonts into crisp pixels on a screen, through hinting, anti-aliasing, and subpixel tricks, and why text looks different on every platform.
---
**Font rendering** is the process of drawing text from font files onto pixels. Modern fonts store each character's shape, its *glyph*, as an outline made of [[Bézier Curve]] segments: quadratic curves in TrueType and cubic ones in PostScript-based fonts. These outlines are [[Vector Graphics]], scalable to any size, but a screen is a grid of pixels. At body sizes a letter's stems get only a few pixels, so the conversion shapes how text looks.

Before drawing, a *shaping* engine converts a string of characters into positioned glyphs. It applies kerning, ligatures, and the contextual forms that scripts like Arabic and Devanagari require, building on [[Character Encoding]]. HarfBuzz, used by most browsers and Linux desktops, does this job.

Three techniques address the small-pixel problem:

- **Hinting.** Fonts can include instructions that nudge outlines to fit the pixel grid, snapping stems to whole pixels so they're sharp and even. Strong hinting makes text crisp but distorts letter shapes and spacing.
- **Anti-aliasing.** Instead of turning each pixel fully on or off, the rasterizer shades edge pixels by how much the outline covers them, then blends that coverage like transparency, as in [[Alpha Compositing]]. This trades jagged edges for slight softness; see [[Aliasing]].
- **Subpixel rendering.** LCD pixels are made of separate red, green, and blue stripes. Lighting them individually triples horizontal resolution for text. Microsoft's ClearType, released in 2000, made this standard on Windows.

Platforms chose differently. Windows long favored strong hinting and ClearType for sharpness, while Apple preserved the designer's shapes even when that meant softer text. Apple removed subpixel anti-aliasing in 2018, since its high-density displays had made it unnecessary. These choices explain why the same font looks heavier on a Mac and crisper on Windows.

Subpixel rendering is fragile. It assumes a horizontal RGB stripe, so screens with other layouts, such as many OLED panels, show colored fringes. It breaks when text is rotated, scaled, or drawn onto a transparent layer, and is destroyed by [[Chroma Subsampling]] on a television. High pixel density makes hinting and subpixel tricks largely unnecessary, since there are enough pixels to draw shapes faithfully.

Blending matters too. Whether coverage is blended in linear light or gamma-encoded values changes how heavy text appears, which is one reason light text on dark backgrounds can look thinner or bolder than dark text on light; see [[Gamma Correction]] and [[Dark Mode]].

Games and GPUs often render glyphs once into a texture atlas and reuse them. Valve popularized storing glyphs as a [[Signed Distance Field]] in 2007, keeping edges sharp at any scale. Terminals render a fixed grid of glyphs, the basis of every [[Terminal User Interface]]. On the web, [[Variable Fonts]] and [[Web Font Loading]] add more decisions about weight and when text first appears.

## See also
- [[Optical Alignment]]
- [[Iconography]]
- [[Typeface]]
