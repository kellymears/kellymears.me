---
aliases:
  - Bayer filter
  - Demosaicing
  - Rolling shutter
  - CMOS sensor
tags:
  - graphics
summary: The chip in every digital camera that turns light into numbers, using a grid of photosites that see only brightness, a mosaic of color filters to recover color, and row-by-row readout that bends fast motion.
---
An **image sensor** is the chip in a digital camera that converts light into numbers. Its surface is a grid of millions of tiny light-sensitive sites, one per pixel. Each converts arriving photons into electrons, and the camera measures how much charge collected during the exposure; see [[Photoelectric effect]] and [[Semiconductor]].

Two designs dominated. The **charge-coupled device**, or CCD, invented at Bell Labs in 1969 by Willard Boyle and George Smith, who later shared a Nobel Prize for it, shifts charge across the chip to a single readout point. The **CMOS** sensor, developed into a practical form in the 1990s, gives each pixel its own amplifier and is built with the same processes as ordinary chips. CMOS is cheaper and uses less power, and it now dominates, from phones to professional cameras.

A photosite measures only how much light arrives, not its color. The common solution is the **Bayer filter**, patented by Bryce Bayer at Kodak in 1976: a mosaic of tiny red, green, and blue filters over the photosites, half of them green, a quarter each red and blue. Green gets twice as many because human vision draws most of its sense of detail from the middle of the spectrum; see [[Opponent Process Theory]].

Each pixel therefore records just one of three colors, and the camera estimates the other two from neighbors, a step called **demosaicing**; see [[Linear Interpolation]]. Simple methods produce colored fringes along edges and false patterns in fine repeating detail, such as fabric weaves; see [[Moiré pattern]]. Better algorithms follow edges instead of averaging across them, and some cameras skip the filter entirely by stacking color-sensitive layers.

Most CMOS sensors read out one row at a time rather than all at once, a **rolling shutter**. Anything that moves fast during the readout is distorted: propellers bend into curved blades, buildings lean when the camera pans, and a flash can light only part of the frame. Global-shutter sensors capture every pixel at the same instant, at higher cost; see [[Racing the Beam]].

Noise sets the limits. Light arrives as discrete photons, so a dim exposure has random variation, and smaller photosites collect fewer photons, which is why tiny phone sensors struggle in low light; see [[Denoising]]. Each photosite also saturates at some maximum charge, capping the range from shadow to highlight in one exposure; see [[High Dynamic Range]].

Phones compensate with computation, capturing a burst of frames and aligning and merging them to cut noise and extend range, so many photos are partly reconstructed rather than simply recorded. Sensors also respond linearly to light while human vision doesn't, so raw values are curved before display; see [[Gamma Correction]] and [[Tone Mapping]].

## See also
- [[Optical Flow]]
- [[Computer Vision]]
- [[Bilateral Filter]]
- [[Canny Edge Detector]]
- [[Lens Flare]]
