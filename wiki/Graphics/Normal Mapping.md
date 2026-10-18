---
aliases:
  - Normal map
  - Bump mapping
  - Parallax mapping
  - Baking
tags:
  - graphics
summary: Faking fine surface detail by perturbing the direction a surface faces per pixel, so flat geometry lights as if it had grooves and bumps.
---
**Normal mapping** makes a flat surface look detailed by changing how it reacts to light rather than changing its shape. Lighting depends heavily on the surface *normal*, the direction a surface faces at each point. A normal map is a texture whose pixels store direction vectors instead of colors, conventionally in RGB, which is why normal maps look like pale blue-purple images. The [[Shader]] reads the map and lights each pixel as if the surface were tilted that way. A flat brick wall gains mortar grooves, a smooth armor plate gains scratches and rivets, and a face gains pores, all with no extra triangles.

The usual workflow is *baking*. An artist sculpts a very high-detail model with millions of polygons, builds a simplified low-poly version for the game, and projects the difference in surface direction from the detailed model onto the simple one as a normal map. The game ships the cheap geometry plus the texture, and at normal viewing distances the result is close to the original. This is the central economy of real-time art: compute detail once offline and replay it cheaply, like [[Level of Detail]] working at the pixel scale.

The trick has limits, because the geometry is still flat:

- **Silhouettes give it away.** Viewed edge-on, a normal-mapped wall is a flat line with no bumps on its outline.
- **No self-occlusion or parallax.** Bumps don't hide what's behind them, and they don't shift against each other as the viewer moves.
- **Variants push further.** *Parallax occlusion mapping* uses a height map to offset texture lookups so surfaces appear to have depth. *Tessellation* and *displacement* actually move geometry.

Normal mapping is one input to [[Physically Based Rendering]], where it works together with roughness and metalness maps to describe a material. It filters badly. Averaging normals in [[Mipmapping]] loses the bumps and can make distant surfaces look unnaturally shiny, a source of shimmering specular highlights and [[Aliasing]] that engines correct with special filtering. [[Signed Distance Field]] rendering and [[Voxel]] engines can carry real surface detail instead of a painted illusion, at higher cost.

## See also
- [[Shading Model]]
- [[Tessellation]]
- [[Texture Compression]]
- [[Mipmapping]]
- [[Ambient Occlusion]]
- [[Skeuomorphism]]
- [[Texture Mapping]]
- [[Polygon Mesh]]
