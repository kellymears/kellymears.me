---
aliases:
  - Cross compiler
  - Target triple
tags:
  - systems
summary: Compiling a program on one kind of machine to run on another, such as building phone or microcontroller code on a desktop, which requires a toolchain, libraries, and headers for the target rather than the host.
---
**Cross-compilation** is compiling a program on one kind of machine so that it runs on a different kind. A developer builds firmware for a thermostat on a laptop, an app for an ARM phone on an x86 desktop, or a Linux server binary on a Mac. The compiler that does it is a **cross compiler**: it runs on the host but produces code for the target; see [[Compiler]].

The need is often practical. Many targets are too small or slow to compile anything themselves; a microcontroller with a few kilobytes of memory can't run a compiler at all; see [[Microcontroller]]. Others, like game consoles and phones, are locked down or simply inconvenient. And building for many platforms from one machine is far simpler than maintaining one machine per platform; see [[Build Matrix]].

Generating instructions for another processor is the easy part; see [[Instruction Set Architecture]]. The harder part is everything around it. The output must follow the target's conventions for calling functions and laying out data, and link against the target's own libraries, not the host's; see [[Application Binary Interface]] and [[Linker]]. A cross toolchain therefore needs a copy of the target's headers and libraries, often called a sysroot. Many cross-compilation failures come from a build accidentally picking up a host library instead; see [[Dynamic Linking]].

Targets are usually named with a **target triple**, such as x86_64-unknown-linux-gnu or aarch64-apple-darwin, describing the architecture, the vendor, the operating system, and sometimes the ABI. GNU's build tools distinguish three machines: the one doing the build, the host the resulting compiler runs on, and the target it generates code for. When all three differ, the result is known jokingly as a Canadian cross.

Build systems often get in the way. Many projects compile a small helper program and run it during the build, which breaks when the build's output can't run on the build machine; see [[Build System]]. Tests have the same problem, so cross builds often run them under an emulator; see [[Emulation]]. Subtle differences can also surface at run time, such as byte order or the size of basic types; see [[Endianness]].

Some newer toolchains make cross-compiling routine. Go builds for another operating system and architecture by changing two environment variables, and Zig bundles libraries for many targets so it can cross-compile C code out of the box. Linux distributions bootstrap ports to new architectures this way, cross-compiling a minimal system until it can build itself; see [[Linux Distribution]].

Containers and continuous integration made cross-compilation more common: a single pipeline can produce images for both x86 and ARM servers; see [[Continuous Integration]] and [[Containerization]]. Ensuring each output is identical regardless of where it was built is a closely related goal.

## See also
- [[Package Manager]]
- [[Reproducible Build]]
