---
aliases:
  - Virtual machine monitor
  - VMM
tags:
  - systems
summary: The layer that lets multiple guest operating systems share one machine's hardware, each believing it owns the machine.
---
A **hypervisor** is the software layer that runs one or more guest operating systems on shared physical hardware, giving each guest the illusion that it has the whole machine to itself. It's the technology virtual machines are built on, and it operates one level below where [[Containerization|containers]] do: a container shares its host's kernel and is isolated by namespaces and cgroups, while a virtual machine gets its own complete kernel, isolated by the hypervisor emulating or mediating access to the hardware itself.

Hypervisors split into two types. A **type 1** (bare-metal) hypervisor — Xen, VMware ESXi, or KVM, which turns the Linux kernel itself into the hypervisor — runs at the hardware's own privilege level rather than as an application, which is the design nearly every cloud provider uses for the VMs they sell, since it minimizes the overhead between guest and hardware. A **type 2** (hosted) hypervisor — VirtualBox, the consumer edition of VMware — runs as an application on top of an ordinary host OS, trading some performance for the convenience of installing it like any other program on a laptop.

The isolation a hypervisor provides is stronger than a container's, because each guest has its own kernel — a kernel bug that would let one container escape to see another container's processes has a much narrower equivalent for VMs — escape requires a bug in the hypervisor or its device emulation (they exist: VENOM, various Xen advisories), a far smaller attack surface than a whole kernel's syscall interface. That stronger isolation costs more: a VM boots its own kernel and duplicates memory a container would have shared with the host, which is why a single physical machine typically runs far more containers than VMs at the same resource budget.

## See also
- [[Containerization]]
- [[Linux Namespaces]]
- [[Control Groups]]
- [[Chroot]]
