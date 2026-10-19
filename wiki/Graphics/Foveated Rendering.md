---
aliases:
  - Variable rate shading
  - Eye-tracked rendering
tags:
  - graphics
summary: Rendering at full detail only where the viewer is looking and progressively less in the periphery, exploiting the eye's tiny sharp center to save GPU work, especially in virtual reality headsets with eye tracking.
---
**Foveated rendering** spends a frame's detail where the viewer is actually looking and saves effort everywhere else. It takes its name from the **fovea**, a small pit in the center of the retina packed with cone cells, which is the only part of the eye that sees sharply. It covers only a few degrees of the visual field, roughly the width of a thumb at arm's length. Outside it, acuity drops steeply; you can't read a word a few lines away from the one you're looking at; see [[Eye Tracking]].

A conventional renderer ignores this and draws every pixel at full quality, though most of them land on parts of the retina that can't resolve the detail. In a [[Virtual Reality]] headset, which must render two high-resolution views at 90 frames a second or more, that waste is expensive. Reducing quality away from the gaze point can cut the shading work substantially; see [[Frame Rate]].

There are two kinds:

- **Fixed foveated rendering** assumes the viewer looks roughly ahead, and lowers quality toward the edges of the display. Headset lenses already blur the edges, so the loss is hard to notice. Standalone headsets such as Meta's Quest use it.
- **Eye-tracked, or dynamic, foveated rendering** uses cameras inside the headset to follow the eyes and moves the sharp region with the gaze. Sony's PlayStation VR2 and Apple's Vision Pro both do this.

Dynamic foveation has a hard latency requirement. The eye jumps between points in fast movements called saccades, and if the sharp region arrives late, the viewer sees a blurry patch where they just looked. Vision is partly suppressed during a saccade, which gives the system a few milliseconds of cover, but tracking and rendering must still be fast and predictive; see [[Input Latency]].

GPUs provide hardware support. **Variable rate shading**, introduced in graphics hardware around 2018 and added to DirectX 12, lets the renderer shade one color for a block of two by two or four by four pixels instead of each pixel individually; see [[Shader]] and [[Graphics Pipeline]]. Other approaches render the periphery at lower resolution and upscale it; see [[Temporal Upscaling]].

The periphery is blurry but not blind. It is especially sensitive to motion and flicker, so a naive reduction in resolution that makes edges crawl and shimmer is more noticeable than the lost detail itself; see [[Aliasing]]. Good implementations preserve contrast and temporal stability in the periphery, sometimes adding noise patterns that the eye reads as texture; see [[Blue Noise]].

Video encoders apply a similar idea when they spend more bits on faces and other regions viewers attend to; see [[Level of Detail]] and [[Video Compression]]. What viewers miss depends on attention as much as on the retina; see [[Change blindness]].

## See also
- [[Stereoscopy]]
- [[Pixel]]
- [[Dynamic Resolution Scaling]]
