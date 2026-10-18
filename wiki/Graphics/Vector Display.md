---
aliases:
  - Vector monitor
  - Vectrex
  - Random-scan display
tags:
  - graphics
summary: A screen whose electron beam traces lines directly from point to point instead of scanning rows, the display behind Sketchpad, Spacewar!, Asteroids, and the Vectrex, with perfectly sharp lines but nothing filled in.
---
A **vector display** draws pictures by steering the electron beam of a cathode-ray tube directly along the lines of the image, the way a pen draws on paper, instead of sweeping across the whole screen in rows. Where an ordinary raster screen is a grid of pixels, a vector screen has no grid at all: the picture is a list of line segments, drawn in order and then drawn again, many times a second; see [[Racing the Beam]] and [[Vector Graphics]].

Vector displays came first in interactive computing. Military air defense systems of the 1950s showed radar tracks and maps on them, and operators pointed light guns at the screen to select targets. Ivan Sutherland's Sketchpad (1963), the first program to let people draw and edit shapes directly on a screen, ran on one, as did Spacewar! (1962), an early video game in which two ships duel around a star. Drawing lines was cheap, whereas storing a full screen of pixels needed memory that was then expensive.

Arcades made vectors famous at the end of the 1970s. Atari's Lunar Lander and Asteroids (1979), Battlezone (1980), and Tempest (1981) all used vector monitors, as did Cinematronics games and the 1983 Star Wars arcade game. In 1982 the Vectrex brought the technology home as a console with its own built-in vector screen, using colored plastic overlays for color; see [[Shoot 'em Up]].

The approach has distinctive strengths:

- **Sharpness.** Lines are continuous, with no stair-stepping at any angle; see [[Aliasing]] and [[Bresenham's Line Algorithm]].
- **Brightness and glow.** The beam dwells on each line rather than spreading its time over the whole screen, so vector lines are intensely bright, with a halo of glowing phosphor; see [[Fluorescence]].
- **Memory.** Only the list of endpoints is stored, not every pixel, which made smooth rotation and scaling of shapes cheap; see [[Transformation Matrix]].

And clear weaknesses. Filled areas, textures, and photographs are impractical, since the beam would have to scribble over every point. The whole list must be redrawn before the phosphor fades, so a scene with too many lines takes too long and begins to flicker. And the monitors were expensive and failure-prone, and a beam that stalled in one place could burn a spot into the phosphor.

Raster displays won as memory got cheaper, because a framebuffer can hold any image at all, not just lines; see [[Graphics Pipeline]]. The vector idea lives on in oscilloscope art, where sound signals drive the beam into pictures, in laser light shows that sweep a mirror-steered beam the same way, and in the file formats that describe images as shapes rather than pixels; see [[Laser]]. Emulating vector games well is hard, since a raster screen must imitate the glow and the continuous lines; see [[Emulation]] and [[Demoscene]].

## See also
- [[Interlacing]]
- [[Pixel Art]]
