---
aliases:
  - Beam racing
  - Raster interrupt
  - Cathode-ray tube
tags:
  - graphics
summary: Generating a picture in step with the display drawing it, line by line, rather than from a finished frame in memory, the way the Atari 2600 drew everything and a modern trick for cutting latency.
---
**Racing the beam** is the technique of generating a picture in step with the display drawing it, line by line, instead of preparing a whole frame in memory first. It was a necessity on early home consoles and computers, gave its name to Nick Montfort and Ian Bogost's 2009 book on the Atari 2600, and has returned in modern low-latency rendering.

It follows from how a cathode-ray tube works. An electron beam sweeps across the screen in rows, from top left to bottom right, steered by magnetic fields; see [[Magnetism]]. Where it strikes, phosphors on the glass glow briefly; see [[Fluorescence]]. A North American TV drew about 60 fields a second, each about 262 lines. After each line the beam swings back to the left edge, and after each field it returns to the top, a pause called the [[Vertical blanking interval]].

The Atari 2600 (1977) had only 128 bytes of RAM, far too little to hold an image. Its graphics chip held one line's worth of state: a few bits of background and two single-line sprites. The program had to rewrite those registers for every line, in time with the beam, counting processor cycles exactly, 76 per line. Changing a sprite's position or color between lines made one sprite appear as several. Game design was shaped by what fit in those cycles; see [[Sprite]].

Later machines made it easier but kept the idea. The Commodore 64 and Amiga offered **raster interrupts**, which pause the program when the beam reaches a chosen line, so code can change colors or scroll position partway down the screen; see [[Interrupt]]. Split screens, more sprites than the hardware supported, and bands of shifting color called raster bars all came from this, and became showpieces of the [[Demoscene]]; see [[Parallax Scrolling]].

Reproducing these tricks faithfully is hard. An emulator must model timing down to the cycle, or games that depend on exact beam position break; see [[Emulation]] and [[Game Preservation]]. Pixel art made for CRTs also looked softer and richer on them than on sharp modern panels, which is why filters imitating scanlines and phosphor glow are popular; see [[Pixel Art]].

Modern displays still scan out line by line, top to bottom, without a beam. Normally a renderer finishes a whole frame and hands it over during the blanking interval; see [[Swap Chain]]. **Beam racing** in the modern sense renders strips of the frame just ahead of scan-out, cutting latency to a fraction of a frame. Some emulators and virtual reality systems use it, trading safety margin for responsiveness, since any strip that finishes late tears; see [[Input Latency]] and [[Frame Pacing]].

## See also
- [[Mode 7]]
- [[Video Game Crash of 1983]]
