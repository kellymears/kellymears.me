---
aliases:
  - PIC
  - Global Offset Table
  - Position-independent executable
tags:
  - systems
summary: Machine code that runs correctly wherever it's loaded in memory, which lets shared libraries be mapped once and shared by many programs and lets the operating system randomize where code lives.
---
**Position-independent code**, or PIC, is machine code that works correctly no matter where in memory it's loaded. Code that isn't position independent assumes fixed addresses: it jumps to address so-and-so and reads a variable at some other fixed address. Load it anywhere else and those assumptions break.

The need arose with shared libraries. A library such as the C standard library is used by nearly every program on a system. Loading one copy into memory and letting every process share it saves enormous amounts of memory; see [[Dynamic Linking]]. But each process has its own address space, and the library may land at a different address in each; see [[Virtual Memory]].

There are two ways to cope:

- **Load-time relocation.** The loader patches every absolute address in the code to match where it landed. That works, but patching modifies the code pages, so each process ends up with its own private copy and the sharing is lost; see [[Copy-on-Write]].
- **Position independence.** The compiler writes code that never contains absolute addresses at all, so the same unmodified pages work everywhere.

Position-independent code relies on two techniques. Jumps and data references within the code use addresses relative to the current instruction, which stay correct wherever the whole block moves. References to things outside, such as global variables in other libraries, go through a table of addresses called the **Global Offset Table**. The code stays shared and read-only; only the small table is filled in per process. Calls to functions in other libraries go through a similar table of stubs, which can resolve each function the first time it's called; see [[Linker]].

The cost depends on the processor. On 32-bit x86, which lacked a convenient way to address memory relative to the current instruction, PIC tied up one of the few general registers to hold the table's address and ran measurably slower; see [[Instruction Set Architecture]]. The 64-bit x86 design added instruction-relative addressing, which made position independence nearly free.

Once it was cheap, it became a security tool. If the main program is also built as a **position-independent executable**, the operating system can load it at a random address on each run. That randomization makes attacks that depend on knowing where code lives much harder; see [[Address Space Layout Randomization]]. Many Linux distributions switched to building programs this way by default during the 2010s; see [[Linux Distribution]].

Kernels and bootloaders use related tricks, since they often have to run at addresses chosen late; see [[Kernel]] and [[Boot Process]]. Embedded firmware that loads plug-in modules faces the same problem in miniature; see [[Firmware]].

Compilers produce position-independent code on request, and their output can be inspected in assembly listings that show the relative addressing in action; see [[Compiler]] and [[Assembly Language]].

## See also
- [[Application Binary Interface]]
- [[Memory Safety]]
