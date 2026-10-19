---
aliases:
  - Motion estimation
  - Lucas-Kanade method
  - Aperture problem
tags:
  - graphics
summary: The apparent motion of brightness patterns from one image to the next, estimated as a vector for each pixel, used to compress video, synthesize in-between frames, stabilize footage and steer robots, insects and optical mice.
---
**Optical flow** is the pattern of apparent motion in a sequence of images: for each point in one frame, where it appears to have moved in the next. It is usually represented as a field of two-dimensional vectors, one per pixel. The perceptual psychologist James Gibson introduced the term around 1950 to describe how moving through the world makes the visual field stream outward from the point one is heading toward, information animals use to judge speed and direction; see [[Apparent Motion]].

Computing it rests on an assumption called **brightness constancy**: a point keeps the same brightness as it moves, so a pixel's new location is wherever its value reappears. That gives one equation per pixel but two unknowns, the horizontal and vertical motion. The result is the **aperture problem**: looking at a straight edge through a small hole, only motion perpendicular to the edge can be seen. Motion along the edge changes nothing.

Two 1981 methods resolved this in different ways. The **Lucas-Kanade method** assumes that all pixels in a small window move together, giving enough equations to solve for a single shared motion; it works well at corners and textured spots. The **Horn-Schunck method** instead requires the whole flow field to vary smoothly, filling in uniform regions from their surroundings. Both handle only small displacements, so practical systems run them on an image pyramid, estimating coarse motion on shrunken copies and refining it at full resolution; see [[Mipmapping]] and [[Convolution]]. Since the mid-2010s, neural networks trained on synthetic scenes with known motion have become the most accurate approach.

Optical flow has many uses:

- **Video compression.** Encoders describe each block of a frame by a motion vector pointing at a similar block in an earlier frame, plus a small correction; see [[Video Compression]].
- **In-between frames.** Moving pixels partway along their vectors synthesizes intermediate frames for slow motion or smoother playback; see [[Motion Interpolation]]. Games combine flow with motion vectors from the renderer to generate extra frames; see [[Frame Generation]] and [[Temporal Upscaling]].
- **Stabilization.** Estimating the camera's overall motion lets software cancel the shake.
- **Effects and tracking.** Flow drives motion blur on footage, helps track objects across frames, and assists in rotoscoping; see [[Motion Blur]] and [[Rotoscoping]].
- **Navigation.** Optical mice compare successive images of the desk surface to measure movement. Drones use downward cameras to hold position, and honeybees appear to regulate flying speed by keeping the flow in their eyes constant; see [[Autonomous Vehicle]].

Flow fails where its assumptions do: changing lighting, reflections, transparent surfaces, and regions that become hidden or newly revealed as objects move. Those failures show up as the warping and smearing artifacts typical of interpolated video; see [[Photogrammetry]].

## See also
- [[Image Sensor]]
- [[Motion Sickness]]
- [[Canny Edge Detector]]
