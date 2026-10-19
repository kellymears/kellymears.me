---
aliases:
  - ECS
  - Data-oriented design
tags:
  - graphics
summary: A way to structure game code where entities are bare IDs, components are plain data attached to them, and systems process every entity with a given set of components, replacing deep class hierarchies with composition and cache-friendly arrays.
---
An **entity component system**, or ECS, is an architecture for game code built from three parts:

- **Entities** are just identifiers, numbers that stand for things in the world. An entity has no behavior and no data of its own.
- **Components** are plain data attached to entities: a position, a velocity, a health value, a sprite. An entity is whatever its components make it.
- **Systems** are functions that run each frame over every entity with a particular set of components. A movement system updates everything with a position and a velocity; a rendering system draws everything with a position and a sprite; see [[Game Loop]].

It began as a reaction to inheritance. Early object-oriented games modeled the world as class trees: a monster is a character, which is a moving object, which is a game object. Trees like that break when designs cross branches. A treasure chest that walks, or a turret that can be picked up, either duplicates code or pushes features up into a base class that everything inherits whether it needs them or not. Building entities from interchangeable parts avoids the problem, a case of preferring composition over inheritance; see [[Object-Oriented Programming]].

Component-based designs spread through the industry in the early 2000s. Scott Bilas described the data-driven component system behind Dungeon Siege at the Game Developers Conference in 2002, and Blizzard's 2017 talk on Overwatch's architecture made strict ECS widely known.

The second motive is speed, and it comes from **data-oriented design**. Storing each component type in its own tightly packed array means a system reading only positions and velocities streams through memory in order, which modern processors handle far faster than chasing pointers between scattered objects; see [[Locality of Reference]]. It's the same layout that makes analytic databases fast; see [[Columnar Storage]]. Many engines group entities with identical component sets into shared tables, called archetypes, so queries scan only the tables that match, and component sets can be tracked as a [[Bitmask]].

Because systems declare which components they read and write, a scheduler can run systems that don't conflict on different cores at once without one corrupting another's data; see [[Data race]]. Unity's Entities package, released as production-ready in 2023, and the Rust engine Bevy are built this way.

ECS has costs. Logic spreads across many systems, so following what happens to one entity means reading all of them, and the order systems run in becomes an important, implicit dependency. Relationships between entities, such as a sword held by a hand, fit less naturally than in a [[Scene Graph]]. For small games with few objects, the performance gains rarely matter, and a plain object model is simpler; see [[Premature Optimization]].

## See also
- [[Game Engine]]
- [[Particle System]]
- [[Boids]]
- [[Animation Blending]]
- [[GPU Instancing]]
