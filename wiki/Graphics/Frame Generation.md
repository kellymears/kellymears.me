---
aliases:
  - Frame interpolation
  - Fake frames
  - DLSS Frame Generation
tags:
  - graphics
summary: Synthesizing extra frames between rendered ones, which raises displayed frame rate but not responsiveness.
---
**Frame generation** synthesizes additional frames between the ones a game actually renders, typically one or more generated frames per real frame. It uses the same inputs as [[Temporal Upscaling]] (motion vectors, depth, the previous frame), often with an optical-flow pass to catch motion the game did not report, such as shadows and reflections. A game rendering at 60 frames per second can display 120 or more.

What it raises is **smoothness**, not **responsiveness**. A generated frame contains no new game state: the simulation did not run and the player's input was not read. Worse, to interpolate *between* two frames the system has to hold back the newer real frame until the in-between one has been shown, which adds latency on top of the base frame rate's. So a game generated from 40 to 80 frames per second looks like 80 but feels like slightly worse than 40. Vendors pair the feature with latency-reduction systems for this reason, and the usual guidance is that it works well from a good base rate (60 and up) and badly as a rescue for a struggling one, which is exactly where people most want it.

This makes frame rate an ambiguous metric. It used to measure rendering throughput and input latency together; with generation it measures only the first. A benchmark quoting generated frame rates against native ones compares different quantities, a [[Goodhart's Law]] case for graphics. [[Latency and Jitter|Input latency]] and [[Frame Pacing]] have to be measured separately.

The artifacts are those of any interpolation: UI elements and text smeared because they have no meaningful motion vectors, disocclusion errors at the edges of fast-moving objects, and garbage when a camera cut makes two frames unrelated. Generation also leans on drivers and low-level timing more than most features. Hooking it into a game that was not designed for it, through mods or an [[API Translation Layer]], is a common source of crashes rather than mere glitches.

Genres sorted by sensitivity to latency, from [[Rhythm Game|rhythm]] and fighting games ([[Frame Data]]) down to slow exploration, map fairly directly onto how acceptable generation is.

## See also
- [[Temporal Upscaling]]
- [[Frame Pacing]]
- [[Game Feel]]
- [[Latency and Jitter]]
- [[Rollback Netcode]]
- [[Motion Blur]]
- [[Input Latency]]
