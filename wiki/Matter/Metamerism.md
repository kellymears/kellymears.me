---
aliases:
  - Metamers
  - Metameric failure
  - Trichromacy
  - Trichromatic vision
tags:
  - matter
summary: Physically different spectra that look like the same color, because the eye reduces every spectrum to just three numbers.
---
**Metamerism** is the phenomenon in which two physically different spectra of light produce the same perceived color. Such pairs are called *metamers*. The cause is the eye's design. Human color vision has three types of cone cell, sensitive to long, medium, and short wavelengths, so every spectrum, however complex, is reduced to just three responses. Infinitely many spectra map onto any given triple, and every spectrum in that set looks identical.

This is what makes color technology possible. A display does not need to reproduce the actual spectrum of a sunset. It only needs red, green, and blue emitters that produce the same three cone responses. The CIE 1931 color-matching experiments, in which observers adjusted three primaries to match test colors, formalized this into the coordinate systems behind every [[Color Gamut]], camera, and color profile. It is a form of lossy compression performed by biology, and display engineering exploits the losses.

The compression fails in predictable ways, called **metameric failure**:

- **Illuminant metamerism.** Two fabrics match in the shop and clash in daylight. Their reflectance spectra differ, and they happened to produce the same cone response under one light only. This is why [[Color Rendering Index|color rendering]] matters, and why paint and textile matching is done under standardized light booths.
- **Observer metamerism.** Cone sensitivities vary between people. Two colors that match for one viewer differ for another. Displays with very narrow-band primaries, such as laser projectors and some wide-gamut panels, magnify this, so two people calibrating the same screen can disagree about what white looks like.
- **Device metamerism.** A camera's sensor filters do not match human cones, so a scene that looks right to the eye can photograph wrong, especially under spiky LED light.

[[Color Vision Deficiency|Color-blind]] people experience a broader metamerism. With one cone type missing or shifted, more spectra collapse together, and colors that differ for others look identical. [[Color Contrast]] guidance in [[Accessibility]] exists partly for this reason.

Metamerism is also a useful general idea: when a system measures a few summary numbers, any inputs with the same summary are indistinguishable to it. A [[Hash Function]] collision is the same thing, applied deliberately.

## See also
- [[Structural Color]]
- [[Timbre]]
- [[Color Temperature]]
- [[Color Contrast]]
- [[Dispersion]]
- [[Hash Function]]
- [[Rayleigh Scattering]]
- [[Fluorescence]]
- [[Electromagnetic Spectrum]]
