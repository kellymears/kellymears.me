---
aliases:
  - Inverse square law
  - Light falloff
  - Free-space path loss
tags:
  - matter
summary: Why light, sound, gravity, and radio from a point source weaken with the square of distance, so doubling the distance leaves a quarter of the intensity.
---
The **inverse-square law** says that the intensity of something spreading out evenly from a point source falls in proportion to the square of the distance from it. Double the distance and the intensity drops to a quarter.

The reason is geometry. Energy leaving a point spreads over the surface of an ever-larger sphere, whose area grows as the square of its radius. The same total energy shared over four times the area leaves a quarter as much on each patch.

Many physical quantities follow the law:

- **Gravity.** Isaac Newton's law of universal gravitation (1687) makes the pull between two masses fall with the square of their separation.
- **Light.** A lamp twice as far away delivers a quarter of the light. Its brightness as perceived changes less dramatically, because vision responds roughly logarithmically, which is part of why [[Gamma Correction]] exists.
- **Sound.** In open air, sound intensity from a source falls by about 6 decibels every time the distance doubles.
- **Radiation.** Distance is one of the three basic protections against ionizing radiation, along with time and shielding, because moving away cuts exposure so quickly.
- **Radio.** A phone's or router's signal weakens with distance through *free-space path loss*, which follows the same square law before walls add their own losses. Exposure from a phone is highest pressed against the head, the situation [[Specific Absorption Rate]] limits are written for.

Photographers use the law constantly. Moving a light twice as far from a subject requires four times the power for the same exposure, two photographic stops. Its steepness also shapes how light looks: a lamp close to a subject falls off sharply across the scene, giving dramatic shadows, while a distant light, such as the sun, lights near and far objects almost equally.

The law holds strictly only for point sources in open space. A long fluorescent tube behaves more like a line and falls off with distance rather than its square at close range. A large softbox up close behaves like a flat panel and barely falls off at all until you move away. A laser concentrates its light into a narrow beam that spreads very little. Absorption and scattering add further losses on top, as [[Rayleigh Scattering]] does in air.

Rendering engines once used linear or artistic falloff curves for lights, which looked subtly wrong. [[Physically Based Rendering]] adopted inverse-square falloff so lights behave realistically, though it means very bright values near a lamp that [[High Dynamic Range]] rendering and [[Tone Mapping]] must handle. [[Ray Tracing]] gets the falloff naturally from geometry. The [[Doppler Effect]] changes a moving source's pitch, but not this falloff in intensity, which depends only on distance.

## See also
- [[Seasons]]
- [[Orbit]]
- [[Gravity]]
- [[Reverberation]]
- [[Hearing Loss]]
- [[Antenna]]
- [[Cellular Network]]
