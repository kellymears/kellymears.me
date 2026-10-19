---
aliases:
  - Tilemap
  - Tileset
  - Autotiling
tags:
  - graphics
summary: Building 2D worlds from a grid of indices into a shared set of small images, a technique born of tiny video memory that still structures level design, collision, and generation.
---
A **tile map** describes a 2D scene as a grid in which each cell stores an index into a **tileset**, a shared collection of small images. A level a few thousand pixels wide becomes a few hundred small numbers plus one sheet of art. Floors, walls, water, and platforms are all reused tiles.

The technique was born of scarcity. The Nintendo Entertainment System (1983) had only 2 kilobytes of video RAM, far too little for a full-screen bitmap. Its picture processing unit instead drew the background from a *nametable* of tile indices, each pointing to an 8×8-pixel pattern stored in cartridge memory, and colored each area with a small palette. Hardware scrolling just shifted which part of the nametable was shown. Most 2D consoles through the 1990s worked the same way, which is why their games look built from repeated blocks, and why understanding these engines is a large part of [[Emulation]].

Modern hardware has no such limits, but tile maps have survived because they structure much more than drawing:

- **Rendering.** All tiles live in one texture atlas, so a whole layer of the map can go out in a single [[Draw Call]]. Atlases need padding around each tile; otherwise filtering and [[Mipmapping]] bleed neighboring tiles' colors into the seams.
- **Collision.** Finding what occupies a position is one division and one array lookup, so tile-based [[Collision Detection]] is cheap and exact. The grid acts as built-in [[Spatial Partitioning]].
- **Navigation.** A grid is a ready-made graph, and pathfinding with [[Dijkstra's Algorithm]] or A* runs on it directly.
- **Editing.** Designers paint levels with tools such as the open-source Tiled editor, which stores layers, objects, and custom properties alongside the grid.

**Autotiling** chooses each tile's variant from its neighbors, so a designer paints "grass" and the editor picks the right edge and corner pieces. Each neighbor that matches sets one bit in a mask. Checking four edge neighbors gives 16 variants, and also checking corners gives the 47-tile "blob" set.

Tile maps are also the natural canvas for [[Procedural Generation]]. Cave maps are often grown with a [[Cellular Automaton]], dungeon rooms are stitched from prefabricated chunks, and [[Wave Function Collapse]] fills grids from adjacency rules learned from examples. Isometric and hexagonal maps are tile maps with different projections from grid to screen.

The style constraints of old hardware have become an aesthetic in their own right. Limited tiles and palettes, which [[Color Quantization]] imitates, push artists toward strong, readable shapes, and the visible grid gives players a clear sense of space that 3D worlds work harder to provide.

## See also
- [[Isometric Projection]]
- [[Platformer]]
- [[Mahjong]]
- [[Flood Fill]]
- [[Color Cycling]]
