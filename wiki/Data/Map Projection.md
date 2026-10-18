---
aliases:
  - Mercator projection
  - Web Mercator
  - Coordinate reference system
  - WGS 84
  - EPSG:3857
tags:
  - data
summary: A method for flattening the curved surface of the Earth onto a plane, which always distorts area, shape, distance, or direction, and the coordinate systems that geographic data depends on.
---
A **map projection** is a mathematical rule for turning positions on the curved Earth into positions on a flat surface. Every projection distorts something. Carl Friedrich Gauss proved in 1827, in his *Theorema Egregium*, that a sphere cannot be flattened without stretching, which is why an orange peel tears when pressed flat. A projection chooses what to preserve and what to sacrifice.

The main families are defined by what they keep:

- **Conformal** projections preserve local angles and shapes, so small regions look right, at the cost of area. Mercator is the famous example.
- **Equal-area** projections preserve relative size, at the cost of shape. The Gall–Peters projection, promoted in 1973 as a corrective to Mercator, is one.
- **Equidistant** projections preserve distance from one or two points, used for maps centered on an airport or a seismic station.
- **Compromise** projections, such as Robinson or Winkel tripel, distort everything a little and nothing badly.

Gerardus Mercator published his projection in 1569 for navigation: a straight line on it is a constant compass bearing. The price is that area grows enormously toward the poles. Greenland looks about the size of Africa but is roughly fourteen times smaller, and the poles themselves sit at infinity.

Mercator returned in a new form with web maps. Google Maps launched in 2005 with **Web Mercator**, a simplified variant, catalogued as EPSG:3857, that is now used by nearly every web map. Conformality means streets meet at right angles at any zoom level, and the world fits a square that divides neatly into image tiles, each zoom level splitting every tile into four, the same idea as a quadtree in [[Spatial Partitioning]] and [[Mipmapping]]. To make the square, the map is cut off at about 85 degrees latitude.

Geographic data carries a **coordinate reference system** that says how its numbers map to places. GPS reports latitude and longitude on WGS 84, a model of the Earth's shape defined in 1984. Mixing systems silently shifts features by meters to hundreds of meters. Axis order is another trap: GeoJSON stores longitude first, while people say latitude first, and swapped coordinates put points in the wrong hemisphere.

Practical consequences follow. Distance between coordinates must be computed on the sphere, typically with the haversine formula, not with straight-line math on degrees, which shrink in east–west size toward the poles. Area measured on a Web Mercator map is wrong except near the equator. Local surveying uses projections tuned to a small zone, such as the Universal Transverse Mercator grid, where distortion is negligible. Coordinates stored as [[Floating-Point Arithmetic]] need about six decimal places for roughly ten-centimeter precision.

Projection choice shapes perception: a map is a model, and decides in advance what to leave out.

## See also
- [[Global Positioning System]]
- [[Vector Graphics]]
- [[Mipmapping]]
- [[Coriolis Effect]]
- [[Choropleth Map]]
- [[Dimensionality Reduction]]
