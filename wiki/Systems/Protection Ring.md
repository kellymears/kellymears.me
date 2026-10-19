---
aliases:
  - Kernel mode
  - User mode
  - Ring 0
tags:
  - systems
summary: The hardware privilege levels that separate the operating system kernel from ordinary programs, so that an application can't touch devices, other programs' memory or the processor's control settings without asking the kernel first.
---
A processor doesn't trust all code equally. **Protection rings** are hardware privilege levels: code running at the most privileged level can do anything, while code at a less privileged level is barred from certain instructions and memory. The arrangement lets an operating system stay in control even when the programs it runs are buggy or hostile; see [[Kernel]].

The idea dates to Multics in the 1960s, which used eight concentric rings, from the most trusted core outward. Intel's x86 processors provide four, numbered 0 to 3, but almost every operating system uses only two: **ring 0**, or **kernel mode**, for the kernel and its drivers, and **ring 3**, or **user mode**, for everything else. ARM processors use similar levels called exception levels; see [[Instruction Set Architecture]].

In user mode, a program can compute freely within its own memory but can't:

- Talk to hardware directly, such as disks, network cards or the timer.
- Change the page tables that define what memory it can see; see [[Virtual Memory]].
- Disable interrupts, halt the processor or alter the settings that control privilege itself; see [[Interrupt]].

If it tries, the processor raises a fault and the kernel takes over, usually ending the program. To get anything done outside its own memory, such as reading a file, a program makes a **system call**, a controlled jump into kernel mode at an entry point the kernel chose; see [[System Call]]. The kernel checks the request, does the work and returns. Each crossing costs time, which is why high-performance software batches requests or avoids copying data back and forth; see [[Zero-Copy]].

The boundary is only as strong as what runs on the privileged side. A bug in a driver crashes the whole machine rather than one program; see [[Kernel Panic]]. Malware that reaches ring 0 can hide from the rest of the system; see [[Rootkit]]. And hardware flaws can leak across the line: Meltdown, disclosed in 2018, let user programs read kernel memory by exploiting speculative execution, and the fixes made system calls noticeably more expensive; see [[Speculative Execution]].

The rings have grown in both directions. Virtualization added a level below ring 0, sometimes called ring −1, so a hypervisor can run several kernels that each believe they own the machine; see [[Hypervisor]]. Below that sit firmware modes such as System Management Mode, invisible to the operating system, and separate security processors inside modern chips; see [[Firmware]] and [[Microcode]].

Some systems push work out of the kernel to shrink what must be trusted. Microkernels run drivers and filesystems as user-mode processes, and eBPF lets user-supplied programs run inside the kernel only after a verifier proves they're safe; see [[eBPF]].

## See also
- [[Superuser]]
- [[Memory Safety]]
