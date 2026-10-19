---
aliases:
  - Firmware update
  - Embedded firmware
  - Bricking
tags:
  - systems
summary: The software built into hardware itself, running every keyboard, drive, and charger below the operating system, hard to inspect, risky to update, and a favorite hiding place for persistent malware.
---
**Firmware** is software built into a hardware device, stored in memory that survives power loss, and run by the device itself. Almost every component of a computer has some: the keyboard, the drive's controller, the network card, the graphics card, the battery, the display, and the motherboard's own startup code; see [[Boot Process]]. Firmware sits below the operating system, which usually talks to it without seeing inside; see [[Kernel]].

The name reflects its place between hardware and software. Early firmware was burned into read-only memory at the factory and could never change. Later chips could be erased and rewritten, and today most firmware lives in flash memory and can be updated, which lets vendors fix bugs after a device ships. A [[Solid-State Drive]], for instance, runs a sophisticated program that decides where data physically goes, and a firmware bug can lose data. Processors take patches too, loaded early at each boot; see [[Microcode]].

Updating firmware carries a particular risk. If power fails partway through writing new firmware, the device may no longer start at all, leaving it **bricked**, as useful as a brick. Careful designs keep two copies, writing the update to the inactive one and switching over only after it checks out, with a fallback if the new copy fails to start; see [[Watchdog Timer]]. On Linux, the fwupd tool and a shared vendor service, running since 2015, deliver firmware updates the way a [[Package Manager]] delivers software.

Because firmware runs before and beneath the operating system, it's an attractive target. Malware there survives reinstalling the operating system and even replacing the drive, and antivirus software can't easily see it. The first such rootkit found in the wild, in 2018, wrote itself into the motherboard's startup firmware. Researchers have shown malicious firmware on hard drives, USB devices, and network cards. Defenses rely on accepting only updates signed by the vendor and measuring what ran at startup; see [[Code Signing]] and [[Trusted Platform Module]].

Much firmware is closed. Linux loads proprietary binary blobs into many devices at startup, and modern processors include separate management controllers running their own operating system, out of reach of the main one; see [[Real-Time Operating System]]. Open projects such as coreboot replace motherboard firmware with auditable code, but support only some hardware; see [[Supply Chain Security]].

Firmware also decides who controls a device after sale. Updates can remove features, lock out third-party parts, or end a product's life when servers shut down, and manufacturers have used firmware checks to block independent repairs; see [[Right to Repair]] and [[Planned Obsolescence]].

## See also
- [[Motherboard]]
- [[Over-the-Air Update]]
- [[Read-Only Memory]]
