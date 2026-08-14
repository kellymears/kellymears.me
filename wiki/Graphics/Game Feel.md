---
aliases:
  - Juice
  - Game juice
tags:
  - graphics
summary: The perceptual layer between input and simulation, and the tuning that makes a control scheme read as responsive.
---
**Game feel** is the perceptual layer between a player's input and the simulation underneath. Steve Swink's 2008 book of that name defines it as real-time control of a virtual body in a simulated space, refined by polish — the sounds, particles and secondary motion that give an action apparent weight. None of it changes what the simulation computes; all of it changes what the player believes it computed.

The vocabulary is small and largely portable. **Input buffering** accepts a press made slightly before its window opens and fires it when the window arrives. **Coyote time** leaves a jump available for a few frames after the character has left the ledge. **Hitstop** freezes both parties on impact, communicating force through the absence of motion. **Screen shake** and impact flashes supply magnitude. **Animation timing** — startup, active and recovery frames, and the windows in which an animation may be cancelled — decides whether an input feels obeyed or ignored.

The useful claim is that "the controls feel wrong" is almost always a tuning problem rather than a physics problem. The instinct is to change gravity or acceleration constants; the fault is more often thirty milliseconds of uncancellable startup, an input sampled once per rendered frame instead of once per fixed step, a deadzone that swallows small stick movements, or a linear ramp where the eye expects an [[Easing]] curve. The rules that govern interface [[Motion Design]] apply here, because the player is reading motion.

Two adjacent concerns. Consistency requires a fixed timestep and clean [[Determinism]], since a feel tuned against a variable frame rate is not reproducible. And several of these effects are hostile to some players: shake and camera sway belong behind [[Reduced Motion]] settings, while buffering and coyote time are quietly among the most effective [[Accessibility]] measures a game can ship.

## See also
- [[Roguelike]]
- [[Game AI]]
- [[Environmental Storytelling]]
- [[Rasterization]]
