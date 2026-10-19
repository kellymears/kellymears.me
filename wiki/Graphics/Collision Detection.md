---
aliases:
  - Physics engine
  - Broad phase
  - Narrow phase
  - Tunneling
  - Continuous collision detection
  - Separating axis theorem
tags:
  - graphics
summary: Finding which objects in a simulation touch, cheaply enough to do every frame, through a coarse pass that discards most pairs and a precise pass on what remains.
---
**Collision detection** finds which objects in a simulated world are touching or overlapping. It keeps characters out of walls and decides whether a sword hit. Doing it naively means testing every object against every other, which grows with the square of the object count, so a scene with ten thousand objects would need fifty million tests each frame. Every physics engine therefore splits the job in two.

The **broad phase** quickly rules out pairs that cannot possibly touch, using coarse bounds such as boxes around each object. Common methods:

- **Sort and sweep.** Sort objects by their extent along one axis; only those whose ranges overlap can collide.
- **[[Spatial Partitioning]].** Divide space into grids or trees so each object is tested only against nearby ones.
- **[[Bounding Volume Hierarchy]].** Nest bounding boxes so whole groups can be rejected at once.

The **narrow phase** takes the surviving candidate pairs and tests their actual shapes. Simple shapes have direct tests: spheres overlap when the distance between centers is less than the sum of radii. Convex shapes use the *separating axis theorem*, which says two convex shapes do not overlap if some line exists onto which their projections do not overlap, or the 1988 GJK algorithm. Concave meshes are split into convex pieces.

Games rarely test the visible geometry. Characters are usually capsules, and objects use boxes, spheres, or simplified hulls, because detailed meshes are expensive and produce snagging. Combat games define separate shapes for being hit and for hitting, described under [[Hitbox and Hurtbox]].

The biggest pitfall is **tunneling**. Collision is usually checked at discrete moments, once per simulation step of the [[Game Loop]]. A fast, small object, such as a bullet, can be on one side of a thin wall at one step and on the other side at the next, never overlapping it. Remedies include smaller time steps, thicker walls, casting a ray along the motion, or *continuous collision detection*, which sweeps an object's shape along its path to find the exact moment of first contact.

Detection is half the problem; **response** is the other. Once contact is found, the engine computes contact points and normals, then applies impulses that change velocities according to [[Newton's Laws of Motion]], with [[Friction]] and bounciness. Resting stacks are notoriously hard, since small errors make them jitter.

Widely used engines include Erin Catto's Box2D (2007), Havok, PhysX, Bullet, and Jolt. Physics bugs are a rich source of emergent play: clipping through walls, launching objects with impossible forces, and sequence breaks are staples of [[Speedrun]] routes and [[Emergent Gameplay]].

The same algorithms serve beyond games. Robotics uses collision checking for motion planning, CAD software checks parts for interference, and [[Ray Tracing]] is in essence collision detection between light rays and a scene.

## See also
- [[Convex Hull]]
- [[Quantum Tunneling]]
- [[Radix Sort]]
- [[Magnus Effect]]
