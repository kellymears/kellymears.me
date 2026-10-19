---
aliases:
  - Nice
  - Niceness
  - I/O priority
tags:
  - systems
summary: The settings that tell an operating system which programs deserve the processor and the disk first, from the Unix nice value to real-time priorities, and why raising one program's priority can starve or deadlock others.
---
When more programs want to run than there are processor cores, the operating system's scheduler decides who goes next. **Process priority** is how users and programs influence that choice; see [[CPU Scheduler]] and [[Process]].

On Unix-like systems, the main control for ordinary programs is the **nice** value, running from −20 to 19 with 0 as the default. The name reflects the intended use: a higher number makes a program "nicer" to others by yielding more of the processor. Any user can make their own programs nicer, so a long compile or backup can run in the background without making the desktop sluggish. Making a program less nice requires administrator rights; see [[Superuser]]. On Linux's schedulers, each step changes a program's share of the processor by roughly ten percent relative to its competitors, so nice 19 gets a small fraction of what nice 0 gets but still runs when the machine is otherwise idle.

Above ordinary priorities sit **real-time** policies, which aren't shared fairly at all. A runnable real-time thread always runs ahead of normal ones, and among themselves real-time threads are ordered strictly by priority. Audio software uses this so sound never stutters; see [[Sound Server]]. A runaway real-time thread can lock out everything else, so Linux by default reserves a small slice of each second for normal tasks; see [[Real-Time Operating System]].

The processor isn't the only contested resource. **I/O priority** controls the order of disk requests, so a backup can be told to read only when nothing else needs the disk. Control groups extend the idea to whole groups of processes, setting relative weights or hard limits on processor time, memory and I/O, which is how service managers and container runtimes keep one service from crowding out the rest; see [[Control Groups]] and [[Systemd]].

Priority creates its own failure modes:

- **Starvation.** A low-priority task may never run if higher-priority work never stops; see [[Resource Starvation]]. Schedulers often boost tasks that have waited a long time.
- **Priority inversion.** A high-priority task waits on a lock held by a low-priority one, which in turn can't run because medium-priority tasks keep preempting it. In 1997 this kept resetting the Mars Pathfinder lander until engineers enabled priority inheritance remotely; see [[Deadlock]].

Priority also interacts with processor layout. On chips with both fast and efficient cores, schedulers may steer high-priority work to the fast cores, and administrators can pin processes to specific cores directly; see [[Hybrid CPU Architecture]] and [[CPU Affinity]].

When a machine feels slow, the cause is often contention rather than any single program, which is what tools reporting load and stall time help diagnose; see [[Load Average]] and [[Pressure Stall Information]].

## See also
- [[Context Switch]]
- [[Thread Pool]]
