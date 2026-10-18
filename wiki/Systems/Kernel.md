---
aliases:
  - Operating system kernel
  - Linux kernel
  - Monolithic kernel
  - Microkernel
  - Kernel module
  - Device driver
tags:
  - systems
summary: The core of an operating system that runs with full hardware privileges, managing processes, memory, devices, and files on behalf of every other program.
---
The **kernel** is the core of an operating system. It runs with full control of the hardware and manages everything that programs share: processor time, memory, storage, network interfaces, and devices. Everything else, from the shell to the desktop to a web browser, runs as an ordinary [[Process]] that must ask the kernel for anything privileged, through a [[System Call]].

Its main jobs:

- **Process management.** Creating and ending processes, and deciding which runs on which core and when, the work of the [[CPU Scheduler]].
- **Memory management.** Giving each process its own address space through [[Virtual Memory]], moving pages to swap under pressure, and keeping recently read file data in the [[Page Cache]].
- **Files and storage.** Implementing file systems that turn blocks on a disk into files and directories, with permissions and metadata tracked in structures such as the [[Inode]].
- **Devices.** *Device drivers* translate generic requests into the specific commands each piece of hardware understands. Drivers make up the majority of the Linux source code.
- **Networking.** Running the protocol stack that turns packets into connections, such as [[TCP and UDP]].
- **Isolation and limits.** Enforcing [[File Permissions]] and providing the [[Linux Namespaces]] and [[Control Groups]] that containers are built from.

Kernel designs differ in how much runs with full privilege. A **monolithic kernel**, like Linux and the BSDs, puts drivers, file systems, and networking in kernel space together. That is fast, since components call each other directly, but a bug in any driver can crash the whole system. A **microkernel** keeps only the essentials, such as scheduling, memory, and message passing, in the kernel and runs everything else as separate processes. That is more robust, since a crashed driver can be restarted, but messages between components add overhead. The trade-off was famously argued in 1992 between Andrew Tanenbaum, author of the MINIX microkernel, and Linus Torvalds. Windows and macOS use *hybrid* designs that sit between the two.

Linux began in 1991 as Torvalds's hobby project and now runs on most servers, all Android phones, and the vast majority of supercomputers. *Loadable kernel modules* let drivers and features be added to a running kernel without rebuilding it.

Because the kernel controls everything, its bugs are severe. A crash brings down the whole machine, and a security flaw can give an attacker complete control. Kernel code is held to strict review, and recent Linux versions accept drivers written in Rust to reduce memory-safety bugs. Systems also stack further boundaries: a [[Hypervisor]] runs several kernels on one machine, each believing it owns the hardware.

The kernel starts first at boot, hands control to the [[Init System]] as process 1, and remains underneath every other program for as long as the machine runs.

## See also
- [[Email Patch Workflow]]
- [[Kernel Panic]]
- [[eBPF]]
