---
aliases:
  - 3D Gaussian splatting
  - Splatting
  - Radiance field
  - Neural radiance field
  - NeRF
tags:
  - graphics
summary: Representing a captured scene as millions of soft, colored blobs fitted to photographs, which renders photorealistic views in real time without any triangles.
---
**Gaussian splatting** represents a 3D scene as millions of small, soft, semi-transparent blobs, each a three-dimensional Gaussian with a position, a stretched ellipsoidal shape, an opacity, and a color that can change with viewing angle. Rendering projects each blob onto the screen as a fuzzy ellipse, a *splat*, and blends them front to back. From a few hundred photographs, it produces a scene viewable from new angles in real time with startling realism, without triangles, textures, or materials.

It belongs to a family of **radiance field** methods, which model how much light leaves every point in every direction rather than modeling surfaces. The breakthrough before it was NeRF, the neural radiance field, published by Ben Mildenhall and colleagues in 2020. NeRF trains a neural network to answer "what color and density is here?" for any point, and renders by querying it many times along each ray. The results were remarkable, but rendering took seconds per image.

Bernhard Kerbl and colleagues introduced 3D Gaussian splatting at SIGGRAPH 2023, keeping the photorealism and making it fast. The process:

1. **Camera positions.** Software estimates where each photograph was taken and builds a sparse point cloud, using the same structure-from-motion step as [[Photogrammetry]].
2. **Initialization.** Each point becomes a Gaussian.
3. **Optimization.** The Gaussians are rendered from each photo's viewpoint and compared with the real photo. Because the renderer is differentiable, the error tells each Gaussian how to move, stretch, recolor, or fade. Gaussians are split where detail is missing and pruned where they contribute nothing.

The result renders at over 100 frames per second on a consumer GPU, using a [[Rasterization]]-like pipeline built on sorted [[Alpha Compositing]] rather than a neural network. The term *splatting* itself dates to Lee Westover's 1990 volume rendering work.

Splats capture what meshes struggle with: hair, fur, foliage, reflections, and translucent or fuzzy edges. They have clear limits:

- **Size.** Scenes often run to hundreds of megabytes, though compression research has shrunk them dramatically.
- **Baked appearance.** Lighting and reflections from the capture are fixed into the colors, like [[Baked Lighting]], so relighting a scene or moving objects within it is difficult.
- **No surfaces.** There is no mesh for physics, [[Collision Detection]], or editing, and extracting one is an active research area.
- **Artifacts.** Views far from any photograph show smears and floaters.

Uses have spread quickly: real estate and tourism walkthroughs, film and TV previsualization, heritage capture, maps, and game environments built around a captured scan. Research extends it to moving scenes, generation from text or a single image, and robotics mapping.

It is part of a broader move toward representations learned from data, alongside learned [[Temporal Upscaling]] and [[Frame Generation]]. Its scenes look like photographs because they are, in a sense, made of photographs.

## See also
- [[Photogrammetry]]
- [[Signed Distance Field]]
- [[Image-Based Lighting]]
- [[Voxel]]
