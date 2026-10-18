---
aliases:
  - Voronoi
  - Voronoi tessellation
  - Delaunay triangulation
  - Worley noise
  - Cellular noise
  - Lloyd's algorithm
tags:
  - graphics
summary: Dividing a space into regions by which seed point is nearest, a pattern found in giraffe skin and cracked mud and used for maps, textures, meshes, and nearest-facility questions.
---
A **Voronoi diagram** divides a space into regions around a set of seed points, where each region contains every location closer to its seed than to any other. The boundaries are where two seeds are equally close, and the result looks like a mosaic of irregular convex cells. The structure is named for Georgy Voronoy, who formalized it in 1908, though Descartes sketched similar ideas in 1644.

One of the most celebrated uses predates the name. In 1854, John Snow mapped cholera deaths in London's Soho and drew a boundary around the area closer, by walking distance, to the Broad Street water pump than to any other pump. The deaths clustered inside it, strong evidence that the disease spread through water, and an early triumph of reasoning from [[Correlation and Causation]] with a [[Plausible Mechanism]].

The diagram has a twin, the **Delaunay triangulation**, introduced by Boris Delaunay in 1934. Connect every pair of seeds whose Voronoi cells share an edge and you get a triangulation that avoids thin sliver triangles, maximizing the smallest angle. It is the standard way to build a [[Polygon Mesh]] from scattered points, as when terrain or scanned [[Photogrammetry]] data is meshed. Steven Fortune's 1986 sweep-line algorithm computes a Voronoi diagram in n log n time.

In graphics, Voronoi patterns are everywhere:

- **Worley noise.** Steven Worley's 1996 cellular texture function returns the distance to the nearest seed point, producing stone, scales, cracked earth, cell walls, and water caustics. It complements smooth [[Perlin Noise]] in [[Procedural Generation]].
- **Fracture.** Games shatter glass and walls by splitting the object into Voronoi cells around impact points.
- **Maps.** Procedural world generators use Voronoi cells as regions or provinces, giving natural-looking irregular borders, as in many strategy and [[4X Game]] maps.
- **Stippling and mosaics.** Lloyd's algorithm repeatedly moves each seed to the center of its cell, relaxing the pattern into evenly spaced points that look hand-placed. The same iteration underlies k-means clustering.

Nature produces Voronoi-like patterns whenever regions grow outward from scattered centers at similar rates until they meet: giraffe patches, dragonfly wings, bubbles in foam, mud cracks, and the territories of animals defending space around nests. The resemblance is approximate, but the mechanism is similar.

Voronoi questions are also nearest-facility questions. Which hospital, cell tower, or store is closest to each address? Which server should answer a user, as with [[Anycast]] routing to the nearest data center? Which customer belongs to which delivery zone? Answering them at scale relies on [[Spatial Partitioning]] structures that find nearest neighbors quickly, and in high dimensions the same question underlies the similarity search behind an [[Embedding]] index.

Weighted variants give some seeds more pull, modeling crystal grains and the market areas of competing towns.

## See also
- [[Procedural Generation]]
- [[Perlin Noise]]
- [[Spatial Partitioning]]
- [[Cellular Automaton]]
- [[Blue Noise]]
