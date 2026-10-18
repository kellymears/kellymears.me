---
aliases:
  - Black's equation
  - Silicon degradation
  - Chip aging
  - Bias temperature instability
  - Hot carrier injection
tags:
  - matter
summary: The gradual displacement of metal atoms in a chip's wiring by the flow of electrons, one of several wear mechanisms that make processors age faster at high voltage and temperature.
---
**Electromigration** is the slow movement of metal atoms in a conductor caused by the current flowing through it. Electrons carry momentum, and at the extreme current densities found in a chip's microscopic interconnects, the "electron wind" knocks metal atoms along with the flow. Over time atoms pile up downstream into *hillocks* that can short to neighboring wires, and leave *voids* upstream that thin and eventually open the line. The circuit does not fail all at once. It slows, becomes marginal, and then breaks.

James Black's 1969 empirical equation describes the median time to failure. It falls steeply with current density, roughly with its square, and exponentially with temperature. That relationship is why chip designers specify maximum currents per wire, why copper replaced aluminum interconnects in the late 1990s (copper resists electromigration far better), and why running a chip hotter or at higher current shortens its life faster than intuition suggests.

Electromigration is one of several silicon wear mechanisms, all accelerated by voltage and heat:

- **Bias temperature instability** shifts transistor threshold voltages over time under sustained voltage and heat, so transistors switch more slowly.
- **Hot carrier injection** traps high-energy charge carriers in the gate insulator, with a similar effect.
- **Time-dependent dielectric breakdown** gradually degrades the ultra-thin gate oxide until it conducts.

All of these show up the same way at the system level. A part needs **more voltage to stay stable at the same frequency** (its minimum operating voltage, Vmin, rises), and if the voltage doesn't rise with it, the chip begins making errors. That is a degraded processor: occasional crashes, invalid-instruction faults on valid code, failures that appear only under certain loads. Stress tests often miss it. Intel's 13th and 14th generation desktop processors became a public case in 2024, when the company traced widespread instability to firmware requesting excessive voltage, which accelerated exactly this kind of degradation.

The defenses are conservative operating points: lower voltage via [[Dynamic Voltage and Frequency Scaling|undervolting]] or frequency caps, lower temperatures, and firmware that doesn't push boost voltages to the edge. [[Silicon Binning]] decides how much margin a given part starts with. Wear spends it.

## See also
- [[Dynamic Voltage and Frequency Scaling]]
- [[Silicon Binning]]
- [[Thermal Throttling]]
- [[Thermal Expansion]]
- [[Planned Obsolescence]]
- [[Memory Leak]]
- [[Ohm's Law]]
- [[Microcode]]
- [[Oxidation]]
- [[Material Fatigue]]
- [[Semiconductor]]
- [[Electrostatic Discharge]]
- [[Diffusion]]
