---
aliases:
  - Dither
  - Error diffusion
  - Floyd-Steinberg dithering
  - Ordered dithering
tags:
  - graphics
summary: Adding a deliberate pattern of noise when reducing colors, so the eye blends a few shades into many and smooth gradients don't break into bands.
---
**Dithering** is the deliberate addition of a fine pattern of noise when an image, or a sound, is reduced to fewer levels than it originally had. Without it, a smooth gradient squeezed into a limited palette breaks into visible bands, each a flat step of one color. With it, pixels of the available colors are mixed in varying proportions, and from a normal viewing distance the eye averages them into the in-between shades that aren't really there.

The main techniques differ in how they place the pattern:

- **Ordered dithering** compares each pixel against a repeating threshold matrix, most often the *Bayer matrix* devised by Bryce Bayer in 1973. It is fast and produces a regular crosshatch texture familiar from early computer graphics.
- **Error diffusion** quantizes each pixel to the nearest color, then spreads the rounding error onto neighbors not yet processed. The *Floyd–Steinberg* algorithm (Robert Floyd and Louis Steinberg, 1976) is the classic version and gives more organic-looking results.
- **Blue noise** dithering uses random-looking patterns with no low-frequency clumps, so the noise is as unobtrusive as possible. It is widely used in modern rendering.

Dithering was essential when hardware could show only a few colors. GIF images are limited to 256 colors and early web-safe palettes to 216. E-ink readers and many receipt printers still depend on it, and printing's *halftone* screens, which build photographs out of dots of varying size, are a physical relative. It survives as an aesthetic too: the 2018 game *Return of the Obra Dinn* renders its whole world in dithered one-bit black and white, and the [[Terminal User Interface]] tradition uses shaded block characters the same way.

It remains important in modern pipelines. Eight bits per channel gives 256 levels, few enough that a dark sky or a soft vignette visibly bands, especially after [[Gamma Correction]] and [[Tone Mapping]] stretch the shadows. Games and video encoders add a small amount of noise before rounding to hide it. Renderers also dither on purpose to save work: transparency, soft shadows, and [[Ambient Occlusion]] are often computed with a noisy pattern that [[Temporal Upscaling]] then averages smoothly across frames.

Audio uses the same idea. When a recording is reduced from 24-bit to 16-bit for distribution, a small amount of noise is added first, so quiet passages fade smoothly instead of turning into gritty distortion. In every case dithering trades a tiny amount of fine noise for the removal of a larger, structured error, the same reason [[Aliasing]] is often fought with jitter rather than more samples. The reduction it smooths over is a form of [[Quantization]], the term also used when language models are compressed to fewer bits.

## See also
- [[Gamma Correction]]
- [[Aliasing]]
- [[Color Gamut]]
- [[Perlin Noise]]
- [[Post-Processing]]
