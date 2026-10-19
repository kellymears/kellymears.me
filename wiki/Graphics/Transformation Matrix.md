---
aliases:
  - Affine transformation
  - Model-view-projection
  - MVP matrix
  - Rotation matrix
  - Linear algebra
tags:
  - graphics
summary: The 4×4 matrices that move, rotate, scale, and project every vertex in 3D graphics, and why chaining them by multiplication makes the whole pipeline work.
---
A **transformation matrix** encodes a geometric operation, moving, rotating, scaling, or projecting, as a grid of numbers. Multiplying a point's coordinates by the matrix applies the operation. In 3D graphics, every vertex of every object passes through a chain of such matrices on its way to the screen, usually inside a vertex [[Shader]].

Rotation, scaling, and shearing are **linear** transformations, which a 3×3 matrix can express. Translation, moving a point by a fixed offset, can't be written as a 3×3 multiplication. The standard trick adds a fourth coordinate, *w*, set to 1 for points, and uses 4×4 matrices. These [[Homogeneous coordinates]] let translation join the others as a single multiplication. Transformations that combine linear operations with translation are called **affine**: they keep straight lines straight and parallel lines parallel. Directions use *w* = 0, so they rotate but don't move, which is why surface normals transform differently from positions; see [[Normal Mapping]].

The key property is composition. Applying transformation A and then B is the same as applying the single matrix B × A, so any chain of operations collapses into one matrix computed once and applied to millions of vertices. Order matters, since matrix multiplication isn't commutative: rotating then translating moves an object along a rotated axis, while translating then rotating swings it around the origin.

The standard chain is **model-view-projection**:

1. **Model matrix.** Places an object in the world, positioning, orienting, and sizing it. A [[Skeletal Animation]] composes these down a bone hierarchy, each bone relative to its parent.
2. **View matrix.** Moves the world so the camera sits at the origin looking down an axis. It's the inverse of the camera's own placement.
3. **Projection matrix.** Maps the visible volume to a standard cube, producing the foreshortening of [[Perspective Projection]] through the division by *w*, or the parallel lines of orthographic and [[Isometric Projection]].

After projection, the GPU divides by *w*, maps to screen pixels, and hands triangles to [[Rasterization]], where the depth values feed the [[Depth Buffer]].

Rotations are where matrices get awkward. Composing many small rotations accumulates floating-point error, so the matrix slowly stops being a pure rotation and objects skew or shrink. Interpolating between two rotation matrices doesn't give a smooth rotation either. Engines usually store orientations as a [[Quaternion]] and convert to a matrix only when needed.

Matrices are the core of linear algebra, which underlies far more than graphics: [[Convolution]] filters, machine learning, and physics simulation. GPUs are, at heart, machines for doing enormous numbers of these multiplications in parallel, which is why they turned out to suit neural networks so well. [[Floating-Point Arithmetic]] precision limits matter here too: in very large worlds, coordinates far from the origin lose precision and vertices jitter, which open-world games avoid by shifting the origin with the player.

## See also
- [[Strassen Algorithm]]
- [[Clipping]]
- [[Linear Programming]]
