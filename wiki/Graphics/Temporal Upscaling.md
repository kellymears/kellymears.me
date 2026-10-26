---
aliases:
  - Upscaling
  - Super resolution
  - DLSS
  - FSR
  - TAAU
tags:
  - graphics
summary: Rendering fewer pixels per frame and reconstructing a full-resolution image by accumulating samples across frames.
---
**Temporal upscaling** renders each frame at a lower resolution and reconstructs a full-resolution image by combining samples from the current frame with samples carried over from previous ones. Each frame is rendered with a tiny sub-pixel camera offset (jitter), so over several frames different points inside each output pixel get sampled. Motion vectors from the renderer say where each surface was last frame, so history can be reprojected onto the current image and accumulated. Static content converges to more detail than any single frame contains, sometimes more than a native render without anti-aliasing.

The hard part is deciding **when history is wrong**. Something newly revealed behind a moving object, a particle effect with no motion vectors, a reflection moving differently from the surface it sits on: in all of these, reprojected history is stale. Using it causes ghosting (trails behind moving objects). Rejecting it too eagerly causes shimmer and fizzing at edges. Hand-tuned implementations use heuristics for that decision, while machine-learned ones (DLSS, XeSS, newer FSR) train a network to make it. That is the main reason the learned versions hold up better in motion.

Because the network reconstructs rather than samples, it can produce plausible detail that was never rendered. Text, fine patterns, and thin lines can come out subtly invented, the visual equivalent of [[Hallucination]]. Upscaled output is usually better than the alternatives, but it is not [[Ground Truth]], and comparing screenshots of still scenes hides almost all of the failure modes, which only show up in motion.

Upscaling is now load-bearing in modern games. Expensive techniques like real-time [[Ray Tracing]] are budgeted on the assumption that the internal resolution is a half or a third of the output. Since the upscaler is a component with an interface (color, depth, motion vectors, jitter), mod tools can intercept that interface and swap one vendor's upscaler for another's in a game that never shipped with it. This is a [[Game Modding]] category of its own, and one form of [[API Translation Layer]].

[[Frame Generation]] uses the same inputs to synthesize whole frames instead of pixels.

## See also
- [[Denoising]]
