---
aliases:
  - Lighting model
  - Phong shading
  - Blinn-Phong
  - Lambertian reflectance
  - Gouraud shading
  - Flat shading
tags:
  - graphics
summary: The formulas that decide how bright and what color a surface appears under a light, from Lambert's diffuse law through Phong's highlights to the physically based models that replaced them.
---
A **shading model** is the formula that computes how a surface looks under light: how bright it is and what color, given the light's direction, the surface's orientation, and the viewer's position. Shading is what makes a flat polygon read as a curved, solid object.

The foundation is **Lambertian reflectance**, named for Johann Heinrich Lambert's 1760 work on light. A perfectly matte surface scatters light equally in all directions, so its brightness depends only on the angle between the light and the surface normal, the direction the surface faces. Light hitting head-on gives full brightness; at a grazing angle, the same light spreads over more area and the surface dims. The calculation is a single dot product, which is why it's still everywhere.

Shiny surfaces add **specular** highlights, the bright spots that move as the viewer moves. In 1975 Bui Tuong Phong proposed a model combining three terms: ambient light as a constant fill, Lambertian diffuse, and a specular highlight whose sharpness is set by a shininess exponent. Jim Blinn's 1977 variant, **Blinn-Phong**, computes the highlight more cheaply and became the default in fixed-function graphics hardware for two decades.

How often the formula runs matters as much as the formula:

- **Flat shading** computes one color per triangle, giving a faceted look.
- **Gouraud shading**, from Henri Gouraud in 1971, computes color at each vertex and blends it across the triangle with [[Barycentric Coordinates]]. Smooth and cheap, but highlights smaller than a triangle disappear or smear.
- **Phong shading** blends the normals instead and computes lighting per pixel. That's how modern GPUs work, with a pixel [[Shader]] running per fragment.

[[Normal Mapping]] goes further, varying the normal within a triangle so a flat surface shades as if detailed.

Classic models aren't physically accurate. Phong highlights don't conserve energy, so surfaces can reflect more light than they receive, and they ignore the [[Fresnel Effect]], where every surface becomes mirror-like at grazing angles. Artists compensated by tuning numbers per scene. Since the 2010s, [[Physically Based Rendering]] has replaced them with models grounded in the physics of microscopic surface roughness, which behave consistently under any lighting. They're approximations of the [[Rendering Equation]], which describes light transport exactly.

Shading models are also a stylistic choice. [[Cel Shading]] deliberately quantizes the Lambertian term into a few flat bands for a cartoon look, and many indie games choose flat shading for its clean, low-poly aesthetic. Lighting calculations happen in linear color, not the encoded values stored in images, so [[Gamma Correction]] matters to getting shading right; [[Tone Mapping]] then fits the result to the display. [[Deferred Shading]] reorganizes the work so the cost depends on pixels and lights rather than on scene complexity.

## See also
- [[Ambient Occlusion]]
- [[Subsurface Scattering]]
- [[Image-Based Lighting]]
- [[Utah Teapot]]
- [[Radiosity]]
