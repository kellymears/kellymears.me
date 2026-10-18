---
aliases:
  - Bezier curve
  - Bezier
  - Control point
  - Spline
  - De Casteljau's algorithm
tags:
  - graphics
summary: The smooth curve defined by a handful of control points that underlies fonts, vector drawings, animation easing, and the pen tool in every design app.
---
A **Bézier curve** is a smooth curve defined by a small number of *control points*. The curve starts at the first point and ends at the last, and the points in between pull it toward themselves without the curve passing through them. A *quadratic* Bézier has one middle control point. A *cubic* Bézier, the most common kind, has two, which lets a single segment form an S-shape. Longer shapes are built by joining segments end to end, keeping the control points on either side of each joint in line so the curve stays smooth.

The curves come from the French car industry. Paul de Casteljau developed them at Citroën in 1959, but the company kept his work confidential. Pierre Bézier, an engineer at Renault, independently developed and published an equivalent system in the 1960s for designing car body panels, and the curves took his name. *De Casteljau's algorithm*, which builds a point on the curve by repeatedly interpolating between control points, remains the standard way to evaluate and split them.

They became the basic vocabulary of digital shape:

- **Fonts.** PostScript Type 1 and OpenType CFF fonts describe letter outlines with cubic Béziers. TrueType uses quadratic ones. Every glyph on screen is a set of curves rasterized at the current size, with spacing adjusted by [[Kerning]] and, in a [[Variable Fonts|variable font]], outlines interpolated between designs.
- **Vector drawing.** The pen tool in illustration and design apps places Bézier control points directly, and SVG path commands such as `C` and `Q` describe the same curves. See [[Vector Graphics]].
- **Animation.** Animation software uses Bézier curves to shape how values change over time. CSS's `cubic-bezier()` timing function defines [[Easing]] with two control points, a staple of [[Motion Design]].
- **Paths in games.** Camera rails, racing lines, and projectile arcs are often Bézier or related spline curves.

Their usefulness comes from a few properties. Moving a control point changes the curve predictably and locally. The curve always stays inside the polygon formed by its control points, which makes bounds checks cheap. And curves are easy to split, which renderers use to break them into straight lines fine enough to pass to [[Rasterization]] without visible corners or [[Aliasing]].

Related curves handle cases Béziers handle poorly. B-splines and NURBS, used in industrial CAD, keep smoothness automatically across many segments, and Catmull–Rom splines pass through every control point, which suits animation paths through fixed positions. Modern text renderers sometimes convert outlines into a [[Signed Distance Field]] or evaluate curves directly in a [[Shader]], so glyphs stay crisp at any zoom.

## See also
- [[Twelve Basic Principles of Animation]]
- [[Utah Teapot]]
- [[Rasterization]]
- [[Keyframe Animation]]
- [[Font Rendering]]
- [[Linear Interpolation]]
