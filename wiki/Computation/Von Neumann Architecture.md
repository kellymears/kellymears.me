---
aliases:
  - Stored-program computer
  - Von Neumann bottleneck
  - Harvard architecture
tags:
  - computation
summary: The design nearly every computer follows, in which programs and data share one memory and a processor fetches instructions from it one after another, flexible enough to let programs write programs and limited by the narrow path between processor and memory.
---
The **von Neumann architecture** is the basic design of almost every general-purpose computer. A processor, made of an arithmetic unit and a control unit, works on a single memory that holds both the program's instructions and its data. The processor repeatedly fetches the next instruction from memory, decodes it, executes it, and moves on. Input and output devices connect to the same system.

The design is named for John von Neumann, whose 1945 "First Draft of a Report on the EDVAC" described it. The ideas came out of work with J. Presper Eckert and John Mauchly, who had built ENIAC, and the draft circulated under von Neumann's name alone, a source of lasting resentment. The underlying idea of a machine that reads its program as data also echoes Alan Turing's universal machine of 1936; see [[Turing Completeness]]. The Manchester Baby ran the first stored program in 1948.

Earlier machines were programmed by rewiring panels or feeding instructions from tape. Storing the program in memory meant changing it was as easy as loading new data. More importantly, programs could read, generate, and modify other programs. That makes compilers, loaders, and operating systems possible; see [[Compiler]], [[Interpreter]], and [[Just-in-Time Compilation]].

The same flexibility creates risk. If an attacker can write data into memory and trick the processor into executing it, data becomes code. Many classic exploits did exactly this, and modern systems mark memory as either writable or executable, never both, and randomize where code lives; see [[Memory Safety]] and [[Address Space Layout Randomization]].

The architecture's limit is the **von Neumann bottleneck**, a term John Backus used in his 1977 Turing Award lecture. Every instruction and every piece of data must pass through the one connection between processor and memory. As processors became vastly faster than memory, they spent more and more time waiting; see [[Moore's Law]]. Caches, which keep recently used data close to the processor, are the main response; see [[Locality of Reference]]. Backus also criticized the programming style the design encourages, one assignment at a time, and argued for functional programming instead; see [[Pure Function]].

The **Harvard architecture** keeps instructions and data in separate memories with separate paths, so both can be fetched at once. Named after the Harvard Mark I, it's common in small microcontrollers and signal processors. Most modern processors are a hybrid: one main memory, but separate caches for instructions and data near the core.

Modern processors look sequential to programmers but aren't inside. They decode instructions into smaller operations, run many at once, and guess which way branches will go; see [[Microcode]] and [[Speculative Execution]]. Designs that abandon the model altogether include graphics processors, which run thousands of simple threads, and dataflow machines; see [[Graphics Processing Unit]].

## See also
- [[Instruction Set Architecture]]
- [[Punched Card]]
- [[SIMD]]
