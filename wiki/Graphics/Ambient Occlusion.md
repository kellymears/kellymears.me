---
aliases:
  - SSAO
  - Screen-space ambient occlusion
  - Contact shadows
  - Global illumination
tags:
  - graphics
summary: Darkening creases, corners, and contact points where surrounding geometry blocks indirect light, an approximation that makes scenes look grounded.
---
**Ambient occlusion (AO)** estimates how much of the surrounding environment each point on a surface can see, and darkens it accordingly. A point in an open floor sees the whole sky and receives full ambient light. A point deep in a corner, inside a crease, or under a resting object sees mostly nearby geometry, so less indirect light reaches it. AO darkens those places. The effect is subtle but powerful: without it, objects look like they float above the ground, and interiors look flat and cardboard. With it, the scene reads as solid and objects look like they are resting on things.

It is an approximation of *global illumination*, the light that bounces between surfaces before reaching the eye. Full path tracing computes those bounces properly, and in the result contact shadows appear naturally. Real-time renderers long couldn't afford that, so AO captures the most visible part, the occlusion term, and ignores the rest, such as the color that bleeds from a red wall onto a white floor. It is a classic case of finding the cheapest model that gets the perceptually important part right.

Techniques span a wide range of cost and correctness:

- **Baked AO.** Computed offline for static objects and stored in a texture, alongside [[Normal Mapping]] and lightmaps. It is free at runtime but can't respond to moving objects.
- **Screen-space ambient occlusion (SSAO).** Introduced in Crysis in 2007, it reads the [[Depth Buffer]] and normals from the G-buffer of [[Deferred Shading]], sampling nearby pixels to guess how enclosed each point is. It is cheap and fully dynamic, but it knows only what is on screen, so occlusion vanishes when the occluder leaves the frame, and dark halos appear around objects. Its noisy samples are smoothed with a blur or blended across frames as in [[Temporal Upscaling]].
- **Improved screen-space variants** such as HBAO and GTAO are more physically grounded, sampling along horizons in the depth buffer.
- **Ray-traced AO** casts short rays against a [[Bounding Volume Hierarchy]] and handles off-screen geometry correctly, and full [[Ray Tracing]] makes separate AO unnecessary.

Overdone AO is one of the recognizable looks of late-2000s games, with heavy grime in every crease. Artists in [[Physically Based Rendering]] workflows tend to apply it only to indirect light, since direct sunlight shouldn't be darkened by geometry that doesn't block the sun. The same perceptual cue predates computers: painters and illustrators have long darkened where objects meet to show contact, as in the drop shadows of [[Skeuomorphism]].

## See also
- [[Depth Buffer]]
- [[Deferred Shading]]
- [[Ray Tracing]]
- [[Physically Based Rendering]]
- [[Normal Mapping]]
- [[Bounding Volume Hierarchy]]
- [[Baked Lighting]]
