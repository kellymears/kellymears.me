---
aliases:
  - Assembler
  - Machine code
  - Opcode
tags:
  - systems
summary: The human-readable form of a processor's own instructions, one line per machine operation, which programmers wrote by hand for decades and still read to understand what compilers actually produce.
---
**Assembly language** is the lowest level of programming people normally write: a readable form of the instructions a processor executes directly. Each line usually corresponds to one machine instruction, written as a short mnemonic such as ADD, MOV, or JMP with its operands, in place of the binary **machine code** the hardware reads. A program called an **assembler** translates it; see [[Binary Number]].

Every processor family has its own instruction set, so assembly isn't one language but many: code for an Intel or AMD x86 chip won't run on an ARM chip in a phone; see [[Instruction Set Architecture]]. Assembly gives direct control over registers, memory addresses, and the exact sequence of operations, and nothing in between.

The earliest computers were programmed in raw numbers. Kathleen Booth is credited with devising one of the first assembly languages, for a machine at Birkbeck College in London, described in 1947. In 1949 the EDSAC computer at Cambridge loaded programs through "initial orders" written by David Wheeler, which translated mnemonic instructions as they were read in. Assemblers soon added labels, so jumps could name a destination rather than a numeric address, and macros, which expand one line into many; see [[Metaprogramming]].

For decades serious software was written this way. Operating systems were written in each machine's assembly until Unix moved to C in 1973; see [[Unix]]. Game developers wrote in assembly well into the 1990s to squeeze performance from limited hardware; Chris Sawyer wrote nearly all of RollerCoaster Tycoon (1999) in x86 assembly. The [[Demoscene]] still treats hand-written assembly as a craft.

Compilers changed the economics. Modern optimizing compilers usually produce faster code than people writing by hand, and portable languages let one program run on many processors; see [[Compiler]]. Assembly remains where nothing else fits:

- **Startup and switching.** The first code a computer runs, and the code that saves and restores registers when switching between programs; see [[Boot Process]] and [[Context Switch]].
- **Interfaces.** Entering the kernel, or following the exact rules for how functions pass arguments; see [[System Call]] and [[Application Binary Interface]].
- **Hot loops.** Vector instructions for media codecs and cryptography, where timing must also not depend on secret data; see [[SIMD]].

Reading assembly is more common than writing it. Debugging a crash, checking what a compiler did with a loop, or analyzing malware all mean reading disassembled machine code. Online tools that show compiler output line by line made this a routine way to settle arguments about performance.

Assembly also offers no protection. There are no types, bounds checks, or structured loops, only jumps and memory, so a single wrong offset silently corrupts data; see [[Memory Safety]] and [[Structured Programming]].

## See also
- [[Stack Machine]]
- [[Analytical Engine]]
