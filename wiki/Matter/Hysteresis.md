---
aliases:
  - Hysteresis loop
  - Deadband
  - Schmitt trigger
tags:
  - matter
summary: The dependence of a system's state on its history as well as its present input, seen in magnets, rubber, and freezing water, and built deliberately into thermostats and switches so they don't flicker at a threshold.
---
**Hysteresis** is the dependence of a system's state on its history, not just on the conditions acting on it now. Push it one way and it follows one path; push it back and it returns along a different one. The word comes from the Greek for lagging behind, and was coined in the 1880s by the physicist James Alfred Ewing to describe magnetism.

Magnetism is the classic case. Expose a piece of iron to a growing magnetic field and it becomes magnetized; reduce the field to zero and some magnetization remains. Driving the field up and down traces a closed loop on a graph instead of a single line; see [[Magnetism]]. The leftover magnetism is what makes permanent magnets and magnetic data storage possible, since a stored bit is a region that stays the way it was last set. The area inside the loop is energy lost as heat on every cycle, which is why transformer cores use special soft iron alloys with narrow loops; see [[Electromagnetic Induction]].

Materials show it mechanically too. Rubber stretched and released returns less energy than it absorbed, the difference becoming heat. That loss is most of a tire's [[Rolling Resistance]], and it's why a bouncing ball rises a little less each time; see [[Elasticity]]. Water shows it in phase changes: carefully cooled, it can stay liquid below its freezing point, then freeze suddenly, while ice melts promptly at zero; see [[Supercooling]].

Engineers also add hysteresis on purpose. A thermostat that switched the heat on below 20 degrees and off above 20 degrees would click on and off constantly as the temperature wavered around the line, wearing out the furnace. Instead it turns on at 19.5 and off at 20.5. The gap between thresholds, called a **deadband**, trades a little precision for stability; see [[Thermoregulation]] and [[Homeostasis]]. Electronics does the same with the **Schmitt trigger**, a circuit described by Otto Schmitt in the 1930s, whose output switches high at one voltage and low only at a lower one, so a noisy signal near the threshold produces one clean transition instead of a burst of them.

The pattern recurs wherever a decision flips at a boundary:

- **Software.** Rendering engines swap detailed models for simpler ones at one distance and back at a slightly closer one, so an object hovering at the threshold doesn't flicker; see [[Level of Detail]]. Input handling ignores repeat signals within a window for the same reason; see [[Debouncing]].
- **Systems.** Autoscalers and [[Circuit Breaker]] logic use different trip and reset conditions to avoid oscillating between states; see [[Feedback Loop]].

In each case, knowing the present input isn't enough to predict the state; you also need to know where it came from; see [[Path Dependence]].

## See also
- [[Material Fatigue]]
- [[Plate Tectonics]]
- [[Gray Code]]
