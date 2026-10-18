---
aliases:
  - Mocap
  - Performance capture
  - Motion matching
tags:
  - graphics
summary: Recording the movement of real performers and turning it into data that drives digital characters, with markers and cameras, body-worn sensors, or neural networks reading ordinary video.
---
**Motion capture** (mocap) records the movement of real people or objects and turns it into data that can drive a digital character. It supplies much of the animation in modern games and visual-effects films, and is used in sports science, medicine, and robotics as well.

The common systems:

- **Optical, with markers.** The performer wears a suit dotted with small reflective balls. A ring of cameras flashes [[Infrared]] light and records where the markers appear. Since several cameras see each marker at once, software triangulates its position in 3D, much as [[Photogrammetry]] reconstructs objects from photographs. Studio systems track hundreds of markers at hundreds of frames per second with sub-millimeter accuracy.
- **Inertial.** Small sensors strapped to each limb measure acceleration and rotation. No cameras are needed, so capture works anywhere, but positions drift as small errors accumulate.
- **Markerless.** A [[Neural Network]] estimates a body's pose directly from ordinary video. Quality has improved fast, and a phone can now do rough capture.

Raw data is never ready to use. Markers get hidden behind limbs or swapped with each other, leaving gaps and jumps that must be filled and cleaned; see [[Data Cleaning]]. The marker positions are then "solved" onto a skeleton, turning points in space into joint rotations, usually stored as [[Quaternion]]s; see [[Skeletal Animation]]. Because a character's proportions rarely match the actor's, the motion must be retargeted, with hands and feet adjusted so they still touch what they should.

Faces need more detail. **Performance capture** records an actor's face, body, and voice together, often with a head-mounted camera watching dots painted on the skin. Andy Serkis's Gollum in *The Lord of the Rings* films made the technique famous and started an argument over whether such performances deserve acting awards.

Mocap's strength is weight and subtlety that are hard to animate by hand: the shift of balance in a walk, the small hesitations of a real person. Its weaknesses mirror that. Captured motion can look floaty or flat in a stylized world, and animators often add exaggeration back; see [[Twelve Basic Principles of Animation]]. Faces that are nearly but not quite real can land in the [[Uncanny Valley]].

Games use mocap differently from film, because the player controls the character. Clips must loop and blend into each other at any moment, and long, realistic transitions make controls feel unresponsive; see [[Game Feel]] and [[Input Latency]]. **Motion matching** searches a large library of captured motion every frame for the clip that best continues the current pose toward where the player is steering.

Outside entertainment, motion capture analyzes athletes' technique, patients' gait during rehabilitation, and a rider's position during a [[Bike Fit]]; see [[Exercise Economy]].

## See also
- [[Chroma Key]]
- [[Stop Motion]]
- [[Imitation Learning]]
