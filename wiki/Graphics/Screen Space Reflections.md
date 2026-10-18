---
aliases:
  - Screen-space reflection
  - Planar reflection
tags:
  - graphics
summary: Faking reflections in real time by ray marching through the depth buffer of the frame already drawn, cheap and convincing on wet floors but unable to show anything that isn't on screen.
---
**Screen space reflections** are a real-time technique for drawing reflections by reusing the image the renderer has already produced. Instead of rendering the scene again from a mirrored viewpoint, the shader looks up what is reflected from the pixels already on screen. Since about 2011 it has been the standard way to put shine on wet streets and polished floors.

The method works on each pixel of a reflective surface:

1. **Read the surface.** From the depth and normal buffers produced for [[Deferred Shading]], the shader knows where the pixel is in 3D and which way the surface faces.
2. **Bounce the view ray.** It reflects the direction from the camera off that surface.
3. **March through the depth buffer.** It steps along the reflected ray in screen space, projecting each step back onto the screen and comparing its depth with what the [[Depth Buffer]] holds there. When the ray passes behind a stored surface, it has hit something; see [[Ray Marching]].
4. **Copy the color.** The color at the hit point becomes the reflection, blended in according to the surface's roughness and viewing angle; see [[Fresnel Effect]].

The appeal is cost. The work scales with screen resolution rather than scene complexity, and it needs no extra geometry pass, so it runs as one more [[Post-Processing]] step alongside screen-space ambient occlusion, which uses the same buffers; see [[Ambient Occlusion]].

The flaw is in the name: the screen is the only information available. Anything off screen, behind the camera, or hidden behind a nearer object can't be reflected. Look down at a puddle and the sky above you vanishes from it; walk past a pillar and the reflection behind it tears open. The depth buffer is also a single layer, so a ray passing behind a thin object can't tell whether it should hit it. Engines hide these gaps by fading the effect toward screen edges and falling back to a prebaked reflection probe captured from fixed points in the level; see [[Image-Based Lighting]].

Rough surfaces add a second problem. A blurry reflection should gather many rays spread around the mirror direction, which is expensive, so engines trace a few noisy rays and smooth the result over space and over successive frames, the same accumulation used for [[Temporal Upscaling]]. Fast motion then leaves faint trails; see [[Denoising]].

Older approaches still have their place. **Planar reflections** render the scene a second time, flipped across a flat mirror or water plane, which is exact but costly, so it is reserved for one large surface. Hardware [[Ray Tracing]] removes the screen-space limit entirely by tracing real reflected rays through the full scene, and modern engines often trace only where screen-space marching fails. All of these feed [[Physically Based Rendering]], where every surface reflects something.

## See also
- [[Volumetric Lighting]]
- [[Shading Model]]
