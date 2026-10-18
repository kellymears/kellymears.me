---
aliases:
  - Row hammer
  - DRAM disturbance error
  - Cold boot attack
tags:
  - systems
summary: A hardware flaw in dense memory chips where rapidly reading one row of cells flips bits in neighboring rows, which attackers turned into a way to take over machines from ordinary software, even from a web page.
---
**Rowhammer** is a hardware flaw in modern memory chips: reading the same row of memory cells over and over, very rapidly, can flip bits in the physically neighboring rows. Software that never touches those neighbors can corrupt them anyway, breaking the basic assumption that memory holds what was written to it.

It follows from how memory is built. Each bit of DRAM is a tiny charge stored on a microscopic [[Capacitor]], which leaks and must be refreshed every 64 milliseconds. Cells are packed in rows, and each read activates a whole row. As chips grew denser, the rows crept close enough that repeatedly activating one disturbs the charge in its neighbors; see [[Moore's Law]]. Hammer a row hundreds of thousands of times between refreshes, and some neighboring cells lose enough charge to read wrong.

Researchers at Carnegie Mellon and Intel published the effect in 2014, finding it in most memory modules they tested. Within a year, Google's Project Zero showed it was an attack, not just a reliability problem:

- **Privilege escalation.** By filling memory with page tables, the structures that map a process's memory, and hammering nearby rows, an unprivileged program could flip a bit in its own page table to gain access to all physical memory and take full control; see [[Virtual Memory]] and [[Superuser]].
- **Sandbox escape.** Flipped bits broke out of a browser sandbox for native code.

Later work went further: hammering from [[JavaScript]] in a web page, from Android apps on phones, and over a fast network by targeting memory used for incoming packets.

Defenses have repeatedly fallen short:

- **Faster refresh.** Refreshing twice as often helps but costs power and performance, and doesn't fully stop it.
- **Target row refresh.** Memory makers added circuits to detect heavily hammered rows and refresh their neighbors. In 2020 researchers bypassed them by hammering many rows at once, overwhelming the tracking.
- **Error-correcting memory.** ECC corrects single flipped bits, but carefully chosen multi-bit flips can slip past it; see [[Error-Correcting Code]].
- **Software isolation.** Keeping sensitive data away from memory an attacker controls helps, but requires knowing the chip's physical layout.

Newer memory standards manage refresh better, but the physics worsens as cells shrink.

Rowhammer belongs to a family of attacks in which the hardware beneath an abstraction leaks or misbehaves; see [[Side-channel attack]]. A relative exploits the same capacitors from the other direction. In a **cold boot attack**, demonstrated at Princeton in 2008, memory chips cooled with spray dust keep their contents for minutes after power is cut, long enough to move them to another machine and read encryption keys still in memory; see [[Full-Disk Encryption]].

Its lesson is uncomfortable: type systems and proofs assume reliable hardware, and here that fails from below; see [[Memory Safety]].

## See also
- [[Cache Coherence]]
- [[Single-Event Upset]]
- [[Dynamic Random-Access Memory]]
