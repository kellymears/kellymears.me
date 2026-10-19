---
aliases:
  - Blend tree
  - Blend space
  - Additive animation
  - Inertialization
tags:
  - graphics
summary: Combining several animation clips at once on a character's skeleton, crossfading from walk to run, mixing by speed and direction, or layering an aim on top of a stride, so a few dozen recorded motions cover the continuous range of what a player can do.
---
A game character can't simply play one clip at a time. Players steer at any speed, stop mid-stride and fire while running, and fixed recordings would snap visibly between them. **Animation blending** solves this by combining clips on the skeleton every frame, computing a weighted mix of each joint's position and rotation; see [[Skeletal Animation]].

The basic operation is interpolation per joint. Positions mix linearly, while rotations are mixed with spherical interpolation or normalized averages of quaternions, since averaging angles directly fails when they wrap around; see [[Quaternion]] and [[Linear Interpolation]].

The simplest use is the **crossfade**. When a character starts walking, the engine fades the walk in over a fraction of a second while fading the idle pose out. Which clips play, and when to fade, is often decided by a graph of states and transitions; see [[Finite State Machine]].

**Blend spaces** cover continuous inputs. A one-dimensional blend lays out walk, jog and run clips along a speed axis and mixes the two nearest for any speed. A two-dimensional one adds direction, mixing forward, sideways and backward steps. The clips have to be synchronized so their feet land at matching phases, or the blend produces a shuffling mess. Even then, if the character's actual speed doesn't match the blended stride, the feet slide over the ground. Engines correct this by scaling playback speed, by letting the animation itself drive movement, called root motion, or by planting the feet with inverse kinematics.

**Layering** blends by body part. A mask chooses which bones each layer affects, so the upper body can reload or aim while the legs keep running. **Additive** animations store only a difference from a reference pose, such as breathing, a flinch or a weapon's recoil, and add it on top of whatever else is playing.

Crossfades have a cost. For their whole duration the engine evaluates both clips, and quick transitions can look mushy. **Inertialization**, described at GDC in 2018 by an engineer on the Gears of War series, switches to the new clip at once and decays the leftover offset from the old pose over time, so only one clip has to be evaluated.

Blending shapes how controls feel. Long transitions read as sluggish, a character that turns on a dime can look weightless, and many games trade realism for response; see [[Game Feel]] and [[Input Latency]]. Motion matching drops the hand-built graph. Every few frames it searches a library of captured motion for the clip that best continues the current pose toward the player's input, then blends into it; see [[Motion matching]].

Faces blend sculpted expressions rather than bones, under the same principles; see [[Morph Target]]. Physics can be blended in as well, as when a ragdoll takes over a falling character; see [[Ragdoll physics]].

## See also
- [[Keyframe Animation]]
- [[Game Loop]]
