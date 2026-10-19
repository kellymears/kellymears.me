---
aliases:
  - GPU driver
  - Mesa
  - Kernel mode setting
tags:
  - systems
summary: The software that translates a program's drawing commands into instructions a particular graphics card can execute, split between a kernel part that manages memory and displays and a large user-space part that compiles shaders and implements graphics interfaces.
---
A graphics card is useless without a driver. Programs speak standard interfaces such as Vulkan, OpenGL or Direct3D; each GPU understands only its own private command format and instruction set. The **graphics driver** bridges the two, and it's among the largest and most complex pieces of software on a typical computer; see [[Graphics API]] and [[Graphics Processing Unit]].

Modern drivers come in two halves:

- **A kernel part** runs with full privileges. It allocates video memory, schedules work from different programs onto the GPU, handles interrupts when work finishes, and recovers the GPU when a program hangs it. It also sets display modes, choosing resolution and refresh rate for each monitor. Linux moved mode setting into the kernel, as **kernel mode setting**, around 2008, so the console and the graphical desktop no longer fought over the hardware; see [[Kernel]] and [[Protection Ring]].
- **A user-space part** loads into each program. It implements the API, tracks state, and compiles shaders from portable intermediate code into the GPU's machine code; see [[Shader]]. Because compilation happens on the user's machine, games can stutter the first time they meet a new effect; see [[Shader Compilation Stutter]].

Drivers do much more than translate. They contain workarounds for hardware bugs and frequently detect specific popular games and swap in tuned code paths, which is one reason new driver releases advertise performance gains in particular titles. They manage power, raising and lowering clock speeds as load changes; see [[Dynamic Voltage and Frequency Scaling]]. And they coordinate with the display system to present finished frames without tearing; see [[Display Server]] and [[Screen Tearing]].

On Linux, open-source drivers for most hardware live in two places: the kernel and **Mesa**, a project begun in 1993 as an independent OpenGL implementation that grew into the user-space half of most open drivers. NVIDIA long shipped a closed driver with its own kernel module, which had to be rebuilt for each kernel and sometimes broke on updates; from 2022 the company began publishing open-source kernel modules for recent GPUs. On Windows, drivers follow a model introduced in 2006 that moved most of the code out of the kernel, so a driver crash can reset the display rather than take down the whole system; see [[Kernel Panic]].

Driver quality matters enormously. A driver bug can corrupt rendering, leak memory or freeze the machine, and some kinds of instability that look like hardware failure turn out to be driver issues, and the reverse. When problems appear after an upgrade, rolling back or holding a driver at a known-good version is a standard response; see [[Package Manager]].

Translation layers stack on top: a Direct3D game can run on Vulkan through a library that converts its calls; see [[API Translation Layer]].

## See also
- [[Firmware]]
- [[Graphics Pipeline]]
