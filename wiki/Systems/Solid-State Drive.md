---
aliases:
  - SSD
  - TRIM
  - Wear leveling
  - Write amplification
  - NAND flash
tags:
  - systems
summary: How flash storage works beneath its disk-like interface, with erase blocks, wear, and a translation layer that explain its odd performance and lifespan.
---
A **solid-state drive** (SSD) stores data in NAND flash memory instead of on spinning platters. It presents the same interface as a hard disk, a flat array of numbered blocks, but underneath it works very differently, and those differences explain both its speed and its quirks.

Flash stores bits as charge trapped in each cell's insulated gate, a [[Semiconductor]] structure that keeps its state without power. Cells can hold one bit (SLC), two (MLC), three (TLC), or four (QLC) by distinguishing more charge levels. More bits per cell means cheaper storage but slower writes, more errors, and shorter life, so drives lean heavily on strong [[Error-Correcting Code]]s.

Flash has three awkward rules:

- **No overwriting in place.** Data is written in *pages* of a few kilobytes, but a page can be rewritten only after it is erased.
- **Erasure is coarse.** Erasing happens in *blocks* of hundreds of pages, often several megabytes at once.
- **Cells wear out.** Each program-and-erase cycle damages the insulating oxide a little. SLC cells survive on the order of 100,000 cycles; TLC and QLC around 1,000 to 3,000. It is a form of [[Material Fatigue]] at the scale of single transistors.

The drive hides these rules behind its **flash translation layer**, firmware that maps logical block numbers to physical pages. A write goes to a fresh page and the old copy is marked stale, much like [[Copy-on-Write]]. **Garbage collection** later gathers live pages out of mostly-stale blocks so the blocks can be erased. **Wear leveling** spreads writes so no block dies early.

The cost is **write amplification**: moving live data during garbage collection means the flash absorbs more writes than the host sent. A fuller drive amplifies more, since its blocks hold more live data to move. Spare capacity reserved by the manufacturer, called over-provisioning, keeps it in check.

**TRIM**, standardized around 2009, lets the operating system tell the drive which blocks no longer hold files. Without it the drive keeps copying deleted data during garbage collection.

Other behaviors follow from the design. Many consumer drives write first into a fast SLC-mode cache, so sustained writes slow sharply once it fills. Random reads are nearly as fast as sequential ones because there is no seek, which is why defragmenting an SSD is pointless. The NVMe interface (2011) over PCIe allows up to 65,535 queues instead of the old AHCI interface's one, matching the parallelism of flash and of modern [[IO Multiplexing]].

Reliability needs care too. A drive can lose cached writes on sudden power loss, which is why filesystems rely on flush commands, as described in [[Journaling File System]] and [[Write-Ahead Logging]]. Overwriting files doesn't reliably erase them, so secure deletion relies on [[Full-Disk Encryption]] and discarding the key.

## See also
- [[Page Cache]]
- [[Filesystem Snapshot]]
- [[Inode]]
- [[Electromigration]]
- [[RAID]]
- [[Firmware]]
