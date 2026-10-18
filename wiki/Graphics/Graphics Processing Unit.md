---
aliases:
  - GPU
  - Graphics card
  - VRAM
  - GPGPU
  - CUDA
  - Compute shader
tags:
  - graphics
summary: A processor built to run the same small program on thousands of data items at once, designed for pixels and now the engine of machine learning.
---
A **graphics processing unit (GPU)** is a processor designed for throughput rather than speed on a single task. A CPU has a handful of powerful cores built to run one thread of complicated, branching code as fast as possible. A GPU has thousands of simpler cores that run the same small program on huge amounts of data at once, which suits graphics, where every pixel and vertex needs similar work.

NVIDIA marketed the GeForce 256 in 1999 as the first GPU, because it moved geometry transformation and lighting off the CPU. Early GPUs were *fixed-function*, able to do only what their circuits were built for. Programmable [[Shader]] stages arrived around 2001, and by 2006 GPUs used unified shader cores that could run any stage of the work.

Several design choices explain how GPUs behave:

- **Lockstep execution.** Threads run in groups, 32 at a time on NVIDIA hardware, that execute the same instruction together. If threads in a group take different branches of an `if`, the group runs both paths, so heavily branching code wastes much of the chip.
- **Hiding latency with numbers.** Rather than large caches to avoid waiting on memory, a GPU keeps thousands of threads in flight and switches to another group the moment one stalls.
- **Bandwidth.** Video memory (VRAM) is built for enormous throughput; a high-end card moves around a terabyte per second. VRAM capacity limits texture detail and the size of models that fit.
- **Remaining fixed-function hardware.** Units still handle [[Rasterization]], texture sampling, and, on recent cards, ray-triangle intersection for [[Ray Tracing]] and matrix math for neural networks.

Programs don't call the GPU directly. They record commands through a graphics API, such as OpenGL, Direct3D, Vulkan, or Metal, and a driver translates them into the hardware's own instructions. Each submission has CPU overhead, which is why reducing [[Draw Call]] counts matters, and why compiling shaders for a specific GPU can cause [[Shader Compilation Stutter]]. An [[API Translation Layer]] maps one API onto another, letting Windows games run on Linux.

**General-purpose GPU computing** began when researchers disguised calculations as graphics. NVIDIA's CUDA platform (2007) and *compute shaders* made it direct. In 2012, the AlexNet image classifier, trained on two consumer gaming GPUs, won the ImageNet competition by a wide margin and started the deep learning boom. Training and running a [[Large Language Model]] is mostly matrix multiplication, an ideal GPU workload, and VRAM limits on running models locally drive [[Quantization]].

The work a GPU does each frame is a pipeline: transform vertices of a [[Polygon Mesh]] with [[Perspective Projection]], rasterize triangles, apply [[Texture Mapping]] and lighting in shaders, then run [[Post-Processing]]. High-end cards now draw 450 watts or more under load, so cooling and [[Thermal Throttling]] shape their sustained performance as much as their specifications do.

## See also
- [[Virtualized Geometry]]
- [[Inference Serving]]
