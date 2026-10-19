---
aliases:
  - Syscall
  - System calls
  - User space
  - Kernel space
  - strace
tags:
  - systems
summary: The doorway through which a program asks the operating system kernel to do anything privileged, from reading a file to starting a process.
---
A **system call** is how a program asks the operating system [[Kernel]] to do something it isn't allowed to do itself. Opening a file, reading from the network, allocating memory, starting a [[Process]], or checking the time all go through system calls. Linux has a few hundred, such as `open`, `read`, `fork`, and `mmap`.

The boundary exists because the processor runs code at different privilege levels. Ordinary programs run in **user space**, where they can compute freely but can't touch hardware, other programs' memory, or the kernel's data. The kernel runs in **kernel space** with full control. A system call is a controlled jump between them: the program puts a call number and arguments in registers, executes a special instruction, and the processor switches into kernel mode at a fixed entry point. The kernel checks the request, does the work, and returns a result or an error code.

This design is what makes an operating system safe. A buggy or malicious program can crash itself, but it can only affect the rest of the system through requests the kernel validates. File access checks [[File Permissions]], memory requests respect the limits of [[Virtual Memory]], and resource use is accounted for by [[Control Groups]].

Programmers rarely make system calls directly. The C library wraps them in functions like `fopen` and `printf`, which add buffering so many small writes become one call. But every file, socket, and pipe a program touches is eventually a system call working on a [[File Descriptor]].

System calls are expensive compared with ordinary function calls, because switching privilege levels and protecting kernel state takes time, and mitigations for the 2018 Spectre and Meltdown processor flaws made the switch costlier. Performance work often comes down to making fewer of them:

- **Buffering** batches small reads and writes.
- **Memory-mapped files** let a program read a file as memory, with the [[Page Cache]] supplying data and no explicit read calls.
- **Event interfaces** such as `epoll` on Linux and `kqueue` on BSD and macOS let one call wait on thousands of connections, the foundation of an [[Event Loop]].
- **io_uring**, added to Linux in 2019, lets programs queue many operations in shared memory and collect results without a system call per operation.

System calls are also a natural place to observe and restrict programs. `strace` on Linux prints every call a program makes, which often reveals why something fails faster than reading its source. Sandboxes filter which calls a program may make; Linux's seccomp lets a process lock itself down to a short allowed list, and container runtimes use it alongside [[Linux Namespaces]] to apply [[Least Privilege]]. A [[Hypervisor]] adds another boundary below, intercepting the kernel's own privileged operations.

## See also
- [[Zero-Copy]]
- [[Protection Ring]]
- [[Seccomp]]
- [[eBPF]]
