---
aliases:
  - ABI
  - Calling convention
  - ABI compatibility
  - Name mangling
tags:
  - systems
summary: The binary-level contract that lets separately compiled code work together, covering registers, data layout, and symbol names, and why breaking it forces everything to be rebuilt.
---
An **application binary interface** (ABI) is the contract that lets separately compiled pieces of machine code work together. An API says what functions exist and what they mean in source code. An ABI says how a call actually happens in the compiled binary: where the arguments go, how data structures are laid out in memory, and what the symbols are named.

An ABI covers several layers:

- **Calling convention.** Which registers or stack slots carry arguments and return values, which registers a function must preserve, and how the stack is aligned. On 64-bit Linux and macOS, the System V convention passes the first six integer arguments in registers; Windows x64 uses four different ones. Code compiled for one can't call the other directly.
- **Data layout.** The size and alignment of each type, how a struct is padded, and how a C++ object finds its virtual functions.
- **Symbol names.** C++ encodes namespaces, classes, and parameter types into *mangled* symbol names, and each compiler family has its own scheme.
- **Executable format and system calls.** Linux uses ELF files, Windows PE, and macOS Mach-O, each with its own [[Dynamic Linking]] rules and its own [[System Call]] numbers.

ABIs sit on top of an [[Instruction Set Architecture]], so Windows and Linux programs can both be x86-64 and still be incompatible above the instructions.

**ABI stability** is what lets binaries keep working. Changing a struct's fields, reordering virtual functions, or changing a function's parameters breaks every compiled program that depends on it, a [[Backward Compatibility]] problem even when the source still compiles. Library authors express this with *sonames*, such as `libfoo.so.1`, and an ABI break should bump the major version under [[Semantic Versioning]]. glibc goes further with symbol versioning, keeping old versions of changed functions so decades-old binaries still run. The Linux [[Kernel]] treats its system-call ABI as a promise, summed up in Linus Torvalds's rule "we do not break userspace."

When GCC 5 changed the layout of C++ `std::string` in 2015 to meet the C++11 standard, it had to ship both versions side by side for years.

The C ABI has become the common language between languages. Rust, Go, Python extensions, and nearly everything else expose functions through C calling conventions, because C's ABI is simple and stable on every platform. Rust itself deliberately has no stable ABI. Compatibility layers work at this level: Wine and Proton implement the Windows ABI on Linux, an [[API Translation Layer]] that loads unmodified Windows binaries. Containers solve the problem differently, shipping the exact libraries a program was built against, as in [[Containerization]].

## See also
- [[Device Tree]]
- [[Assembly Language]]
- [[Position-Independent Code]]
- [[Rolling Release]]
- [[Endianness]]
- [[Linker]]
- [[POSIX]]
