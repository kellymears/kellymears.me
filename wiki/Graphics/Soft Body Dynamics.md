---
aliases:
  - Soft-body physics
  - Mass-spring system
  - Position-based dynamics
tags:
  - graphics
summary: The simulation of objects that bend, squash, and wobble, such as cloth, flesh, and rubber, using spring networks, positional constraints, or finite elements, trading physical accuracy against speed and stability.
---
**Soft body dynamics** is the simulation of objects that deform: rubber, flesh, cloth, jelly, and anything else that bends, squashes, or wobbles when pushed. It contrasts with rigid body simulation, which treats every object as perfectly stiff, with only a position and orientation to track; see [[Rigid Body Dynamics]].

Real deformable materials obey continuum mechanics: stress and strain spread through the material according to its stiffness; see [[Elasticity]]. Engineers simulate them accurately with the finite element method, which divides an object into small cells, often tetrahedra, and solves for how each one deforms. That's precise but expensive, and games and animation usually trade accuracy for speed.

The simplest approach is the **mass-spring system**. The object is a set of point masses connected by springs that pull back toward their rest lengths; see [[Simple Harmonic Motion]]. Springs along edges resist stretching, springs across faces resist shearing, and springs that skip a point resist bending. Each step, the program adds up spring forces, updates velocities, and moves the points. Stiff springs are a problem: with a large time step, the simulation overshoots and explodes; see [[Numerical Stability]]. Many simulators use implicit integration, which stays stable with stiff springs at the cost of solving a system of equations every step.

**Position-based dynamics**, popularized in the mid-2000s, sidesteps forces. Points move freely, and then their positions are nudged repeatedly to satisfy constraints such as fixed distances or preserved volume. It's fast, stable, and easy to control, which made it a staple of real-time cloth and soft bodies; see [[Verlet Integration]]. The method is less physically exact, and its stiffness depends on how many correction passes run each frame; see [[Game Loop]].

Shape matching offers another shortcut. Points are pulled toward a best-fit rigid copy of the original shape, so the object jiggles but always tends to recover. Games often use it for squishy creatures and wobbly props.

Collisions make soft bodies hard. A deforming object can touch itself, fold over, or tangle, and detecting contact between thousands of moving triangles each frame is costly; see [[Collision Detection]] and [[Bounding Volume Hierarchy]]. Real-time games usually limit soft bodies to cloth, hair, and secondary motion, the jiggle of flesh or a ponytail layered on an animated skeleton; see [[Skeletal Animation]].

Some games put soft bodies at the center. BeamNG.drive, first released in 2013, simulates each vehicle as a network of nodes and beams, so crashes crumple bodywork in convincing detail.

Animators exaggerate deformation deliberately for appeal, a principle older than computers; see [[Twelve Basic Principles of Animation]]. Liquids and smoke raise related problems at larger scale; see [[Fluid Simulation]].

## See also
- [[Particle System]]
- [[Material Fatigue]]
