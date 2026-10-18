---
aliases:
  - IBL
  - Environment mapping
  - Environment map
  - Cube map
  - Reflection probe
  - Skybox
tags:
  - graphics
summary: Lighting a 3D object with a photograph of the world around it, the technique that lets computer-generated objects sit convincingly in real footage and gives game materials their reflections.
---
**Image-based lighting** lights a scene using a panoramic image of an environment, instead of a handful of individual lamps. Every pixel of the panorama acts as a light source arriving from its direction. A chrome ball reflects the room it sits in, a car's paint shows the sky and street, and a character standing in a forest picks up green bounce light from the leaves, all from one image.

The idea began with **environment mapping**. In 1976 James Blinn and Martin Newell used a picture of the surroundings to fake reflections on shiny objects, looking up the reflected direction in the image instead of computing it. In 1986 Ned Greene introduced the **cube map**, six square images covering the faces of a cube around the viewer, which became the standard format because graphics hardware can sample it efficiently. A **skybox** is the same structure drawn as a backdrop.

Paul Debevec turned reflections into full lighting. His 1998 work showed that a [[High Dynamic Range]] photograph of a mirrored ball, a *light probe*, captures the actual intensity of every light in a scene, including the sun many thousands of times brighter than the sky. Rendering virtual objects lit by such a probe makes them match live-action footage. Effects crews still shoot chrome and gray balls on set.

Real-time engines adapted the idea through **prefiltering**. A mirror reflects a sharp image of the environment, but a rough surface reflects a blurred one, and a matte surface sees only the average light from a whole hemisphere. Engines precompute those blurs:

- **Specular.** Store progressively blurrier versions of the environment in the cube map's mip levels, one per roughness, as in [[Mipmapping]]. A shader picks the level matching a material's roughness. Brian Karis's 2013 split-sum approximation made this standard in [[Physically Based Rendering]].
- **Diffuse.** Compress the hemisphere-averaged light into a few coefficients of spherical harmonics, a smooth function that can be evaluated very cheaply.

Combined with the [[Fresnel Effect]], which makes reflections grow toward grazing angles, this is why materials in modern games look grounded rather than flat.

Games place **reflection probes** throughout a level, each capturing the surroundings from one point. Objects blend nearby probes. A probe is captured from a single point, so reflections drift as objects move away from it; parallax correction projects the cube map onto an approximate box shape of the room to reduce the error. Probes are usually captured once, a form of [[Baked Lighting]], so they cannot reflect moving characters, and screen-space techniques or [[Ray Tracing]] fill in what they miss.

The captured range far exceeds what displays show, so a [[Tone Mapping]] step compresses it. It pairs naturally with [[Ambient Occlusion]], which darkens the places where the environment's light would be blocked.

## See also
- [[Shadow Volume]]
- [[Chroma Key]]
- [[Photogrammetry]]
- [[Gaussian Splatting]]
