---
aliases:
  - Frame time
  - Frametime consistency
  - Microstutter
  - Variable refresh rate
  - VRR
tags:
  - graphics
summary: How evenly frames are delivered over time, which shapes perceived smoothness more than average frame rate does.
---
**Frame pacing** is how evenly a game delivers frames to the display. The average frame rate hides it. Sixty frames in a second at a steady 16.7 ms each looks smooth; sixty frames alternating between 8 and 25 ms has the same average and looks like stutter. The eye tracks motion, and uneven spacing makes objects jump unevenly. The useful measure is **frame time** (milliseconds per frame), plotted over time, along with percentile figures such as the "1% low" that expose spikes an average smooths away.

Poor pacing has several common causes:

- **Fixed refresh with V-Sync.** A frame that misses the display's refresh deadline by a fraction of a millisecond waits for the next one, so a game running at 55 frames per second on a 60 Hz panel alternates between one-refresh and two-refresh frames. **Variable refresh rate** (VRR, sold as G-Sync and FreeSync) fixes this by having the display wait for the frame rather than the reverse. That is why VRR improved perceived smoothness more than higher refresh rates did.
- **Hitches**: one frame that takes 100 ms because something blocking ran on the render thread, such as [[Shader Compilation Stutter]], asset streaming, or [[Garbage Collection]].
- **CPU and GPU out of step.** If the CPU queues frames faster than the GPU finishes them, latency rises. If the queue empties, the GPU idles and frame times swing. Frame-rate caps set slightly below the refresh rate exist to keep this queue short and steady.
- **Scheduling contention.** On a busy machine, where the [[CPU Scheduler]] is juggling more runnable threads than cores, a game thread delayed by other work produces irregular spikes, which is why tools that [[CPU Affinity|pin games to dedicated cores]] and quiet background work tend to improve the 1% lows more than the average.

The general lesson applies outside graphics: for interactive systems, **variance matters more than the mean**. The same holds for network [[Latency and Jitter]], for [[Core Web Vitals]] measured at the 75th percentile, and for any [[Performance Budget]] stated as a deadline rather than an average. [[Frame Generation]] can raise the average while leaving the underlying pacing unchanged, so its numbers need care.

## See also
- [[Input Latency]]
- [[Game Loop]]
- [[Swap Chain]]
- [[Frame Rate]]
- [[Debounce and Throttle]]
- [[Racing the Beam]]
- [[Resource Starvation]]
- [[Thermal Throttling]]
- [[Screen Tearing]]
