---
aliases:
  - Particle systems
  - Particle effect
  - Emitter
  - Billboard
  - Soft particles
tags:
  - graphics
summary: Simulating fire, smoke, sparks, rain, and magic as thousands of small, short-lived points spawned and moved by simple rules.
---
A **particle system** renders fuzzy, shapeless phenomena, such as fire, smoke, explosions, sparks, rain, snow, dust, and magic, as large numbers of tiny, short-lived elements rather than as solid models. An *emitter* spawns particles over time, each with a position, velocity, color, size, and lifetime chosen partly at random. Every frame, simple rules update them: gravity pulls, wind pushes, colors fade, sizes grow. When a particle's lifetime runs out, it disappears. Thousands of these simple elements together read as a single complex effect.

William Reeves of Lucasfilm introduced the technique for the "Genesis sequence" in *Star Trek II: The Wrath of Khan* (1982), in which a wall of fire spreads across a dead planet. His 1983 paper, "Particle Systems—A Technique for Modeling a Class of Fuzzy Objects," defined the approach still used today. Solid geometry is a poor fit for things with no fixed surface. Particles let a few rules and some randomness produce endless variation, a form of [[Procedural Generation]], with [[Seeded Randomness]] when an effect must replay the same way.

In real-time graphics, each particle is usually drawn as a *billboard*, a flat textured square that always faces the camera, so a soft smoke texture looks the same from any angle. Particle systems have their own performance traps:

- **Overdraw.** Smoke and fire are built from many overlapping transparent quads, so the same pixel is shaded many times. Effects that fill the screen up close can tank the frame rate, causing uneven [[Frame Pacing]].
- **Sorting.** Transparent particles must be drawn back to front to [[Alpha Compositing|blend correctly]], which costs time and can cause popping when the order changes.
- **Hard edges.** Where a flat particle cuts into the ground or a wall, a visible seam appears. *Soft particles* read the [[Depth Buffer]] and fade out near solid surfaces.

Modern engines simulate particles on the GPU with compute [[Shader]] programs, handling millions at once, and use instancing to keep the [[Draw Call]] count low. Particles can collide with scenery, follow flow fields driven by [[Perlin Noise]] for natural swirling, or spawn further particles, such as sparks that leave smoke trails. Distant effects are thinned out through [[Level of Detail]], and off-screen emitters are paused by [[Culling]].

In games, particles do much of the work of making actions feel powerful. A hit spark, a dust puff on landing, and a burst of light on a critical hit are central to [[Game Feel]], and genres built on spectacle, such as the [[Bullet Heaven]] games that fill the screen with projectiles and effects, depend on particle budgets. Overused, they become visual noise that obscures what the player needs to see, and fast-moving particles are often blurred with [[Motion Blur]] to smooth them out.

## See also
- [[Order-Independent Transparency]]
- [[Radix Sort]]
