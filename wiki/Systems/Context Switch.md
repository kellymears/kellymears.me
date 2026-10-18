---
aliases:
  - Context switches
  - Context switching
  - Preemption
  - Preemptive multitasking
tags:
  - systems
summary: The CPU putting one thread aside and picking up another, what has to be saved and restored, and why the hidden cost in cold caches often outweighs the switch itself.
---
A **context switch** is the operating system stopping one thread on a CPU core and starting another. The kernel saves the running thread's state, its registers, program counter, and stack pointer, and loads the saved state of the next one, which resumes as if it had never stopped. Switching many times a second is what lets a handful of cores appear to run hundreds of programs at once.

Switches happen for two reasons:

- **Voluntary.** The thread blocks: waiting for disk, network, a lock, or a timer, so it gives up the CPU.
- **Involuntary.** The [[CPU Scheduler]] decides the thread has run long enough and preempts it, usually on a timer [[Interrupt]], so another can run. This *preemptive multitasking* stops one program from monopolizing the machine, which older cooperative systems such as classic Mac OS and Windows 3.1 could not prevent.

Linux records both counts per [[Process]] in `/proc/<pid>/status`, and `vmstat` shows system-wide switches per second.

The direct cost is small, typically a few microseconds. Switching between threads of the same process only swaps registers and stacks. Switching between processes also changes the address space, which can flush the translation cache that speeds up [[Virtual Memory]]. After the Meltdown vulnerability in 2018, kernels began isolating kernel memory more strictly, which made every transition between user and kernel space, and many switches, measurably more expensive.

The larger cost is indirect. A thread that resumes finds its data evicted from the CPU caches by whatever ran in between, so it runs slowly until the caches warm up again. That loss of [[Locality of Reference]] can cost far more than the switch itself. Moving a thread to a different core makes it worse, since its warm cache stays behind; pinning with [[CPU Affinity]] avoids that.

Excessive switching shows up in several ways:

- **Too many threads.** A server that spawns a thread per connection spends more time switching than working once connections reach the thousands. This is why the [[Event Loop]] and [[Coroutine]] models handle many connections on few threads, switching between tasks in user space without involving the kernel.
- **Lock contention.** Threads repeatedly blocking on the same lock bounce on and off the CPU.
- **Oversubscription.** Running more busy threads than cores, for example several thread pools each sized to the core count, makes everything slower.

For latency-sensitive work, the goal is fewer, more predictable switches. Audio and game engines pin critical threads, raise their priority, and avoid blocking calls so the scheduler has no reason to take the core away. A switch at the wrong moment shows up as a dropped frame, an audio glitch, or [[Tail Latency]].

Context switching also has a human version, the cost of moving attention between tasks, covered under [[Attention Residue]].

## See also
- [[Simultaneous Multithreading]]
- [[Concurrency and Parallelism]]
- [[Load Average]]
- [[Lock-Free Data Structure]]
