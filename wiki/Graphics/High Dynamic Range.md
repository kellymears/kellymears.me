---
aliases:
  - HDR
  - HDR10
  - Wide dynamic range
tags:
  - graphics
summary: Representing and displaying brightness over a much wider range than the conventional 0–1 signal, so highlights can be brighter without the rest getting darker.
---
**High dynamic range** (HDR) is the representation and display of brightness across a range far wider than the conventional standard-dynamic-range (SDR) signal. SDR encodes brightness as relative values between black and "white", and whatever white the display chooses (often around 100–300 nits) becomes the brightest thing on screen. HDR encodes **absolute** luminance, up to thousands of nits, so a sunlit window or a specular glint can be much brighter than a white sheet of paper in the same scene instead of being clipped to the same white.

The term covers two different things that are easy to confuse:

- **HDR rendering** means computing light internally in floating-point, unbounded values. Every modern renderer does this because [[Physically Based Rendering]] and [[Ray Tracing]] produce physically meaningful intensities that do not stop at 1.0. This has been standard for nearly two decades.
- **HDR output** means sending a signal to a display that can show more than SDR's range. It needs a capable panel, a wide-gamut color space, a perceptual transfer curve (PQ), 10-bit or deeper color to avoid banding, and every layer of the stack agreeing on all of it.

Between the two sits [[Tone Mapping]], which compresses the renderer's unbounded values into whatever the display can show. An SDR game still renders HDR internally and tone-maps aggressively. An HDR game tone-maps less, to a target set by the display's measured peak.

The output path fails in many places, because each layer has to pass metadata through unchanged: the game, the graphics API, the [[API Translation Layer]] if there is one, the compositor, the driver, the cable, and the display's own processing. One layer that strips or misreads it gives washed-out greys, crushed blacks, or highlights clipped at SDR white, and from the couch these look like a "bad HDR implementation". Calibration tools that ask the player to tune paper white and peak brightness exist because the game cannot rely on the display reporting itself honestly.

HDR also changes how UI is designed. Interface elements need a fixed paper-white level, or menus become uncomfortably bright next to dark scenes. That is a [[Color Contrast]] problem in absolute units rather than relative ones.

## See also
- [[Tone Mapping]]
- [[Physically Based Rendering]]
- [[OKLCH]]
- [[Shader]]
- [[Dark Mode]]
- [[Opponent Process Theory]]
- [[Color Gamut]]
- [[Gamma Correction]]
