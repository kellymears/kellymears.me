---
aliases:
  - Color space
  - Gamut
  - sRGB
  - Display P3
  - DCI-P3
  - Rec. 2020
  - White point
  - Gamut mapping
tags:
  - graphics
summary: The range of colors a device or color space can represent, drawn as a triangle of primaries inside the larger region of colors humans can see.
---
A **color gamut** is the set of colors a device can reproduce or a color space can encode. Because human vision is three-dimensional (see [[Metamerism]]), colors can be plotted on the CIE 1931 chromaticity diagram, a horseshoe-shaped region containing every hue a person can see. A display with red, green, and blue primaries can mix only colors *inside the triangle* those primaries form. Everything outside it, such as the most saturated cyans and spectral greens, the display cannot show.

A *color space* fixes the triangle's corners, a **white point**, and a transfer function (the gamma or perceptual curve):

- **sRGB** (1996) matches the CRT [[Fluorescence|phosphors]] of its time and covers roughly a third of visible colors. It remains the default for the web and for unlabeled images.
- **Display P3** (from the cinema standard DCI-P3) reaches noticeably deeper reds and greens, about 25% more area than sRGB. Most modern phones and laptops support it.
- **Rec. 2020** is the ultra-high-definition and [[High Dynamic Range]] target. It is so wide that few displays reach it fully, and it serves mostly as a container.

All three use a D65 white point, roughly 6,500 K daylight on the [[Color Temperature]] scale.

The space attached to an image has to be known. Pixel values are coordinates, not colors, and the same numbers mean different colors in different spaces. An untagged P3 image shown as sRGB looks dull. An sRGB image stretched across a wide-gamut panel without management looks garish, giving skin tones a sunburned cast. Operating systems and browsers perform **color management**, converting from the image's space to the display's. CSS can now express colors in wider spaces with `color(display-p3 …)` and `oklch()`, the latter also giving perceptually even steps for palette design.

When a source color falls outside the destination gamut, **gamut mapping** must choose a replacement. *Clipping* is simple but flattens subtle gradations. *Compressing* the whole range preserves relationships at the cost of overall saturation. It is the color equivalent of [[Tone Mapping]], which does the same for brightness. Light sources have gamuts too: an RGB smart bulb's triangle is set by its LEDs, and [[Color Rendering Index|color rendering]] describes how it lights other things. Good [[Color Contrast]] also depends on what the gamut can actually show.

## See also
- [[Color Quantization]]
- [[Blend Mode]]
- [[Halftone]]
- [[Structural Color]]
- [[Image Sensor]]
- [[OLED]]
- [[Image Format]]
- [[NTSC]]
