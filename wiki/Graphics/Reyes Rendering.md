---
aliases:
  - Reyes
  - RenderMan
  - Micropolygon
tags:
  - graphics
summary: The film rendering architecture behind Pixar's RenderMan, which diced every surface into micropolygons smaller than a pixel before shading them and rendered most computer-animated films for about a quarter century, until path tracing replaced it in the 2010s.
---
**Reyes** is a rendering architecture designed at Lucasfilm's computer division, the group that became Pixar, and described in a 1987 paper by Robert Cook, Loren Carpenter and Edwin Catmull. The name stands for "Renders Everything You Ever Saw" and also nods to Point Reyes, a stretch of California coast. It was the engine inside Pixar's **RenderMan** and, for about a quarter century, the dominant way feature films were rendered.

The goal was film quality at a time when computers were slow and memory scarce. Scenes needed enormous geometric detail, smooth curved surfaces, and realistic motion blur and depth of field, all without visible facets or jagged edges; see [[Motion Blur]] and [[Aliasing]].

The central idea is **dicing**. Each surface, whether a curved patch, a subdivision surface or a polygon, is split recursively until its pieces are small enough on screen, then diced into a grid of **micropolygons**, each about half a pixel across. Every micropolygon is shaded at its corners by a programmable shader, which can also move it, so fine bumps become real displacement rather than a lighting trick; see [[Tessellation]] and [[Normal Mapping]]. Because shading happens on surfaces before visibility is worked out, textures are always read at the right scale; see [[Mipmapping]].

Only then are the shaded micropolygons tested for visibility, at sample points jittered within each pixel. Moving a micropolygon across a sample's moment in time gives motion blur, offsetting it across the lens gives depth of field, and the irregular sampling turns jaggies into fine noise; see [[Stochastic sampling]]. To fit in memory, the screen is divided into small **buckets**, and only geometry touching the current bucket is diced and kept.

RenderMan's shading language, which let artists write small programs describing surfaces and lights, was a direct ancestor of the programs GPUs run today; see [[Shader]]. The RenderMan Interface was published as a specification in 1988, describing how modeling programs hand scenes to a renderer, and other renderers implemented it too.

Reyes rendered Toy Story and many of the effects-heavy films of the 1990s and 2000s. Its weakness was light that bounces. Shadows came from precomputed maps, and reflections and indirect light needed separate tricks, often baked ahead of time; see [[Baked Lighting]]. As computers grew faster, [[Ray Tracing]] became affordable for whole frames, and studios moved to path tracers for simpler setup and more convincing light. Pixar replaced Reyes in RenderMan with a path-tracing core in the mid-2010s; see [[Physically Based Rendering]].

The micropolygon idea outlived the architecture that introduced it. Real-time engines now stream geometry dense enough to approach a triangle per pixel; see [[Virtualized Geometry]].

## See also
- [[Render Farm]]
- [[Rendering Equation]]
- [[Light Field]]
