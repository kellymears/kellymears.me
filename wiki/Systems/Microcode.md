---
aliases:
  - CPU microcode
  - Microcode update
  - Micro-operations
  - CPU errata
tags:
  - systems
summary: The updatable firmware inside a processor that controls how it executes instructions, how operating systems load patches into it at every boot, and the hardware bugs it has been used to fix.
---
**Microcode** is a layer of low-level code inside a processor that controls how it carries out machine instructions. Many instructions, especially complex ones in the x86 instruction set, are not executed directly by circuits. The CPU translates them into simpler internal steps called micro-operations, and microcode defines those translations for the complicated cases, along with many internal control functions such as power and voltage management.

The idea dates to Maurice Wilkes in 1951 and became widespread with IBM's System/360 in 1964, which used microcode to run the same instruction set on machines of very different internal designs. Modern CPUs decode common instructions in hardware for speed and fall back to microcode for rare or complex ones.

The important modern property is that microcode can be **updated**. Since the Pentium Pro in 1995, Intel processors have accepted patches that replace parts of the built-in microcode, and AMD's do too. It followed the 1994 Pentium division bug: a flaw in a lookup table that could not be fixed after manufacture and cost Intel about $475 million in replacements, as described under [[Floating-Point Arithmetic]].

Updates are temporary. The patch lives in the processor's internal memory and disappears at power-off, so it must be loaded at every boot. It can arrive two ways:

- **From firmware.** A BIOS or UEFI update bundles new microcode and applies it during the [[Boot Process]].
- **From the operating system.** Linux loads microcode very early, from a small image placed in front of the initramfs, using packages such as `intel-ucode` and `amd-ucode`. Windows ships updates through Windows Update. This lets fixes reach machines whose manufacturers no longer release firmware.

Updates are signed and encrypted by the vendor, so they cannot be inspected or replaced freely, a form of [[Code Signing]] at the hardware level.

Microcode has become the main way hardware flaws get patched:

- **Speculative execution attacks.** Spectre and Meltdown in 2018 showed that performance tricks could leak data across security boundaries. Microcode updates added controls that operating systems use to block some variants.
- **Later vulnerabilities.** Downfall on Intel and Zenbleed on AMD, both in 2023, were mitigated largely by microcode.
- **Instability.** In 2024, Intel traced crashes on 13th and 14th generation desktop processors to microcode requesting excessive voltage, which over time caused permanent degradation, an effect related to [[Electromigration]]. A series of updates limited the voltage, though they could not reverse damage already done.

Microcode sits in an awkward position for trust. It runs below the [[Kernel]] and [[Hypervisor]], it is opaque, and its updates can change performance or behavior silently. A benchmark from before and after a microcode update can differ, which matters for [[Benchmarking]] and for reasoning about [[Determinism]] across machines.

## See also
- [[Boot Process]]
- [[Thermal Throttling]]
- [[Silicon Binning]]
- [[Dynamic Voltage and Frequency Scaling]]
