---
aliases:
  - LCD
  - Backlight
  - Local dimming
  - IPS panel
tags:
  - graphics
summary: The flat-panel display that replaced the CRT, built from millions of tiny liquid-crystal shutters between polarizing filters in front of a backlight, which is why its blacks glow and its motion smears.
---
A **liquid-crystal display**, or LCD, makes an image by blocking light rather than emitting it. A backlight shines constantly behind the panel, and millions of tiny shutters, one per subpixel, each let through a controlled fraction of it. Red, green, and blue filters over the shutters turn the gray levels into color. LCDs replaced the cathode-ray tube in most homes in the mid-2000s and remain the most common display in monitors, laptops, and televisions; see [[Racing the Beam]].

The shutters rely on liquid crystals, substances that flow like liquids but whose rod-shaped molecules line up in an ordered direction, first described by the botanist Friedrich Reinitzer in 1888; see [[Phase Transition]]. In the classic twisted nematic design, developed around 1970, a thin layer of crystal sits between two polarizing filters set at right angles. With no voltage, the molecules form a twisted stack that rotates the light's polarization by a quarter turn, so it passes through the second filter. Applying a voltage untwists them, and the light is blocked. Intermediate voltages give intermediate brightness; see [[Polarized Light]].

Each subpixel needs its own switch to hold its voltage while the rest of the screen is updated, so the glass carries a grid of thin-film transistors, one per subpixel, an approach called active matrix; see [[Semiconductor]].

The three common panel types trade among speed, contrast, and viewing angle:

- **TN** (twisted nematic) is fast and cheap but shifts color when viewed from the side.
- **IPS** (in-plane switching) rotates the crystals sideways, giving accurate color from almost any angle at somewhat lower contrast.
- **VA** (vertical alignment) blocks light best, giving deeper blacks, but responds slower in dark transitions.

The design has inherent limits. Shutters can't block all the light, so black glows faintly, worst in a dark room; see [[Color Contrast]]. **Local dimming** splits the backlight into zones that dim behind dark parts of the image; with few zones, bright objects on dark backgrounds gain halos called blooming, and many recent sets use thousands of tiny mini-LEDs to shrink them.

Motion is the other weakness. Each frame is held steady until the next arrives, and as the eye tracks a moving object across the screen, the held image smears on the retina, a blur that a higher refresh rate or a briefly strobed backlight reduces; see [[Motion Blur]] and [[Frame Rate]]. Crystals also take a few milliseconds to change state, leaving trails, so panels overdrive the voltage to speed transitions. Many backlights dim by switching rapidly on and off, which some people perceive as flicker; see [[LED Flicker]] and [[Digital Eye Strain]].

Their main rival in high-end screens is now OLED, which emits light from each pixel directly; see [[OLED]].

## See also
- [[Color Gamut]]
- [[Font Rendering]]
- [[Motion Interpolation]]
