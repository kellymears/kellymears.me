---
aliases:
  - BVH
  - Bounding volume
  - Bounding box
  - Axis-aligned bounding box
  - AABB
  - Acceleration structure
tags:
  - graphics
summary: A tree of nested boxes around a scene's geometry that lets ray tracing, culling, and collision detection skip most objects with a few cheap tests.
---
A **bounding volume hierarchy (BVH)** is a tree that organizes a scene's geometry into nested boxes. Each leaf holds a few triangles or objects inside a tight box. Each internal node holds a box enclosing all of its children. The root encloses the whole scene. The boxes are usually *axis-aligned bounding boxes* (AABBs), whose sides line up with the coordinate axes, because testing whether a ray hits one takes only a handful of comparisons.

The point is to avoid testing everything. A ray traced naively would check every triangle in the scene, millions per ray and billions per frame. With a BVH, a ray first tests the root's two children. If it misses a child's box, everything inside that child is skipped at once. Each test discards a large share of the remaining scene, so a query costs time roughly logarithmic in the number of primitives rather than linear, the same win a [[B-Tree]] or [[Binary Search]] gets from ordering data. This is the structure that makes [[Ray Tracing]] practical, and real-time ray tracing hardware is largely dedicated circuitry for walking BVHs and testing ray-box and ray-triangle intersections.

Building a good BVH is a trade between build time and query speed:

- **Split quality.** How the builder divides objects between children determines how much a query can skip. The *surface area heuristic* estimates the cost of each candidate split from the probability that a random ray hits each child's box, and produces much faster trees than splitting at the midpoint.
- **Rebuild versus refit.** Moving objects invalidate the tree. A *refit* just enlarges boxes upward from changed leaves, which is cheap but degrades the tree as boxes overlap more. A full rebuild restores quality but costs more. Real-time engines usually split the scene into a fast-rebuilt top level of objects and rarely changed bottom-level trees for each mesh.

BVHs serve far beyond ray tracing. [[Culling]] uses them to reject whole regions of the scene outside the view frustum. Physics engines use them for *broad-phase* collision detection, finding which pairs of objects might be touching before running exact tests, and games use them for [[Hitbox and Hurtbox]] queries. Spatial alternatives such as octrees, k-d trees, and uniform grids divide space rather than objects. A BVH divides objects, so it never splits a triangle and handles uneven scenes well. The principle of checking a cheap conservative bound before doing exact work also drives [[Level of Detail]] and [[Signed Distance Field]] sphere tracing.

## See also
- [[Ray Tracing]]
- [[Culling]]
- [[B-Tree]]
- [[Binary Search]]
- [[Collision Detection]]
- [[Big-O Notation]]
- [[Virtualized Geometry]]
- [[Spatial Partitioning]]
