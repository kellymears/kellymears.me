---
aliases:
  - Clock rate
  - Clock speed
  - Overclocking
  - Gigahertz
tags:
  - systems
summary: The steady pulse that keeps a processor's circuits in step, measured in gigahertz, whose rise drove computer speed for decades until heat stopped it near four gigahertz in the mid-2000s.
---
A **clock signal** is a steady electrical pulse that keeps the circuits of a processor in step. On each tick, values move from one stage of logic to the next and are latched into place, so every part of the chip agrees on when a result is ready. The **clock rate** counts ticks per second, measured in gigahertz, billions of ticks a second. At 3 gigahertz one tick lasts a third of a nanosecond, in which light travels about ten centimeters.

The pulse starts with a quartz crystal oscillator, which vibrates at a precise frequency; see [[Crystal oscillator]]. Circuits on the chip multiply that frequency up to the gigahertz range, and a distribution network carries it to every part of the chip. Arrival times must match closely, or one region acts before another's inputs are ready.

For decades clock speed was the headline number for computer performance. It rose from about 5 megahertz in the first IBM PC of 1981 to over 3 gigahertz by the early 2000s, as smaller transistors switched faster and used less power each; see [[Moore's Law]]. Deeper pipelines, splitting each instruction into shorter steps, allowed faster clocks still; see [[Instruction Pipelining]].

Then it stopped. A chip's power use rises with its clock rate and with the square of its voltage, and faster clocks generally need higher voltage. Around 2004 the heat became impossible to remove at reasonable cost, and Dennard scaling, the trend that had kept power density constant as transistors shrank, broke down; see [[Heat Transfer]]. Intel cancelled planned faster designs and turned to putting several cores on one chip. Consumer processors have hovered near 3 to 6 gigahertz since, and gains come from doing more per tick and from parallelism; see [[Concurrency and Parallelism]].

Clock speed was never the whole story. A processor that completes more instructions per tick can beat one with a faster clock, which Apple pressed in a 2001 campaign against the "megahertz myth."

Modern chips vary their clock constantly:

- **Frequency scaling.** Clocks and voltages drop when there is little to do and rise under load, saving power; see [[Dynamic Voltage and Frequency Scaling]].
- **Boost.** Cores briefly run above their rated speed while temperature and power allow, then fall back; see [[Thermal Throttling]].
- **Gating.** Idle parts of the chip have their clock switched off entirely.

**Overclocking** runs a chip faster than its rated speed, usually with extra voltage and cooling. Chips from the same production line vary, and manufacturers sort them by the speed each sustains, so some have headroom and others none; see [[Silicon Binning]]. Pushing too far causes crashes and silent errors.

Timekeeping uses separate, slower clocks, since the processor clock changes speed constantly; see [[Real-Time Clock]] and [[Monotonic Clock]].

## See also
- [[Hybrid CPU Architecture]]
- [[Dynamic Random-Access Memory]]
