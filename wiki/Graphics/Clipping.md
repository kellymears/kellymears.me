---
aliases:
  - Line clipping
  - Polygon clipping
  - Cohen-Sutherland algorithm
  - Sutherland-Hodgman algorithm
  - Guard band
tags:
  - graphics
summary: Cutting lines and polygons down to the part that lies inside a window or the camera's view volume, one of the oldest problems in computer graphics, solved by classic algorithms from the 1960s and 1970s and still needed to keep points behind the camera from wrecking a projection.
---
**Clipping** removes the parts of a shape that fall outside a region of interest. In a drawing program the region might be a window or a panel. In 3D rendering it's the **view volume**, the slice of space the camera can see, bounded by the screen's edges plus near and far planes; see [[Perspective Projection]]. Anything outside is thrown away before pixels are filled, and shapes that straddle the boundary are trimmed to it.

Early line-drawing displays made this urgent. Coordinates beyond the screen edge could overflow and wrap around to the other side, so every line had to be cut first; see [[Vector Display]]. The **Cohen-Sutherland algorithm**, developed by Danny Cohen and Ivan Sutherland in 1967, gives each endpoint a four-bit code saying whether it lies above, below, left or right of the window. If both codes are zero, the line is entirely inside. If the two codes share a set bit, both ends lie beyond the same edge and the line can be rejected without any arithmetic; see [[Bitwise Operation]]. Only the remaining cases need intersection math. Cohen later coined the word endianness; see [[Endianness]].

Polygons are harder, because clipping a triangle can produce a shape with more corners. The **Sutherland-Hodgman algorithm** of 1974 clips against one edge at a time. It walks around the polygon, keeps the vertices inside the edge, inserts a new vertex wherever a side crosses it, and passes the result on to the next edge. A triangle clipped against all six planes of a view volume can come out with up to nine vertices, which the pipeline then splits back into triangles; see [[Polygon Mesh]].

In a GPU [[Graphics Pipeline]], clipping happens in homogeneous **clip space**, after projection but before the perspective divide. The order matters. A vertex behind the camera has a negative w coordinate, and dividing by it would flip the point to the wrong side of the screen, producing triangles that streak across the view; see [[Transformation Matrix]]. Clipping against the near plane first removes those points.

Modern hardware avoids most of this work. Rasterizers accept coordinates well beyond the screen, a margin called the **guard band**, so a triangle poking past the edge is simply drawn and its outside pixels discarded by a cheap per-pixel scissor test. True geometric clipping is reserved for triangles that cross the near plane or reach past the guard band; see [[Rasterization]]. Removing whole objects that can't be seen is a separate step; see [[Culling]].

The idea runs well beyond 3D. A scrolling panel clips its contents to its frame, vector formats support arbitrary clip paths for masking artwork, and [[Constructive Solid Geometry]] computes intersections between whole solids.

## See also
- [[Stencil Buffer]]
- [[Depth Buffer]]
- [[Computational geometry]]
