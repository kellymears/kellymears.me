---
aliases:
  - SSS
  - Translucency
  - Subsurface light transport
tags:
  - graphics
summary: Light entering a translucent material, bouncing around inside, and leaving somewhere else, which gives skin, wax, marble, and milk their soft, glowing look.
---
**Subsurface scattering** describes light that enters a translucent material, scatters around beneath the surface, and exits at a different point. Skin, wax, marble, jade, milk, leaves, and fruit all work this way. It is why candle wax glows near the flame, why your fingers turn red when held over a flashlight, and why ears glow when backlit. The red comes through because longer wavelengths travel farther through flesh before being absorbed.

Without it, rendered materials look hard and fake. Early computer graphics treated every surface as if light bounced off at the point it arrived, which works for metal and painted plastic but makes skin look like rubber or wax figures look like plaster. Human faces are especially unforgiving. Skin without subsurface scattering looks dead, and getting it subtly wrong contributes to the [[Uncanny Valley]].

Simulating it exactly means following light through countless scattering events inside the material, which is expensive. A practical breakthrough came in 2001, when Henrik Wann Jensen, Stephen Marschner, Marc Levoy, and Pat Hanrahan published a *dipole* approximation that models the scattered light with a simple formula, making believable translucency affordable for film. It helped bring the digital character Gollum to life in *The Lord of the Rings: The Two Towers* (2002), and Jensen, Marschner, and Hanrahan later received an Academy technical award for the work.

Different rendering approaches handle it differently:

- **Offline rendering.** Film renderers trace random paths inside the material, a natural extension of path-traced [[Ray Tracing]].
- **Screen-space approximation.** Real-time games commonly compute lighting normally, then blur the diffuse light across the skin in screen space with a profile that spreads red farthest, a [[Shader]] pass that fits well with [[Deferred Shading]].
- **Thickness maps.** For thin parts such as ears, leaves, and curtains, a precomputed texture records how thick the object is, so light can shine through.
- **Wrap lighting.** A cheap trick lets light reach slightly past the shadow line, softening the terminator the way scattering would.

Subsurface scattering is one piece of [[Physically Based Rendering]], which models how a surface reflects light at its boundary and, for translucent materials, how light behaves just beneath it. It interacts with the detail added by [[Normal Mapping]]: pores and wrinkles look sharper in reflections than in the soft diffuse glow underneath, and good skin shaders deliberately treat the two layers differently. It is distinct from [[Rayleigh Scattering]], which scatters light off tiny particles in open air, and from [[Refraction]], the bending of light at a clear surface, though real materials often combine all three. [[Ambient Occlusion]] darkens creases where scattered light can't reach.

## See also
- [[Physically Based Rendering]]
- [[Uncanny Valley]]
- [[Ray Tracing]]
- [[Shader]]
