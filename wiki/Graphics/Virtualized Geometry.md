---
aliases:
  - Nanite
  - Meshlet
  - Mesh shader
  - GPU-driven rendering
tags:
  - graphics
summary: Splitting huge meshes into small clusters that the GPU selects, culls, and streams each frame, so scenes can hold film-quality geometry without hand-made levels of detail.
---
**Virtualized geometry** is a rendering approach in which scenes hold far more triangles than could ever be drawn, and the GPU decides each frame which small pieces to load and draw at what detail. It borrows its name from virtual memory, where programs address more memory than exists and the system pages in what is used. Epic Games' Nanite, shown in 2020 and shipped in Unreal Engine 5, made it widely known.

Traditional pipelines keep a few versions of each model at different triangle counts and swap them by distance; see [[Level of Detail]]. Artists build those versions by hand or with simplification tools, the switches can pop visibly, and scanned or sculpted assets with millions of triangles must be cut down before they reach a game; see [[Polygon Mesh]] and [[Photogrammetry]].

Virtualized geometry replaces that with a hierarchy of clusters:

- **Clusters.** Each mesh is divided into small groups of about a hundred triangles, often called meshlets. Neighboring clusters are merged and simplified, level by level, into a tree from full detail down to a coarse silhouette.
- **Selection.** Every frame, the GPU walks the tree and picks, for each part of the model, the coarsest clusters whose error would be smaller than a pixel. Detail changes continuously across a single object instead of switching whole models.
- **Culling.** Clusters outside the view or hidden behind last frame's depth are dropped before any triangle is drawn; see [[Culling]] and [[Depth Buffer]].
- **Streaming.** Only the clusters actually selected need to be in memory, so the full-detail data stays on disk and is paged in as the camera moves.

The CPU barely takes part. Instead of issuing a [[Draw Call]] per object, it hands the GPU the whole scene, and compute work decides what to draw, a pattern called GPU-driven rendering; see [[Graphics Processing Unit]]. Mesh shaders, added to the major [[Graphics API]]s around 2019, let the hardware process clusters directly instead of streams of individual vertices.

Small triangles break ordinary hardware. [[Rasterization]] units shade pixels in two-by-two blocks, so a triangle covering one pixel wastes most of the work. Nanite therefore draws its tiniest triangles with a software rasterizer running in compute shaders, and uses the hardware path only for larger ones.

The approach has limits. Geometry that deforms, such as skinned characters, foliage swaying in wind, or anything with transparency, fits poorly, since clusters and their simplified versions are precomputed. Compression is essential, since unreduced scans are enormous; see [[Data Compression]]. Texture memory has the same problem and an older answer, virtual texturing, which pages in tiles of huge textures the way clusters page in geometry; see [[Mipmapping]].

## See also
- [[Bounding Volume Hierarchy]]
- [[Tessellation]]
- [[Game Engine]]
