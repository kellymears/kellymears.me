---
aliases:
  - Quadtree
  - Octree
  - k-d tree
  - Binary space partitioning
  - BSP tree
  - Spatial hash
  - R-tree
tags:
  - graphics
summary: Dividing space into grids or trees so that questions like "what is near this point?" only look at a small neighborhood instead of every object in the world.
---
**Spatial partitioning** divides space into regions so that questions about location, such as what is near a point, what a ray hits, or which objects might collide, can be answered by checking a small neighborhood instead of everything. A world with a million objects cannot test each against each; partitioned, each query touches a handful. It is to geometry what a [[Database Index]] is to a table.

The main structures:

- **Uniform grid.** Divide space into equal cells and list the objects in each. Fast when objects are evenly sized and spread. A *spatial hash* stores only occupied cells in a [[Hash Table]], so an unbounded world costs memory only where things are.
- **Quadtree and octree.** Recursively split a square into four quadrants, or a cube into eight octants, only where there are many objects. Raphael Finkel and Jon Bentley described the quadtree in 1974. They adapt to clustered data: dense cities get small cells, empty oceans one large one.
- **k-d tree.** Jon Bentley's 1975 structure splits space with one axis-aligned plane at a time, alternating axes. It is standard for nearest-neighbor search.
- **Binary space partitioning.** Split space recursively by arbitrary planes, often aligned with walls. Doom in 1993 used a BSP tree to draw its levels in the correct order without a [[Depth Buffer]].
- **R-tree.** Antonin Guttman's 1984 structure groups nearby rectangles into nested bounding boxes, built for databases. Geographic databases such as PostGIS use it.

Spatial partitioning divides *space*; a [[Bounding Volume Hierarchy]] instead divides the *objects*, grouping them under nested boxes that may overlap. Ray tracers favor hierarchies.

Uses across graphics and games:

- **Collision.** The broad phase of [[Collision Detection]] tests each object only against others in nearby cells.
- **Culling and level of detail.** Renderers skip whole regions outside the camera's view, as in [[Culling]], and choose [[Level of Detail]] per region.
- **Simulation.** Barnes and Hut's 1986 algorithm uses an octree to approximate gravity between millions of stars, treating distant clusters as single masses, cutting cost from n² to n log n. Fluid and [[Particle System]] simulations find neighbors with spatial hashes.
- **Worlds.** Open worlds stream in by grid cell, and [[Voxel]] games such as Minecraft store terrain in chunks.

Space-filling curves, such as the Z-order and Hilbert curves, flatten 2D positions into a single number that keeps nearby places mostly nearby, so ordinary sorted indexes can serve spatial queries. Google's S2 and Uber's hexagonal H3 systems index the globe this way.

The structures share a weakness with high dimensions. As dimensions grow, nearly all points become roughly equally far apart and trees stop helping, the *curse of dimensionality*. Searching an [[Embedding]] space with hundreds of dimensions therefore uses approximate methods in a [[Vector Database]] instead.

## See also
- [[Constructive Solid Geometry]]
- [[Fluid Simulation]]
- [[Voronoi Diagram]]
- [[A-Star Search Algorithm]]
