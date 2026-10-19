---
aliases:
  - Input lag
  - Click-to-photon latency
  - Motion-to-photon latency
  - End-to-end latency
tags:
  - graphics
summary: The delay between pressing a button and seeing the result on screen, where every stage of the chain adds a few milliseconds, and why it matters to how a game or interface feels.
---
**Input latency** is the time between a player's action, such as pressing a button or moving a mouse, and the moment its result appears on screen. Every stage in between adds a few milliseconds, and the total in games is often 30 to 100 milliseconds, the difference between responsive and sluggish.

The chain from hand to eye:

1. **Input device.** Controllers and mice are polled 125 to 8,000 times a second.
2. **Operating system and game loop.** The input waits to be read at the next simulation step of the [[Game Loop]].
3. **Simulation and render submission.** The game updates the world and prepares draw commands on the CPU.
4. **Render queue.** CPUs often run one or more frames ahead of the GPU to keep it busy. Each queued frame adds a full frame of delay.
5. **GPU rendering.** The frame is drawn, including any [[Post-Processing]].
6. **Composition and display.** The frame waits for the display, possibly through a [[Compositor]], then is scanned out. TVs add processing outside game mode, and pixels take time to change.

Several choices trade smoothness against latency:

- **V-Sync** prevents [[Screen Tearing]] but makes finished frames wait for the next refresh, adding up to a frame or more. Variable refresh rate displays reduce the wait, part of good [[Frame Pacing]].
- **Frame queuing** smooths throughput but adds delay. NVIDIA Reflex and AMD Anti-Lag, introduced around 2019 and 2020, cut the queue so the CPU starts each frame just in time.
- **[[Frame Generation]]** raises displayed frame rate but holds back a real frame to interpolate, adding latency even as motion looks smoother.
- **Cloud gaming** adds the network round trip, subject to [[Latency and Jitter]].

Measuring it properly takes hardware, such as a high-speed camera filming hand and screen, since software counters miss the device and display stages.

Thresholds depend on context. Interface research has long treated about 100 milliseconds as feeling instantaneous for discrete actions. Direct manipulation is far more demanding: a 2012 Microsoft Research demonstration showed people could notice dragging latency on a touchscreen well below 10 milliseconds. In virtual reality, John Carmack and Michael Abrash argued around 2013 that motion-to-photon latency must stay under about 20 milliseconds, since a lag between head movement and image conflicts with the [[Vestibular System]] and causes nausea.

Competitive games care most. Fighting game players count timing in frames, described under [[Frame Data]], and [[Rollback Netcode]] hides network delay by predicting and correcting rather than waiting. On the web, Interaction to Next Paint in [[Core Web Vitals]] measures the same thing for pages, and [[Optimistic UI]] hides server latency by updating the screen before the server answers.

Latency is a large part of [[Game Feel]]: a steady, responsive 60 fps often beats a higher, laggier rate.

## See also
- [[Sense of Agency]]
- [[Motion Sickness]]
