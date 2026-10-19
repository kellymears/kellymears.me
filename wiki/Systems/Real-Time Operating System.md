---
aliases:
  - RTOS
  - Real-time computing
  - Hard real-time
tags:
  - systems
summary: An operating system built to meet timing deadlines predictably rather than to be fast on average, used in cars, aircraft, medical devices, and the firmware inside everyday electronics.
---
A **real-time operating system** (RTOS) guarantees that tasks respond within fixed time limits. "Real-time" doesn't mean fast; it means *predictable*. A desktop system that usually responds in a millisecond but occasionally takes a second is fine for a web browser and unacceptable for an airbag controller, which must fire within a few milliseconds every time.

Real-time requirements come in degrees:

- **Hard real-time.** Missing a deadline is a failure, possibly a dangerous one: anti-lock brakes, flight controls, pacemakers, industrial robots.
- **Firm real-time.** A late result is worthless but not catastrophic, such as a dropped frame in a video stream.
- **Soft real-time.** Lateness degrades quality gradually, as with audio processing or games, where occasional delays cause glitches.

General-purpose systems optimize throughput and average latency, and accept unpredictable delays to get them. An RTOS gives up some average speed to bound the worst case, the same priority that drives attention to [[Tail Latency]] in services. Its design choices follow:

- **Priority scheduling.** The highest-priority ready task always runs, immediately preempting lower ones. The [[CPU Scheduler]] in a general system balances fairness instead.
- **Bounded operations.** Every kernel operation, from a [[Context Switch]] to handling an [[Interrupt]], must have a known maximum time. That rules out features with unpredictable pauses, such as memory allocation at arbitrary times, [[Virtual Memory]] paging, and [[Garbage Collection]] in the critical path.
- **Small size.** Many RTOSes, such as FreeRTOS and Zephyr, run on microcontrollers with kilobytes of memory, often with no memory protection between tasks.

Priority scheduling has a famous trap called **priority inversion**. A low-priority task holds a lock that a high-priority task needs, while a medium-priority task, needing neither, keeps preempting the low one. The high-priority task waits indefinitely on the lowest. This happened to NASA's Mars Pathfinder lander in 1997, whose computer kept resetting as a [[Watchdog Timer]] detected the stalled task. Engineers diagnosed it from Earth and uploaded a fix enabling *priority inheritance*, where a task holding a lock temporarily takes the priority of the highest task waiting for it. It's a cousin of [[Deadlock]] and [[Resource Starvation]].

Proving deadlines are met requires knowing each task's worst-case execution time, which modern processors make hard, since caches and branch prediction make timing vary; see [[Speculative Execution]]. Safety-critical systems often use simpler processors, disable caches, or rely on static analysis and [[Formal Verification]].

Linux, a general-purpose [[Kernel]], has long had patches to improve its predictability, merged into the mainline kernel in 2024, making it usable for soft and some firm real-time work such as audio production and robotics. Hard real-time systems still typically use a dedicated RTOS, sometimes alongside Linux on a separate core. Most people own dozens of devices running an RTOS, in their cars, appliances, and earbuds, where [[Determinism]] matters more than features.

## See also
- [[Sound Server]]
- [[Process Priority]]
