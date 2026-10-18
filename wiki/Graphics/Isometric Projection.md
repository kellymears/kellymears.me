---
aliases:
  - Isometric
  - Axonometric projection
  - Dimetric projection
  - 2.5D
tags:
  - graphics
summary: A parallel projection that shows three faces of an object at equal angles without perspective, the classic view of strategy games, city builders, and technical illustration.
---
**Isometric projection** draws a three-dimensional scene without perspective, viewed from an angle that shows three faces of a cube equally. The three axes appear 120 degrees apart, and lengths along each are scaled by the same amount; the name means "equal measure." Because there's no perspective, distant objects are the same size as near ones, and parallel lines stay parallel.

It belongs to the family of **axonometric** projections, parallel projections where the view is tilted relative to the object's axes. In a *dimetric* projection two axes share a scale; in a *trimetric* one all three differ. Unlike [[Perspective Projection]], all of these keep measurements along each axis proportional, which is why engineers and architects used them for technical drawings long before computers. A projection matrix for any of them is a simple orthographic [[Transformation Matrix]] after a rotation.

Video games made the style familiar. Early games such as *Zaxxon* (1982) used it to suggest depth on hardware that couldn't render 3D, and it became the signature look of strategy games, city builders, and role-playing games: *SimCity 2000*, *Diablo*, *Age of Empires*, *Fallout*, *Hades*, and countless others. It shows a large area clearly, keeps all units the same size wherever they stand, and makes spatial relationships readable, which suits games about managing space; see [[City Builder]].

Most game "isometric" art isn't strictly isometric. On a pixel grid, true isometric lines at 30 degrees produce irregular steps. Artists use a 2:1 ratio instead, two pixels across for each pixel up, about 26.6 degrees, which gives clean, repeating lines; technically that's dimetric. Tiles become diamonds twice as wide as they are tall; see [[Pixel Art]] and [[Tile Map]].

Isometric engines have their own challenges:

- **Draw order.** Objects must be drawn from back to front so nearer ones overlap farther ones, a form of the painter's algorithm. Objects spanning several tiles make sorting tricky, a classic source of rendering bugs; modern engines often use a [[Depth Buffer]] instead.
- **Input.** Converting a mouse click on a diamond grid back to a tile position takes a little coordinate math.
- **Hidden areas.** Tall walls hide what's behind them, so games cut away walls near the player or make them transparent.

The term **2.5D** covers this and related techniques: 2D art that suggests 3D, or 3D rendering restricted to a 2D plane of play. Many modern games render true 3D scenes with an orthographic camera at an isometric angle, getting the classic look with modern lighting and free rotation.

Isometric views appear outside games too: infographics, technical diagrams, and data visualization use them for a sense of depth that remains measurable. Exploded-view assembly diagrams rely on the same property, as do architectural axonometric drawings.

## See also
- [[Sprite]]
- [[Voxel]]
- [[Fog of War]]
