---
aliases:
  - ISA
  - x86
  - RISC-V
  - RISC and CISC
tags:
  - systems
summary: The contract between software and a processor, listing the instructions, registers, and memory rules a chip promises to honor, and why x86, Arm, and RISC-V differ.
---
An **instruction set architecture** (ISA) is the contract between software and a processor: the instructions a chip understands, how they are encoded as bytes, the registers they operate on, and the rules for how memory behaves. A [[Compiler]] targets an ISA, not a particular chip. Any processor implementing the same ISA can run the same machine code.

That separation is the key idea. IBM's System/360 (1964) introduced it: one architecture across a family of machines of very different speed and price, so customers could upgrade without rewriting software. The implementation underneath, the *microarchitecture*, can change completely between generations, adding pipelines, caches, and [[Speculative Execution]], while the ISA stays fixed.

Three ISAs dominate today:

- **x86** began with Intel's 8086 in 1978 and has stayed backward compatible ever since. Its instructions vary from 1 to 15 bytes, which makes decoding hard. AMD extended it to 64 bits in 2003 as AMD64, and Intel adopted it.
- **Arm** started at Acorn Computers in 1985 with fixed-length instructions designed for simple, efficient decoding. It runs nearly every phone, and Apple's 2020 move to its own Arm chips brought it to mainstream laptops.
- **RISC-V**, begun at Berkeley in 2010, is an open standard that anyone can implement without a license, built from a small base plus optional extensions.

The 1980s **RISC versus CISC** debate set *reduced* instruction sets, small, regular, and easy to pipeline, against *complex* ones with powerful multi-step instructions. RISC won the argument about design, and CISC survived by adapting: modern x86 chips translate their complex instructions internally into simple micro-operations, partly through [[Microcode]]. Today the difference shows up mostly in decoding cost and power, not raw speed.

ISAs differ in ways that reach programmers:

- **Memory ordering.** x86 guarantees fairly strong ordering between threads, and Arm allows much more reordering. Concurrent code that relied on x86's behavior without proper barriers can break when ported, a known trap for [[Lock-Free Data Structure]] code.
- **Extensions.** Vector instructions such as SSE and AVX on x86 or NEON on Arm differ by chip, so programs detect features at runtime or build for a baseline.
- **Binary compatibility.** Running software built for one ISA on another needs translation. Apple's Rosetta 2 translates x86 code to Arm ahead of time, and [[Emulation]] does it in software for old consoles.

Higher up, virtual ISAs blur the line: [[WebAssembly]] and Java bytecode define instruction sets for machines that don't exist, which an [[Interpreter]] or compiler maps onto real hardware. The binary details above the ISA, how functions call each other and how data is laid out, belong to the [[Application Binary Interface]].

## See also
- [[Device Tree]]
- [[Position-Independent Code]]
- [[Silicon Binning]]
- [[Mainframe]]
- [[Endianness]]
- [[Von Neumann Architecture]]
- [[Hybrid CPU Architecture]]
