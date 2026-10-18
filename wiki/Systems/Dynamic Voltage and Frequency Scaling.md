---
aliases:
  - DVFS
  - Undervolting
  - CPU frequency scaling
  - CPU governor
  - P-states
  - Voltage-frequency curve
  - Race to idle
tags:
  - systems
summary: Adjusting a processor's voltage and clock speed on the fly to match the work, exploiting the fact that power rises with the square of voltage.
---
**Dynamic voltage and frequency scaling (DVFS)** adjusts a processor's supply voltage and clock frequency continuously to match demand: fast and power-hungry when there is work, slow and frugal when there isn't. Nearly every modern CPU, GPU, and phone chip does this many times a second.

It works because of how chips consume power. The switching ("dynamic") power of a CMOS circuit is roughly proportional to capacitance times **voltage squared** times frequency. Higher frequencies need higher voltage to switch reliably, so voltage and frequency move together along a **voltage-frequency curve**. Near the top of that curve, each small gain in speed costs a large rise in power and heat. The last 10% of clock speed can cost 30% or more of power. Running slightly slower at slightly lower voltage is enormously more efficient, which is why laptops and phones spend most of their time far below peak.

Each operating point is a *performance state* (P-state). The operating system's frequency **governor** chooses among them: from scheduler load (the Linux `schedutil` governor reads utilization directly from the [[CPU Scheduler]]), from fixed policies (performance, powersave), or by handing the decision to the hardware, which increasingly makes the choice itself. *Race to idle* is the counterintuitive strategy of finishing work at high speed and then dropping into deep sleep states, which can use less energy overall than working slowly, because a sleeping chip uses almost nothing.

**Undervolting** shifts the curve down: the same frequency at less voltage. Every chip ships with a safety margin, since [[Silicon Binning]] sets a curve that works for the worst chip in the bin, and many individual chips are stable with less. Done carefully, undervolting cuts heat and power substantially, reduces [[Thermal Throttling]], and slows wear such as [[Electromigration]]. Done carelessly, it produces rare errors that look like software bugs. *Frequency caps* are the blunter variant: limiting peak boost clocks keeps the chip off the steepest, highest-voltage part of the curve.

DVFS can also be a source of instability. A chip that needs more voltage than the firmware supplies at some point on the curve fails only when the load lands on that point, so it can crash under light loads and pass every stress test. That is the [[Heisenbug]] pattern produced by hardware.

## See also
- [[Hybrid CPU Architecture]]
- [[Electromigration]]
- [[Silicon Binning]]
- [[CPU Scheduler]]
- [[CPU Affinity]]
- [[Heisenbug]]
- [[Performance Budget]]
- [[Ohm's Law]]
- [[Microcode]]
- [[Suspend and Hibernation]]
