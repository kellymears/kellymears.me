---
aliases:
  - CRI
  - Ra
  - R9
  - TM-30
  - Color fidelity
tags:
  - matter
summary: A score for how faithfully a light source reveals the colors of objects compared with a reference source, which depends on the light's full spectrum and not only on its apparent color.
---
**Color rendering index (CRI)** measures how faithfully a light source shows the colors of objects compared with a reference source of the same [[Color Temperature]]: a blackbody below 5,000 K, a daylight model above. A perfect score is 100. The CIE standardized the method in 1965. The general score, *Ra*, averages how much eight pastel test swatches shift in color under the lamp being tested.

The concept exists because a light's own color says little about how it renders other colors. Two lamps that look identical in white, the same CCT, can have very different *spectra*. One may be a smooth continuous curve like sunlight. Another may be a few narrow spikes that happen to add up to white. Objects reflect light selectively, so a red apple can only look red if there is red light for it to reflect. A source with a gap in the red makes skin look sallow, meat look gray, and wood look flat, even while the lamp itself looks fine. This is [[Metamerism]] at work: spectrally different lights matching to the eye but not on surfaces.

Ra has known blind spots:

- **R9**, saturated red, is not in the eight-swatch average. Many cheap LEDs score a respectable Ra in the 80s while scoring poorly, sometimes negative, on R9. Specifications for skin-tone-critical uses such as film, photography, and retail list R9 separately.
- **Fidelity is not preference.** Slightly oversaturated light often looks better to people than perfectly faithful light, and Ra cannot express that.
- **It is easy to game.** A lamp can be tuned to the eight swatches.

The newer **TM-30** method (IES, 2015) uses 99 samples and reports two numbers, fidelity (*Rf*) and gamut (*Rg*, whether colors become more or less saturated), plus a chart showing which hues shift.

Color-changing smart lamps make the trade-off concrete. Mixing white from red, green, and blue LEDs gives a spiky spectrum with poor rendering. Better bulbs add dedicated white phosphor emitters for "white" scenes and use the RGB channels only for color. That is why the same bulb can look excellent at 2,700 K and harsh when it makes white from RGB. The gamut of a light source is the same idea as a display's [[Color Gamut]].

## See also
- [[Color Temperature]]
- [[Metamerism]]
- [[Color Gamut]]
- [[Dispersion]]
- [[Physically Based Rendering]]
- [[Goodhart's Law]]
- [[Fluorescence]]
