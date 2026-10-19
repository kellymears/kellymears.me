---
aliases:
  - Non-uniform rational B-spline
  - B-spline
tags:
  - graphics
summary: The precise, smooth curves and surfaces that industrial design runs on, defined by weighted control points and able to represent circles exactly, standard in CAD since the 1980s even as film animation moved to subdivision surfaces.
---
**NURBS**, short for non-uniform rational B-splines, are a mathematical way to describe smooth curves and surfaces precisely. A designer places a handful of control points, and the curve flows smoothly near them without necessarily passing through them. NURBS are the standard representation for shapes in computer-aided design, from car bodies and aircraft to consumer products.

The ideas grew out of the automotive industry. In the late 1950s and 1960s, Paul de Casteljau at Citroën and Pierre Bézier at Renault independently developed ways to describe the curves of car bodies mathematically, so designs could drive machine tools directly. Bézier curves are the simplest result; see [[Bézier Curve]].

Each part of the name extends that foundation:

- **B-splines** chain many low-degree curve pieces together, joining them smoothly. Moving one control point changes only a local part of the curve, unlike a single high-degree Bézier curve, where every point affects the whole shape.
- **Non-uniform** means the knots, values that determine where one piece hands off to the next, can be spaced unevenly. Repeating a knot can create a sharp corner or force the curve through a control point.
- **Rational** means each control point carries a weight that pulls the curve toward it more or less strongly. Weights let NURBS represent circles, ellipses, and other conic sections exactly, which ordinary polynomial curves can only approximate. Rational curves also behave correctly under perspective projection; see [[Perspective Projection]] and [[Transformation Matrix]].

A NURBS surface is a grid of control points with curves running in two directions. Complex objects are built from many surface patches, often trimmed by curves to cut holes or fit them together; see [[Constructive Solid Geometry]].

Rendering a NURBS surface usually means converting it to triangles, at whatever density the view requires; see [[Tessellation]] and [[Level of Detail]]. Because the description is exact, the same model can be tessellated coarsely for a preview or finely for manufacturing, and machined parts can be cut directly from it.

In film and games, NURBS gave way to subdivision surfaces in the late 1990s. Subdivision starts from an ordinary mesh of polygons and refines it into a smooth surface, handling arbitrary shapes like a character's hand without the patch-stitching problems of NURBS; see [[Polygon Mesh]]. Pixar's short film Geri's Game, in 1997, was an early showcase. Engineering kept NURBS because manufacturing needs exact dimensions and true circles.

Related curves appear in everyday computing. Fonts describe glyph outlines with Bézier curves, which are rasterized on screen; see [[Font Rendering]] and [[Vector Graphics]]. Animation software uses splines to interpolate motion between keyframes; see [[Linear Interpolation]].

The Utah teapot, an early test model, was built from Bézier patches; see [[Utah Teapot]].

## See also
- [[Rasterization]]
- [[Photogrammetry]]
