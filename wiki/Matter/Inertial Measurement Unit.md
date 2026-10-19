---
aliases:
  - IMU
  - Accelerometer
  - MEMS gyroscope
  - Inertial navigation
  - Dead reckoning
tags:
  - matter
summary: A package of accelerometers and gyroscopes that senses motion and orientation from the inside, in every phone, drone, and game controller, whose small errors grow without limit unless something outside corrects them.
---
An **inertial measurement unit** (IMU) senses how an object moves and turns using only measurements made inside it, with no outside reference. It combines **accelerometers**, which measure linear acceleration along three axes, with **gyroscopes**, which measure rotation rate around three axes, and often a magnetometer as a compass. Every phone, drone, smartwatch, and modern game controller carries one.

Most are now micromachined silicon chips, the size of a grain of rice:

- **Accelerometers.** A tiny mass hangs on silicon springs. Acceleration pushes it off center, and the shift is read as a change in capacitance between interleaved fingers; see [[Capacitor]] and [[Newton's Laws of Motion]]. Airbag triggers in the early 1990s were among the first mass-market uses.
- **Gyroscopes.** Chip gyroscopes don't spin. A mass vibrates back and forth, and when the chip rotates, the Coriolis force pushes it sideways in proportion to the rotation rate; see [[Simple Harmonic Motion]] and [[Coriolis Effect]]. Older navigation systems used real spinning rotors, relying on [[Angular Momentum]], and later rings of laser light.

An accelerometer can't tell gravity from acceleration. At rest on a table it reads one g upward, and in free fall it reads zero; see [[Gravity]] and [[Inertial Frame of Reference]]. That flaw is also a feature: the direction of gravity tells a phone which way is down, which is how the screen knows to rotate.

**Dead reckoning** in principle needs nothing more: integrate rotation rate to get orientation, integrate acceleration once for velocity and again for position. In practice every small bias accumulates. A constant acceleration error grows into a position error with the square of time, and a slight tilt error leaks gravity into the horizontal axes. Cheap phone sensors drift by meters within seconds. Navigation-grade units costing as much as a car drift about a kilometer per hour, good enough for submarines and aircraft between fixes.

So IMUs are almost always fused with something else. Software blends the fast, smooth, but drifting inertial signal with slow, noisy, but stable references, such as satellite positions, the magnetometer, or camera tracking; see [[Global Positioning System]]. Orientation is usually tracked as a [[Quaternion]] to avoid gimbal lock.

Uses depend on that speed. A [[Virtual Reality]] headset samples its IMU hundreds or thousands of times a second to predict head motion between camera updates, since lag between turning and seeing causes nausea. Phones count steps from rhythmic jolts, stabilize video by measuring hand shake, and detect falls. Drones would tumble without one, since their flight controller corrects attitude many times a second.

The body has its own version: the inner ear's canals sense rotation and its otolith organs sense linear acceleration and gravity, with the same ambiguity between tilting and accelerating; see [[Vestibular System]].

## See also
- [[Kalman Filter]]
- [[Gyroscope]]
- [[Autonomous Vehicle]]
- [[Pigeon Post]]
