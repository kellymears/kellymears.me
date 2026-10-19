---
aliases:
  - Billboards
  - Impostor
  - Octahedral impostor
tags:
  - graphics
summary: Rendering a flat textured rectangle that always turns to face the camera, a cheap stand-in for smoke, sparks, distant trees and labels, and the basis of impostors that replace far-off 3D objects with pictures of themselves.
---
A **billboard** is a flat, textured quad that rotates to face the viewer every frame. Because it always presents its front, a picture painted on it reads as a solid object or a volume from any direction, at the cost of only two triangles; see [[Texture Mapping]] and [[Alpha Compositing]].

There are two main kinds:

- **Spherical billboards** face the camera fully, turning on every axis. They suit things that look roughly the same from all sides, such as smoke puffs, sparks, glows and halos; see [[Particle System]] and [[Lens Flare]].
- **Axis-aligned billboards** rotate only around one axis, usually vertical. A billboard tree stays upright as the camera circles it instead of tipping over when the camera looks down.

Billboarding is as old as 3D games. Early first-person shooters drew enemies, items and decorations as sprites scaled by distance in a world otherwise built of walls and floors. Each character was drawn from several angles, often eight, and the game chose the image matching the direction the character faced relative to the player, so monsters appeared to turn even though each was a flat picture; see [[Doom Engine]], [[Sprite]] and [[Ray Casting]].

The flatness gives billboards away in recognizable ways. Seen from directly above, an upright billboard collapses to a sliver. Where a billboard intersects solid geometry, such as smoke touching the ground, it shows a hard straight line. **Soft particles** fix this by reading the depth buffer and fading each pixel as it nears the surface behind it; see [[Depth Buffer]]. Lighting is another tell, since a flat card cannot cast or receive shadows like a volume. Some engines store normals in the texture so the card can be lit as if it were rounded; see [[Normal Mapping]].

An **impostor** is a billboard used for level of detail. A distant building or tree is rendered once from various angles into textures, and at a distance the real model is swapped for a quad showing the matching view; see [[Level of Detail]]. **Octahedral impostors** store views from many directions on the faces of an octahedron, packed into a single texture, and blend between the nearest ones, which lets open-world games fill horizons with thousands of objects at little cost. When many billboards share a texture, they are drawn together; see [[GPU Instancing]].

Billboards also serve user interfaces in 3D: health bars, name tags and markers that should stay readable whatever the camera does, often kept at constant screen size; see [[Perspective Projection]].

The broader trade-off, a picture standing in for geometry, recurs throughout graphics, from painted backdrops and skyboxes to scrolling layers in 2D games; see [[Parallax Scrolling]].

## See also
- [[Volumetric Lighting]]
- [[Mode 7]]
