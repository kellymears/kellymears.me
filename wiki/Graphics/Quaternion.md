---
aliases:
  - Quaternions
  - Gimbal lock
  - Euler angles
  - Slerp
  - Spherical linear interpolation
tags:
  - graphics
summary: A four-number way to represent rotation in 3D that avoids gimbal lock and interpolates smoothly, used by game engines, spacecraft, and phones.
---
A **quaternion** is a number with four parts, one real and three imaginary, and unit quaternions turn out to be an excellent way to represent rotations in three dimensions. The Irish mathematician William Rowan Hamilton discovered them on October 16, 1843, while walking along the Royal Canal in Dublin. Struck by the idea, he carved the defining equation, i² = j² = k² = ijk = −1, into the stone of Broom Bridge, where a plaque now marks the spot.

They were mostly a mathematical curiosity until computer graphics and spacecraft needed a robust way to handle orientation. The obvious alternative, three **Euler angles** such as yaw, pitch, and roll, is intuitive but has a serious flaw.

**Gimbal lock** happens when two of the three rotation axes line up, for example when an aircraft pitches straight up and yaw and roll become the same motion. One degree of freedom is lost, and small changes in orientation require wild swings in the angles. Physical gimbals in navigation systems suffer it literally. The Apollo spacecraft's guidance platform used three gimbals and warned the crew when they approached lock. Apollo 11 command module pilot Michael Collins joked about wanting a fourth gimbal for Christmas.

Quaternions avoid the problem and have several other advantages:

- **No gimbal lock.** Any orientation is represented without singular points.
- **Smooth interpolation.** *Slerp*, spherical linear interpolation, introduced to graphics by Ken Shoemake in 1985, moves between two orientations at constant speed along the shortest arc. Interpolating Euler angles produces wobbling, uneven paths.
- **Compact and stable.** Four numbers instead of a rotation matrix's nine, and when [[Floating-Point Arithmetic]] rounding errors accumulate, a quaternion is easily renormalized back to a valid rotation, while a drifted matrix starts to skew and scale.
- **Cheap composition.** Combining two rotations is one quaternion multiplication.

One quirk is that each rotation has two representations, q and −q, so interpolation code checks the sign to take the short way around.

Game engines store object orientations as quaternions internally, even when the editor shows Euler angles. [[Skeletal Animation]] blends joint rotations with them, cameras use them to turn smoothly, and physics engines integrate [[Angular Momentum]] with them. Spacecraft attitude control, drones, VR headsets, and phones fuse gyroscope and accelerometer readings into a quaternion to track orientation, the engineered counterpart of what the [[Vestibular System]] does. Orientation is always relative to some [[Inertial Frame of Reference]] or parent object. The math also gives smooth camera motion that combines well with [[Easing]], and avoiding sudden rotational jumps matters for [[Game Feel]].

## See also
- [[Motion Capture]]
- [[Keyframe Animation]]
- [[Floating-Point Arithmetic]]
- [[Easing]]
- [[Newton's Laws of Motion]]
- [[Perspective Projection]]
- [[Linear Interpolation]]
- [[Transformation Matrix]]
