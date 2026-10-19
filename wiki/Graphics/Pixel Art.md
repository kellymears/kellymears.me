---
aliases:
  - Pixel artist
  - Pixel-perfect
  - Low-resolution art
tags:
  - graphics
summary: Digital art made by placing individual pixels deliberately at low resolution, born of hardware limits and now a chosen aesthetic with its own craft rules.
---
**Pixel art** is digital art created by placing individual pixels deliberately, usually at low resolution and with a limited palette. Each pixel is a decision. It began as a necessity, the only way to make graphics on early computers and consoles, and survives as a deliberate style with its own techniques, communities, and devoted audience.

Hardware set the original rules. Early machines had tiny resolutions, fixed palettes of a few dozen colors, and limits on colors per [[Sprite]] or per tile; see [[Tile Map]]. Artists had to suggest a face in a dozen pixels and a landscape in a handful of colors. Many of pixel art's conventions are solutions to those constraints that became aesthetic choices once the constraints lifted.

Core techniques:

- **Clean lines.** Lines are drawn so steps are consistent, such as 1-1-1 or 2-2-2 pixel runs. Irregular steps look jagged. Stray pixels that make a line look doubled or lumpy are called *jaggies*, the problem anti-aliasing addresses in rendering; see [[Aliasing]].
- **Manual anti-aliasing.** Instead of automatic smoothing, artists place intermediate colors by hand along edges, controlling exactly where softness appears.
- **Limited palettes.** A small, deliberate palette gives cohesion. Colors are often chosen as ramps that shift hue as they darken, toward blue or purple in shadow, rather than simply getting darker; see [[Color Quantization]].
- **[[Dithering]].** Checkerboard and pattern mixes of two colors simulate a third, a hardware-era technique still used for texture and gradients.
- **Readability.** At small sizes, silhouette and contrast matter more than detail. Animation frames are often exaggerated to read clearly in motion.

Displaying pixel art correctly is its own problem. Scaling a 320×180 image to a 4K screen with smooth filtering blurs it, so games use nearest-neighbor sampling and integer scaling, enlarging each pixel to an exact block; see [[Image Resampling]]. Non-integer scaling makes some pixels wider than others, which pixel artists notice immediately. There's also debate about authenticity: art made for CRT televisions relied on their blur and scanlines to blend dithering and soften edges, so on sharp modern screens it can look harsher than intended. Emulators offer [[Post-Processing]] filters that simulate CRTs; see [[Emulation]].

Modern pixel art often mixes eras. Games such as *Celeste*, *Stardew Valley*, and *Hyper Light Drifter* use low-resolution art with modern lighting, particles, smooth camera movement, and color counts no old console could display. Some critics call this "high-bit" pixel art, distinct from strict recreations of specific hardware.

Its appeal is partly economic, since small teams can produce consistent art, and partly creative: a tight canvas forces clarity. It sits alongside other deliberately non-photorealistic styles such as [[Cel Shading]] and [[Voxel]] art, a 3D cousin built from cubes.

## See also
- [[Smear Frame]]
- [[ASCII Art]]
- [[Stop Motion]]
- [[Indie Game]]
- [[Color Cycling]]
