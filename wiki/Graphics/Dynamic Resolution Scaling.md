---
aliases:
  - Dynamic resolution
  - Resolution scaling
tags:
  - graphics
summary: A technique in which a game lowers and raises its rendering resolution from frame to frame to hold a steady frame rate, trading momentary sharpness for consistent motion and relying on good upscaling to hide the change.
---
**Dynamic resolution scaling** is a technique in which a game adjusts the resolution it renders at from frame to frame to hold a steady frame rate. When a scene gets demanding, with explosions, crowds, or long views, the renderer draws fewer pixels and scales the image up to the display's size. When the load eases, it raises resolution again. The aim is to trade momentary sharpness for consistent motion, which players usually notice more; see [[Frame Rate]].

The approach rests on how rendering costs scale. Much of a modern frame's cost, especially lighting and post-processing, grows with the number of pixels shaded; see [[Deferred Shading]] and [[Post-Processing]]. Dropping from 4K to 1440p cuts the pixel count by more than half. Geometry and simulation costs don't shrink, so the savings depend on where the bottleneck lies; see [[Graphics Processing Unit]].

A controller picks the resolution. The engine measures how long recent frames took on the graphics processor and compares that with the budget, such as 16.7 milliseconds for 60 frames per second. If frames run long, resolution drops; if there's headroom, it rises. Changes are smoothed and limited so the image doesn't visibly pump between sharp and soft, and good controllers react before a frame misses its deadline rather than after; see [[Feedback Loop]]. Missing the deadline even occasionally causes visible stutter; see [[Frame Pacing]].

Upscaling quality makes the technique work. Simple stretching blurs the image; see [[Image Resampling]]. Temporal upscalers accumulate detail across several frames, using motion vectors to reuse earlier samples, and produce results close to native resolution from much lower input; see [[Temporal Upscaling]]. Many engines render the 3D scene at the dynamic resolution but draw the interface at full resolution on top, so text stays crisp.

Consoles adopted dynamic resolution widely in the generation that began in 2013, since developers face fixed hardware and fixed target frame rates and can't ask players to lower settings. It's now common on PCs as well, often alongside variable refresh rate displays, which soften the effect of frames that still run long; see [[Screen Tearing]].

The approach has limits. Dropping too far makes images smeary, especially with fine detail like foliage and wires; see [[Aliasing]]. Some players prefer a locked resolution with occasional dips in frame rate. Others want the option to switch it off entirely, and many PC games now expose a target frame rate instead of a fixed resolution. And on phones and handhelds it also manages heat, lowering resolution as the processor slows itself to stay cool; see [[Thermal Throttling]].

Related techniques vary the shading rate instead of the resolution, spending detail where the eye is looking; see [[Foveated Rendering]].

## See also
- [[Swap Chain]]
- [[Unsharp Masking]]
- [[Pixel]]
