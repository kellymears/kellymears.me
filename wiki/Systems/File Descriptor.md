---
aliases:
  - File descriptors
  - FD
  - File handle
  - Standard streams
  - stdin
  - stdout
  - stderr
tags:
  - systems
summary: The small integer a Unix process uses to refer to an open file, socket, pipe, or device, and the uniform interface that makes "everything is a file" work.
---
A **file descriptor** is a small non-negative integer that a Unix [[Process]] uses to refer to something it has open. When a program opens a file, the [[Kernel]] creates an entry in a per-process table and hands back its index, such as 3. From then on, the program reads, writes, and closes using that number. Windows calls the equivalent a *handle*.

The power of the idea is uniformity. The same descriptor interface, with `read`, `write`, and `close` system calls, works for regular files, network sockets, pipes between processes, terminals, and devices. This is the practical meaning of the Unix maxim "everything is a file." A program copying between descriptors needn't know whether it's reading a disk file or a socket.

By convention, every process starts with three descriptors already open:

- **0, standard input (stdin)**, where the program reads input.
- **1, standard output (stdout)**, where it writes results.
- **2, standard error (stderr)**, where it writes diagnostics, kept separate so error messages don't mix into data being passed along.

The [[Shell]] connects these to the terminal by default, and its redirection syntax rewires them: `>` sends stdout to a file, `2>&1` points stderr at wherever stdout goes, and `|` connects one program's stdout to the next one's stdin, the basis of the [[Unix Pipeline]].

Several behaviors follow from how descriptors work:

- **Inheritance.** A child process inherits its parent's open descriptors. This is how shells set up redirection: they rearrange descriptors, then start the program. It's also a source of leaks, since a descriptor accidentally inherited by a long-running child keeps a file or socket open. Marking descriptors close-on-exec prevents this.
- **Lowest available number.** A new descriptor gets the lowest unused number, which is why closing descriptor 1 and opening a file redirects standard output, an old trick shells relied on.
- **Open files outlive their names.** A descriptor points to the file itself, its [[Inode]], not its path. Deleting or renaming a file that a process has open doesn't affect the process, and the disk space isn't freed until the last descriptor closes, a common cause of a full disk with no large files visible.

Descriptors are a limited resource. Each process has a cap, often 1,024 by default on Linux, and a server handling many connections or a program that forgets to close files hits "too many open files" errors. Failing to close descriptors is a resource leak like a [[Memory Leak]].

Descriptors also carry security meaning. Holding an open descriptor is itself a permission: a process can pass one to another over a Unix socket, granting access to a file the receiver couldn't open itself. Capability-based systems build on this idea to apply [[Least Privilege]] more precisely than path-based [[File Permissions]].

## See also
- [[Unix Pipeline]]
- [[System Call]]
- [[Inode]]
- [[Shell]]
