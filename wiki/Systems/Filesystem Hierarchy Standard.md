---
aliases:
  - FHS
  - Usr merge
  - Unix directory layout
tags:
  - systems
summary: The conventional layout of directories on Unix and Linux systems, what goes in etc, usr, var, and the rest, how the split between root and usr began as an accident of disk size in 1971, and why distributions now merge it.
---
The **Filesystem Hierarchy Standard** describes where things belong on a Linux system: programs, libraries, configuration, logs, and user files each in their conventional directory. It formalizes conventions inherited from Unix, first published for Linux in 1994 and maintained since 2015 by the Linux Foundation. Because packages, scripts, and administrators all rely on the same layout, a program can find its configuration on any distribution; see [[Package Manager]].

The main directories:

- **/etc** holds system configuration, mostly plain text files edited by hand or by tools.
- **/usr** holds installed software: programs, libraries, documentation. It is meant to be shareable and, ideally, read-only. Software built locally goes in /usr/local, so the package manager never overwrites it.
- **/var** holds data that changes while the system runs: logs, caches, mail and print queues, databases.
- **/home** holds users' own files, including their configuration; see [[Dotfiles]] and [[XDG Base Directory Specification]].
- **/tmp** holds temporary files, often kept in memory and cleared at boot.
- **/opt** holds self-contained add-on software that ships in one directory.
- **/dev**, **/proc**, and **/sys** aren't stored on disk at all. The kernel generates them to expose devices, processes, and settings as files; see [[Device File]].

Each can live on a different disk or partition, assembled into one tree at boot; see [[Filesystem]] and [[Disk Partition]].

Some of the layout is history rather than design. In 1971, Unix's developers at Bell Labs filled their PDP-11's first small disk, so the operating system spilled onto a second disk attached at /usr, which originally held users' home directories. When a third disk arrived, home directories moved out, and the system's programs stayed split between /bin and /usr/bin. Decades of rationalization followed for a split that began as running out of space.

Distributions have been undoing it. The **usr merge**, adopted by Fedora in 2012 and later by Debian, Arch, and most others, moves everything into /usr and leaves /bin, /lib, and /sbin as [[Symbolic Link]]s pointing there. With all of the operating system under one directory, it can be mounted read-only, snapshotted, or replaced as a single unit, which suits image-based systems that update atomically; see [[Filesystem Snapshot]] and [[Immutable Infrastructure]].

Not everyone follows the standard. macOS layers its own folders, such as Applications and System, over a hidden Unix tree. NixOS deliberately abandons it, installing every package in its own directory named by a hash of its inputs, so many versions coexist and builds stay reproducible; programs that assume a standard path need compatibility shims there; see [[Reproducible Build]]. Container images usually keep the standard layout, but many contain only a handful of its directories; see [[Containerization]] and [[Overlay Filesystem]].

## See also
- [[POSIX]]
- [[Hard Link]]
- [[Linux Distribution]]
