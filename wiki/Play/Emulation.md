---
aliases:
  - Emulator
  - HLE
  - LLE
tags:
  - play
summary: Software reimplementation of console hardware, and the fault line between preserving a game and possessing it legally.
---
**Emulation** is a software reimplementation of a console's hardware, letting its games run on a machine that was never built to run them.

Two approaches trade accuracy for speed. **High-level emulation (HLE)** reimplements what the console's system calls do, skipping the hardware itself — faster, and forgiving of the small [[Determinism]] gaps that produce visible glitches on exact timing-dependent games. **Low-level emulation (LLE)** simulates the actual chips, cycle by cycle, including the console's own boot ROM and signature checks — the same verification problem [[Code Signing]] solves on a modern operating system — and is closer to bit-perfect but far more demanding to run.

The legal position is narrower than the folklore around it. US case law establishes that the intermediate copying done while reverse engineering a console is fair use: *Sony v. Connectix* (203 F.3d 596, 9th Cir. 2000) held so even though Connectix's engineers disassembled Sony's BIOS and worked from it, because the shipped emulator contained none of that code — broader and different from the clean-room doctrine usually invoked in its place, and one decision of one circuit, never tested at the Supreme Court. *Sony v. Bleem* (214 F.3d 1022, 9th Cir. 2000), habitually cited alongside it, decided only that screenshots of console games could be used in comparative advertising; the court said the emulator's own legality was not at issue.

Distributing a console's BIOS or decryption keys, by contrast, is settled infringement — leverage rights holders apply even against projects that ship neither. What stays open is the circumvention boundary: Nintendo's 2024 suit against the Switch emulator Yuzu ended in settlement rather than a ruling, closing the project while setting no precedent and leaving that line drawn by litigation risk rather than a rule, much as it is for [[Game Modding]].

Emulation is also the practical route for [[Game Preservation]]: it is how a console generation keeps running once the hardware fails, provided the ROM images feeding it are checked against a known-good [[Hash Function]] rather than trusted on sight, and it underwrites both community [[Datamining]] and the frame-perfect replay [[Speedrun]] tool-assisted runs depend on.

## See also
- [[Game Preservation]]
- [[Determinism]]
- [[Datamining]]
- [[Game Modding]]
- [[Right to Repair]]
