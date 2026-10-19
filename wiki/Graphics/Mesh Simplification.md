---
aliases:
  - Decimation
  - Quadric error metrics
  - Progressive mesh
tags:
  - graphics
summary: Reducing the number of triangles in a 3D model while keeping its shape as recognizable as possible, the process that produces level-of-detail models, cleans up scans and makes detailed assets usable in real time.
---
**Mesh simplification** takes a polygon mesh and produces a version with fewer triangles that looks as much like the original as possible. A scanned statue may have tens of millions of triangles, and a game may need versions of the same model at fifty thousand, five thousand and five hundred triangles for viewing at different distances; see [[Polygon Mesh]] and [[Level of Detail]].

Early approaches included:

- **Vertex clustering**, which overlays a grid on the model and merges all vertices within each cell into one. It is fast and robust but ignores shape, so detail is lost evenly.
- **Vertex decimation**, which repeatedly removes a vertex in a nearly flat region and re-triangulates the hole.

The method that became standard is **edge collapse** guided by **quadric error metrics**, published by Michael Garland and Paul Heckbert in 1997. Collapsing an edge merges its two endpoints into one vertex and removes the triangles that shared the edge. The question is which edge to collapse next and where to put the new vertex. Garland and Heckbert gave each vertex a small matrix, a quadric, summarizing the planes of the triangles around it in the original model. Using it, the algorithm can compute in constant time how far a candidate position would stray from those planes. Every edge is scored by the least error its collapse would cause, the cheapest edge is collapsed, neighboring scores are updated, and the process repeats using a priority queue until the target count is reached; see [[Binary Heap]] and [[Greedy Algorithm]]. The result preserves sharp features and silhouettes while removing triangles from flat areas first.

Hugues Hoppe's **progressive meshes**, from 1996, record the whole sequence of collapses. Each collapse can be undone by a vertex split, so a model can be stored as a coarse base plus a stream of refinements, transmitted progressively and refined to any level on demand; see [[Texture Streaming]].

Simplification must protect more than shape. Texture coordinates have seams where the mapping is cut, and collapsing across them tears the texture; see [[Texture Mapping]]. Normals, vertex colors and the boundaries of open meshes need similar care. Detail that would otherwise disappear can be baked from the original into a normal map and applied to the simplified model, which is how high-detail sculpts become real-time assets; see [[Normal Mapping]].

Common uses include generating level-of-detail chains, reducing raw scans to manageable sizes, and cleaning up meshes produced by [[Marching Cubes]]. Systems that stream enormous geometry build hierarchies of triangle clusters by simplifying groups of clusters again and again, choosing at run time how fine a level each part of the screen needs; see [[Virtualized Geometry]] and [[Photogrammetry]]. The opposite operation, adding triangles to refine a surface, is covered under [[Tessellation]].

## See also
- [[Culling]]
- [[Utah Teapot]]
