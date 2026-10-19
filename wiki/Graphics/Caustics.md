---
aliases:
  - Caustic
  - Photon mapping
tags:
  - graphics
summary: The bright patterns of light focused by curved reflecting or refracting surfaces, like the net of light on a pool floor, which are easy to see and notoriously hard to render.
---
**Caustics** are the bright patterns formed when a curved surface reflects or refracts light so that rays converge. The net of rippling lines on the bottom of a swimming pool, the bright curve inside a coffee cup in sunlight, and the focused spot under a glass of water are all caustics. The word comes from the Greek for "burning," as in a lens focusing sunlight to start a fire.

They form wherever rays bunch together. A flat window passes light evenly, but a wavy water surface bends rays by different amounts at each point, so some patches of the pool floor gather light from a wide area of surface and glow while others are left darker; see [[Refraction]]. The bright lines are where neighboring rays cross, curves of very high concentration called envelopes. Reflected caustics work the same way: sunlight on the curved inner wall of a cup draws a cusped curve, a nephroid, on the coffee. Glass and water also bend colors by slightly different amounts, so caustics often carry faint rainbow fringes; see [[Dispersion]].

They are notoriously hard to render. A standard path tracer starts rays at the camera and bounces them around, hoping to reach a light; see [[Ray Tracing]]. For a caustic, the path must pass through the water surface and land exactly on a small light source, which random camera rays almost never do, so the effect comes out as scattered bright speckles that converge very slowly; see [[Monte Carlo Method]] and [[Denoising]]. The [[Rendering Equation]] includes caustics, but sampling them efficiently is a long-standing problem.

Solutions trace from the light instead:

- **Photon mapping**, introduced by Henrik Wann Jensen in the mid-1990s, fires photons from the lights, records where they land after reflections and refractions, then estimates brightness at each visible point from the density of nearby photons.
- **Bidirectional path tracing** builds paths from both the camera and the lights and connects them, finding focused paths that either side alone would miss.
- **Caustic maps** splat rays from the light into a texture each frame, a real-time approximation used for water in some engines.

Games mostly fake them. A looping animated texture of caustic lines, projected onto the floor under water and tinted by depth, reads as convincing at a glance; see [[Texture Mapping]]. More physical approaches compute the water's shape from a [[Fluid Simulation]] and refract a grid of rays through it each frame, measuring how the grid squeezes and stretches to find where light concentrates.

Caustics belong to a family of effects where light's path, not just a surface's color, matters, alongside [[Subsurface Scattering]] in skin and the light shafts of [[Volumetric Lighting]]. The ripples of light on a sandy streambed are the same phenomenon.

## See also
- [[Fresnel Effect]]
- [[Importance Sampling]]
- [[Rainbow]]
- [[Radiosity]]
- [[Photon]]
