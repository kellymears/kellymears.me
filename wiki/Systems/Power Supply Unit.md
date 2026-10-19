---
aliases:
  - PSU
  - Switched-mode power supply
  - 80 Plus
tags:
  - systems
summary: The part that turns wall electricity into the steady low voltages a computer needs, usually by switching current on and off tens of thousands of times a second, whose efficiency, ripple and behavior under faults quietly shape a machine's stability.
---
A computer's **power supply unit** converts alternating current from the wall, at 120 or 230 volts, into the direct current its parts use. A desktop supply provides 12 volts for the processor and graphics card, plus 5 and 3.3 volts for older circuits and peripherals. Further conversion to each chip's exact voltage happens on the board and cards; see [[Alternating Current]] and [[Motherboard]].

The old way was a **linear supply**. A heavy transformer stepped the voltage down at the grid's 50 or 60 hertz, a rectifier turned it into pulsing direct current, and a regulator burned off the excess as heat. A transformer's size depends on the frequency it handles, so these supplies were heavy as well as wasteful; see [[Electromagnetic Induction]].

Nearly every modern device uses a **switched-mode** supply instead. It rectifies the mains first, then switches the resulting high-voltage direct current on and off tens or hundreds of thousands of times a second through a small transformer, and smooths the output with inductors and capacitors. A feedback loop adjusts how long each pulse lasts to hold the output steady as the load changes. At high frequency the transformer can be tiny, which is why a phone charger fits inside a plug; see [[Capacitor]] and [[Semiconductor]].

**Efficiency** decides how much of the input becomes heat. The 80 Plus program, started in 2004, certifies supplies that waste at most a fifth of their input at typical loads, with metal tiers from bronze to titanium for better results. Supplies are usually least efficient at very light load, so a huge unit in a mostly idle machine wastes power; see [[Computer Cooling]].

Output quality matters as much. **Ripple**, the small leftover wobble on the output, and slow recovery from sudden load jumps can cause crashes that look like software or memory faults. Recent graphics cards can spike far above their rated power for a few microseconds, which trips the protection circuits on some supplies and switches the machine off. A good unit also shuts down safely on short circuits, overloads and overheating rather than passing the damage on; see [[Ohm's Law]].

A supply keeps a small standby rail alive while the computer is off. It powers the power button itself, along with features such as charging over USB and waking from the network; see [[Wake-on-LAN]] and [[Suspend and Hibernation]]. Mains interruptions are a separate problem, since even a brief outage can corrupt files that were being written, which is why servers and careful users add an [[Uninterruptible Power Supply]].

The large capacitors inside a supply can hold a dangerous charge for some time after it's unplugged, which is why opening one is discouraged even when the machine is off.

## See also
- [[Thermal Throttling]]
- [[Electrostatic Discharge]]
