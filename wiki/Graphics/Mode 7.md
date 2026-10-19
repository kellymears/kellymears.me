---
aliases:
  - Mode 7 graphics
tags:
  - graphics
summary: A Super Nintendo graphics mode that could rotate and scale one background layer, which games retuned on every scan line to fake a flat 3D plane stretching to the horizon for racing tracks and world maps.
---
**Mode 7** is a graphics mode of the Super Nintendo Entertainment System that can rotate and scale a single background layer, and, with a trick, make it look like a flat plane stretching toward the horizon. The console, released in Japan in 1990, used it for the race tracks of F-Zero and Super Mario Kart, the landscapes below Pilotwings, and the world map of Final Fantasy VI, effects that looked startlingly three-dimensional at the time.

The console drew its backgrounds from tiles, small squares of pixels arranged in a grid; see [[Tile Map]] and [[Pixel Art]]. Most of its modes could scroll backgrounds but not rotate them. Mode 7 offered one background layer, a map 1,024 pixels square, with an affine transformation applied as it was drawn: for each screen pixel, the hardware worked out which map pixel to show using a small matrix that could rotate, scale, and shear the image; see [[Transformation Matrix]].

On its own, that gives flat spinning and zooming, used for boss fights and title screens. The three-dimensional look came from changing the matrix partway through the frame. The console could rewrite graphics registers during the brief pause between scan lines; see [[Racing the Beam]]. By scaling each line of the floor differently, small near the horizon and large near the bottom of the screen, games produced a perspective view of a flat plane; see [[Perspective Projection]]. Characters and objects on top were sprites, swapped between prepared sizes to suggest distance; see [[Sprite]].

The effect had clear limits. Only one layer could be transformed, and it had to be flat, so there were no hills or walls. Up close the floor became a blur of enlarged pixels, and far away it shimmered, since the hardware did no filtering; see [[Aliasing]] and [[Mipmapping]].

Mode 7 belongs to a long history of tricks for getting depth from flat hardware. Earlier arcade racers, such as Sega's Out Run, drew roads by shifting and scaling each line; see [[Parallax Scrolling]]. Raycasting engines solved a similar problem for floors and ceilings; see [[Ray Casting]]. Within a few years, consoles with true 3D hardware made the trick obsolete, though their own early texturing had flaws; see [[Affine Texture Mapping]].

The look persists. Modern games that evoke the era recreate the tilted Mode 7 floor deliberately, usually with a few lines of shader code; see [[Shader]]. The core operation, mapping each screen pixel back to a position in an image, is the heart of texture mapping generally; see [[Texture Mapping]]. Demo makers on other machines of the period built similar effects in software, competing to make them run smoothly; see [[Demoscene]].

## See also
- [[Billboarding]]
