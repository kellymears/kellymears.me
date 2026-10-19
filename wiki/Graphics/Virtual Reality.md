---
aliases:
  - VR
  - Head-mounted display
  - Mixed reality
tags:
  - graphics
summary: Headsets that replace what you see with a rendered world that follows your head movements, demanding very low latency and high frame rates because the body notices immediately when vision and balance disagree.
---
**Virtual reality** (VR) places a person inside a computer-generated scene by showing each eye its own image on a headset and updating the view instantly as the head moves. Done well, it produces **presence**, the sense of actually being somewhere else, which no flat screen achieves.

Ivan Sutherland built the first head-mounted display in 1968. It was so heavy it hung from the ceiling, earning the nickname "Sword of Damocles," and showed wireframe shapes over the real room. The modern era began with the Oculus Rift prototype in 2012, built from cheap phone screens and motion sensors. Later headsets added room-scale tracking, hand controllers, and standalone designs needing no PC.

Each eye gets a slightly different view, so the brain fuses them into depth; see [[Stereoscopy]] and [[Perspective Projection]]. Lenses magnify a small screen to fill the field of view but bend straight lines, so the renderer pre-distorts each image in the opposite direction.

The central technical challenge is **latency**. When you turn your head, the image must follow within about 20 milliseconds. Any longer and the world appears to swim, because the inner ear reports motion the eyes don't yet see; see [[Vestibular System]] and [[Input Latency]]. Headsets therefore run at 90 frames per second or more, light each frame only briefly to reduce blur, and track the head with cameras and motion sensors sampled hundreds of times a second. Head orientation is usually stored as a [[Quaternion]]. If the game misses a frame, the system warps the last image to match the new head position, a technique called reprojection; see [[Frame Pacing]] and [[Frame Generation]].

Rendering two high-resolution views at that rate is expensive. **Foveated rendering** uses [[Eye Tracking]] to draw full detail only where the user is looking, since peripheral vision is blurry anyway.

Even perfect hardware can cause discomfort. Moving through a virtual world while sitting still produces a mismatch between eyes and inner ear that makes many people nauseous. Designers respond with teleport movement, narrowed vision during motion, and fixed reference points; see [[Reduced Motion]]. Displays also sit at a fixed focal distance while the eyes converge on objects at different depths, a conflict that tires the eyes over time.

Interaction is shaped by the body. Hands tracked by controllers or cameras grab and throw objects, often with vibration standing in for touch; see [[Haptic Feedback]] and [[Proprioception]]. Interfaces work best placed in the world rather than on a flat overlay; see [[Diegetic Interface]].

**Mixed reality** shows the real surroundings through cameras or transparent lenses and places virtual objects among them, which requires mapping the room in real time. Full-body tracking draws on the same techniques as film capture; see [[Motion Capture]].

## See also
- [[Phantom Limb]]
- [[Gyroscope]]
