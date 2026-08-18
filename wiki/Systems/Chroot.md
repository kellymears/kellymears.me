---
aliases:
  - chroot jail
tags:
  - systems
summary: Rebasing a process's idea of the filesystem root, the oldest and shallowest form of Unix process isolation.
---
**Chroot** changes what a process considers the root of the filesystem, `/`. A process chrooted into `/var/jail` sees that directory as its entire filesystem — it cannot open, list, or even reference anything above it by path, because as far as its own view goes, nothing above it exists. It's one of the oldest isolation primitives in Unix, dating to 1979, well before namespaces, cgroups, or any container runtime existed.

The isolation it provides is narrower than it sounds. Chroot changes only the filesystem view — a chrooted process still shares the same process table, network stack, and user IDs as everything else on the machine, and it can still see and potentially signal other processes unless something else restricts that. A process running as root inside a chroot can, with well-known techniques, escape it entirely, since root's privileges aren't scoped by the chroot boundary at all. This is why chroot is not considered a security boundary on its own — it was designed to build clean environments (classic uses: building software against a known-clean root, or serving files to an anonymous FTP user who should never see the rest of the disk), not to contain a hostile process.

[[Linux Namespaces]] extend the same idea — a private view of one resource — across process IDs, network interfaces, and hostnames, and pair it with [[Control Groups]] for resource limits, which is what modern [[Containerization|containers]] actually rest on. Chroot is best understood as the single-resource ancestor of that much larger idea, still useful today for its original narrow purpose but never sufficient alone for running untrusted code.

## See also
- [[Linux Namespaces]]
- [[Containerization]]
- [[Control Groups]]
- [[Least Privilege]]
