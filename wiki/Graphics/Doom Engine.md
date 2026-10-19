---
aliases:
  - id Tech 1
  - WAD file
tags:
  - graphics
summary: The engine behind id Software's 1993 Doom, which drew fast textured 3D worlds on ordinary PCs by restricting maps to floors and walls and presorting them with a BSP tree, and whose separate data files and released source made it endlessly modded and ported.
---
The **Doom engine** is the software John Carmack wrote at id Software for Doom, released in December 1993. It drew textured, lit, multi-level environments fast enough for an ordinary home PC with no graphics hardware, years before 3D accelerator cards were common. Doom made the first-person shooter a genre, and its engine set the pattern for how games were built and sold; see [[Game Engine]].

The engine is often called 2.5D. A Doom map is drawn in two dimensions as a floor plan of regions called sectors, each with its own floor height, ceiling height, and light level. Walls are always vertical, and no sector can sit above another, so there are no rooms over rooms or bridges you can walk under. The player can't truly look up or down either. Those limits made rendering fast, and designers turned them into a style: stairs, lifts, and outdoor courtyards came from varying sector heights alone.

Id's previous game, Wolfenstein 3D, cast one ray per screen column into a grid of equal-height walls; see [[Ray Casting]]. Doom's maps had walls at any angle, so it needed a different trick. A separate program precomputed a **binary space partitioning** tree for each level, recursively splitting the map by wall lines until every region was convex; see [[Binary space partitioning]]. At runtime the engine walked the tree from the player's position and got the walls in front-to-back order with no sorting, drawing each screen column once and skipping whatever was hidden, the reverse of the [[Painter's algorithm]]; see [[Culling]].

Other choices fit the hardware:

- **Fixed-point math.** Many PCs of the time lacked fast floating-point units, so the engine did its geometry with integers scaled to hold fractions; see [[Fixed-point arithmetic]].
- **Sprites.** Monsters and items are flat images, drawn from eight angles so they appear to turn; see [[Sprite]].
- **A 256-color palette** with precomputed tables for darkening each color, which gave the game its distance fade into murk; see [[Indexed color]].
- **Perspective-correct walls and floors** drawn one column or row at a time; see [[Texture Mapping]].

Levels, graphics, and sounds lived in separate data files, called WADs, so players built their own levels with community-written editors almost immediately; see [[Game Modding]]. Id released the source code in 1997, later under the GPL, and the community produced source ports that added higher resolutions, mouse look, and modern operating system support while keeping old WADs playable; see [[Game Preservation]].

The released source also made Doom the standard test of whether a device can run a game. It has been ported to calculators, printers, and countless other screens.

The game's recorded demo files store inputs, not video, and replay deterministically, which made Doom an early center of competitive [[Speedrun]] culture; see [[Seeded Randomness]].

## See also
- [[Mode 7]]
- [[Portal Rendering]]
