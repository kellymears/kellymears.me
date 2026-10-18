---
aliases:
  - Low Earth orbit
  - LEO constellation
  - Geostationary satellite
tags:
  - networks
summary: Internet access relayed through satellites, from slow, high-latency links via geostationary orbit to constellations of thousands of low satellites that rival ground connections, and the physics and costs of each.
---
**Satellite internet** delivers network access by relaying data through satellites instead of cables or cell towers. A dish on the ground sends traffic to a satellite, which passes it to a ground station connected to the rest of the internet. It reaches places cables don't: rural areas, ships, aircraft, remote research stations, and disaster zones where ground networks are down.

For decades, satellite internet meant **geostationary** satellites. At 35,786 kilometers above the equator, a satellite orbits exactly once per day, so it appears fixed in the sky and a dish can point at it permanently. Three satellites can cover most of the planet. The cost is distance. A signal traveling from a user up to the satellite and down to a ground station covers over 70,000 kilometers, about a quarter of a second at the speed of light. A request and its response make that trip twice, so round-trip times of 600 milliseconds are typical. That's tolerable for email or streaming but painful for video calls, games, and anything chatty; see [[Latency and Jitter]]. TCP's [[Congestion Control]] also behaves poorly over such long delays, so providers use proxies that cut connections in two.

**Low Earth orbit** constellations change the tradeoff. Satellites at around 550 kilometers bring round trips down to roughly 20 to 50 milliseconds, comparable to ground broadband. But a low satellite sees only a small patch of Earth and circles the planet in about 95 minutes, crossing a user's sky in minutes. Continuous coverage takes thousands of satellites, and every dish must hand off between them constantly. User terminals use phased-array antennas that steer their beam electronically rather than physically moving, and the Doppler shift from satellites moving at 7.6 kilometers per second must be corrected continuously; see [[Doppler Effect]].

Newer satellites also pass traffic to each other with lasers. Light in vacuum travels about 47 percent faster than in glass, so over long distances a laser path through space can beat [[Optical Fiber]] and even [[Submarine Cable]] routes, despite the trip up and down.

Limits and concerns:

- **Shared capacity.** Each satellite beam serves a geographic cell. In dense areas, many users share it and speeds drop, so it complements rather than replaces ground networks; see [[Bandwidth]].
- **Weather.** Heavy rain absorbs the high-frequency radio signals used, a problem called rain fade; see [[Electromagnetic Spectrum]].
- **Space debris.** Thousands of satellites raise collision risk, and each collision creates more fragments.
- **Astronomy.** Reflective satellites streak across telescope images.
- **Concentration.** A few operators control constellations used by individuals, militaries, and governments, which gives them unusual influence.

Satellites also connect directly to ordinary phones in some areas, merging with [[Cellular Network]]s. The broader lesson is that physics sets latency floors; see [[Tail Latency]].

## See also
- [[Packet Switching]]
- [[Mesh Network]]
- [[Laser]]
- [[Global Positioning System]]
