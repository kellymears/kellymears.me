---
aliases:
  - Multi-boot
  - Boot manager
  - Dual-boot
tags:
  - systems
summary: Installing two or more operating systems on one computer and choosing between them at startup, a common way to keep Windows for some tasks and Linux for others, with recurring friction over bootloaders, clocks and shared disks.
---
A **dual-boot** computer has more than one operating system installed and lets the user pick one each time it starts. Only one runs at a time, with full access to the hardware. That's the main difference from running one system inside another with a virtual machine, which shares the hardware and pays some performance cost; see [[Hypervisor]].

People dual-boot to keep software that only runs on one system, such as games with anti-cheat software or professional applications, while doing everything else on another. It's also a low-risk way to try Linux without giving up a working setup; see [[Linux Distribution]].

Setting it up involves three pieces:

- **Disk space.** Each system needs its own partitions, created by shrinking an existing one or using a second drive. Using separate drives avoids most of the trouble below.
- **A boot manager.** Something must offer the choice at startup. On older BIOS machines, each operating system's installer wanted to overwrite the single master boot record, and installing Windows after Linux routinely erased the Linux menu. UEFI firmware improved this by giving each system its own entry in a shared boot partition, but updates can still reorder the entries or reset the default; see [[Boot Process]] and [[Firmware]].
- **Secure Boot.** Firmware that accepts only signed bootloaders must accept the second system's too. Major Linux distributions ship a small signed loader for this purpose, but custom kernels may need keys enrolled by hand; see [[Code Signing]].

Living with two systems brings smaller frictions:

- **The clock.** Linux keeps the hardware clock in UTC, while Windows traditionally stores local time, so switching systems can leave the time off by hours until one is changed to match the other; see [[Time Zone]].
- **Fast startup and hibernation.** Windows can shut down into a hibernated state by default, leaving its disk marked in use. Mounting that disk from Linux and writing to it risks corrupting data, so Linux often mounts it read-only; see [[Suspend and Hibernation]].
- **Shared files.** Each system reads the other's disk formats imperfectly, so people often keep a shared partition in a format both understand.
- **Encryption.** A system disk encrypted with a key held by the security chip may demand a recovery key after boot changes.

Multi-booting was once common among enthusiasts running several systems. Virtual machines, containers and compatibility layers that run Windows programs on Linux have made it less necessary; see [[API Translation Layer]]. It remains popular where full hardware access matters, especially for gaming and graphics work.

## See also
- [[Disk Image]]
