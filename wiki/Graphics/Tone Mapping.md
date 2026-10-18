---
aliases:
  - Tonemapping
  - Tone mapper
  - Tone curve
tags:
  - graphics
summary: The curve that compresses a renderer's unbounded light values into the limited range a display can show, and which largely sets the image's look.
---
**Tone mapping** converts the unbounded light values a renderer computes into the limited range a display can show. A physically based scene can contain values from near zero to tens of thousands. A display can show a fixed range, very narrow for SDR and wider but still bounded for [[High Dynamic Range]]. Something has to decide what happens to everything outside it, and the tone mapper is that decision.

The naive answer, clamping everything above 1.0, gives hard-edged blown-out highlights and colors that go flat and saturated as they brighten. Real tone mappers apply a curve: roughly linear through the midtones, rolling off smoothly toward the top so highlights compress instead of clip, and often lifting or crushing the shadows on purpose. The common curves differ mainly in how they treat bright saturated color. Some desaturate toward white as brightness rises, the way film and the eye do (a bright red light reads as hot pink-white). Others preserve hue, which looks more "digital".

Several practical points follow:

- **Tone mapping is most of a game's look.** Two renderers with identical lighting look like different products under different curves. It works like a camera's film stock, and it is chosen for aesthetics as much as accuracy.
- **It happens once, at the end.** Tone-mapping twice, once in the game and again in the display's own processing, is a common cause of HDR that looks dim and flat. That is why HDR modes ask the display to stay out of the way. Order matters inside the game too: [[Temporal Upscaling]] usually runs before the tone mapper, on linear values, so the curve and the rest of post-processing see the full-resolution image.
- **Exposure comes first.** Auto-exposure (eye adaptation) scales the scene so the important range lands in the curve's sweet spot. Most "too dark" and "too bright" complaints are exposure, not the curve.
- **It is not reversible.** Highlight detail compressed into a few output values cannot be recovered, which is why post-processing mods that "add HDR" to SDR games work on the pre-tone-mapped buffer and replace the game's curve rather than adjust its output.

Tone mapping is a perceptual problem, not a mathematical one, so its references are perceptual too: [[Opponent Process Theory]], perceptually uniform spaces like [[OKLCH]], and the old craft of film grading.

## See also
- [[High Dynamic Range]]
- [[Physically Based Rendering]]
- [[Shader]]
- [[Game Modding]]
- [[Easing]]
- [[Temporal Upscaling]]
- [[Color Gamut]]
- [[Gamma Correction]]
