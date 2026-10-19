---
aliases:
  - Interrupts
  - IRQ
  - Interrupt handler
  - Hardware interrupt
  - Direct memory access
  - DMA
tags:
  - systems
summary: The signal a device uses to make the CPU stop what it is doing and attend to it, the mechanism behind keyboards, network cards, preemptive scheduling, and the trade-off with polling.
---
An **interrupt** is a signal that makes the CPU pause whatever it is running, handle an event, and then resume. When a key is pressed, a packet arrives, or a disk finishes a read, the device raises an interrupt instead of waiting for the CPU to notice. The CPU saves enough state to continue later, jumps to a handler registered for that interrupt number, and returns when the handler finishes.

The alternative is **polling**: the CPU checks each device repeatedly to see if it has anything. Polling wastes cycles when nothing is happening and adds delay between an event and its discovery. Interrupts let the CPU sleep or do other work until something needs it, and they remain central to every [[Kernel]].

Interrupts come in several kinds:

- **Hardware interrupts** from devices, identified by an interrupt request line or IRQ number. Linux lists them, with per-core counts, in `/proc/interrupts`.
- **Timer interrupts**, fired by a clock many times a second, let the [[CPU Scheduler]] take the processor back from a running program. Without them, a program that never yields would hold the CPU forever. Each one can trigger a [[Context Switch]].
- **Exceptions**, raised by the CPU itself for faults such as dividing by zero or touching an unmapped page. A page fault in [[Virtual Memory]] is an exception the kernel usually resolves silently.
- **Software interrupts**, deliberately triggered instructions, were the traditional way to make a [[System Call]] before faster dedicated instructions arrived.

Handlers must be fast, because while one runs, other work waits. Kernels split the job: a minimal *top half* acknowledges the device and grabs urgent data, and a deferred *bottom half* does the rest later with interrupts enabled.

**Direct memory access** reduces the load further. Instead of the CPU copying every byte from a device, the device writes straight into memory and raises one interrupt when a whole transfer is done.

Interrupts have limits under load. A fast network card can receive millions of packets per second, and an interrupt per packet would leave the CPU doing nothing else, a failure called an *interrupt storm* or receive livelock. Devices therefore coalesce interrupts, and Linux's networking switches to polling when traffic is heavy and back to interrupts when it is light.

Interrupt placement also affects latency. Which core handles a device's interrupts can be set by IRQ affinity, a cousin of [[CPU Affinity]], and spreading or isolating them matters for audio, gaming, and trading systems sensitive to [[Latency and Jitter]]. Interrupts also explain some hard-to-reproduce bugs: code interrupted at an unlucky moment can expose a [[Race Condition]] that appears once in millions of runs.

A [[Unix Signal]] is the user-space analog, an asynchronous notification delivered to a process.

## See also
- [[Translation Lookaside Buffer]]
- [[PCI Express]]
- [[Hardware-in-the-Loop]]
- [[Device Tree]]
- [[Real-Time Operating System]]
- [[Entropy Pool]]
