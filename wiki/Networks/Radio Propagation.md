---
aliases:
  - Skywave
  - Ionosphere
  - Line-of-sight propagation
  - Multipath propagation
  - Tropospheric ducting
tags:
  - networks
summary: How radio waves travel from transmitter to receiver, hugging the ground, bouncing off the charged upper atmosphere or flying in straight lines to the horizon depending on frequency, and why a signal's reach changes with the time of day, the weather and the sun.
---
**Radio propagation** is the study of how radio waves get from one antenna to another. In empty space they simply spread out and weaken with distance, following the [[Inverse-Square Law]]. Near Earth they interact with the ground, the atmosphere, buildings and the sun, and how they behave depends heavily on frequency; see [[Radio Spectrum]].

Low frequencies travel as **ground waves**, following the curve of the Earth for hundreds of kilometers. That's why navies use very low frequencies to reach submarines and why AM radio stations reach far by day.

Higher frequencies, in the shortwave range, can travel much farther by **skywave**. In 1901 Guglielmo Marconi received a signal sent across the Atlantic, which shouldn't have been possible if radio traveled only in straight lines. Engineers soon proposed a conducting layer high in the atmosphere, and in 1924 Edward Appleton confirmed it. This is the **ionosphere**, a region from about 60 to several hundred kilometers up where sunlight strips electrons from gas molecules. The charged layers bend radio waves back toward the ground, letting a signal hop between sky and Earth around the planet; see [[Refraction]].

Because the sun creates the ionosphere, propagation follows it. By day a low layer absorbs medium frequencies; at night it fades, and distant AM stations come booming in. The usable shortwave bands shift with the eleven-year solar cycle, and solar flares can black out shortwave communications across the sunlit side of the Earth for hours; see [[Amateur Radio]] and [[Aurora]]. The ionosphere also delays satellite signals slightly, a major error source in positioning that receivers must correct; see [[Global Positioning System]].

Above about 30 megahertz, waves mostly pass through the ionosphere and travel in straight lines, so range is limited to the horizon. Raising an antenna extends it, which is why broadcast towers are tall and why satellite links work; see [[Satellite Internet]] and [[Antenna]]. Occasionally, layers of warm air over cool air bend these signals around the curve of the Earth, a **tropospheric duct**, and television or FM stations appear from hundreds of kilometers away.

At the frequencies used by phones and Wi-Fi, waves reflect off walls, vehicles and hills and bend around edges; see [[Diffraction]]. A receiver gets several copies arriving at slightly different times, **multipath propagation**, which can make them cancel or reinforce each other as you move a few centimeters; see [[Wave Interference]]. Old analog television showed it as ghost images. Modern systems turn it into an advantage, using multiple antennas to send separate data streams along different paths; see [[Wi-Fi]] and [[Cellular Network]].

At the highest frequencies, walls, foliage and even rain absorb signals, which is why millimeter-wave networks need many small cells close together.

## See also
- [[Radio Broadcasting]]
- [[Signal-to-Noise Ratio]]
- [[Microwave Transmission]]
