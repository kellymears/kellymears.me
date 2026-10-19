---
aliases:
  - Devicetree
  - Device tree blob
  - Open Firmware
tags:
  - systems
summary: A data file that tells an operating system what hardware a board has and where it lives, used on ARM and embedded systems whose devices can't announce themselves, so one kernel can boot on many boards.
---
A **device tree** is a data structure that describes a computer's hardware to its operating system: which processors, memory, buses, and peripherals exist, what addresses they occupy, and which interrupts they use. It exists because much hardware can't describe itself. A kernel booting on a small ARM board has no way to ask what's attached to which pins, so someone has to tell it.

Desktop PCs mostly avoid the problem. Devices on PCI Express announce themselves when the system probes the bus, and firmware tables in a standard called ACPI describe the rest; see [[PCI Express]] and [[Suspend and Hibernation]]. Embedded devices are different. Their chips are wired to fixed addresses that only the board designer knows.

The idea comes from **Open Firmware**, a boot firmware standard from the late 1980s and early 1990s used on Sun workstations and PowerPC Macs, which built a tree of device nodes and handed it to the operating system; see [[Firmware]]. Linux adopted a flattened version of that tree for PowerPC in the mid-2000s.

ARM is where it became essential. Before device trees, the Linux kernel carried a separate C file for each ARM board, describing its hardware in code. Thousands of boards meant thousands of near-duplicate files and a constant flood of changes. In 2011 Linus Torvalds publicly complained about the churn, and the ARM community moved board descriptions out of the kernel and into device trees. A single kernel binary could then boot many different boards; see [[Kernel]].

A device tree is written in a readable source format and compiled into a compact binary, the **device tree blob**. The bootloader loads the blob into memory and passes its address to the kernel at startup; see [[Boot Process]]. Each node in the tree describes one device and carries a compatible string naming what it is, and the kernel matches those strings against its drivers. Properties give register addresses, clock rates, interrupt lines, and the connections between devices; see [[Interrupt]].

Some design choices follow from the format:

- **Data, not code.** The tree describes hardware; drivers decide what to do with it.
- **Overlays.** Small patch trees can be applied on top of a base tree at boot, so a hobbyist board can describe an add-on module without rebuilding everything; see [[Internet of Things]].
- **Stability expectations.** In principle a device tree is an interface that shouldn't break between kernel versions, though in practice old trees and new kernels sometimes disagree; see [[Application Binary Interface]].

Once the kernel knows about a device, it creates the corresponding entries that programs use to reach it; see [[Device File]]. Hardware that does announce itself, such as a keyboard plugged into a port, still goes through normal discovery; see [[Universal Serial Bus]].

## See also
- [[Instruction Set Architecture]]
- [[Serial Port]]
- [[Microcontroller]]
- [[Read-Only Memory]]
- [[Motherboard]]
