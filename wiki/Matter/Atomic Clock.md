---
aliases:
  - Caesium clock
  - Optical clock
  - International Atomic Time
tags:
  - matter
summary: A clock that counts the frequency of light or microwaves absorbed by atoms in a particular transition, which has defined the second since 1967 and underpins GPS, telecom networks, and the world's time scale.
---
An **atomic clock** keeps time by counting the oscillations of radiation that atoms absorb or emit when they jump between two energy states. Every atom of a given isotope has the same energy levels, so a transition's frequency is identical everywhere, unaffected by wear or manufacturing. A clock tuned to it is limited mainly by how well it can isolate its atoms and measure them; see [[Spectroscopy]].

Every clock counts something that repeats: a pendulum swinging, a quartz crystal vibrating; see [[Simple Harmonic Motion]] and [[Piezoelectric Effect]]. A quartz watch drifts because each crystal's frequency varies with its cut and temperature. An atomic clock instead tunes a microwave or laser source until the atoms respond most strongly, a form of [[Resonance]], and counts the cycles of that source.

The first practical caesium clock was built by Louis Essen and Jack Parry at the UK's National Physical Laboratory in 1955. In 1967 the second itself was redefined as exactly 9,192,631,770 cycles of the radiation from a particular transition in caesium-133 atoms, replacing a definition based on Earth's orbit. Kinds in use today:

- **Caesium clocks and caesium fountains**, the primary standards that realize the second. Fountains toss laser-cooled atoms upward and measure them as they fall back; see [[Laser]].
- **Rubidium clocks**, cheaper and smaller, used in cell towers and satellites.
- **Optical clocks**, which use atoms such as strontium or ytterbium probed by lasers at frequencies tens of thousands of times higher than caesium's. More ticks per second allow finer measurement, and the best would drift by less than a second over the age of the universe. They are expected to replace caesium in a future definition of the second.

International Atomic Time is a weighted average of hundreds of clocks in laboratories worldwide. Civil time, Coordinated Universal Time, follows it but has occasionally inserted a leap second to stay close to Earth's slightly irregular rotation. In 2022 the world's metrology body voted to stop adding leap seconds by 2035, because they break software; see [[Network Time Protocol]] and [[Unix Time]].

Navigation depends on these clocks. Each satellite of the [[Global Positioning System]] carries atomic clocks, and a receiver computes its position from tiny differences in signal timing, so an error of a billionth of a second means about thirty centimeters of error. The satellites' clocks must also be corrected for relativity, which makes them gain about 38 microseconds a day relative to the ground; see [[Time Dilation]].

Optical clocks are now precise enough that raising one by a fraction of a meter measurably speeds it up, as relativity predicts; see [[Gravity]]. Some distributed databases use atomic clocks and GPS receivers to bound clock uncertainty when ordering transactions; see [[Distributed SQL]] and [[Logical Clock]].

## See also
- [[Time Zone]]
- [[Electromagnetic Spectrum]]
- [[Neutron Star]]
