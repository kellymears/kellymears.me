---
aliases:
  - WebGL
  - WGSL
  - WebGL 2
tags:
  - web
summary: The modern browser interface to the graphics card, successor to WebGL, which brings compute shaders to the web and makes in-browser machine learning and advanced 3D practical.
---
**WebGPU** is the browser's modern interface to the [[Graphics Processing Unit]]. It lets web pages render 3D graphics and, for the first time on the web in a first-class way, run general-purpose computation on the GPU. Developed by a W3C group including Apple, Google, Mozilla, and Microsoft, it shipped in Chrome in 2023, and Safari and Firefox followed in 2025.

Its predecessor is **WebGL**, released in 2011 and based on OpenGL ES, a mobile version of the long-standing OpenGL graphics API. WebGL brought hardware 3D to the web and powers maps, product viewers, games, and data visualizations, mostly through libraries such as Three.js. But OpenGL's design dates from the early 1990s, built around a global state machine where every setting changes shared state, and drivers spent much of their time validating that state on each [[Draw Call]].

Native graphics moved on to lower-level APIs, Vulkan, Apple's Metal, and Direct3D 12, which ask more of the programmer in exchange for less driver overhead. WebGPU is modeled on them:

- **Pipelines.** Render settings and [[Shader]] programs are compiled together into pipeline objects up front, so switching is cheap and stutter from compiling on first use is reduced.
- **Command buffers.** Work is recorded into buffers and submitted in batches, which can be prepared off the main thread.
- **Compute shaders.** Programs can run arbitrary parallel computation on the GPU without drawing anything.
- **WGSL.** Shaders are written in the WebGPU Shading Language, designed for the web and translated to each platform's native shader language.

Compute is the bigger change. GPU computation on the web previously meant disguising data as textures and math as pixel shaders in WebGL. With compute shaders, physics simulations, particle systems, video processing, and especially neural network inference run directly. Libraries now run a quantized [[Large Language Model]], speech recognition, or image models entirely in the browser, with no server, an approach that depends on [[Quantization]] to fit in memory and keeps user data on the device.

Graphics benefit too: large scenes with many objects, GPU-driven culling, and viewers for [[Gaussian Splatting]] scenes that need to sort millions of splats each frame.

Exposing a GPU to arbitrary web pages is a security challenge. Every call is validated before reaching the driver, shaders are checked to stop out-of-bounds memory access, GPU work runs in a separate sandboxed process, and timers are coarsened to limit side channels.

Support still varies across devices and operating systems, so sites detect WebGPU and fall back to WebGL, or to a static image, an application of [[Progressive Enhancement]]. A page draws to an [[HTML Canvas]] with either API, and heavy work can move into a [[Web Worker]]. Alongside [[WebAssembly]], WebGPU narrows the gap between web apps and native ones for demanding work.

## See also
- [[HTML Canvas]]
- [[Graphics Processing Unit]]
- [[Shader]]
- [[WebAssembly]]
