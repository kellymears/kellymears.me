---
aliases:
  - Field of view
  - FOV
  - View frustum
  - Projection matrix
  - Homogeneous coordinates
  - Orthographic projection
tags:
  - graphics
summary: Mapping a 3D scene onto a flat image so that distant things look smaller, from Renaissance painting to the matrix every 3D renderer applies to each vertex.
---
**Perspective projection** maps points in 3D space onto a 2D image the way an eye or camera sees them: objects farther away appear smaller, and parallel lines receding from the viewer converge toward vanishing points. The core rule is simple. A point's position on screen is its sideways position divided by its distance from the viewer.

Renaissance artists worked out the geometry. Filippo Brunelleschi demonstrated linear perspective in Florence around 1415, and Leon Battista Alberti wrote it up as a method for painters in 1435. The pinhole camera is the model graphics still uses.

In a 3D renderer, every vertex of a [[Polygon Mesh]] passes through a chain of transformations: from the model's own coordinates into the world, then relative to the camera, then into *clip space*. Each step is a multiplication by a 4×4 matrix. **Homogeneous coordinates** make this work by giving each point a fourth value, *w*. With it, moving, rotating, scaling, and even perspective can all be expressed as matrix multiplications and combined into one. The projection matrix sets *w* to the point's depth, and the hardware then divides by it, the *perspective divide*, producing the shrinking effect. Rotations are often stored as a [[Quaternion]] and converted to a matrix at this stage.

The visible region is the **view frustum**, a pyramid with its tip cut off, bounded by a near and a far plane. Anything outside is clipped or skipped entirely by [[Culling]]. Depth precision after projection is uneven, concentrated near the camera, which causes flickering surfaces at a distance; see [[Depth Buffer]].

The division by depth also affects everything interpolated across a triangle. Texture coordinates must be interpolated in a perspective-correct way, or textures warp, a defect visible in early 3D consoles and described under [[Texture Mapping]].

**Field of view** sets how wide the frustum is. Wide angles fit more in but stretch objects near the screen edges; narrow angles flatten depth, like a telephoto lens. Players on PC typically prefer a wider field of view than console games default to, partly because they sit closer to the screen. A field of view much narrower than the screen's actual angle at the eye is a common cause of simulator sickness, a mismatch the [[Vestibular System]] reports. Ultrawide monitors usually extend the horizontal view rather than cropping the vertical.

**Orthographic projection** drops the division by depth, so parallel lines stay parallel and size doesn't change with distance. Engineering drawings, CAD, strategy games, and 2D games use it, and isometric pixel art is a fixed orthographic view.

Projection sits between geometry and pixels. After it, [[Rasterization]] fills the projected triangles. [[Ray Tracing]] does the same job in reverse, shooting rays from the eye through each pixel, and reaches the same image.

## See also
- [[Ray Casting]]
- [[Parallax Scrolling]]
- [[Stereoscopy]]
- [[Lens]]
- [[Doom Engine]]
- [[Isometric Projection]]
