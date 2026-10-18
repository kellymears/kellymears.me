---
aliases:
  - God rays
  - Crepuscular rays
  - Volumetric fog
  - Participating media
tags:
  - graphics
summary: Rendering light as it passes through fog, smoke, dust, or water rather than only where it lands, producing visible beams and haze, usually by stepping along each view ray through a shadowed medium.
---
**Volumetric lighting** is the rendering of light as it passes through a medium such as fog, smoke, dust, or murky water, rather than only where it lands on surfaces. It produces visible beams of sunlight through a forest canopy, the cone of a flashlight in a smoky room, and the haze that makes distant mountains fade.

In the real world these effects come from scattering. Particles in the air redirect a little light toward the eye, so a beam becomes visible from the side. Small molecules scatter blue more strongly than red, while larger droplets scatter all colors about equally, which is why fog is white; see [[Rayleigh Scattering]]. Such a medium is called **participating media**, because it takes part in light transport along the whole path, not only at surfaces; see [[Rendering Equation]].

**Crepuscular rays**, the "god rays" streaming from behind clouds, are an everyday example. The beams are nearly parallel, but they seem to fan out from the sun for the same reason railroad tracks seem to meet at the horizon; see [[Perspective Projection]].

Games have faked and computed the effect in several ways:

- **Screen-space blur.** An early, cheap trick smears the bright sky in a frame outward from the sun's position on screen; see [[Post-Processing]]. It looks convincing until the sun leaves the screen, and then the rays vanish.
- **Ray marching.** For each pixel, the renderer steps along the view ray through the fog, checking at each step whether that point is lit, usually by consulting a shadow map; see [[Shadow mapping]] and [[Ray Marching]]. Summing the light scattered toward the camera gives shafts with correct shadows from every object.
- **Froxels.** Many modern engines divide the camera's view into a grid of small cells, compute lighting and fog density for each, and look them up while shading; see [[Voxel]].

All of these are expensive, because the work grows with the number of steps per pixel. Engines take few steps, offset each pixel's starting point with a noise pattern to hide banding, and average across frames; see [[Blue Noise]] and [[Temporal Upscaling]]. The averaging can leave ghostly trails behind fast motion.

The same techniques render clouds, explosions, and underwater scenes, where light fades with depth and shifts toward blue-green. Inside solid objects, related physics produces the soft glow of skin and wax; see [[Subsurface Scattering]].

Fog has a long history in games as a performance trick: early 3D titles hid short draw distances by fading everything into gray; see [[Level of Detail]]. Volumetric lighting turned that limitation into a main tool for mood and for guiding the player's eye; see [[Environmental Storytelling]].

## See also
- [[Caustics]]
- [[Particle System]]
- [[Dew Point]]
