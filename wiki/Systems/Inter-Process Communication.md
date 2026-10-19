---
aliases:
  - IPC
  - Shared memory
  - Named pipe
  - D-Bus
tags:
  - systems
summary: The channels separate processes use to exchange data and signals, from pipes and sockets to shared memory, a necessity because each process is walled off in its own memory and a frequent route for sandbox escapes.
---
**Inter-process communication** (IPC) is any mechanism that lets separate processes exchange data or coordinate. It's needed because operating systems isolate processes: each has its own address space, so one process can't simply read another's variables; see [[Process]] and [[Virtual Memory]]. Every channel between them goes through the [[Kernel]] in some form.

The main mechanisms:

- **Pipes** connect one process's output to another's input as a stream of bytes; see [[Unix Pipeline]]. **Named pipes** appear in the filesystem, so unrelated processes can open them by name.
- **Sockets**, best known for networking, also connect processes on the same machine through local sockets, which can carry file descriptors as well as data; see [[Network Socket]].
- **Signals** deliver small notifications such as "stop" or "reload configuration," carrying almost no data; see [[Unix Signal]].
- **Shared memory** maps the same physical memory into several processes. It's the fastest method, since nothing is copied, but processes must coordinate access themselves; see [[Semaphore]].
- **Message queues** hold discrete messages until the receiver takes them; see [[Message Queue]].
- **Files** remain the simplest shared channel, slow but durable and easy to inspect.

Most mechanisms copy data through the kernel, which costs time but keeps processes isolated. Shared memory avoids the copy, which is why it carries large data such as video frames and window contents on their way to the screen. Messages crossing any channel must be turned into bytes on one side and rebuilt on the other; see [[Serialization]].

Higher-level systems build on these. **D-Bus**, standard on Linux desktops since the mid-2000s, lets programs call methods on each other and broadcast events, such as a battery running low; see [[Systemd]]. Android routes almost everything through a kernel driver called Binder. These systems look like function calls across process boundaries; see [[Remote Procedure Call]].

IPC speed shapes operating-system design. Microkernels move drivers and filesystems out of the kernel into separate processes, so every file read becomes several messages. Early microkernels were slow for this reason, until Jochen Liedtke's L4 showed in the 1990s that IPC could be made several times faster with careful design.

IPC is also a security boundary. Browsers run each site's content in a restricted process with almost no privileges, which must ask a more trusted process for anything it needs; see [[Least Privilege]]. Bugs in the code that handles those requests are a common way for attackers to escape the sandbox, so the receiving side must treat every message as untrusted input.

Designs that communicate only by messages, sharing no memory at all, avoid many concurrency bugs; see [[Actor Model]].

## See also
- [[Clipboard]]
- [[IO Multiplexing]]
