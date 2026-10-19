---
aliases:
  - Linking
  - Object file
  - Executable and Linkable Format
  - ELF
  - Link-time optimization
tags:
  - systems
summary: The build step that combines separately compiled pieces of a program into one executable by resolving each name to an address, and the source of errors that confuse almost everyone at first.
---
A **linker** combines separately compiled pieces of a program into one executable. A [[Compiler]] translates each source file on its own into an **object file**, machine code with gaps: when a file calls a function defined elsewhere, the compiler doesn't know where that function will end up, so it leaves a placeholder and a note saying "fill in the address of `printf` here." The linker gathers all the object files and libraries, decides where everything goes in memory, and patches every placeholder with a real address.

Its two main jobs:

- **Symbol resolution.** Every function and global variable is a named *symbol*. The linker matches each reference to exactly one definition. If none exists, you get the classic "undefined reference" error; if two files define the same name, "multiple definition." Both appear at link time, after compiling succeeded.
- **Relocation.** Object files are compiled as if each started at address zero. The linker lays them out one after another and adjusts every address-dependent instruction to match.

Linking can happen at different times:

- **Static linking** copies the needed library code into the executable, producing one self-contained file that runs anywhere with a compatible system. Go and Rust programs often link statically.
- **Dynamic linking** records only which shared libraries are needed, and a loader resolves them when the program starts; see [[Dynamic Linking]]. Programs are smaller and share libraries in memory, and a security fix to a library reaches every program at once, at the cost of version conflicts.

Executables have formats that describe their sections of code and data, symbols, and loading instructions: **ELF** on Linux, Mach-O on macOS, and PE on Windows. Code compiled by different compilers or languages can link together only if they agree on calling conventions and data layout; see [[Application Binary Interface]]. That's why languages expose C-compatible interfaces to talk to each other.

Modern linkers do more than patch addresses:

- **Dead code elimination** drops functions nothing calls; see [[Unreachable Code]].
- **Link-time optimization** keeps an intermediate form in object files so the whole program can be optimized together, inlining across files a compiler couldn't see past.
- **Position-independent code** lets the operating system load programs at random addresses, enabling [[Address Space Layout Randomization]].
- **Debug information** maps machine code back to source lines for a [[Debugger]].

Linking is often the slowest step of large builds, since it's hard to parallelize and runs after every change. Newer linkers such as lld and mold are many times faster than older ones; see [[Build Cache]] and [[Reproducible Build]].

The idea extends beyond native code. A JavaScript [[Bundler]] does a linker's job, resolving imports across modules and dropping unused exports through tree shaking. Interpreted languages and [[Just-in-Time Compilation]] resolve names at run time instead, trading the linker's early errors for flexibility.

## See also
- [[Position-Independent Code]]
- [[Assembly Language]]
