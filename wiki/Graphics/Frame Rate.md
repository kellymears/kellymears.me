---
aliases:
  - FPS
  - Frames per second
  - Refresh rate
  - 24 fps
  - Judder
  - High frame rate
tags:
  - graphics
summary: How many distinct images per second a film, game, or display shows, a number set by history at 24 for cinema, by power grids at 50 and 60 for television, and by hardware and taste for games.
---
**Frame rate** is the number of distinct images shown per second, measured in frames per second (fps) for content and in hertz for a display's **refresh rate**. Above roughly a dozen frames a second, a sequence reads as motion; see [[Apparent Motion]]. Beyond that, the number shapes how smooth, sharp, and responsive motion feels, and the common values were set as much by history as by perception.

The standard rates:

- **24 fps** for cinema, fixed when sound film arrived in the late 1920s. Silent films ran at varying speeds, but a soundtrack printed on the film needed a constant speed, and 24 was about the slowest that gave acceptable audio while saving film stock. Its particular blur and stutter became what "cinematic" looks like; see [[Motion Blur]].
- **50 and 60** for television, tied to the frequency of the local power grid so studio lights and receivers wouldn't beat against each other. Broadcast TV drew interlaced fields, odd lines then even lines, so 60 fields made 30 full frames; see [[Racing the Beam]].
- **30 and 60** in games, matching TV refresh. Monitors now reach 240 Hz and beyond.

Mismatched rates cause their own artifacts. Showing 24 fps film on a 60 Hz TV needs 3:2 pulldown, holding alternate frames for three refreshes and then two, which produces an uneven cadence called **judder**, visible in slow pans. Games that finish frames at a rate the display doesn't divide evenly either tear or stutter; see [[Screen Tearing]] and [[Frame Pacing]]. Variable refresh displays wait for each frame instead of refreshing on a fixed clock, which removes most of the problem.

In games, frame rate is also about responsiveness. Each frame is a chance to read input and show its result, so at 30 fps the delay between pressing a button and seeing the effect is noticeably longer than at 120; see [[Input Latency]] and [[Game Loop]]. Averages also hide the experience: a game averaging 60 fps with occasional 50-millisecond frames feels worse than a steady 50, which is why benchmarks now report frame times and "1% lows."

Higher rates cost proportionally more work, so renderers buy them in other ways. They render at lower resolution and reconstruct the rest, or generate intermediate frames from motion data; see [[Temporal Upscaling]] and [[Frame Generation]]. Generated frames improve smoothness but not responsiveness, since the game reads no input for them. Higher rates also raise the bitrate needed to stream video; see [[Video Compression]].

Film has resisted higher rates. *The Hobbit* (2012) was shown in many theaters at 48 fps, and many viewers said it looked like television or a stage set, the so-called **soap opera effect**, which motion-smoothing settings on TVs also produce. Familiarity is probably part of it.

## See also
- [[Swap Chain]]
- [[Virtual Reality]]
- [[Motion Sickness]]
- [[Liquid-Crystal Display]]
- [[Interlacing]]
