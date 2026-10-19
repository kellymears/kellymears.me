---
aliases:
  - Blending mode
  - Multiply blend
  - Additive blending
tags:
  - graphics
summary: A rule for combining a layer's colors with the colors beneath it, such as multiply, screen, overlay, and add, used in image editors, video tools, web pages, and the blending stage of real-time rendering.
---
A **blend mode** is a rule for combining the color of one image layer with the colors beneath it. Ordinary layering simply covers what's below, mixed by the top layer's transparency; see [[Alpha Compositing]]. Blend modes instead compute each result pixel from both colors through a formula, so a layer can darken, lighten, add contrast, or shift hue. They're a basic tool of image editors, video editing, motion graphics, and real-time rendering.

The common modes have simple definitions, applied channel by channel with colors scaled from 0 to 1:

- **Multiply** multiplies the two colors. White leaves the base unchanged, black makes it black, and everything else darkens, like stacking two slides on a light table. It's used for shadows and ink.
- **Screen** inverts both colors, multiplies them, and inverts again. Black leaves the base unchanged and everything else lightens, like projecting two slides onto the same screen.
- **Overlay** multiplies the dark areas of the base and screens the light ones, increasing contrast.
- **Add** sums the colors and clips at white, which suits glows, fire, and light; see [[Particle System]].
- **Difference** subtracts one from the other, turning identical areas black, which makes it handy for spotting changes between two images; see [[Visual Regression Testing]].

Multiply and add echo physical processes. Multiplying mimics light passing through two filters, each absorbing part of it, the way inks combine in print; see [[Halftone]]. Adding mimics two lights shining on the same spot, the way displays mix color; see [[Color Gamut]].

Results depend on what the numbers mean. Many modes were defined for gamma-encoded values, as stored in image files, rather than for linear light, so adding two lights in gamma space gives harsh, oversaturated overlaps. Renderers that aim for physical accuracy blend in linear space; see [[Gamma Correction]]. When values can exceed 1, modes that rely on clipping behave differently again; see [[High Dynamic Range]].

In real-time graphics, blending is a fixed stage of the pipeline: when a pixel is drawn, the hardware combines its color with what's already in the frame according to configurable factors; see [[Graphics Pipeline]]. Additive blending has a useful property: order doesn't matter, so glowing particles can be drawn without sorting. Most other blending depends on order, which makes transparency difficult; see [[Order-Independent Transparency]].

Image editors made the vocabulary standard among designers, and the same names now appear in web styling, which can blend page elements with each other and with their backgrounds; see [[Cascade]]. More exotic modes, such as soft light, are defined slightly differently from one program to the next, a minor but persistent compatibility headache.

## See also
- [[Chroma Key]]
- [[Post-Processing]]
- [[Compositor]]
- [[HSL and HSV]]
