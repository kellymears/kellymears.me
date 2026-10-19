---
aliases:
  - Second law of thermodynamics
  - Arrow of time
  - Carnot efficiency
  - Information entropy
tags:
  - matter
summary: The measure of how many ways a system's parts can be arranged without changing how it looks, which always grows in total and gives time its direction.
---
**Entropy** measures how many microscopic arrangements of a system's parts are consistent with what we observe about it as a whole. A tidy deck of cards in order has one arrangement. A shuffled deck looks "shuffled" in an astronomical number of ways. The German physicist Rudolf Clausius coined the word in 1865 while studying heat engines, and Ludwig Boltzmann later gave it its statistical meaning in the formula S = k log W, where W is the number of arrangements.

The **second law of thermodynamics** says the total entropy of an isolated system never decreases. That isn't a force pushing things toward disorder. It's statistics: there are vastly more disordered states than ordered ones, so random motion almost always moves a system toward the more numerous kind. Ink spreads through water, heat flows from hot to cold, and a dropped mug shatters, but none of these run in reverse, even though the underlying laws of motion work equally well backward. That one-way tendency is the main physical explanation for the *arrow of time*.

Everyday consequences follow:

- **Heat flows downhill.** Energy moves from hotter to colder objects until they match, the basis of [[Heat Transfer]]. Moving heat the other way, as a [[Vapor-Compression Refrigeration]] cycle does, costs work and dumps even more heat outside.
- **No engine is perfect.** Sadi Carnot showed in 1824 that an engine running between a hot and a cold reservoir can convert at most 1 − T_cold/T_hot of its heat into work. The rest must be shed as waste heat. Every engine, power plant, and chip produces heat for this reason, which is why processors need cooling and slow down under [[Thermal Throttling]].
- **Friction is a one-way street.** [[Friction]] turns ordered motion into disordered heat, and that heat never spontaneously reassembles into motion.
- **Mixing and dissolving.** [[Osmosis]] is driven by entropy: water moves toward the more concentrated solution because the mixed state has more arrangements.

Living things don't violate the second law. A body keeps its internal order by consuming low-entropy energy, food or sunlight, and exporting high-entropy heat and waste, the work of [[Thermoregulation]] and metabolism. The total entropy, organism plus surroundings, still rises.

In 1948 Claude Shannon defined *information entropy*, the average uncertainty in a message, with the same mathematical form. Information entropy measures how unpredictable random keys are in [[Public-Key Cryptography]], how compressible data is, and how spread out a model's choices are under [[Temperature Sampling]], whose "temperature" comes straight from Boltzmann's statistics. The metaphor of *software entropy*, code decaying as small compromises pile up, is the theme of [[Broken Windows Theory]] applied to programs and of [[Technical Debt]].

## See also
- [[Lehman's Laws of Software Evolution]]
- [[One-Time Pad]]
- [[Software Rot]]
- [[Debian OpenSSL Bug]]
- [[Big Bang]]
