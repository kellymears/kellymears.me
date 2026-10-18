---
aliases:
  - Mesh
  - Triangle mesh
  - Vertex
  - Vertices
  - Subdivision surface
  - Retopology
tags:
  - graphics
summary: The standard representation of 3D shape in graphics, a surface built from vertices joined into triangles or quads, and the tradeoffs in how it's modeled and stored.
---
A **polygon mesh** represents a 3D shape as a surface of flat faces. It's built from *vertices*, points in space, joined by *edges* into *faces*, usually triangles or quadrilaterals. Almost everything drawn in a game or animated film is a mesh at the moment it's rendered.

GPUs draw triangles. A triangle's three points always lie in one plane and always form a convex shape, so it can be filled unambiguously, as described under [[Rasterization]]. Quads and larger polygons are split into triangles before drawing. Meshes are stored as a list of vertices plus an *index buffer* listing which vertices form each triangle, so a vertex shared by six triangles is stored once.

Each vertex carries more than a position:

- **Normals**, the direction the surface faces, used for lighting. Smooth shading shares one normal between adjacent faces; a hard edge needs separate vertices with different normals.
- **Texture coordinates** for [[Texture Mapping]].
- **Bone weights** saying how much each skeleton bone moves the vertex, as in [[Skeletal Animation]].
- **Colors and tangents** for other effects, such as [[Normal Mapping]].

Modelers prefer quads arranged in flowing *edge loops* around eyes, mouths, and joints, because they deform cleanly when animated and subdivide predictably. **Subdivision surfaces**, introduced by Edwin Catmull and Jim Clark in 1978, repeatedly split and average a coarse mesh into a smooth one. Pixar made them its standard after the 1997 short *Geri's Game*.

Detail is often created and then transferred. Artists sculpt a model with millions of polygons, build a simpler version with clean topology, a step called *retopology*, and bake the fine detail into normal maps. Meshes also come from 3D scans, from photogrammetry, and from converting volumes such as a [[Voxel]] grid or a [[Signed Distance Field]] with [[Marching Cubes]]. Curved design surfaces made from [[Bézier Curve]] patches are tessellated into triangles; the famous Utah teapot, modeled by Martin Newell in 1975, began as Bézier patches.

Polygon count drives cost. Games swap in simpler meshes for distant objects, as described under [[Level of Detail]], and skip faces pointing away from the camera, a form of [[Culling]]. Unreal Engine 5's Nanite system, released in 2021, breaks meshes into small clusters and picks detail per cluster each frame, making film-quality models practical in real time. For [[Ray Tracing]], meshes are organized into a [[Bounding Volume Hierarchy]] so rays can skip most triangles.

Some uses need meshes to be *manifold*, or watertight: every edge shared by exactly two faces, enclosing a solid with no holes. 3D printing, physics collision, and boolean operations that cut one shape with another all fail or misbehave on meshes with gaps, flipped normals, or stray internal faces, so cleanup tools exist mainly to repair them. Before drawing, every vertex is transformed into screen space by [[Perspective Projection]].

## See also
- [[Virtualized Geometry]]
- [[Constructive Solid Geometry]]
