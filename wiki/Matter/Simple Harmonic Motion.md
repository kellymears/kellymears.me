---
aliases:
  - Harmonic oscillator
  - Pendulum
  - Oscillation
  - Isochronism
tags:
  - matter
summary: The smooth, regular back-and-forth motion produced whenever a restoring force grows in proportion to displacement, the basis of clocks, musical tones, and springy interface animations.
---
**Simple harmonic motion** is the regular oscillation of anything pulled back toward a resting point by a force proportional to how far it has moved away. A weight on a spring, a pendulum swinging through a small arc, a vibrating guitar string, and the air in an organ pipe all approximate it. The motion traces a sine wave over time: fastest through the middle, momentarily still at each extreme, then back again.

The condition is a restoring force that grows linearly with displacement, which is exactly what [[Elasticity]] gives a spring under Hooke's law. Feed that force into [[Newton's Laws of Motion]] and the sine wave falls out. Throughout the cycle, energy trades back and forth between motion and stored potential energy, kinetic at the center and potential at the ends, with the total fixed by [[Conservation of Energy]] until friction drains it.

The most useful property is **isochronism**: the period doesn't depend on how wide the swing is. A large swing covers more distance but moves faster, and the two effects cancel exactly. The period depends only on the system itself:

- A mass on a spring oscillates faster with a stiffer spring and slower with a heavier mass.
- A pendulum's period depends only on its length and gravity, not on the mass of the bob. A pendulum about one meter long takes almost exactly one second per swing.

Galileo reportedly noticed isochronism watching a swinging lamp in Pisa cathedral, timing it against his pulse. Christiaan Huygens turned it into the pendulum clock in 1656, improving timekeeping from errors of minutes a day to seconds. The rule holds only for small swings; wide pendulum arcs run slightly slow.

Timekeeping still runs on oscillators. A quartz watch contains a crystal tuning fork that vibrates at 32,768 times a second, two to the fifteenth power, so a chain of fifteen halving circuits reduces it to one tick per second. Every computer clock does the same at higher frequencies, and because no two crystals vibrate at exactly the same rate, computers drift apart and need correcting over the network, as described in [[Network Time Protocol]].

Real oscillators lose energy, and the rate matters. Light damping lets a bell ring for seconds; heavy damping stops a car's suspension after a single bounce. *Critical damping*, just enough to return to rest without overshoot, is the goal for door closers and measuring needles. Push an oscillator at its natural frequency and each push adds to the last, producing [[Resonance]].

Interface design borrows the physics directly. "Spring" animations are damped harmonic oscillators, defined by stiffness and damping rather than duration, which is why they feel physical and settle naturally when interrupted, an alternative to fixed [[Easing]] curves in [[Motion Design]].

## See also
- [[Atomic Clock]]
- [[Sound]]
- [[Doppler Effect]]
- [[Tide]]
- [[Verlet Integration]]
- [[Timbre]]
