---
aliases:
  - PBR
tags:
  - graphics
summary: A shading approach that derives surface appearance from measured, energy-conserving material parameters instead of hand-tuned highlights.
---
**Physically based rendering** describes a family of shading models built to obey the actual physics of light-surface interaction — chiefly, that a surface cannot reflect more light than it receives — rather than the earlier practice of hand-tuning a specular highlight and calling it close enough. The payoff is that materials look correct under any lighting, because the model, not the artist, is doing the physically consistent part.

The dominant implementation is the **metallic-roughness workflow**: a surface is described by a base color (albedo), a roughness value (how blurred its reflections are), and a metallic flag (whether it reflects colored light like a metal or white light like a dielectric). Underneath sits a **microfacet BRDF**, which treats a surface as a statistical distribution of tiny mirror-like facets too small to resolve individually — roughness is literally the width of that distribution. Rougher surfaces scatter reflections into a wide, dim blur; smoother surfaces concentrate them into a tight, bright highlight, and both come from the same equation instead of separate hacks.

**Fresnel reflectance** — the fact that every surface, even a matte one, becomes more mirror-like at a grazing viewing angle — falls out of the same math and is why PBR materials show a subtle rim brightening that older ad hoc shaders had to fake or omit.

The discipline this imposes is as important as the math: an albedo texture must contain only the material's inherent color, never baked-in shadows or highlights, because the renderer supplies real lighting information itself. A texture painted with fake ambient occlusion baked in will look wrong under every light except the one it was painted for.

## See also
- [[Shader]]
- [[Ray Tracing]]
- [[Level of Detail]]
- [[OKLCH]]
