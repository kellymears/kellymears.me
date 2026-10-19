---
aliases:
  - Stable fluids
  - Smoothed particle hydrodynamics
  - Navier-Stokes equations
tags:
  - graphics
summary: Computing how water, smoke, and fire move by approximately solving the equations of fluid flow on grids or particles, accurate enough to fool the eye in film and cheap enough for games only with heavy shortcuts.
---
**Fluid simulation** computes how liquids and gases move, for visual effects, games, and engineering. Water splashing, smoke curling, and fire flickering all follow the **Navier-Stokes equations**, worked out in the 19th century, which describe how a fluid's velocity changes under pressure, gravity, and internal friction. Exact solutions are rarely possible, so computers approximate them step by step.

Graphics and engineering want different things. Engineers need accurate numbers for aircraft wings or blood flow, and may spend days computing a single case. Graphics needs results that look right, quickly, and stay stable whatever the artist does; see [[Reynolds Number]] and [[Viscosity]].

Two broad approaches exist:

- **Grids** divide space into cells, each storing velocity and density. The fluid moves through a fixed grid. Grids handle smoke and fire well, and are usually drawn by stepping through the volume; see [[Ray Marching]].
- **Particles** carry the fluid themselves, each a small blob of mass that moves with the flow. **Smoothed particle hydrodynamics**, invented in 1977 for astrophysics, computes pressure from how crowded nearby particles are. Finding neighbors quickly needs spatial data structures; see [[Spatial Partitioning]] and [[Particle System]].

Film studios often combine them, moving particles through a grid to keep fine splashes without losing volume. Liquid surfaces are then reconstructed from particles as a mesh; see [[Marching Cubes]].

A turning point for graphics was Jos Stam's 1999 paper "Stable Fluids." Earlier methods blew up if the time step was too large, a constant risk in interactive tools; see [[Verlet Integration]]. Stam traced each cell's value backward along the flow to find where its fluid came from, which never becomes unstable, then enforced that the fluid can't compress by solving for pressure. The method loses some fine detail, and later work added techniques to restore swirling motion.

Water and air behave very differently at small scales, where [[Surface Tension]] pulls droplets into spheres, and large ones, where turbulence dominates and drives the flow's swirls. Lift and pressure differences follow [[Bernoulli's Principle]].

Oceans are usually not simulated at all. Instead, renderers sum thousands of waves with sizes and directions drawn from measured ocean spectra, computed efficiently with the [[Fast Fourier transform]]. Jerry Tessendorf's method, used for films in the late 1990s, still underlies most game and film oceans.

Games rely on heavier shortcuts: textures scrolled along flow directions, small simulations confined to a pool or a puff of smoke, and [[Shader]] tricks. Running real simulations on the [[Graphics Processing Unit]] has made more of them interactive. Erosion in generated landscapes uses simplified water flow; see [[Terrain Generation]]. Flames add temperature and buoyancy to the same equations.

## See also
- [[Graph Neural Network]]
- [[Render Farm]]
