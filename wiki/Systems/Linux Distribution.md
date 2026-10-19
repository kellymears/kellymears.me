---
aliases:
  - Linux distributions
  - Distro
  - GNU/Linux
tags:
  - systems
summary: A complete operating system assembled around the Linux kernel, combining it with system tools, a package manager, and a set of opinions about release cadence, defaults, and freedom, with hundreds in active use.
---
A **Linux distribution** is a complete operating system built around the Linux kernel. The kernel alone runs hardware and schedules programs, but it can't do anything useful by itself; see [[Kernel]]. A distribution adds everything else: a C library, shell and core utilities, a startup system, a package manager, an installer, a desktop or server environment, and thousands of applications, all compiled to work together and kept updated.

The first distributions appeared in 1992, the year after the kernel's release, as bundles that saved people from assembling a system by hand. Slackware and Debian both began in 1993, and Red Hat followed shortly after. Many of today's distributions descend from one of those families, often as forks with a different emphasis; see [[Software Fork]].

Much of the userland came from the GNU project, which led to a long-running naming dispute over whether the whole system should be called GNU/Linux. The licensing of that code shaped how distributions work, since anyone can redistribute it so long as the source stays available; see [[Copyleft]].

Distributions differ along a handful of axes:

- **Packaging.** Debian-based systems use one package format and Red Hat-based systems another, with different tools and repositories; see [[Package Manager]].
- **Release model.** Fixed releases freeze versions and backport security fixes, while rolling releases update continuously; see [[Long-Term Support]] and [[Rolling Release]].
- **Init and services.** Most major distributions use systemd, though some deliberately avoid it; see [[Init System]].
- **Core libraries.** Most use the GNU C library, while minimal distributions use smaller alternatives that make tiny container images; see [[Containerization]].
- **Philosophy.** Some ship only free software, some prioritize the newest versions, some build everything from source, and some describe the entire system declaratively so it can be reproduced exactly.

Distributions share a common layout of directories, which helps software install the same way across them; see [[Filesystem Hierarchy Standard]]. Differences in library versions still cause the classic problem of a program built for one distribution failing on another; see [[Dependency Hell]]. Containers and self-contained package formats arose partly to ship applications independent of the distribution beneath.

Choosing one is partly about the tools and partly about community. Trying one after another is common enough to have a name, distro hopping. Personal configuration files, carried from one install to the next, smooth the switch; see [[Dotfiles]].

Distributions are an example of open development at scale. Thousands of volunteers and companies maintain packages, test updates, and patch security flaws, coordinating through mailing lists and bug trackers in the bazaar style; see [[The Cathedral and the Bazaar]].

Linux distributions run most servers, nearly all supercomputers, and, through Android's modified kernel, most phones, though Android is rarely counted as a distribution in the traditional sense; see [[Unix]].

## See also
- [[Desktop Environment]]
- [[Sound Server]]
