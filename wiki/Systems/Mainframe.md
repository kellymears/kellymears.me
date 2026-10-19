---
aliases:
  - Mainframe computer
  - IBM System/360
tags:
  - systems
summary: Large central computers built for throughput and reliability, defined since 1964 by IBM's System/360 family, whose programs still run on today's machines and still process much of the world's banking and booking.
---
**A mainframe** is a large central computer built for throughput, reliability, and long life rather than raw speed. The name comes from the main cabinet that held the processor in early installations, surrounded by separate cabinets for tape drives, disks, and printers. Mainframes still process a large share of bank transactions, card payments, insurance claims, and airline bookings.

The defining machine is IBM's **System/360**, announced in April 1964. Before it, each IBM computer had its own instruction set, so moving to a bigger machine meant rewriting software. The 360 was a family of machines, from small to large, sharing one instruction set, so programs could move up without change. It separated an architecture, the contract software sees, from its implementations, the hardware beneath; see [[Instruction Set Architecture]]. Cheaper models carried out the same instructions in microcode rather than dedicated circuitry; see [[Microcode]]. The 360 also made the 8-bit byte standard, though it used IBM's own EBCDIC character code rather than ASCII, which complicates data exchange to this day; see [[Character Encoding]].

The project nearly broke IBM. Fred Brooks managed it and, after the struggles of its operating system, wrote The Mythical Man-Month, the source of the observation that adding people to a late project makes it later; see [[Brooks's Law]] and [[Second-System Effect]].

The compatibility promise has held. Current IBM Z machines still run many programs compiled for the 360 in the 1960s, a commitment few platforms have matched; see [[Backward Compatibility]].

Mainframes are built differently from servers:

- **Input and output.** Dedicated channel processors move data between storage and memory, freeing the main processors for application work, so a mainframe can sustain enormous transaction rates; see [[Interrupt]].
- **Reliability.** Spare processors, checked computation, and parts replaceable while running aim at years without unplanned downtime.
- **Virtualization.** IBM's CP-67 and VM systems in the late 1960s ran many virtual machines on one computer, decades before the idea became common on servers; see [[Hypervisor]].
- **Workloads.** Overnight batch jobs process accumulated records, and transaction systems answer terminals in real time; see [[Time-Sharing]] and [[Batch processing]].

Much of that software is in COBOL, written decades ago by people now retired. In 2020, when unemployment claims surged early in the pandemic, several US states struggled to change benefits systems running on mainframes, and New Jersey's governor publicly asked for COBOL volunteers; see [[Legacy code]].

Replacing a mainframe is notoriously risky. The software encodes decades of business rules that nobody fully remembers, and migration projects regularly run over budget or are abandoned, while the old system keeps running beside them; see [[Big Rewrite]] and [[Chesterton's Fence]].

## See also
- [[Magnetic Tape]]
- [[Fixed-Width File]]
