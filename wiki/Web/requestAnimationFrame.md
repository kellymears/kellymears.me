---
aliases:
  - rAF
  - Animation frame
  - Frame callback
tags:
  - web
summary: The browser callback that runs once per display frame just before paint, which is the right clock for visual work and stops entirely when nothing is being displayed.
---
**`requestAnimationFrame`** (rAF) asks the browser to run a callback once, just before it next paints. Calling it again from inside the callback produces a loop that runs in step with the display: about 60 times a second on a 60 Hz screen and 144 on a 144 Hz one. Each callback receives a high-resolution timestamp for the frame.

It replaced `setTimeout(fn, 16)` loops for animation for three reasons:

- **Alignment.** Timer callbacks drift relative to the display's refresh, so some frames get two updates and some none, which is visible judder (see [[Frame Pacing]]). rAF callbacks land at the one point in each frame where a change will actually be painted.
- **Batching.** Every rAF callback in a frame runs before the same style, layout, and paint pass. Visual writes made there are coalesced, and reading layout after them does not cause Layout Thrashing if reads are done first.
- **It stops when nothing is visible.** In a hidden tab, a minimized window, or a window the compositor treats as occluded, rAF runs rarely or not at all. That saves battery and CPU, and it is the most surprising thing about it.

The last property catches out code and tests alike. Animation code that assumes a fixed number of frames per second runs at different speeds on different displays, so motion should be computed from the timestamp's elapsed time, not from a frame count. Code that waits on rAF before doing non-visual work, such as committing state or resolving a promise, hangs indefinitely in a [[Background Tab Throttling|background tab]]. Libraries that drive layout animations from rAF freeze mid-transition, so an element stays at `opacity: 0` and an exit animation never finishes unmounting a component. In browser automation the trap is a *headed* browser window hidden behind other windows. It may receive almost no frames, so screenshots show frozen half-finished animations that look like bugs. A [[Headless Browser]] renders at a steady rate and is the more reliable environment for measuring motion. Counting rAF callbacks over a few seconds is a quick way to tell which situation applies.

rAF is the browser's version of the game loop, and the [[Event Loop]] runs it at a fixed point in each frame. Work that doesn't need to be on screen this frame belongs elsewhere: an idle callback, a [[Web Worker]], or a [[Debounce and Throttle|throttled]] handler.

## See also
- [[Motion Design]]
- [[Easing]]
- [[Reduced Motion]]
- [[Web Animations API]]
- [[Compositor]]
