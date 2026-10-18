---
aliases:
  - Rigid body
  - Ragdoll physics
tags:
  - graphics
summary: Simulating solid objects that move, spin, collide, and stack without deforming, the core of game physics engines, built on Newton's laws plus a solver that resolves thousands of contacts every frame.
---
**Rigid body dynamics** simulates solid objects that move and rotate but never bend or squash: crates, cars, falling debris, and stacked blocks. It's the core of most game physics engines and of many engineering simulations. Treating objects as perfectly rigid is a simplification, but for most visible motion it's close enough and far cheaper than modeling deformation.

Each body has a mass, a position, an orientation, and linear and angular velocities. Its resistance to spinning depends on how its mass is distributed, captured in a quantity called the inertia tensor; see [[Angular Momentum]] and [[Center of Mass]]. Every time step, the engine applies forces such as gravity, updates velocities and positions, and checks what has collided. Forces and torques follow [[Newton's Laws of Motion]] and [[Torque]]. Orientation is usually stored as a [[Quaternion]] so rotations combine cleanly.

The step itself is a numerical approximation; see [[Verlet Integration]]. Engines run at a fixed rate, often 60 or more steps a second, independent of the frame rate, because varying the step changes results and can make simulations unstable; see [[Game Loop]].

Collisions are the hard part. First the engine finds which shapes touch, using spatial structures to avoid testing every pair; see [[Collision Detection]]. Then it must stop them from passing through each other, apply bounce, and apply [[Friction]]. Most engines do this with **impulses**: instantaneous changes in velocity at each contact point. A box resting on a stack has several contacts, each affecting the others, so the solver loops over all of them repeatedly, adjusting each in turn until they settle. Erin Catto's Box2D, released in 2007, popularized this "sequential impulse" approach.

Common problems have standard fixes:

- **Jitter.** Stacks wobble because the solver never fully converges. Engines put still objects to **sleep**, skipping them until something disturbs them.
- **Tunneling.** Fast, thin objects pass through walls between steps. Continuous detection sweeps shapes along their path.
- **Explosions.** Objects that start overlapping get pushed apart with huge force, flinging them across the level.

**Ragdolls** link body parts with joints that limit how they bend, then let a character collapse under physics instead of playing a canned animation. They spread in the early 2000s and are often blended with animation; see [[Skeletal Animation]].

Physics turned into gameplay with titles such as *Half-Life 2* (2004), whose gravity gun let players pick up and throw objects; see [[Emergent Gameplay]]. Bugs became gameplay too: speedrunners exploit physics glitches to clip through walls or launch themselves across maps; see [[Speedrun]].

Simulations must be deterministic for replays and some networked games, which is difficult because floating-point results vary across hardware and compilers; see [[Determinism]].

## See also
- [[Game Engine]]
- [[Entity Component System]]
