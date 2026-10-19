---
aliases:
  - Orbital mechanics
  - Kepler's laws
  - Geostationary orbit
tags:
  - matter
summary: Falling around a body while moving sideways fast enough to keep missing it, the physics behind moons, satellites, and spaceflight, where speeding up can mean falling behind.
---
An **orbit** is the path of an object falling around another while moving sideways fast enough to keep missing it. Isaac Newton illustrated it with a cannon on a mountaintop: fire a ball faster and it lands farther away, until at the right speed the ground curves away as fast as the ball drops, and it never lands; see [[Gravity]] and [[Centripetal Force]]. Satellites and astronauts are weightless not because gravity is absent, but because they're falling constantly.

Johannes Kepler described planetary orbits in the early 1600s, before anyone knew why they worked:

1. Orbits are ellipses, with the central body at one focus.
2. A line from the planet to the Sun sweeps out equal areas in equal times, so planets move faster when closer. This is conservation of [[Angular Momentum]].
3. The square of the orbital period is proportional to the cube of the orbit's size.

Newton later derived all three from his laws and the [[Inverse-Square Law]].

The speeds are large. In low Earth orbit, a few hundred kilometers up, a satellite moves at about 7.8 kilometers per second and circles the planet in about 90 minutes. Even there, thin air causes [[Aerodynamic Drag]], so the International Space Station needs periodic boosts or it would fall. Higher orbits are slower. At about 35,800 kilometers, one orbit takes exactly a day, so a **geostationary** satellite hangs over one spot, which suits television and weather satellites. The trip up and back makes calls through them lag noticeably, which is why new internet constellations fly low; see [[Satellite Internet]]. Navigation satellites sit in between, circling twice a day; see [[Global Positioning System]].

Orbital maneuvers are counterintuitive. Firing a rocket forward raises the opposite side of the orbit, and a higher orbit is slower, so a spacecraft trying to catch one ahead of it in the same orbit must first slow down to drop lower and move faster. The most efficient way between two circular orbits, described by Walter Hohmann in 1925, uses two burns at opposite points; see [[Conservation of Energy]].

Two bodies have exact solutions. Three or more generally do not and can behave chaotically, so mission planners and simulations step through time numerically. Integrators that conserve energy, such as Verlet's, keep simulated orbits stable over long runs where simpler methods let planets spiral away; see [[Verlet Integration]] and [[Floating-Point Arithmetic]].

Crowded orbits carry a risk named for Donald Kessler, who described it in 1978: collisions create debris, which causes more collisions, until some orbits become unusable; see [[Cascading Failure]]. Orbits also shape the Earth below by pulling up the seas; see [[Tide]].

## See also
- [[Magnetosphere]]
- [[Free Fall]]
- [[Dark Matter]]
