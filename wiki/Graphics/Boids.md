---
aliases:
  - Flocking
  - Steering behaviors
  - Flocking simulation
tags:
  - graphics
summary: Craig Reynolds's 1986 flocking model, in which three local rules followed by every agent produce the convincing motion of birds, fish, and crowds.
---
**Boids** is a model of flocking created by Craig Reynolds in 1986 and published at SIGGRAPH in 1987 as "Flocks, Herds, and Schools: A Distributed Behavioral Model." Each simulated bird, a *boid*, follows three rules based only on the flockmates near it:

- **Separation.** Steer away from neighbors that are too close, to avoid crowding.
- **Alignment.** Steer toward the average heading of nearby neighbors.
- **Cohesion.** Steer toward the average position of nearby neighbors.

Nothing in the rules mentions a flock. There is no leader and no global plan, yet the group wheels, splits around obstacles, and rejoins like a real flock of birds or school of fish. It is the textbook case of emergence, the same phenomenon designers chase in [[Emergent Gameplay]] and that [[Cellular Automaton]] rules show on a grid: complex group behavior from simple local rules.

Film adopted it quickly. Tim Burton's *Batman Returns* (1992) used Reynolds-style flocking for its swarms of bats and its army of penguins, and Reynolds later received a Scientific and Technical Academy Award for his pioneering work in behavioral animation. The same principle scaled up drives crowd simulation, such as the battle armies in *The Lord of the Rings* films.

In 1999 Reynolds generalized the idea into **steering behaviors**, a toolkit of small motion rules for autonomous characters: seek, flee, arrive (slowing near a target), pursue, evade, wander, avoid obstacles, and follow a path. Each produces a desired steering force, and a character blends several. They remain the movement layer under much [[Game AI]], with planning and pathfinding such as [[Dijkstra's Algorithm]] choosing where to go and steering handling how to move there smoothly. A [[Finite State Machine]] often switches between behaviors.

Two practical points come up in every implementation. Each boid must find its neighbors, and checking every pair costs time proportional to the square of the flock's size, so engines use a grid or other [[Spatial Partitioning]] to look only at nearby cells. And the integration step, usually semi-implicit Euler as described in [[Verlet Integration]], needs speed and force limits, or boids oscillate and overshoot.

Real birds turned out to work slightly differently. A 2008 study of starling flocks in Rome by Michele Ballerini and colleagues found that each bird tracks about six or seven nearest neighbors regardless of distance, a topological rule instead of a fixed radius. That keeps a flock cohesive even as its density changes, which a distance-based rule can't do. Boids with nearest-neighbor counts reproduce murmurations more faithfully.

Rendering a large flock is usually done with instancing, drawing thousands of copies of one mesh in a single [[Draw Call]], and a [[Particle System]] often handles the smallest swarms, such as insects.

## See also
- [[Emergent Gameplay]]
- [[Game AI]]
- [[Cellular Automaton]]
- [[Spatial Partitioning]]
