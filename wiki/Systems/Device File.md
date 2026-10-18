---
aliases:
  - Character device
  - Block device
  - udev
tags:
  - systems
summary: Special files that represent hardware and kernel services, letting programs read a disk, a mouse, or a stream of random bytes with the same calls they use on ordinary files.
---
A **device file** is a special file that represents a piece of hardware or a kernel service. On Unix-like systems they live in the `/dev` directory. Reading `/dev/sda` reads the raw bytes of the first disk; writing to a terminal's device file prints on it. This is the clearest expression of the Unix idea that everything is a file: programs reach devices with the same open, read, and write calls they use for ordinary files; see [[System Call]] and [[File Descriptor]].

There are two main kinds:

- **Block devices** represent storage, read and written in fixed-size blocks at any position. The kernel buffers them in memory; see [[Page Cache]]. Disks and each of their partitions appear as block devices; see [[Disk Partition]].
- **Character devices** carry a stream of bytes, such as terminals, serial ports, sound cards, and input devices; see [[Pseudoterminal]].

A device file holds no data. Its [[Inode]] stores two numbers: a major number identifying the driver and a minor number identifying which device it handles. Opening the file hands the request to that driver inside the [[Kernel]]. Operations that don't fit reading and writing, such as ejecting a disc or setting a serial port's speed, go through a catch-all call named ioctl.

Some device files have no hardware behind them:

- `/dev/null` discards everything written to it and returns nothing when read, the standard place to throw away output; see [[Unix Pipeline]].
- `/dev/zero` produces endless zero bytes, used to fill files or wipe disks.
- `/dev/urandom` produces random bytes from the kernel's generator; see [[Pseudorandom Number Generator]].

Early Unix systems created device files by hand, and distributions shipped thousands of them for hardware that might never exist. Linux's **udev**, from 2003, creates them dynamically as devices appear and applies rules to name them. Since detection order can change between boots, udev also adds stable names based on serial numbers and IDs, so a script can refer to the same disk even if it moves from `sda` to `sdb`.

Device files are also a security boundary, controlled by ordinary [[File Permissions]]. A program that can read the raw disk can bypass every file permission on it; a program that can read input devices can log every keystroke. Distributions grant access through groups, such as one for video hardware, and containers are usually given only a short list of safe devices; see [[Control Groups]] and [[Least Privilege]].

Their power makes mistakes costly. A disk-copying command pointed at the wrong device file overwrites a drive without asking, and a stray redirection into a disk device can destroy a filesystem.

## See also
- [[Filesystem]]
- [[Interrupt]]
