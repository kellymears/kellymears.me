---
aliases:
  - Palette animation
  - Palette shifting
  - Palette swap
tags:
  - graphics
summary: Animating a still image by rotating the colors in its palette rather than redrawing pixels, the trick behind shimmering water in 8- and 16-bit games and behind recolored enemies.
---
**Color cycling** is an animation technique that changes an image's colors instead of its pixels. It depends on indexed color, the scheme most home computers and consoles of the 1980s and early 1990s used: each pixel stored a small number, an index into a palette of at most a few hundred colors, and the hardware looked up the actual color as it drew the screen; see [[Color Quantization]]. Changing one palette entry instantly recolored every pixel that used it, at almost no cost, while redrawing those pixels would have taken far more time than the machine had.

The classic use is rotation. An artist reserves a run of palette entries, say eight shades of blue, and paints a waterfall using them in sequence down its length. Each frame, the program shifts the colors one slot along the run, so the pattern appears to flow, though no pixel changed. The same trick animated flowing water, flickering fire, glowing lava, pulsing lights, and the rolling color bands of the [[Demoscene]]; see [[Racing the Beam]].

The artist Mark Ferrari took it furthest. In backgrounds for Lucasfilm Games titles such as *Loom* (1990), and later in standalone landscapes, Ferrari painted scenes where carefully interleaved color runs produced rain, snowfall, rippling reflections, and a day passing into night, all from a single still image. The scenes relied on hand-placed [[Dithering]] so that neighboring pixels belonged to different cycles. A 2010 web demo that recreated them in the browser brought the work to a new audience.

Palettes also gave games cheap variety. A **palette swap** reuses the same [[Sprite]] with a different palette to make a new character or enemy, such as a red soldier and a blue one, or the second player's version of the hero. Early fighting and role-playing games used it to stretch limited cartridge memory, and players learned to read a recolored enemy as a tougher version of one they had already met; see [[Pixel Art]].

Other effects came from changing the whole palette at once. Fading every entry toward black made a smooth fade-out without touching the image, and flashing it white signaled damage. Some systems changed the palette partway down the screen, so a water line could tint everything beneath it.

The technique faded when displays moved to direct color, where each pixel stores its own red, green, and blue values and there is no palette to rotate. It survives as a style. Modern engines imitate it with a [[Shader]] that maps a grayscale index image through a color ramp, which is also how an animated [[GIF]] can be given a cycling palette cheaply. The same lookup idea underlies color grading with a LUT; see [[Post-Processing]].

## See also
- [[Tile Map]]
- [[Game Preservation]]
- [[NTSC]]
- [[Mode 7]]
