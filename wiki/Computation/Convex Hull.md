---
aliases:
  - Graham scan
  - Gift wrapping algorithm
  - Quickhull
  - Computational geometry
tags:
  - computation
summary: The smallest convex shape enclosing a set of points, like a rubber band snapped around nails, and the classic first problem of computational geometry.
---
The **convex hull** of a set of points is the smallest convex shape that contains them all. In two dimensions it is the shape a rubber band makes when stretched around nails in a board and released: a polygon whose corners are some of the points and whose edges never bend inward. In three dimensions it is the shrink-wrap around a cloud of points. Computing it is the classic first problem of **computational geometry**, the field that studies algorithms for points, lines, and shapes.

Most hull algorithms rest on one test: given three points in order, do they make a left turn or a right turn? The sign of a small determinant built from their coordinates answers it with a few multiplications. Everything else is about choosing which triples to test.

The main algorithms:

- **Gift wrapping** (Jarvis march, 1973) starts at the leftmost point and repeatedly picks the next point so that all others lie on one side, wrapping around the set. Its time is the number of points times the number of hull corners, fast when the hull is small.
- **Graham scan** (1972) sorts the points by angle around a starting point, then walks through them with a stack of candidate corners, popping any that would make a right turn. Sorting dominates, so it runs in n log n time; see [[Sorting Algorithm]] and [[Big-O Notation]].
- **Quickhull** splits the points by the line between the two extremes, finds the point farthest from it, discards everything inside the resulting triangle, and recurses on each side; see [[Divide and Conquer]].
- **Chan's algorithm** (1996) combines the two approaches and runs in n log h time, where h is the number of hull corners, which is optimal.

The n log n bound can't be beaten in general, because a hull algorithm could be used to sort: place the numbers on a parabola, take the hull, and its corners come back in order.

Real coordinates are the hidden difficulty. Floating-point rounding can make three nearly collinear points test as a left turn once and a right turn the next, producing hulls that cross themselves. Robust implementations evaluate the orientation test with exact or adaptive-precision arithmetic; see [[Floating-Point Arithmetic]].

Hulls appear wherever shapes need simplifying. Physics engines wrap complex models in convex hulls, since collisions between convex shapes are far cheaper to test; see [[Collision Detection]] and [[Bounding Volume Hierarchy]]. The feasible region of a [[Linear Programming]] problem is a convex polytope, and the optimum sits at one of its corners. Lifting points onto a paraboloid and taking their three-dimensional hull yields the Delaunay triangulation, the dual of the [[Voronoi Diagram]]. Ecologists draw hulls around animal sightings to estimate home ranges.

## See also
- [[Spatial Partitioning]]
- [[Polygon Mesh]]
- [[Clipping]]
