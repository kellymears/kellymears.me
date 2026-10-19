---
aliases:
  - Refractive index
  - Index of refraction
  - Snell's law
  - Total internal reflection
  - Mirage
tags:
  - matter
summary: The bending of light as it passes between materials in which it travels at different speeds, behind lenses, rainbows, mirages, and the strange depth of a swimming pool.
---
**Refraction** is the bending of light as it passes from one material into another in which it travels at a different speed. Light is slower in water than in air and slower still in glass. When a beam enters at an angle, one side of it slows before the other, and the beam changes direction. The ratio of light's speed in a vacuum to its speed in a material is that material's *refractive index*: about 1.33 for water, roughly 1.5 for common glass, and 2.42 for diamond.

The rule relating the angles is **Snell's law**, named after the Dutch mathematician Willebrord Snellius, who found it in 1621. The Persian scholar Ibn Sahl had described it correctly around 984. Refraction produces familiar illusions:

- **A straw looks bent** where it enters a glass of water.
- **Pools look shallower** than they are, roughly three quarters of their true depth seen from above, because light from the bottom bends at the surface.
- **Mirages** form when air near hot ground is less dense than the air above it. Light from the sky bends upward toward the viewer, so the road appears to hold a shimmering pool.

When light travels from a denser material toward a less dense one at a shallow enough angle, it can't escape at all and reflects back completely. This is **total internal reflection**, and it happens beyond a *critical angle*, about 49 degrees from vertical for water and around 42 degrees for glass. Fish looking up see the sky compressed into a circle overhead, called Snell's window, with reflections of the bottom beyond it. Optical fibers trap light by total internal reflection, carrying signals across oceans, and diamonds are cut so light bounces around inside before escaping, the source of their sparkle.

Lenses work by refraction. A curved surface bends light by different amounts across its width, bringing rays to a focus.

The refractive index varies slightly with wavelength, so different colors bend by different amounts. That is [[Dispersion]], which spreads white light into a spectrum in a prism or a rainbow. [[Diffraction]] bends light by a different mechanism, around edges and through gaps, and reflection off a surface at certain angles leaves light partly [[Polarized Light|polarized]].

Rendering engines model refraction to draw water, glass, and gems. [[Ray Tracing]] follows each ray as it bends through surfaces, while [[Physically Based Rendering]] uses the refractive index to compute how much light reflects versus passes through, the Fresnel effect, which is why a lake mirrors the sky at a low angle but is transparent looking straight down. Cheaper real-time techniques distort the image behind a surface in a [[Shader]] to fake it. The blue of the sky, by contrast, comes from scattering, not bending: see [[Rayleigh Scattering]].

## See also
- [[Glassmorphism]]
- [[Allotrope]]
- [[Radio Propagation]]
- [[Black Hole]]
- [[Myopia]]
- [[Rainbow]]
