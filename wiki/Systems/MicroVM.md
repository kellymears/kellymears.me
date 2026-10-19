---
aliases:
  - Micro virtual machine
  - Firecracker
  - gVisor
  - Kata Containers
tags:
  - systems
summary: A stripped-down virtual machine that boots in a fraction of a second with almost no overhead, giving containers and serverless functions the stronger isolation of a separate kernel at nearly container speed.
---
A **microVM** is a virtual machine stripped to the minimum, so it starts in a fraction of a second and costs only a few megabytes of overhead. It aims to combine the strong isolation of a virtual machine with the speed and density of a container.

The trade-off it addresses is old. Containers are fast and light because every container on a machine shares the host's kernel; see [[Containerization]]. That sharing is also their weakness: the kernel is a huge [[Attack surface]], and one exploitable bug in it lets code break out of its container into everyone else's. Traditional virtual machines give each guest its own kernel, separated by a [[Hypervisor]], but they emulate a whole PC, with BIOS, buses, and dozens of devices, and take seconds to boot and hundreds of megabytes to run.

Amazon's **Firecracker**, open-sourced in 2018, became the reference design. It was built to run AWS Lambda, where code from many customers shares the same hardware; see [[Serverless Computing]] and [[Multi-Tenancy]]. Its choices:

- **Minimal devices.** Only a network card, a disk, a serial console, and a keyboard controller used to signal shutdown. No graphics, no USB, no emulated legacy hardware.
- **Fast boot.** The guest kernel starts directly, skipping firmware, and reaches user code in about 125 milliseconds; see [[Boot Process]].
- **Small footprint.** Under five megabytes of overhead per VM, so thousands fit on one server.
- **Layered defense.** The virtual machine monitor is written in Rust to avoid whole classes of memory bugs, and each one is itself confined by [[Seccomp]] filters and [[Linux Namespaces]], so escaping the guest still leaves an attacker in a cage; see [[Memory Safety]].

Starting from a saved memory snapshot instead of booting at all cuts startup further, and snapshot memory can be shared copy-on-write across many VMs; see [[Copy-on-Write]].

Neighbors in the same design space:

- **gVisor**, from Google, takes a different route: it intercepts a container's system calls and services them in a user-space kernel written in Go, so the host kernel sees only a small, filtered set of calls; see [[System Call]].
- **Kata Containers** runs each ordinary container image inside its own lightweight VM, so existing container tooling gets VM isolation without changes.
- **Unikernels** compile one application together with just the operating-system pieces it needs into a single image that runs directly on a hypervisor.

The workloads that drove microVMs share a profile: untrusted code, many tenants, short lives, and a need to start on demand, where a cold start of seconds would be unacceptable. The same profile fits continuous integration runners and sandboxes for executing code written by AI agents; see [[Agent Sandbox]].

The cost is lost conveniences, such as GPU access, shared filesystems, and live debugging.

## See also
- [[Kernel]]
- [[Control Groups]]
- [[Disk Image]]
