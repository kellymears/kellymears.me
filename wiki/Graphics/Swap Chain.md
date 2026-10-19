---
aliases:
  - Double buffering
  - Back buffer
  - Front buffer
  - Presentation mode
tags:
  - graphics
summary: The set of buffers a renderer cycles through so it can draw the next frame while the display shows the current one, and how presentation modes trade latency against tearing.
---
A **swap chain** is the set of image buffers a graphics application cycles through to get frames onto the screen. The display reads from one buffer, the *front buffer*, while the GPU draws the next frame into another, the *back buffer*. When the new frame is done, the two swap roles, and the display starts showing the new image.

The reason is to hide drawing. If a program drew directly into the image the display was reading, viewers would see half-drawn frames, shapes appearing piece by piece and flickering as the screen was cleared. With **double buffering**, the screen only ever shows finished frames.

When the swap happens matters:

- **Swap immediately.** The display may be partway through scanning out the old frame, top to bottom, so the top part shows the old image and the bottom the new. That visible seam is [[Screen Tearing]]. Latency is lowest.
- **Wait for vertical blank.** Swapping only between refreshes, VSync, eliminates tearing. But if the GPU finishes early it must wait, and if it misses a refresh the old frame shows again, so frame rate snaps to fractions of the refresh rate, 60 then 30, causing judder.
- **Triple buffering.** A third buffer lets the GPU keep drawing while a finished frame waits for the next refresh. Done as *mailbox* presentation, the newest finished frame replaces older queued ones, giving no tearing and lower latency than VSync.
- **Variable refresh rate.** Displays supporting adaptive sync refresh when a frame arrives, rather than on a fixed clock, removing most of the trade-off within their supported range.

Modern [[Graphics API]]s expose these as presentation modes. Vulkan's FIFO mode is VSync, guaranteed to be supported; immediate mode tears; mailbox gives triple buffering. Choosing the number of buffers is a latency trade-off too: each queued frame adds a frame of delay between input and display, which matters for [[Input Latency]].

Even with a steady average frame rate, uneven delivery feels worse than a lower but consistent one. Getting frames to the swap chain at regular intervals is [[Frame Pacing]], and techniques such as [[Frame Generation]] insert frames into the chain to raise apparent smoothness.

On desktop systems, the swap chain doesn't usually go straight to the screen. A [[Compositor]] combines windows from all applications into the final image, adding at least one more stage of buffering. Fullscreen applications can bypass it with direct scanout, sending their buffer straight to the display for lower latency, which is one reason games often feel more responsive in exclusive fullscreen.

Buffers also hold more than color. Renderers use many intermediate images per frame, a [[Depth Buffer]] and the targets of [[Deferred Shading]] and [[Post-Processing]], but only the final image enters the swap chain.

## See also
- [[Motion Interpolation]]
- [[Dynamic Resolution Scaling]]
- [[Racing the Beam]]
- [[Frame Rate]]
- [[Graphics Pipeline]]
