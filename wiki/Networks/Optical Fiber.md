---
aliases:
  - Fiber optics
  - Fiber-optic cable
  - Fiber to the home
  - Wavelength-division multiplexing
  - Single-mode fiber
tags:
  - networks
summary: Strands of glass that carry data as pulses of light over thousands of kilometers, the physical backbone of the internet, and why a single fiber's capacity keeps growing without laying new cable.
---
**Optical fiber** carries data as pulses of light through a strand of extremely pure glass about the width of a human hair. It is the physical backbone of the internet: nearly all long-distance traffic, every [[Submarine Cable]], and the links inside data centers travel over fiber, and increasingly the last stretch into homes does too.

Light stays inside the fiber through **total internal reflection**. The glass core is surrounded by cladding with a slightly lower refractive index, so light striking the boundary at a shallow angle reflects back in, bouncing along the core even around gentle bends. The physics is described in [[Refraction]].

Glass this clear took decades to make. In 1966 Charles Kao showed that losses in existing glass came from impurities, not the material itself, and predicted that purified silica could carry signals for kilometers, work that earned a Nobel Prize in 2009. Modern fiber loses so little light that a signal can travel around 100 kilometers before needing amplification.

Two kinds dominate:

- **Single-mode fiber** has a tiny core, around 9 micrometers, that carries one path of light. It runs for long distances and is used in backbones and fiber-to-the-home links.
- **Multimode fiber** has a wider core that lets light take many paths. Those paths arrive at slightly different times, smearing pulses together, so it suits short runs inside buildings.

The capacity of one fiber keeps growing without replacing it, mostly through **wavelength-division multiplexing**: many lasers, each at a slightly different color, share the same strand, each carrying its own stream. Combined with advanced modulation, a single fiber pair now carries tens of terabits per second, and better equipment at the ends upgrades cables already in the ground. The limits are physical. Different wavelengths travel at different speeds, a [[Dispersion]] effect that blurs pulses over distance, and noise accumulates with every amplifier, setting a ceiling predicted by [[Information Theory]].

Compared with copper, fiber offers vastly more [[Bandwidth]], far lower loss, and immunity to electrical interference, since light isn't affected by nearby power lines or lightning. It can't carry power, though, and it is more delicate to splice and terminate. Many networks still finish the last few meters over [[Ethernet]] cable or [[Wi-Fi]].

Fiber doesn't make the network faster in every sense. Light in glass travels at about two-thirds of its speed in a vacuum, roughly 200 kilometers per millisecond, so a round trip across the Atlantic takes around 60 milliseconds no matter how much capacity the cable has. That floor on [[Latency and Jitter]] is why a [[Content Delivery Network]] moves content closer instead of hoping for faster links.

## See also
- [[Internet Exchange Point]]
- [[Microwave Transmission]]
- [[Internet Service Provider]]
- [[Last Mile]]
- [[Wiretapping]]
- [[Token Ring]]
