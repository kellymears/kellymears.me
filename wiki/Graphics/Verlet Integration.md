---
aliases:
  - Verlet
  - Numerical integration
  - Semi-implicit Euler
  - Cloth simulation
tags:
  - graphics
summary: How simulations step physics forward in time, why the obvious method slowly gains energy, and the simple position-based scheme behind stable cloth, ropes, and ragdolls.
---
**Numerical integration**, in a simulation, is the step that advances every object from one moment to the next: given positions, velocities, and forces now, compute them a small time step later. Games do it every tick of the [[Game Loop]], and the method chosen decides whether the simulation stays stable or slowly flies apart. **Verlet integration** is one of the simplest stable choices.

The obvious method is **explicit Euler**: move each object by its velocity times the step, then update velocity by acceleration times the step. It is exactly what [[Newton's Laws of Motion]] suggest, and it is subtly wrong. Each step uses the velocity from the start of the interval, so a body on a spring or in orbit overshoots slightly and gains a little energy every step. Planets spiral outward and springs oscillate harder until they explode. The error violates [[Conservation of Energy]] in a direction that compounds.

Two cheap fixes dominate games:

- **Semi-implicit Euler** updates velocity first and then moves using the new velocity. Swapping the order makes it *symplectic*: energy wobbles around the true value instead of drifting. Most physics engines use it.
- **Verlet integration** drops velocity altogether. The next position is twice the current position minus the previous one, plus acceleration times the step squared. Velocity is implicit in the difference between the last two positions. Loup Verlet used it for molecular dynamics in 1967, though astronomers had used the same formula earlier. It is time-reversible and keeps energy bounded over long runs, which is why it suits a [[Simple Harmonic Motion]] system or a molecule.

Verlet's real advantage in games is how easily it handles constraints. Thomas Jakobsen's GDC 2001 paper on the character physics of *Hitman: Codename 47* showed the method. Represent a cloth, rope, or ragdoll as a [[Particle System]] linked by distance constraints. After each Verlet step, push every pair of particles back to its rest length, and repeat this relaxation a few times. Because velocity is derived from positions, moving a particle to satisfy a constraint automatically adjusts its velocity too. Resolving [[Collision Detection]] is the same move: project a particle out of the wall. The result is stable, cheap, and looks right, even if it isn't exact. Position-based dynamics, published by Matthias Müller and colleagues in 2006, grew directly from this approach and now powers much real-time cloth and soft-body work.

Two cautions apply. Position Verlet assumes a constant time step, since a changed step distorts the implied velocity, which is one more reason to run physics on a fixed timestep. And bit-identical replays need care with [[Floating-Point Arithmetic]] if multiplayer [[Determinism]] matters. Higher-order methods such as Runge–Kutta are more accurate per step, but they cost more and still drift in energy, so games rarely use them.

## See also
- [[Orbit]]
- [[Particle System]]
- [[Skeletal Animation]]
- [[Elasticity]]
