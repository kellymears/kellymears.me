---
aliases:
  - PCIe
  - Expansion card
  - Peripheral Component Interconnect
tags:
  - systems
summary: The high-speed serial connection that links a computer's processor to graphics cards, fast storage, and network adapters, built from bundles of lanes and roughly doubling in speed with each generation since 2003.
---
**PCI Express**, usually written PCIe, is the main connection between a computer's processor and its fast peripherals: graphics cards, solid-state drives, and network adapters. It's maintained by an industry group, the PCI-SIG, and the first version was published in 2003.

It replaced two older buses. **PCI**, introduced by Intel in the early 1990s, was a parallel bus: many wires carried bits side by side, and every card on the bus shared the same wires and took turns. Graphics cards outgrew it, and for a while had their own slot, AGP. Parallel buses hit a limit as speeds rose, because keeping dozens of signals arriving at the same instant becomes very hard; see [[Clock Signal]].

PCI Express changed the design in two ways:

- **Serial lanes.** Each lane is a pair of one-way connections, one in each direction, sending bits one at a time at very high rates. The clock is embedded in the data stream instead of carried separately; see [[Serial Port]].
- **Point to point.** Each device gets its own link to a switch or the processor instead of sharing a bus, so devices don't take turns.

Links bundle lanes in widths written as x1, x4, x8, or x16. A graphics card typically uses x16, a fast drive x4, and a network card x1 or x4. Smaller cards fit in larger slots, and links negotiate down to whatever both ends support.

Each generation has roughly doubled the speed per lane while staying backward compatible, so an old card works in a new slot and the reverse; see [[Backward Compatibility]]. Later generations changed how data is encoded on the wire to keep doubling without simply raising the frequency.

Devices on PCI Express announce themselves. At startup, firmware and the operating system walk the bus, read each device's identification, and assign it address ranges, which is why desktop hardware rarely needs the hand-written descriptions embedded boards use; see [[Device Tree]] and [[Boot Process]].

Devices read and write memory directly instead of passing every byte through the processor, and signal completion with interrupts; see [[Direct memory access]]. Hypervisors can hand a whole PCI Express device to a virtual machine, letting a guest use a graphics card at nearly native speed; see [[Hypervisor]].

The interface has spread beyond slots. M.2 drives speak PCI Express through a small connector, through a protocol called NVMe designed for flash storage; see [[Solid-State Drive]]. Thunderbolt and later USB versions tunnel it over a cable, which makes external graphics enclosures possible; see [[Universal Serial Bus]].

Bandwidth is shared out by the processor. A desktop chip has a fixed number of lanes, and the motherboard decides how to split them, so filling every slot can slow some of them; see [[Bandwidth]] and [[Graphics Processing Unit]].

## See also
- [[Memory Hierarchy]]
- [[Firmware]]
