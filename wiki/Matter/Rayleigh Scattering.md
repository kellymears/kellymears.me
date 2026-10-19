---
aliases:
  - Why the sky is blue
  - Mie scattering
  - Atmospheric scattering
  - Aerial perspective
tags:
  - matter
summary: The scattering of light by particles much smaller than its wavelength, far stronger for blue than red, which makes the sky blue, sunsets red, and distant hills hazy.
---
**Rayleigh scattering** is the scattering of light by particles much smaller than its wavelength, such as the nitrogen and oxygen molecules in air. Its strength rises steeply as wavelength gets shorter, with the inverse fourth power, so blue light at 450 nanometers is scattered almost six times more than red light at 700. The British physicist Lord Rayleigh worked out the theory in 1871.

Sunlight contains all visible colors. As it passes through the atmosphere, the shorter wavelengths are scattered in every direction by air molecules, so blue light reaches the eye from all over the sky, while most of the red and yellow travels straight through. Look away from the sun and you see that scattered blue.

The sky isn't violet, even though violet scatters more still, for three reasons: sunlight contains less violet to begin with, some is absorbed high in the atmosphere, and human eyes are much less sensitive to violet than to blue. The mix the eye receives reads as sky blue, a reminder that color is partly perception (see [[Metamerism]] and [[Opponent Process Theory]]).

The same physics explains sunsets. When the sun is near the horizon, its light passes through much more air to reach you. Most of the blue is scattered out along the way, leaving the oranges and reds. The low, warm light of evening also has a lower [[Color Temperature]] than midday sun, which matters for [[Circadian Lighting]].

Larger particles behave differently. Water droplets, dust, and smoke particles comparable to or bigger than the wavelength of light scatter all colors about equally, a regime called **Mie scattering**. That is why clouds are white, why haze and fog look gray, and why the sky near the sun on a humid day looks pale.

Other consequences:

- **Polarization.** Scattered skylight is partly polarized, most strongly at 90 degrees from the sun. Bees and some birds navigate using the pattern, and photographers use polarizing filters to darken the sky (see [[Polarized Light]]).
- **Aerial perspective.** Distant mountains look bluer and paler because scattered light fills the air between them and the viewer.
- **Fiber optics.** Tiny variations in glass density scatter light the same way, setting the fundamental limit on how far a signal travels in an optical fiber before it needs amplifying, even with perfect [[Refraction]] keeping it inside.

Graphics programmers simulate atmospheric scattering to render skies, sunsets, and the haze over distant terrain in games and flight simulators. A sky [[Shader]] integrates Rayleigh and Mie scattering along each view ray, and [[Physically Based Rendering]] pipelines feed the result into lighting and [[Tone Mapping]]. Scattering differs from [[Dispersion]], where colors separate because they bend by different amounts, and from [[Diffraction]] around edges.

## See also
- [[Rainbow]]
- [[Ozone Layer]]
- [[Eclipse]]
- [[Volumetric Lighting]]
