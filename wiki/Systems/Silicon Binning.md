---
aliases:
  - Binning
  - Product binning
  - Silicon lottery
  - Chip binning
tags:
  - systems
summary: Testing manufactured chips and sorting them into different products by how fast, efficient, and defect-free each one turns out to be.
---
**Silicon binning** is the practice of testing chips after manufacture and sorting them into product tiers ("bins") according to how each one actually performs. Every wafer comes out of the fab with variation. Transistors differ slightly in thickness, doping, and dimensions across the wafer and from wafer to wafer, so chips cut from the same design and the same production run differ in the frequency they can reach, the voltage they need, the power they leak, and whether every part of them works at all.

Rather than discard everything below the best, manufacturers sell the spread:

- **Speed bins.** Chips that hit the highest frequencies at acceptable voltage become the flagship model. Slower ones are sold under a lower model number with lower rated clocks.
- **Harvesting.** A chip with a defect in one core or one cache slice has that unit fused off and is sold as a model with fewer cores. Many lower-tier processors and graphics cards are the same die as the flagship with parts disabled. This is a large part of how large chips are economical at all, since defect probability rises with die area.
- **Power bins.** Chips that leak little current run efficiently at low voltage and suit laptops and servers. Leakier chips that tolerate high voltage may suit overclocked desktops.

Within one model, variation remains, which enthusiasts call the **silicon lottery**: two identical-looking processors may differ meaningfully in how far they will overclock or how far they can be [[Dynamic Voltage and Frequency Scaling|undervolted]]. Manufacturers store per-chip data, such as voltage and frequency tables, in fuses, and firmware reads it at boot.

The flip side is that a product's specifications describe its *bin*, not its physics. The flagship part is often running closest to its limits, with the least margin to absorb aging through [[Electromigration]] and related wear. Factory boost behavior that uses that margin aggressively makes the top bin fast on day one and more vulnerable later.

Binning is a general pattern beyond chips: LEDs are binned by [[Color Temperature]] and brightness so that bulbs in a box match, and memory modules are binned by stable timings. Wherever manufacturing variation is unavoidable, sorting and pricing by measured quality beats insisting on uniformity.

## See also
- [[Electromigration]]
- [[Computer Cooling]]
- [[Thermal Throttling]]
- [[Planned Obsolescence]]
- [[Survivorship Bias]]
- [[Motherboard]]
- [[Microcode]]
- [[Simultaneous Multithreading]]
- [[Hybrid CPU Architecture]]
- [[Dynamic Random-Access Memory]]
- [[Clock Signal]]
- [[PCI Express]]
