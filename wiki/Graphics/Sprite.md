---
aliases:
  - Sprites
  - Sprite sheet
  - Sprite atlas
  - Sprite animation
tags:
  - graphics
summary: A 2D image drawn and moved as a unit, from the hardware sprites of arcade machines and consoles to sprite sheets and atlases in modern engines.
---
A **sprite** is a 2D image drawn as a single movable unit: a character, an enemy, a bullet, an item. The term dates to the late 1970s, when Texas Instruments engineers used it for graphics that floated independently above the background, like fairies. Most 2D games are built from sprites layered over a [[Tile Map]] background.

On early hardware, sprites were a hardware feature. Machines lacked the memory and speed to redraw a whole frame, so dedicated video chips composited a handful of small images over the background as each scanline was drawn. The Commodore 64 supported 8 sprites; the Nintendo Entertainment System 64, but only 8 on any one horizontal line. Exceeding that limit made sprites vanish, so games rotated which ones were drawn each frame, producing the characteristic flicker of busy NES scenes. Collisions between sprites were often detected in hardware too, a primitive form of [[Collision Detection]].

Hardware limits shaped the art. NES sprites were 8×8 or 8×16 pixels with three colors plus transparency, so artists combined several sprites into one character and used careful palettes; see [[Pixel Art]] and [[Color Quantization]]. Animation came from swapping between frames.

Modern GPUs have no sprite hardware. A sprite is a textured rectangle of two triangles, drawn through [[Rasterization]] like anything else. That changes the constraints:

- **Sprite sheets.** All of a character's animation frames are packed into one image, and the game selects a rectangle per frame. Animation becomes changing which part of the sheet is shown.
- **Atlases.** Many unrelated sprites share one large texture, a texture atlas, so the engine can draw hundreds in a single [[Draw Call]] instead of switching textures for each. Batching sprites this way is the main performance concern in 2D engines.
- **Transparency.** Sprites rely on an alpha channel for their shapes; see [[Alpha Compositing]]. Partially transparent edges need sorting by depth, while hard cut-out edges don't.
- **Filtering.** Scaling pixel art sprites with smooth filtering blurs them, so retro-styled games use nearest-neighbor sampling and integer scaling; see [[Image Resampling]].

3D games use sprites too. A **billboard** is a sprite that always faces the camera, used for distant trees, smoke, and effects in a [[Particle System]]. Early 3D games such as *Doom* drew enemies as sprites with frames for each viewing angle. Some modern games deliberately mix 2D sprites with 3D environments for style.

Sprite animation is laborious, since each frame is hand-drawn, which led many games toward [[Skeletal Animation]] of 2D cut-out parts. Others render 3D models to sprites, as *Donkey Kong Country* did in 1994. Hand-drawn frame animation remains valued for its expressiveness, and it's central to [[Game Feel]]: how many frames a jump or attack takes to wind up shapes how responsive it seems.

## See also
- [[Color Cycling]]
- [[Vector Display]]
- [[Rotoscoping]]
- [[Video Game Crash of 1983]]
