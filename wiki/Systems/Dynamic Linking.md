---
aliases:
  - Shared library
  - Shared libraries
  - Static linking
  - DLL
  - DLL hell
  - Dynamic loader
tags:
  - systems
summary: Loading a program's libraries at run time from shared files instead of copying them into the executable, which saves space and eases patching at the cost of fragile dependencies.
---
**Dynamic linking** connects a program to the libraries it uses when the program starts, rather than when it's built. A dynamically linked executable contains references to functions in *shared libraries*, files ending in `.so` on Linux, `.dylib` on macOS, and `.dll` on Windows. When the program runs, a *dynamic loader* finds those libraries on disk, maps them into memory, and fills in the addresses.

The alternative is **static linking**, where the linker copies the library code the program uses directly into the executable at build time. The result is one self-contained file.

Dynamic linking became standard for practical reasons:

- **Shared memory and disk.** Every program on a system uses the C library. With dynamic linking, one copy sits on disk and, through [[Virtual Memory]], one copy of its code sits in RAM, shared by every process.
- **Patching in one place.** When a security flaw is found in a library such as OpenSSL or zlib, updating the shared library fixes every program that uses it, without rebuilding them. Distributions rely on this, and a [[Package Manager]] tracks which libraries each program needs.
- **Plugins.** Programs can load libraries on demand at run time, which is how many applications support extensions.

The costs are fragility and complexity. A program now depends on exactly the right library versions being present on the machine it runs on. A missing library stops the program starting; a different version can break it subtly. On Windows in the 1990s, installers routinely overwrote shared DLLs with incompatible versions, breaking other programs, a problem nicknamed **DLL hell**, an early form of Dependency Hell. Unix libraries carry version numbers in their names so several versions can coexist, but mismatches still happen.

Dynamic linking also opens security and debugging concerns. Environment variables such as `LD_PRELOAD` can make the loader inject a library into any program, useful for debugging but also for attacks, so the loader ignores them for privileged programs. Search paths that include writable directories let attackers plant a malicious library; see [[Supply Chain Security]] and [[Environment Variable]].

The pendulum has swung partly back toward static linking. Go and Rust produce mostly static binaries by default, valued for being easy to deploy: copy one file and it runs. Containers achieve something similar by shipping a program together with every library it needs, as described under [[Containerization]]. When a widely used library has a vulnerability, every static binary or container image that bundled it must be rebuilt, which is why tracking components through a Software Bill of Materials matters.

The choice mirrors the trade-off in Vendoring source code: bundle dependencies for predictability, or share them for easier updates. Projects that need builds to come out identical everywhere, as with a Reproducible Build, often prefer to control every library explicitly.

## See also
- [[Application Binary Interface]]
