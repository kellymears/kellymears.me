---
aliases:
  - Fresnel
  - Fresnel reflection
  - Schlick's approximation
  - Fresnel equations
tags:
  - graphics
summary: Surfaces reflect more light the more steeply you view them, which is why a lake is clear underfoot and a mirror at the horizon, and why every material in a physically based renderer needs it.
---
The **Fresnel effect** is the way a surface reflects more light the more glancing the angle at which you view it. Look straight down into a still lake and you see the bottom; look across it toward the far shore and it becomes a mirror of the sky. The water reflects about 2 percent of light at a perpendicular view and nearly all of it at a grazing angle.

The effect is named for Augustin-Jean Fresnel, who derived the equations in the 1820s as part of establishing the wave theory of light. They describe how much light reflects and how much passes through at the boundary between two materials, depending on the angle, the materials' indices of [[Refraction]], and the light's polarization. At one particular angle, Brewster's angle, light of one polarization is not reflected at all, which is why [[Polarized Light]] sunglasses cut glare from water and roads.

The key point for rendering is that *everything* gets more reflective at grazing angles, not only water and glass. Wood, plastic, fabric, skin, and asphalt all show it. A road ahead looks shiny near the horizon, a tabletop reflects a window when viewed edge-on, and the outline of a matte object picks up a faint rim of reflected light. Graphics programmer John Hable summarized it as "everything is shiny."

Materials differ in their reflectance at a straight-on view, called F0:

- **Dielectrics**, nonmetals such as water, plastic, stone, and skin, reflect about 2 to 5 percent head-on, uncolored. Rendering engines commonly assume 4 percent.
- **Metals** reflect 50 to over 90 percent head-on, and the reflection is tinted: gold reflects yellow, copper reflects orange. Metals show much less change with angle, since they are already reflective.

The exact equations are expensive, so renderers use Christophe Schlick's 1994 approximation, which blends from F0 toward full reflection as the view becomes grazing, using a fifth power of the angle's cosine. It is cheap and accurate enough that nearly every real-time engine uses it.

Fresnel is a core part of [[Physically Based Rendering]], where getting it right is much of why modern materials look believable. Without it, objects look flat and painted, and water looks like colored plastic. With it, reflections of the environment, usually supplied by [[Image-Based Lighting]], appear strongest where they should, at silhouettes and glancing views.

Fresnel also explains energy balance. Light that reflects at the surface does not enter the material, so a strongly reflecting rim shows less of the material's own color underneath. Renderers that ignore this make edges too bright, violating [[Conservation of Energy]].

Artists also borrow Fresnel terms for stylized rim glows and force-field shimmer. Thin coatings on surfaces add [[Wave Interference]] on top, producing the shifting colors of car paint and soap films.

## See also
- [[Rendering Equation]]
- [[Holography]]
- [[Screen Space Reflections]]
- [[Spherical Harmonics]]
- [[Caustics]]
