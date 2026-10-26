---
aliases:
  - Swap space
  - Swapping
  - zram
  - zswap
  - Thrashing
tags:
  - systems
summary: Somewhere to put memory pages that are not being used, so RAM can go to pages that are, whether that place is a disk or a compressed region of RAM itself.
---
**Swap** is storage the kernel can move memory pages into when RAM is under pressure, freeing physical memory for pages in active use. With [[Virtual Memory]], a page's location is invisible to the [[Process]] that owns it, so a page can be written out and brought back on its next access through a page fault, slower but otherwise transparent.

The common misreading is that swap is emergency memory for when RAM runs out. Its main job is different. Memory comes in two kinds: *file-backed* pages, which can always be dropped and re-read from their file, and *anonymous* pages (heap, stacks) with no file behind them. **Without swap, anonymous pages can never be evicted**, however cold. Under pressure the kernel can then only reclaim file cache, including the code of running programs, and ends up re-reading the same hot files from disk over and over. That is **thrashing**: the machine stays technically alive and becomes unusable, and on a desktop it is often worse than a clean [[Out-of-Memory Killer|OOM kill]] would be. A little swap lets the kernel push out memory nobody has touched in hours and keep the working set resident.

Compressed swap changes the economics. **zram** creates a block device in RAM that compresses whatever is written to it, commonly at two to four times. Swapping to it costs CPU time rather than disk I/O, which on a fast processor is cheap. **zswap** is a compressed cache in front of a disk swap device. Both rest on the observation that cold memory is highly compressible. Swap can also be rationed per [[Control Groups|cgroup]], so one group can't fill the swap device for everyone.

Swap usage is a symptom that needs context. A large amount sitting in swap and rarely touched is healthy, since it is memory nothing needs. Swap traffic, pages moving in and out continuously, is the problem, because it means the working set no longer fits. On a long-running machine, swap and compressed swap fill gradually with the cold remains of programs that leaked or were never closed, which is a reason "it got slow after a week" so often goes away after a reboot. [[Pressure Stall Information]] measures the distinction directly, where raw usage figures can't.

## See also
- [[Suspend and Hibernation]]
- [[Dynamic Random-Access Memory]]
- [[Least Recently Used Cache]]
- [[Resource Starvation]]
- [[Page Cache]]
- [[Load Average]]
