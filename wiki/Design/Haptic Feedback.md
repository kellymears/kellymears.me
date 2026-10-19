---
aliases:
  - Haptics
  - Force feedback
  - Vibration feedback
tags:
  - design
summary: Using touch, through vibration, force, and texture, to tell people that an action registered or something happened, from game controller rumble to the faint click of a glass trackpad that does not actually move.
---
**Haptic feedback** communicates through the sense of touch, using vibration, force, or simulated texture. It tells people that a press registered, a value crossed a threshold, or something needs attention, without asking them to look. The word comes from the Greek for "able to touch."

Touch is a fast and private channel. Receptors in the skin detect vibration and pressure, and a sense of the body's own position tells people where their hands are without looking; see [[Proprioception]]. Haptic responses arrive faster than visual ones are noticed, which is why physical buttons feel more certain than glass.

The hardware has progressed through several generations:

- **Eccentric rotating mass motors.** A small motor spinning an off-center weight, as in early pagers, phones, and controllers. Cheap but slow to start and stop, producing a buzzy rumble; see [[Electric Motor]].
- **Linear resonant actuators.** A mass on a spring driven back and forth at its natural frequency, which can start and stop within milliseconds and produce crisp taps; see [[Resonance]] and [[Simple Harmonic Motion]].
- **Piezoelectric actuators.** Materials that change shape under voltage, giving very sharp, precise clicks; see [[Piezoelectric Effect]].
- **Force feedback.** Motors that push back against the user, in steering wheels, flight sticks, and adaptive controller triggers that stiffen to mimic a drawn bow.

A well-known demonstration is the trackpad that doesn't move. Some laptop trackpads are fixed glass plates: a pressure sensor detects a press, and an actuator delivers a short lateral tap that the finger reads as a mechanical click. Most people can't tell the difference, and the "click" can be made stronger or lighter in settings.

In interfaces, haptics work best as confirmation and texture rather than alarm:

- **Confirmation.** A light tap when a toggle flips or a payment completes, reassuring without demanding a look; see [[Calm Technology]].
- **Detents.** Ticks as a slider passes marked values, or a bump when a dragged item snaps into place; see [[Direct Manipulation]].
- **Warnings.** A distinct pattern for errors, as long as it is rare enough to stay meaningful.
- **Games.** Rumble for impacts and textures for surfaces, a large part of how a game feels to play; see [[Game Feel]].

Overuse dulls it. Vibration on every keypress or notification teaches people to ignore it, then to switch it off; see [[Habituation]]. Strong vibration can also be uncomfortable for people with sensory sensitivities, so it should be adjustable; see [[Sensory Processing]] and [[Inclusive Design]]. Haptics also help accessibility, giving blind and low-vision users confirmation without sound, but can't be the only channel for important information, since some devices lack them and some people disable them; see [[Accessibility]].

## See also
- [[Bottom Sheet]]
- [[Hit Stop]]
- [[Pull-to-Refresh]]
