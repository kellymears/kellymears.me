---
aliases:
  - MCU
  - Embedded system
tags:
  - systems
summary: A small, cheap computer on a single chip, combining processor, memory, and input and output pins, that runs one dedicated program inside appliances, toys, cars, and sensors, usually with no operating system at all.
---
A **microcontroller** is a small computer on a single chip, combining a processor, memory, and input and output pins. It runs one dedicated program, typically stored in on-chip flash memory, inside a device that doesn't look like a computer at all: a microwave, a thermostat, a television remote, a keyboard, a car's window motor. Billions are made every year, far outnumbering the processors in phones and laptops.

A microcontroller differs from a general-purpose processor in what it leaves out. A typical one has kilobytes of memory rather than gigabytes, runs at tens or hundreds of megahertz, and costs anywhere from cents to a few dollars. In exchange it needs almost no supporting parts, draws tiny amounts of power, and can sleep for months on a coin cell, waking only when something happens. Texas Instruments and Intel sold early single-chip designs in the 1970s.

Most of a microcontroller's character comes from its peripherals. Built-in hardware reads analog voltages from sensors, generates timed pulses to dim lights or drive motors, and talks to other chips over simple serial buses; see [[Pulse-width modulation]] and [[Serial Port]]. Programs often respond to the outside world through interrupts, which pause the main loop to handle an event the moment it arrives; see [[Interrupt]].

Many microcontrollers run no operating system. The program, often called firmware, starts at power-on and runs in an endless loop, poking hardware registers directly; see [[Firmware]]. Where timing guarantees matter, such as motor control or medical devices, a small real-time operating system schedules tasks with predictable deadlines; see [[Real-Time Operating System]]. Because nobody is around to restart a frozen device, a hardware timer resets it if the program stops checking in; see [[Watchdog Timer]].

Development happens on another machine. Code is written and compiled on a desktop computer for the microcontroller's instruction set, then written to the chip's flash over a debug connection; see [[Cross-Compilation]] and [[Instruction Set Architecture]]. Many designs keep program and data in separate memories, departing from the classic stored-program layout; see [[Von Neumann Architecture]]. Testing often wires the real chip to simulated inputs; see [[Hardware-in-the-Loop]].

The Arduino project, started in Italy in 2005, made microcontrollers approachable for artists, students, and hobbyists, with cheap boards and a simplified programming environment. Boards that speak USB directly let hobbyists build their own keyboards and game controllers; see [[Universal Serial Bus]].

Connecting microcontrollers to networks created the internet of things, and with it new problems: devices that run for years on firmware nobody updates, sometimes with default passwords; see [[Internet of Things]] and [[Over-the-Air Update]]. In harsh settings, such as satellites, even a stray cosmic ray can flip a bit in memory.

## See also
- [[Assembly Language]]
- [[Single-Event Upset]]
