---
aliases:
  - Capacitance
  - Supercapacitor
  - Farad
tags:
  - matter
summary: A component that stores energy in an electric field between two conductors, charging and discharging fast, used to smooth power, filter signals, time circuits, and hold bits.
---
A **capacitor** stores energy in an electric field between two conductors separated by an insulator. In the simplest form, two metal plates face each other across a thin gap. Connect a battery and electrons pile up on one plate and leave the other, until the voltage across the plates matches the battery's. Disconnect it and the charge stays, ready to be released.

**Capacitance**, measured in farads, is how much charge a capacitor holds per volt. It grows with plate area and shrinks with the gap, so practical capacitors roll long foil strips tightly or stack many thin layers, and fill the gap with materials that boost the field's storage. A farad is large; typical components range from picofarads to millifarads.

Capacitors differ from batteries in important ways:

- **Speed.** A capacitor charges and discharges almost instantly, delivering huge currents briefly. A [[Lithium-Ion Battery]] stores energy in chemical reactions, which are much slower.
- **Energy.** Batteries hold far more energy for their size. **Supercapacitors** narrow the gap, using porous carbon with enormous surface area, and appear where fast bursts and many cycles matter, such as regenerative braking and backup power.
- **Lifespan.** Capacitors survive millions of cycles; batteries wear out in thousands.
- **Voltage.** A capacitor's voltage falls steadily as it discharges, while a battery's stays fairly flat.

Uses follow from those properties:

- **Smoothing power.** Power supplies convert [[Alternating Current]] to steady direct current, and capacitors fill the dips between cycles. Every chip on a circuit board has small capacitors nearby to supply sudden demand.
- **Flash and bursts.** Camera flashes charge a capacitor slowly and dump it in a millisecond.
- **Filtering and timing.** Combined with a resistor, a capacitor charges at a predictable rate, which sets the timing of circuits; see [[Ohm's Law]]. Since it passes changing signals and blocks steady ones, it filters frequencies. With an inductor it forms a tuned circuit that oscillates at one frequency, a form of [[Resonance]] used to tune radios.
- **Memory.** Every bit of DRAM is a tiny capacitor, charged or not. It leaks, so memory must be refreshed thousands of times per second.
- **Sensing.** Touchscreens detect a finger by the change in capacitance it causes.

Capacitors hold charge even when a device is unplugged, which is why large ones in power supplies and televisions can give a dangerous shock long after disconnection. The everyday spark after shuffling across carpet is the same physics: your body acts as a small capacitor; see [[Electrostatic Discharge]].

Failing capacitors are common faults in electronics. Electrolytic types dry out with heat and age, and bulging capacitors were a notorious cause of motherboard failures in the early 2000s. In LED lights, undersized smoothing capacitors cause visible [[LED Flicker]].

## See also
- [[Motherboard]]
- [[Electromagnetic Induction]]
- [[Uninterruptible Power Supply]]
- [[Piezoelectric Effect]]
- [[Power Supply Unit]]
- [[Rowhammer]]
