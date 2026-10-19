---
aliases:
  - Translation layer
  - Compatibility layer
  - Wine
  - Proton
  - DXVK
tags:
  - graphics
summary: Software that implements one platform's API on top of another's, so unmodified programs run somewhere they were never built for.
---
An **API translation layer** implements one platform's programming interface on top of another's, so a program built for the first runs unmodified on the second. Wine implements the Windows API on Linux and macOS. DXVK and VKD3D-Proton implement Direct3D 9–11 and 12 on top of Vulkan. Proton bundles them so Windows games run on Linux without being ported. Unlike [[Emulation]], nothing is simulated at the instruction level. The program's own machine code runs natively, and only its calls into the platform are redirected, so overhead can be close to zero.

The work is harder than mapping one function to another, for three reasons:

- **The specification is not enough.** Real programs depend on undocumented behavior, driver quirks, and outright bugs of the original platform, which is [[Hyrum's Law]] at the scale of an operating system. A translation layer that follows the specification exactly will fail games the original happens to tolerate. Much of the code exists to reproduce the original's accidents, and per-application workaround lists keep growing.
- **Semantics don't line up.** Two graphics APIs can disagree about memory models, synchronization, and when state becomes immutable. Bridging them can need extra work at runtime, such as translating [[Shader|shaders]] on the fly, which turns into [[Shader Compilation Stutter]] when it lands on the render thread.
- **Versions matter a great deal.** Support for a new game often arrives in a specific release, and so do regressions. "Which version of the layer" belongs in every bug report next to the driver version. Pinning a known-good version per application, instead of tracking the latest, is ordinary practice, the same idea as a [[Lockfile]].

Failures in this stack can be misleading. A hang or a [[Graphics Processing Unit|GPU]] fault can come from the game, the translation layer, the driver, or the hardware, and they look alike from the outside. A [[Reproducible Case]] and changing [[Root Cause Analysis|one variable at a time]] are the only reliable ways through.

Translation layers are also a [[Game Preservation]] mechanism: a game that runs through one no longer depends on its original platform still existing. Much as [[Containerization|a container]] does for a service, the layer gives an old program the environment it expects.

## See also
- [[Graphics API]]
- [[Application Binary Interface]]
- [[Dual Boot]]
- [[Graphics Driver]]
- [[Display Server]]
