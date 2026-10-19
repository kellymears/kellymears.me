---
aliases:
  - Paint bucket
  - Seed fill
  - Scanline fill
tags:
  - graphics
summary: The algorithm behind the paint bucket tool, which spreads from a starting pixel to every connected pixel of the same color, and which also reveals Minesweeper squares, captures stones in Go, and maps reachable areas in games.
---
**Flood fill** finds every pixel connected to a starting point that shares its color, and changes them all. It's the algorithm behind the paint bucket tool in image editors: click inside an outlined shape, and the color spills out to fill it, stopping at the boundary. The same idea, also called seed fill, works on any grid or graph where neighbors can be checked for a property.

The simplest version is recursive. Color the current pixel, then call the fill on each of its four neighbors, up, down, left, and right, if they match the original color; see [[Recursion]]. That works but recurses once per pixel, and filling a large area can exhaust the program's stack and crash; see [[Call Stack]]. Practical implementations keep an explicit list of pixels to visit instead, either a queue or a stack, which makes flood fill a form of breadth-first or depth-first search; see [[Graph Traversal]].

**Scanline fill** is faster. Instead of handling pixels one at a time, it fills an entire horizontal run at once, then looks above and below that run for new runs to visit. Since memory stores image rows contiguously, this also uses the cache well; see [[Locality of Reference]].

Connectivity is a choice. **Four-way** fill moves only horizontally and vertically, so a diagonal line of pixels acts as a wall. **Eight-way** fill also moves diagonally, so it leaks through diagonal gaps. Pixel artists notice the difference, since thin outlines drawn with diagonal steps hold a four-way fill but not an eight-way one; see [[Pixel Art]].

Real images complicate things. Edges softened by anti-aliasing contain intermediate colors, so an exact-match fill leaves a fringe of unfilled pixels; see [[Aliasing]]. Editors offer a tolerance setting that treats similar colors as matching. The magic wand selection tool is the same algorithm used to select instead of paint. Dithered images, with their scattered patterns, can make fills leak or stop unexpectedly; see [[Dithering]].

The algorithm appears well beyond painting:

- **Games.** Minesweeper reveals a whole empty region when you click a square with no neighboring mines. Go counts a group's liberties by flooding connected stones. Strategy games compute which tiles a unit can reach; see [[Tile Map]].
- **Level generation.** Generators of caves and dungeons flood from the entrance to remove regions the player can't reach; see [[Procedural Generation]] and [[Cellular Automaton]].
- **Lighting and voxels.** Block-based games spread light outward from sources, decreasing at each step; see [[Voxel]].
- **Image analysis.** Labeling each connected blob in an image, for counting cells or finding objects, can use flood fill or a union-find pass; see [[Union-Find]].

Filling polygons defined by their edges, rather than by pixel colors, is a different problem, solved during rasterization; see [[Rasterization]].

## See also
- [[Canny Edge Detector]]
- [[Bresenham's Line Algorithm]]
