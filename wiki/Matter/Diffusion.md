---
aliases:
  - Molecular diffusion
  - Fick's law
  - Brownian motion
  - Concentration gradient
tags:
  - matter
summary: The net spreading of particles from where they are concentrated to where they are scarce, driven only by random motion, fast over microns and painfully slow over meters.
---
**Diffusion** is the net movement of particles from regions of high concentration to low, driven by nothing but their random motion. Drop food coloring into still water and it slowly spreads until the color is even. No force pushes the dye outward. Each molecule wanders at random, bumped by water molecules, and since there are more dye molecules in the concentrated region, more of them happen to wander out than in.

The random motion was first seen in 1827 by the botanist Robert Brown, who watched pollen grains jitter under a microscope; it's called **Brownian motion**. In 1905, Albert Einstein explained it as the grains being jostled by invisible molecules, and the predictions, confirmed by Jean Perrin, became decisive evidence that atoms exist.

Diffusion has a peculiar scaling. A randomly wandering particle's typical distance from its start grows with the *square root* of time, not with time. Doubling the distance takes four times as long. Over cellular scales, microns, diffusion is nearly instant. Over a meter, a molecule of sugar in still water would take years. That's why living things beyond a certain size need circulation: blood, sap, and lungs move substances in bulk, leaving diffusion only the last tiny distances.

Adolf Fick described it quantitatively in 1855. **Fick's law** says the rate of flow is proportional to the concentration gradient, how steeply concentration changes over distance. It has the same form as Fourier's law for conduction, and heat flow is mathematically a diffusion of energy; see [[Heat Transfer]]. Both are irreversible processes that increase [[Entropy]]: mixed dye never spontaneously unmixes.

Examples are everywhere:

- **Breathing.** Oxygen diffuses from air in the lungs into blood across a membrane under a micron thick, and carbon dioxide diffuses out. Thin air at altitude lowers the gradient, one reason performance drops; see [[Atmospheric Pressure]] and [[VO2 Max]]. Inside muscle cells, oxygen diffuses to the [[Mitochondria]].
- **Cooking.** Brines, marinades, and salt penetrate food by diffusion, slowly, which is why a marinade mostly flavors the surface. Water moving across membranes is [[Osmosis]], a special case.
- **Electronics.** Chips are made by diffusing dopant atoms into silicon at high temperature to build the junctions of a [[Semiconductor]]. At operating temperatures, metal atoms creeping in circuits cause [[Electromigration]].
- **Smell.** Scent spreads across a room mostly by air currents, not diffusion; pure diffusion would take hours.

Diffusion depends on temperature, since warmer particles move faster, and on the medium: it's thousands of times faster in gases than in liquids, and slower still in solids.

The idea extends beyond physics. Generative [[Diffusion Model]]s in machine learning learn to reverse a process of gradually adding noise. Ideas and technologies are said to diffuse through populations, a looser analogy, like rumors in a [[Gossip Protocol]].

## See also
- [[Random Walk]]
- [[Work Hardening]]
- [[Supercritical Fluid]]
- [[Isotope]]
- [[Chemical Equilibrium]]
