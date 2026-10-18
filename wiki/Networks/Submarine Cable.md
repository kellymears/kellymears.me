---
aliases:
  - Undersea cable
  - Submarine communications cable
  - Transatlantic cable
tags:
  - networks
summary: The few hundred fiber-optic cables on the seabed that carry nearly all intercontinental internet traffic, thin as a garden hose in deep water and cut more than a hundred times a year.
---
**Submarine cables** carry nearly all internet traffic between continents. Several hundred of them, together more than a million kilometers long, run along the seabed between landing stations on the coasts. In the deep sea, a cable is about the thickness of a garden hose, mostly protective layers around a few pairs of hair-thin fibers.

Light carries the data. Each fiber traps light by total internal reflection, described under [[Refraction]], and wavelength-division multiplexing sends many colors of laser light down one fiber at once, each an independent channel. A modern cable can carry hundreds of terabits per second. The light fades over distance, so repeaters spaced roughly every 50 to 100 kilometers amplify it, powered by thousands of volts of direct current fed from shore through a copper conductor in the cable.

The history starts with the telegraph. The first transatlantic telegraph cable, completed in 1858, worked for only about three weeks; the project's electrician applied excessive voltage trying to push signals through, and the insulation failed. William Thomson, later Lord Kelvin, had argued for sensitive receivers and low voltage, and the 1866 cable laid by the giant steamship *Great Eastern* succeeded on his principles. Telephone cables followed in 1956, and TAT-8, the first transatlantic fiber-optic cable, entered service in 1988.

Distance sets a floor on delay. Light in glass travels at about two-thirds of its speed in a vacuum, so a round trip across the Atlantic takes around 60 to 70 milliseconds no matter how fast the equipment is, a hard component of [[Latency and Jitter]]. Financial traders have paid for straighter routes to shave milliseconds.

Cables were once built by telecom consortiums; now cloud and content giants fund much new capacity.

Damage is routine. Around 150 to 200 faults happen each year, mostly from fishing trawlers and ship anchors in shallow water near shore, where cables are armored and buried. Repair ships grapple the cable up, splice it, and lower it back, often within two weeks. Larger events show the risks:

- **Earthquakes.** The 2006 Hengchun earthquake off Taiwan triggered undersea landslides that cut several cables at once, disrupting traffic across East Asia for weeks.
- **Volcanoes.** The 2022 Hunga Tonga eruption severed Tonga's only international cable, isolating the country for over a month.
- **Anchors.** In 2024, a ship sinking in the Red Sea dragged its anchor across several cables.

Resilience comes from redundancy: many cables on different paths, with [[Border Gateway Protocol]] rerouting traffic around failures and a [[Content Delivery Network]] keeping popular content on the near side of the ocean. Countries with only one or two cables remain vulnerable, which is why cable routes, landing sites, and suspected sabotage are now matters of national security.

## See also
- [[Internet Exchange Point]]
- [[Packet Switching]]
- [[Anycast]]
- [[Wave Interference]]
- [[Optical Fiber]]
- [[Bandwidth]]
