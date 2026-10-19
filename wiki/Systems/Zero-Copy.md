---
aliases:
  - Zero-copy I/O
  - Sendfile
tags:
  - systems
summary: Techniques that move data between files, memory, and the network without the processor copying it from buffer to buffer, cutting CPU work and memory bandwidth for servers that shovel large amounts of data.
---
**Zero-copy** describes techniques that move data without the processor copying it from one memory buffer to another. A naive program that serves a file over the network reads the file into its own buffer, then writes that buffer to a socket. Each step copies the bytes, once from the kernel into the program and once back into the kernel, and each crossing costs a system call; see [[System Call]] and [[Network Socket]]. For a server pushing gigabytes a second, those copies consume processor time and, worse, memory bandwidth; see [[Memory Hierarchy]].

The copies exist for good reasons. The kernel and each program have separate memory, so data must cross a protection boundary, and the simplest way to cross is to copy; see [[Kernel]] and [[Virtual Memory]]. Zero-copy techniques find ways to share or hand over the data instead.

The best-known example is **sendfile**, a system call added to several Unix-like systems in the late 1990s. It tells the kernel to send part of a file straight to a socket. The data moves from the kernel's file cache to the network stack without ever entering the program, and with a capable network card the hardware can gather it directly from the cache; see [[Page Cache]] and [[Interrupt]]. Web servers use it for static files, and message brokers use it to stream stored logs to consumers.

Related calls generalize the idea. Linux's splice moves data between a pipe and another file descriptor inside the kernel; see [[Unix Pipeline]]. Mapping a file into memory lets a program read it without a separate copy at all, since the file's cached pages appear directly in the program's address space. Newer asynchronous interfaces let programs register buffers once and reuse them, avoiding repeated setup; see [[IO Multiplexing]].

The same principle appears higher up. Serialization formats such as Cap'n Proto and FlatBuffers lay data out in memory exactly as it's stored or transmitted, so a program can read fields in place instead of decoding everything into new objects; see [[Serialization]]. Copy-on-write sharing defers copies until something changes, which often means never; see [[Copy-on-Write]].

Zero-copy isn't free. The techniques are less portable and harder to use correctly; a program that modifies a buffer the kernel is still sending can corrupt the data in flight. For small messages, the setup can cost more than the copy it avoids, since copying a few kilobytes that are already in cache is very fast; see [[Locality of Reference]].

The extreme form bypasses the kernel entirely. High-frequency trading systems and some storage systems let programs drive network cards directly, trading isolation and convenience for the last few microseconds; see [[Latency and Jitter]].

## See also
- [[Content Delivery Network]]
- [[Bandwidth]]
