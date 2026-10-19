---
aliases:
  - Catmull-Rom
  - Cardinal spline
  - Centripetal Catmull-Rom spline
  - Hermite spline
tags:
  - graphics
summary: A smooth curve that passes through every one of its control points, setting the direction at each point from its two neighbors, which makes it the usual choice for camera paths, motion paths and smoothing hand-drawn strokes.
---
A **Catmull-Rom spline** is a curve that runs exactly through a sequence of points, joining them with smooth cubic segments. Edwin Catmull and Raphael Rom described the family in 1974. Its appeal is that an artist or a program supplies only the points the curve should visit, and the spline works out the smooth path between them on its own.

That's different from a [[Bézier Curve]], where only the endpoints lie on the curve and the middle control points act as handles that pull it without being touched. Handles give precise control, but they're awkward when the input is a list of positions, such as waypoints for a camera, keyframes for a moving object, or samples from a finger dragging across a screen.

The construction is simple. Each segment runs between two points, and the curve's direction at each point is set parallel to the line joining that point's neighbors on either side. Because adjacent segments share that tangent, the curve passes through every point without a kink. Each segment is a **Hermite** cubic, defined by two endpoints and two tangents, and it converts exactly into a cubic Bézier with handles placed one third of a tangent's length from each endpoint, which is how many drawing libraries render it; see [[Linear Interpolation]].

Control is local. Moving one point reshapes only the four segments it touches as an endpoint or neighbor, leaving the rest of a long path alone. B-splines are smoother still but don't, in general, pass through their control points; see [[NURBS]].

The classic version has flaws. With unevenly spaced points, the uniform form can overshoot, loop back on itself or form a sharp cusp inside a segment. The **centripetal** variant spaces the parameter by the square root of the distance between points, and in 2011 Cem Yuksel and colleagues showed it never forms cusps or self-intersections within a segment, so it has become the safer default. More broadly, **cardinal splines** add a tension parameter that shortens or lengthens every tangent, and Catmull-Rom is the case with tension zero.

Uses turn up wherever a path has to go through known places. Games use the spline for camera rails, patrol routes and track editors; see [[Navigation Mesh]]. Animation tools use it for motion paths between keyframes, though the curve's speed has to be managed separately or motion bunches up between points that sit far apart; see [[Keyframe Animation]] and [[Easing]]. Drawing apps smooth jittery stylus input by fitting a curve through the sampled points. Image scaling borrows a related cubic kernel, also called Catmull-Rom, for resizing that stays sharp without ringing much; see [[Image Resampling]].

## See also
- [[Vector Graphics]]
- [[Tessellation]]
