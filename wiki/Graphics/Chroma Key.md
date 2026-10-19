---
aliases:
  - Green screen
  - Blue screen
  - Keying
tags:
  - graphics
summary: Replacing every pixel of one chosen color with another image, the technique behind green screens, blue screens, and weather presenters, and the hard problems of hair, motion blur, and colored light spilling onto actors.
---
**Chroma keying** replaces every part of an image that matches a chosen color with another image. An actor performs in front of a uniformly lit green or blue backdrop, and software turns that color transparent so a different background shows through. It's how films put actors on alien planets and how television weather presenters stand in front of moving maps.

The technique began on film. Larry Butler won an Academy Award for the blue-screen effects in *The Thief of Bagdad* (1940), separating actors from backgrounds through elaborate optical printing. Petro Vlahos later refined the color-difference method, used on *Ben-Hur* (1959), that made the edges cleaner. Electronic keying arrived in television in the following decades, and today it is done digitally in real time.

The key color is chosen to be far from anything in the foreground. Skin tones contain little blue or green, so those two dominate:

- **Green** is the usual digital choice. Camera sensors record green at twice the density of red or blue, giving cleaner edges, and green screens need less light; see [[Image Sensor]].
- **Blue** suits scenes with green costumes or foliage, and spills less obviously onto skin.

Anyone wearing the key color vanishes, which is why presenters avoid green clothes on forecast days.

The hard part is the edges. A simple key makes each pixel either fully foreground or fully background, which leaves jagged outlines. Real edges are partial: strands of hair, motion blur, smoke, and glass are part foreground and part background. Good keyers estimate how much of each pixel is foreground and output that as transparency, called a matte, for blending; see [[Alpha Compositing]] and [[Motion Blur]]. Video compression makes this harder, because it stores color at lower resolution than brightness, smearing exactly the edges a keyer needs; see [[Chroma Subsampling]].

Green light also bounces off the screen onto the actors, tinting edges and shiny surfaces, called spill. Keyers suppress it by pulling the key color out of the foreground, and lighting crews keep actors well away from the screen. Lighting must also match the background that will be added later, or the composite looks pasted on; see [[Image-Based Lighting]]. When keys fail, artists trace mattes by hand frame by frame; see [[Rotoscoping]].

A newer approach drops the screen. LED volumes surround the set with giant video walls showing a rendered environment, updated in real time to match the camera's position. Actors see the world they're in, reflections and lighting come from the walls themselves, and much of the compositing happens in camera; see [[Perspective Projection]]. Software can now also separate people from ordinary backgrounds without any screen, using machine learning, as video-call background blur does, though the edges are rougher; see [[Post-Processing]].

## See also
- [[Stop Motion]]
- [[Bilateral Filter]]
- [[Canny Edge Detector]]
- [[Aspect Ratio]]
- [[Blend Mode]]
- [[HSL and HSV]]
