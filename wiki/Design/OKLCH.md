---
aliases:
  - Perceptual color
  - LCH
tags:
  - design
summary: A perceptually uniform color space that makes lightness and chroma behave predictably.
---
**OKLCH** is a color space expressing a color as lightness, chroma, and hue, built on the Oklab model. Its defining property is *perceptual uniformity*: equal numeric steps correspond to roughly equal perceived differences, which is emphatically not true of the older sRGB or HSL representations.

That property is what makes it useful for design systems. In HSL, holding lightness constant while changing hue produces colors that look wildly different in brightness — yellow at fifty percent lightness is far brighter than blue at fifty percent. Building a palette in HSL therefore requires hand-correcting every hue. In OKLCH, a lightness ramp reads as a lightness ramp across the whole hue circle, so a systematic palette can be generated rather than tuned.

It also handles wide-gamut displays. OKLCH can express colors outside sRGB, with well-defined behavior when clamping into a narrower gamut, which matters as displays outgrow the old standard.

The practical caution is that perceptual uniformity is not the same as *contrast compliance*. Two colors with equal OKLCH lightness may still fail an accessibility contrast ratio, because that ratio is computed from relative luminance under a different formula. Use OKLCH to build the ramp and a contrast check to validate the pairs; see [[Color Contrast]].

## See also
- [[Design Token]]
- [[Color Contrast]]
- [[Dark Mode]]
- [[Shader]]

## Related
- [[Scoped Styling]]
- [[Motion Design]]
- [[CSS Custom Property]]
- [[Utility-First CSS]]
- [[Silent Failure]]
- [[Cascade]]
