---
aliases:
  - CPU register
  - Program counter
  - Stack pointer
  - Register file
tags:
  - systems
summary: The handful of tiny, extremely fast storage slots inside a processor core where arithmetic actually happens, whose number and names are fixed by the instruction set and which compilers work hard to keep full of the right values.
---
A **processor register** is a storage slot built directly into a CPU core, holding a single value such as a 64-bit number or a memory address. Registers are the fastest storage in a computer. Reading one is part of an instruction's ordinary work, while a load from main memory can take hundreds of cycles; see [[Memory Hierarchy]].

On most modern processors, arithmetic happens only in registers. Adding two numbers held in memory means loading both into registers, adding them, and storing the result back. This load-store design is a hallmark of RISC instruction sets such as ARM and RISC-V. x86 allows memory operands in many instructions, but internally it breaks them into the same load, operate and store steps; see [[Instruction Set Architecture]] and [[Assembly Language]].

Some registers have special jobs. The **program counter**, called the instruction pointer on x86, holds the address of the next instruction, so a jump is simply a write to it. The **stack pointer** marks the top of the current thread's stack, where function calls keep return addresses and local variables; see [[Call Stack]]. A flags register records whether the last result was zero, negative or overflowed, which conditional branches test. Other registers hold control state visible only to the operating system, such as which page table is active; see [[Virtual Memory]].

The number of general-purpose registers is part of an instruction set's contract and rarely changes. The original 8086 had eight 16-bit ones, and the 64-bit extension of x86 doubled the count to sixteen, which alone sped up much compiled code. ARM's 64-bit architecture and RISC-V each have about thirty-two. More registers need more bits in each instruction to name them, a trade against code size.

Because registers are scarce, deciding which variables live in them is one of a compiler's most important jobs. Register allocation is usually modeled as coloring a graph of variables that are alive at the same time, with one color per register. When the colors run out, values **spill** to the stack; see [[Graph Coloring]] and [[Compiler]]. Rules about which registers carry arguments and which a function may overwrite form the calling convention; see [[Application Binary Interface]].

Registers are also what an operating system saves and restores when it switches threads, since they hold all of a program's in-flight state; see [[Context Switch]]. Wide vector registers, up to 512 bits, make that state larger; see [[SIMD]].

Behind the scenes, a modern core has far more physical registers than its instruction set names, often a couple of hundred. It **renames** each write to a fresh physical register, so instructions that merely reuse the same name don't have to wait for each other. That's essential for running instructions out of order; see [[Speculative Execution]] and [[Simultaneous Multithreading]].

## See also
- [[Von Neumann Architecture]]
- [[Instruction Pipelining]]
