---
aliases:
  - Main loop
  - Fixed timestep
  - Delta time
  - Frame-rate dependence
tags:
  - graphics
summary: The loop at the heart of every game, read input, advance the simulation, draw, repeat, and why tying the simulation to the frame rate breaks physics, durability, and jump heights.
---
The **game loop** is the cycle that runs a game. Each pass reads input, advances the simulation by a step, and draws a frame, then starts again, dozens or hundreds of times a second. Unlike most programs, which wait for events, a game runs continuously. Browsers expose the same pattern for animation through [[requestAnimationFrame]].

The hard question is how to handle time. Machines run at different speeds, and frame rates vary from moment to moment. There are two broad approaches:

- **Variable timestep.** Measure the time since the last frame, the *delta time*, and scale every movement by it. Simple, but physics becomes inconsistent: large steps let objects pass through walls, and results depend on the hardware.
- **Fixed timestep.** Advance the simulation in constant steps, such as 1/60 of a second, regardless of frame rate. An accumulator collects elapsed real time, and the loop runs as many fixed steps as fit. Glenn Fiedler's 2004 article *Fix Your Timestep!* made this the standard approach.

Fixed steps decouple simulation from rendering. A game might simulate physics at 50 or 60 steps per second while rendering at 144 frames, drawing each frame by interpolating between the last two simulation states so motion stays smooth. The leftover fraction in the accumulator gives the blend factor, a use of [[Linear Interpolation]].

Fixed steps also give [[Determinism]]. Same inputs, same steps, same results, which is what lockstep multiplayer and [[Rollback Netcode]] depend on, as do replays. [[Floating-Point Arithmetic]] can still differ across compilers and processors, so deterministic games are careful about it.

Games that tie logic to frame rate produce famous bugs:

- **Quake III Arena.** Physics rounding meant players could jump higher at certain frame rates, especially 125 fps, a trick competitive players relied on.
- **Dark Souls II.** On its 2014 PC release, weapons degraded twice as fast at 60 fps as at 30, because durability loss was counted per frame.
- **Bethesda games.** Running Skyrim or Fallout 4 above 60 fps sped up physics and broke scripted scenes until mods capped or decoupled it.

Several became [[Speedrun]] tricks.

A fixed step has its own trap, the *spiral of death*: if one step takes longer to compute than the time it represents, the loop falls further behind each frame and never catches up. Games cap steps per frame, accepting slow motion over freezing.

Where in the loop input is sampled, how many frames the CPU queues ahead of the GPU, and how frames reach the display all shape [[Input Latency]] and [[Frame Pacing]]. A loop that hitches, taking one long frame after many short ones, feels worse than one running steadily slower, which is why [[Game Feel]] depends on the loop as much as on the design.

## See also
- [[Soft Body Dynamics]]
- [[Scene Graph]]
- [[Dynamic Resolution Scaling]]
- [[Memory Allocator]]
- [[Verlet Integration]]
