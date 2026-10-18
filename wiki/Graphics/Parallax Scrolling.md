---
aliases:
  - Multiplane camera
  - Parallax background
tags:
  - graphics
summary: Faking depth in a 2D scene by scrolling distant layers more slowly than near ones, from Disney's multiplane camera to 16-bit platformers to scrolling web pages, and a known trigger for motion sickness.
---
**Parallax scrolling** creates an illusion of depth in a 2D scene by moving background layers more slowly than foreground layers as the view scrolls. It works because of motion parallax, one of the strongest depth cues in vision: from the window of a moving train, nearby fence posts whip past while distant hills barely move; see [[Perspective Projection]].

The technique predates video games. Disney's **multiplane camera**, first used in 1937, stacked painted glass layers at different distances below a vertical camera, so moving the camera through them gave hand-drawn scenes real depth. *Snow White and the Seven Dwarfs* and *Pinocchio* used it heavily; see [[Twelve Basic Principles of Animation]].

In games, the arcade title *Moon Patrol* (1982) popularized layered scrolling backgrounds, and the 16-bit consoles made it a signature, with hills and skies sliding past at several speeds at once. The hardware offered a few independent background layers, each a [[Tile Map]] that could scroll on its own, with characters drawn on top as [[Sprite]]s.

When hardware ran out of layers, programmers faked more. Changing a layer's scroll position partway down the screen, timed to the display's scan, sliced one background into bands moving at different speeds, giving ground that seemed to recede toward the horizon; see [[Racing the Beam]]. The Super Nintendo's Mode 7 went further, rotating and scaling a background with a [[Transformation Matrix]] on every line to fake a 3D floor, as in *F-Zero* and *Super Mario Kart*.

Design considerations:

- **Speed ratios.** Each layer scrolls at a fixed fraction of the camera's speed, smaller for layers meant to be farther away; see [[Linear Interpolation]].
- **Readability.** Busy, high-contrast backgrounds can be mistaken for platforms or hide hazards, so background layers are usually muted and lower in contrast; see [[Visual Hierarchy]].
- **Looping.** Distant layers are often seamless strips that wrap around endlessly, saving memory and artists' time.

The web adopted parallax in the 2010s for long marketing pages, with background images moving slower than the text. Early versions ran code on every scroll event and stuttered; modern ones use CSS transforms or scroll-linked animations that run off the main thread; see [[Scroll-Driven Animations]] and [[Layout Thrashing]].

Parallax can cause real discomfort. In 2013, iOS 7 added a home-screen effect that shifted icons over the wallpaper as the phone tilted, and some people reported dizziness and nausea, from a mismatch between what the eyes and the inner ear report; see [[Vestibular System]]. Apple added a switch to turn it off, now part of the broader [[Reduced Motion]] preference.

## See also
- [[Isometric Projection]]
- [[Motion Sickness]]
- [[Platformer]]
