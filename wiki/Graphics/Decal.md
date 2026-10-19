---
aliases:
  - Decals
  - Projected decal
  - Deferred decal
tags:
  - graphics
summary: A texture stamped onto existing surfaces at runtime, such as a bullet hole, a footprint or a road marking, drawn either as extra geometry hugging the surface or as a box projected onto whatever the depth buffer says lies inside it.
---
A **decal** in computer graphics is a piece of texture applied on top of existing surfaces, the way a transfer is applied to a model kit. The name comes from decalcomania, a nineteenth-century technique for transferring printed designs onto pottery and glass. In games, decals carry bullet holes, scorch marks, footprints, tire tracks, graffiti and road markings, adding detail and history to a scene without changing the underlying model or its textures; see [[Texture Mapping]].

The oldest approach is the **mesh decal**. When a bullet hits a wall, the engine builds a small piece of geometry matching the wall's surface at that spot and draws the bullet-hole texture on it, blended over the wall; see [[Alpha Compositing]]. Because the decal lies exactly on the wall, the two surfaces compete for the same depth values and flicker, so engines nudge the decal toward the camera with a depth bias; see [[Depth Buffer]]. On curved or detailed surfaces, the engine also has to cut the surrounding triangles down to the decal's footprint, which costs time at the moment of impact; see [[Clipping]].

**Projected decals** avoid building geometry. The decal is defined as a box in the world, and the renderer draws the box itself. For each pixel the box covers, a [[Shader]] reads the depth buffer to reconstruct the position of whatever surface is already there, checks whether that position lies inside the box, and if so projects the decal texture onto it. One box can drape a splash of paint over stairs, a crate and the floor at once. The technique pairs naturally with [[Deferred Shading]], where a decal can rewrite a surface's color, normal or roughness before lighting, so a crack picks up the room's light and reflections like the wall around it; see [[Normal Mapping]].

Projection has its own artifacts. A decal projected along one axis stretches badly where the surface runs parallel to that axis, so a mark on a floor smears down the side of a step. A common fix fades the decal out where the surface turns away from the projection direction. Moving characters can walk through a static decal box and get painted by mistake, so engines mask which surfaces may receive decals; see [[Stencil Buffer]].

Decals also need budgets. Every mark adds work to every frame in which it stays visible, so games cap the number alive and fade or recycle the oldest, which is why bullet holes in many shooters quietly vanish behind the player. Engines that kept every mark could slow down; see [[Draw Call]].

Some games build mechanics on them. Splatoon tracks which team's ink covers each surface and lets players swim quickly through their own color, so painting the map is both decoration and movement; see [[Game Feel]].

## See also
- [[Sprite]]
- [[Particle System]]
