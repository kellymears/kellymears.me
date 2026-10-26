---
aliases:
  - DRAM
  - RAM
  - Memory refresh
  - SRAM
tags:
  - systems
summary: The main memory of nearly every computer, which stores each bit as charge in a tiny capacitor that leaks and must be refreshed many times a second, making it cheap and dense but slow next to the processor.
---
**Dynamic random-access memory**, or DRAM, is the main memory of almost every computer, phone, and graphics card. Each bit is stored as electric charge in a tiny capacitor, guarded by a single transistor. "Random access" means any location can be read about as quickly as any other, unlike tape. "Dynamic" means the stored charge leaks away within milliseconds, so the memory must be constantly refreshed.

Robert Dennard at IBM invented the one-transistor memory cell in 1966, and Intel's 1103 chip of 1970 was the first commercial DRAM, quickly replacing the magnetic core memory that had been woven by hand from tiny rings of ferrite. Because each bit needs only one transistor and one capacitor, DRAM packs billions of bits onto a chip, and its density grew on the curve of Moore's law for decades.

Refresh is the price of that density. The memory controller reads and rewrites every row on a fixed schedule, typically within 64 milliseconds, whether or not the data is in use. A row being refreshed can't be read, which costs a little speed, and refresh is a steady draw of power even when the computer is idle; see [[Suspend and Hibernation]].

**Static RAM**, or SRAM, avoids refresh by storing each bit in a loop of about six transistors that holds its state as long as power is on. It is much faster but larger and costlier per bit, so processors use it for their small on-chip caches and leave bulk storage to DRAM.

DRAM's weaknesses come from its physics:

- **Latency.** Processors have grown far faster than memory, and a trip to DRAM can cost hundreds of processor cycles. Bandwidth has kept improving, but latency has barely changed in decades, the problem known as the memory wall.
- **Volatility.** Contents vanish when power is lost, which is why programs must save to storage.
- **Remanence.** Charge doesn't vanish instantly, and chilled chips can keep data for seconds or minutes after power is cut. Researchers in 2008 used this to recover disk encryption keys from memory.
- **Disturbance.** Cells are so close together that repeatedly reading one row can flip bits in its neighbors.
- **Random errors.** Stray radiation occasionally flips a bit, which servers detect and correct with extra check bits.

Operating systems hide DRAM's limited size by moving data between it and disk; see [[Virtual Memory]] and [[Swap]]. The memory chips themselves are often sorted by the speeds they can sustain.

## See also
- [[Out-of-Memory Killer]]
