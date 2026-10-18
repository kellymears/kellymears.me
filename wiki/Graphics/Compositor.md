---
aliases:
  - Compositing
  - Compositing window manager
  - Direct scanout
  - Unredirection
tags:
  - graphics
summary: The component that draws each window or layer into its own off-screen buffer and then combines them into the final image, which makes transparency, effects, and tear-free output possible at a small latency cost.
---
A **compositor** builds the final screen image from separately rendered pieces. Each application window, or each layer of a web page, draws into its own off-screen buffer, and the compositor combines those buffers into one frame, usually on the GPU, deciding position, stacking order, transparency, and effects as it goes.

Before compositing, windows drew directly onto the shared screen. When one window moved, the one underneath had to redraw the exposed area, and until it did, a trail of stale pixels showed through. With every window in its own buffer, a compositor can move, scale, or fade windows without asking applications to redraw anything. That made a whole class of effects cheap: translucent panels, drop shadows, background blur, animated window transitions, previews of live windows. Because the compositor presents complete frames on the display's schedule, it also prevents [[Screen Tearing]] on the desktop.

The costs are real but usually small:

- **Latency.** Assembling the final frame typically adds part of a refresh, sometimes a whole one, between an application finishing its frame and the screen showing it.
- **GPU work and memory.** Blur and shadows are not free, and every window's buffer occupies memory.
- **One more failure point.** If the compositor stalls, the whole desktop stalls.

For fullscreen games, compositors use *direct scanout* (sometimes called unredirection): when one window covers the whole screen and needs no effects, its buffer is sent straight to the display, skipping composition and its latency.

On Linux, the architecture differs by [[Display Server]]. Under X11, compositing was an optional add-on that intercepted the server's output. Under Wayland, the compositor *is* the display server, so every Wayland desktop composites, and the window manager, input routing, and effects live in one program.

Browsers use the same idea inside a page. Elements that animate `transform` or `opacity` can be promoted to their own layers and moved by the compositor thread without layout or paint, which is why those properties animate smoothly while animating `top` or `width` causes [[Layout Thrashing]]. A [[Stacking Context]] is the browser's grouping unit for this kind of layered painting.

## See also
- [[Desktop Metaphor]]
- [[Rotoscoping]]
- [[Frame Pacing]]
- [[Stacking Context]]
- [[Layout Thrashing]]
- [[High Dynamic Range]]
- [[Background Tab Throttling]]
- [[Alpha Compositing]]
- [[Browser Engine]]
- [[Long Task]]
- [[Swap Chain]]
