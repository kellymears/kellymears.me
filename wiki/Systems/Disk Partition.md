---
aliases:
  - Partition table
  - GPT
  - Master boot record
tags:
  - systems
summary: Dividing a disk into separate regions, each holding its own filesystem, recorded in a small table at the start of the drive, a scheme whose 1983 version capped disks at two terabytes.
---
A **disk partition** is a region of a storage device that the operating system treats as a separate disk. Partitioning lets one physical drive hold several independent filesystems, such as an operating system, user files, swap space, or a second operating system for dual booting; see [[Filesystem]] and [[Swap]]. Where each partition starts and ends is recorded in a **partition table** near the beginning of the disk.

The original PC scheme, the **master boot record** (MBR), arrived with IBM's PC DOS 2.0 in 1983. Its first sector held a tiny bootstrap program and a table with room for four partitions; needing more meant nesting "logical" partitions inside an "extended" one. Each partition's start and size were stored as 32-bit counts of 512-byte sectors, which capped addressable space at 2 terabytes, a limit that seemed absurd in 1983 and became a real problem around 2010; see [[Integer Overflow]].

The replacement, the **GUID Partition Table** (GPT), was defined as part of UEFI, the firmware standard that replaced the BIOS; see [[Boot Process]]. GPT uses 64-bit addresses, allows 128 partitions by default, labels each with a globally unique ID, and keeps a backup copy of the table at the end of the disk, with checksums so damage is detectable; see [[Hash Function]]. It also writes a "protective" MBR at the start, so old tools see the disk as fully occupied rather than empty and don't overwrite it.

UEFI systems need a small **EFI system partition**, formatted with the simple FAT filesystem, which holds the bootloaders the firmware launches; see [[Firmware]].

Alignment matters for performance. Modern drives store data in 4-kilobyte or larger physical units, while still presenting 512-byte sectors for compatibility. If a partition starts partway through one of those units, every filesystem block straddles two, and each write costs two; see [[Solid-State Drive]]. Partitioning tools now start partitions at 1-megabyte boundaries, which aligns with almost any hardware.

Partitions are fixed regions, awkward to resize once filled. Layers on top add flexibility: volume managers pool partitions and carve out resizable volumes, and filesystems such as ZFS and Btrfs manage whole disks themselves, offering instant copies; see [[Filesystem Snapshot]] and [[RAID]]. Encryption often applies per partition, leaving the boot partition readable so the system can ask for a passphrase; see [[Full-Disk Encryption]].

Deleting a partition usually erases only its table entry, not its data, which is why recovery tools can often bring back a "lost" partition by scanning for filesystem signatures. Linux exposes each partition as its own device, such as the first partition of the first drive; see [[Device File]].

## See also
- [[Logical Volume Manager]]
- [[Dual Boot]]
- [[Filesystem Hierarchy Standard]]
- [[Hard Disk Drive]]
