---
aliases:
  - Dennard scaling
  - Power wall
tags:
  - computation
summary: Gordon Moore's 1965 observation that the number of transistors on a chip doubles about every two years, which held for half a century, shaped the whole software industry, and has been slowing since the 2000s.
---
**Moore's law** is the observation that the number of transistors that can be placed on a chip doubles roughly every two years. Gordon Moore, later a cofounder of Intel, first noted the trend in a 1965 article, predicting a doubling every year; in 1975 he revised it to every two years. It isn't a law of nature but an industry trend, and for about fifty years it held with remarkable consistency.

The trend was partly self-fulfilling. Chipmakers, equipment suppliers, and software companies planned around it, and the industry's shared roadmap set targets based on it, so meeting it became the goal; see [[Self-Fulfilling Prophecy]]. Shrinking transistors required ever more precise manufacturing, and the cost of a chip factory rose to tens of billions of dollars; see [[Semiconductor]].

For decades, smaller transistors brought a second gift, described by Robert Dennard in 1974. **Dennard scaling** said that as transistors shrink, their voltage and current shrink too, so power per unit area stays constant. Each generation could run faster without getting hotter. Clock speeds climbed from a few megahertz to several gigahertz, and existing programs simply ran faster on new hardware.

Dennard scaling ended around 2005. At very small sizes, transistors leak current even when switched off, and voltages couldn't drop further. Faster clocks would have melted chips, a limit called the **power wall**; see [[Thermal Throttling]]. Manufacturers turned the extra transistors into multiple processor cores instead. Programs no longer got faster for free; they had to be rewritten to use cores in parallel, and the gains are capped by whatever part remains serial; see [[Concurrency and Parallelism]] and [[Amdahl's Law]].

Other limits appeared. Memory speed improved far more slowly than processor speed, so processors spend much of their time waiting for data; caches and careful data layout became essential; see [[Locality of Reference]] and [[Von Neumann Architecture]]. Processors added elaborate tricks to stay busy, some of which later proved to be security holes; see [[Speculative Execution]].

Since the 2010s, the doubling has slowed. Transistors are now only tens of atoms across in places, and each generation is harder and costlier. Progress continues through 3D stacking, combining separate chiplets, and specialized processors that do one kind of work very efficiently, such as graphics and neural network math; see [[Graphics Processing Unit]].

Cheap computation shaped software culture. Wirth's law, the quip that software gets slower faster than hardware gets faster, describes programs expanding to use whatever resources appear; see [[Jevons Paradox]]. Rapid improvement also made devices obsolete quickly; see [[Planned Obsolescence]].

Machine learning's [[Scaling Laws]] describe a different exponential, in training compute, that has outpaced Moore's law.

## See also
- [[Quantum Computing]]
- [[Deep Blue]]
- [[Hard Disk Drive]]
