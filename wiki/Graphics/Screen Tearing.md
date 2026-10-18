---
aliases:
  - Tearing
  - VSync
  - Vertical sync
  - Vertical blanking interval
  - Triple buffering
  - Mailbox presentation
tags:
  - graphics
summary: The visible seam that appears when a new frame replaces the old one partway through the display's scan, and the latency trade-offs of the ways to prevent it.
---
**Screen tearing** is a horizontal seam across the screen where the top part shows one frame and the bottom part shows the next. It happens because a display does not change its whole image at once. It *scans out* the frame line by line from top to bottom over the course of each refresh. If the GPU swaps in a new frame partway through that scan, the rest of the refresh draws from the new frame. During horizontal motion, such as a camera pan, the two halves no longer line up.

The classic fix is **vertical sync (VSync)**: hold the swap until the *vertical blanking interval*, the brief pause between one scan finishing and the next beginning. The display then always shows whole frames. The cost is waiting. A finished frame may sit for most of a refresh before it is shown, adding input latency. Worse, with strict double buffering, a frame that misses the deadline waits a whole extra refresh, so a game that drops slightly below 60 fps on a 60 Hz screen alternates between 16.7 ms and 33.3 ms frames. That is the judder described in [[Frame Pacing]].

The variants trade those costs differently:

- **Triple buffering** gives the GPU a third buffer so it can keep rendering while a finished frame waits, smoothing throughput at some latency cost.
- **Mailbox presentation** renders as fast as possible and, at each refresh, shows only the newest completed frame, discarding the rest. It is tear-free with low latency, at the price of wasted GPU work.
- **Adaptive VSync** syncs when the frame rate is above the refresh rate and allows tearing below it, which avoids the halving.
- **Variable refresh rate** removes the fixed deadline altogether. The display waits for the frame instead of the reverse, which is the best fix when it is available.

Desktop environments face the same problem. A [[Compositor]] that assembles every window into one image can present it on a VSync schedule, which is why modern compositing desktops are usually tear-free by default. Because competitive players often prefer tearing to added latency, some compositors let fullscreen games opt back into tearing. Browsers hide the whole question behind [[requestAnimationFrame]], which runs a page's animation code in step with the display's refresh.

## See also
- [[Frame Pacing]]
- [[Compositor]]
- [[Latency and Jitter]]
- [[requestAnimationFrame]]
- [[Rasterization]]
- [[Frame Generation]]
- [[Race Condition]]
- [[Input Latency]]
- [[Swap Chain]]
- [[Racing the Beam]]
- [[Frame Rate]]
- [[Closed Captions]]
