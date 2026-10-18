---
aliases:
  - Indexed color
  - Median cut
  - Palette reduction
  - Color palette
tags:
  - graphics
summary: Reducing an image to a small set of representative colors, the problem behind GIFs, retro palettes, and palette swaps, and how algorithms choose which colors to keep.
---
**Color quantization** reduces the number of distinct colors in an image, ideally choosing a small palette that still looks like the original. A photograph may contain hundreds of thousands of colors; a GIF can hold at most 256, and early home computers often had 16 or fewer.

The usual storage format is **indexed color**. Each pixel holds a small index, typically 8 bits or less, into a palette table, sometimes called a color lookup table, that holds the actual RGB values. An 8-bit indexed image is a third the size of a 24-bit one before any [[Data Compression]] and still supported by PNG.

Quantizing has two parts: choose the palette, then map each pixel to a palette entry. Choosing is the hard part, and several classic algorithms attack it:

- **Median cut** (Paul Heckbert, 1982) treats the colors as points in a 3D box, repeatedly splits the box with the most spread at the median of its longest side, and takes the average of each final box as a palette entry.
- **Octree quantization** (1988) inserts colors into an [[Octree]] and merges the least-used leaves until the palette fits.
- **k-means clustering** refines a starting palette by moving each entry to the average of the pixels assigned to it, repeating until it settles. Tools such as pngquant combine it with median cut.

Results depend on the color space. Distances in raw sRGB values don't match perceived differences, because the values are gamma-encoded, as [[Gamma Correction]] explains, and the eye is more sensitive to some hues than others. Quantizing in a perceptual space such as CIELAB or OKLab spends palette entries where viewers can tell colors apart.

Mapping pixels to the nearest entry produces banding, also called posterization. [[Dithering]] trades that banding for fine noise. Floyd–Steinberg error diffusion (1976) pushes each pixel's rounding error onto its neighbors, so an area's average color stays right even though no single pixel matches.

Indexed color also enabled tricks that direct color can't do. Changing one palette entry recolors every pixel that uses it instantly, so games made enemy variants by **palette swapping** the same sprite, and *Mortal Kombat*'s ninjas are the famous example. *Color cycling* rotated palette entries to animate water, fire, and waterfalls without redrawing anything; Mark Ferrari's landscapes are the best-known showcase. A [[Tile Map]] on old consoles assigned a palette to each region of the screen, which shaped the look of a whole era.

Today quantization survives in GIFs, in compressed texture formats, in [[Cel Shading]] that quantizes lighting rather than color, and in pixel art made within deliberate limits. The ideas reach into a wider [[Color Gamut]] question: which colors to keep when you can't keep them all.

## See also
- [[Dithering]]
- [[Color Gamut]]
- [[Data Compression]]
- [[Tile Map]]
- [[Pixel Art]]
- [[Texture Compression]]
- [[Halftone]]
- [[K-Means Clustering]]
