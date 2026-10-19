---
aliases:
  - Vulkan
  - OpenGL
  - DirectX
  - Direct3D
  - Metal
tags:
  - graphics
summary: The programming interfaces through which software drives the GPU, from the driver-heavy OpenGL era to explicit modern APIs like Vulkan, Direct3D 12, and Metal.
---
A **graphics API** is the interface software uses to drive a [[Graphics Processing Unit]]. Applications describe geometry, textures, and [[Shader]] programs through the API, and the GPU vendor's driver translates those calls into commands for the specific hardware. Each GPU model has its own instruction set and quirks; the API lets one program run across them.

The main APIs:

- **OpenGL**, from Silicon Graphics in 1992, was the cross-platform standard for decades and is now maintained by the Khronos Group. Its mobile variant, OpenGL ES, became the basis of WebGL.
- **Direct3D**, part of Microsoft's DirectX family since the mid-1990s, dominates Windows and Xbox games. DirectX also covered sound and input, which is why the name is often used loosely for the whole stack.
- **Metal**, introduced by Apple in 2014, is the native API on Apple platforms. Apple deprecated OpenGL in 2018.
- **Vulkan**, released by Khronos in 2016 and descended from AMD's Mantle, is the cross-platform modern API on Windows, Linux, and Android.
- **WebGPU** brings a modern design to browsers, mapping onto Vulkan, Metal, or Direct3D 12 underneath.

The big shift came in the mid-2010s, from **implicit** to **explicit** APIs. OpenGL and Direct3D 11 hid a great deal: the driver tracked state, managed memory, synchronized work between the processor and GPU, and compiled shaders whenever it decided to. That made them easier to use but unpredictable. Drivers grew enormous and full of game-specific workarounds, and every draw call carried overhead on one processor thread.

Vulkan, Direct3D 12, and Metal moved those responsibilities to the application. Programs allocate GPU memory themselves, record command buffers on many threads, insert their own synchronization barriers, and build pipeline state objects in advance. The result is lower overhead and more predictable performance in skilled hands, but far more code: drawing a first triangle in Vulkan famously takes around a thousand lines. Getting synchronization wrong produces corrupted frames or crashes that vary by vendor, so validation layers that check API usage at runtime are essential during development.

Pipeline state objects bundle shaders with fixed settings so they can be compiled once. When an engine doesn't create them ahead of time, compilation happens mid-game and causes [[Shader Compilation Stutter]].

Most developers never touch these APIs directly. Game engines and frameworks abstract over them so one codebase targets every platform. On the other side, an [[API Translation Layer]] converts one API into another, such as Direct3D into Vulkan, which is how Windows games run on Linux. Shader languages differ too, GLSL, HLSL, and Metal Shading Language, and toolchains cross-compile between them through an intermediate representation, much as a [[Compiler]] targets several machines.

The API also shapes how frames reach the screen, through the swap chain and its presentation modes.

## See also
- [[Rasterization]]
- [[Graphics Driver]]
