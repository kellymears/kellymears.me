---
aliases:
  - Shader stutter
  - Shader cache
  - Pipeline compilation
  - PSO caching
tags:
  - graphics
summary: Frame hitches caused by compiling GPU programs the first time they are needed, and the caching schemes that try to move that work elsewhere.
---
**Shader compilation stutter** is the hitch a game shows the first time it draws something that needs a GPU program not yet compiled for the current hardware. A [[Shader]] ships in an intermediate form (bytecode such as DXIL or SPIR-V) and has to be compiled by the driver into machine code for the specific GPU before it can run. Modern graphics APIs bundle shaders with fixed rendering state into *pipeline state objects*, and a large game can need tens of thousands of combinations. Compiling one takes milliseconds to hundreds of milliseconds. Done on the render thread, at the moment a new effect first appears, that is a visible freeze: the first explosion, the first time in a new area.

It is a caching problem with an awkward cache key. The compiled result depends on the shader, the pipeline state, the GPU model, and the driver version. Change any of them and the cache is invalid. That leads to a set of familiar behaviors:

- **Precompilation at launch.** Many games compile everything up front behind a progress bar. It is slow the first time and after every driver update, and it only covers combinations the developers knew to enumerate.
- **Stutter after updates.** A driver update or a switch to a different [[API Translation Layer]] build silently empties the cache, and the game hitches again until it rebuilds. Deleting a stale cache is also a standard troubleshooting step, because a corrupt or mismatched entry can cause crashes instead of stutter.
- **Shared caches.** On a fixed hardware target, a console or a handheld, the platform can ship precompiled shaders, because the cache key is the same for every player. Some PC storefronts distribute caches gathered from other players with identical configurations.
- **Asynchronous compilation.** Compiling in the background and drawing something approximate, or nothing, until it is ready trades a hitch for a visual pop.

The general shape is [[Memoization]] where the key includes the environment, and [[Cache Invalidation]] driven by changes the application cannot see. Because the stutter happens once per combination, a benchmark run twice in a row understates it badly, a measurement trap that favors the second run.

## See also
- [[Shader]]
- [[Frame Pacing]]
- [[Compiler]]
- [[Cache Invalidation]]
- [[Memoization]]
- [[Lazy Evaluation]]
- [[Amortized Analysis]]
- [[Draw Call]]
- [[Graphics Processing Unit]]
