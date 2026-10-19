---
aliases:
  - Texture pop-in
  - Virtual texturing
  - MegaTexture
tags:
  - graphics
summary: Loading a game's textures into graphics memory on demand, at only the detail currently needed, so that worlds far larger than video memory can be drawn, at the risk of visible blur and pop-in when loading falls behind.
---
**Texture streaming** is the practice of loading a game's textures into graphics memory on demand, at only the detail currently needed, rather than loading everything at once. Large modern games ship tens or hundreds of gigabytes of texture data, far more than fits in a graphics card's memory, so engines continually decide which images, and which resolutions of them, to keep resident; see [[Graphics Processing Unit]].

The usual unit is the mip level. Every texture is stored as a chain of progressively halved copies, and a distant object needs only a small one; see [[Mipmapping]]. A streaming system estimates, for each texture, the finest level any visible surface will sample, based on distance and screen size, then loads missing levels in priority order and evicts those no longer needed. The policy is a form of caching, with the familiar trade-off between keeping data close and fetching it on demand; see [[Locality of Reference]] and [[Virtual Memory]].

When streaming falls behind, players see it. A surface first appears blurry, then sharpens a moment later as detail arrives, an artifact called **texture pop-in**. It's most visible after a camera cut or fast travel, when everything around the player changes at once. Fast storage helps a great deal, and consoles since 2020 have paired solid-state drives with hardware decompression partly for this reason; see [[Solid-State Drive]] and [[Texture Compression]]. Geometry has the same problem, with distant models swapped for detailed ones as the player approaches; see [[Level of Detail]].

**Virtual texturing** takes the idea further. Instead of streaming whole mip levels, it divides textures into small fixed-size pages, much like an operating system's memory pages, and keeps a cache of only the pages actually visible on screen. A feedback pass records which pages each frame touches, and missing ones are requested for later frames. id Software's **MegaTexture** technology, used in Rage in 2011, painted one enormous unique texture across whole landscapes this way, and the game drew criticism for visible pop-in when the camera turned quickly. Modern hardware supports sparse textures, with only some pages backed by memory, and major engines now use virtual texturing widely; see [[Virtualized Geometry]].

Streaming shapes design. Levels are built with corridors, elevators, and narrow squeezes that hide loading, a habit players have learned to recognize; see [[Open World]]. Running out of video memory causes stutter and smeared textures, and the texture quality option in a settings menu is largely a budget for the streaming cache; see [[Frame Pacing]] and [[Shader Compilation Stutter]].

Captured real-world surfaces, with their huge unique textures, push these systems hardest; see [[Photogrammetry]]. Sampling a mip level that hasn't arrived yet falls back to a coarser one; see [[Image Resampling]].

## See also
- [[Render Farm]]
- [[Terrain Generation]]
