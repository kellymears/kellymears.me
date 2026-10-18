---
aliases:
  - Organic light-emitting diode
  - Screen burn-in
  - QD-OLED
tags:
  - graphics
summary: A display in which every pixel makes its own light from thin layers of organic compounds, giving true blacks and near-instant response, at the cost of limited full-screen brightness and gradual burn-in.
---
An **OLED**, or organic light-emitting diode, display makes light in each pixel rather than filtering a backlight. Each subpixel is a stack of thin layers of carbon-based compounds between two electrodes. When current flows, electrons and holes meet in the organic layer and release energy as light, a process called electroluminescence. Turn the current off and the pixel is truly dark; see [[Semiconductor]].

The first efficient OLED was described in 1987 by Ching Tang and Steven Van Slyke at Eastman Kodak, using a two-layer design that later devices still build on. Small screens came first, in car stereos and phones. LG began selling large OLED televisions in 2013, using white-emitting subpixels behind color filters to make big panels practical, and Samsung followed in 2022 with QD-OLED, which uses blue emitters and quantum-dot layers to convert some of the blue light into red and green.

Emitting per pixel has clear advantages over an LCD; see [[Liquid-Crystal Display]]:

- **True black.** A black pixel is simply off, so contrast is effectively unlimited and there is no glow or halo around bright objects, which suits dark rooms, dark interfaces, and high dynamic range content; see [[High Dynamic Range]] and [[Dark Mode]].
- **Speed.** Pixels change state in well under a millisecond, which removes the trails slow crystals leave, though held frames still smear as the eye tracks motion; see [[Motion Blur]].
- **Form.** With no backlight, panels can be very thin, curved, or flexible enough to fold.

The organic materials wear with use, and the blue emitters age fastest. A pixel that shows the same bright image for thousands of hours, such as a channel logo or a taskbar, dims relative to its neighbors, leaving a permanent ghost called **burn-in**. Manufacturers fight it by shifting the image a few pixels at a time, dimming static logos, and running compensation cycles while the set is off, and modern panels are far more resistant than early ones. It remains a reason some people choose an LCD for desktop use; see [[Bathtub Curve]] and [[Planned Obsolescence]].

Brightness is limited by heat and wear, so an automatic brightness limiter dims the whole screen when most of it is bright. Small highlights can be very bright while a full white page is noticeably dimmer. Many phone OLEDs dim by switching pixels rapidly on and off at low brightness, which some people perceive as flicker; see [[LED Flicker]] and [[Digital Eye Strain]].

Subpixel layouts vary. Many phones use arrangements with more green subpixels than red or blue, matching the eye's sensitivity to green, which can fringe text rendered for a standard grid; see [[Font Rendering]]. OLED's fast response and per-pixel control also made it the standard in virtual reality headsets, where smearing causes discomfort; see [[Virtual Reality]].

## See also
- [[Color Gamut]]
- [[Fluorescence]]
