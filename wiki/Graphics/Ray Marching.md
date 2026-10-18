---
aliases:
  - Raymarching
  - Sphere tracing
  - Volumetric rendering
tags:
  - graphics
summary: Rendering by stepping along each ray in increments instead of solving for an exact hit, the technique behind signed-distance scenes, volumetric clouds, and much of Shadertoy.
---
**Ray marching** renders an image by walking along each view ray in steps, testing the scene at every step, instead of computing the exact intersection with a surface as classic [[Ray Tracing]] does. It works for scenes that have no simple intersection formula: implicit surfaces, fractals, fog, clouds, and anything described as a function of position rather than as triangles.

The naive version takes small fixed steps and stops when it finds itself inside something. That is slow, and it can step straight through thin objects. The breakthrough was **sphere tracing**, described by John C. Hart in 1996. If the scene is a [[Signed Distance Field]], a function that returns the distance from any point to the nearest surface, then the ray can safely advance by exactly that distance, since nothing can be closer. Far from geometry the steps are large, and near a surface they shrink, converging on the hit in a few dozen iterations. When the distance drops below a small threshold, the ray has hit.

The distance function gives several effects almost for free:

- **Surface normals** come from the gradient of the field, sampled a tiny offset in each axis.
- **Soft shadows** come from marching toward the light and recording how closely the ray grazed other surfaces on the way.
- **[[Ambient Occlusion]]** comes from sampling the field a few steps along the normal; if the distances are smaller than expected, the point is in a crevice.

Because the whole scene is one function evaluated per pixel, ray marching fits naturally in a single fragment [[Shader]] on the [[Graphics Processing Unit]]. That made it the signature technique of the demoscene, whose 4-kilobyte intros render entire landscapes from a few lines of math, and of Shadertoy, launched in 2013 by Iñigo Quilez and Pol Jeremias. Quilez's articles on distance functions are the field's standard reference. Shapes combine with simple operations: the minimum of two fields is their union, and a smooth minimum blends them like clay. Repeating space with a modulo turns one object into an infinite grid, and fractals such as the Mandelbulb render the same way.

**Volumetric ray marching** is the other major use. Clouds, fog, smoke, and light shafts have no surface to hit, so the ray steps through the medium at fixed intervals, accumulating density and light and attenuating by the Beer–Lambert law. Density is often sampled from 3D [[Perlin Noise]] and other [[Procedural Generation]] fields. Guerrilla Games' cloud system for *Horizon Zero Dawn* (2017) made real-time volumetric skies practical.

Games also ray-march against the [[Depth Buffer]] for screen-space reflections, a [[Post-Processing]] effect that treats the visible frame as a crude height field.

## See also
- [[Signed Distance Field]]
- [[Ray Tracing]]
- [[Marching Cubes]]
- [[Perlin Noise]]
- [[Ray Casting]]
- [[Volumetric Lighting]]
