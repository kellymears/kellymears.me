---
aliases:
  - Pulse-width modulation
  - PWM
  - PWM dimming
  - Temporal light artifacts
  - Stroboscopic effect
  - Phantom array
tags:
  - matter
summary: Rapid periodic changes in light output, usually from pulse-width-modulation dimming, that can go unseen yet still cause eye strain, headaches, and visible artifacts.
---
**LED flicker** is a rapid, periodic variation in the light output of an LED lamp or display. Most of it comes from how LEDs are dimmed. An LED's color and efficiency shift if its current is reduced, so many drivers instead use **pulse-width modulation (PWM)**: switching the LED fully on and off many times a second and varying the fraction of time spent on, the *duty cycle*. At 20% brightness the LED is on 20% of the time. The eye integrates the pulses into steady light, mostly.

Whether flicker matters depends on frequency and depth. Above roughly 80–100 Hz, most people stop seeing flicker as flicker when looking directly at the light. That threshold is not the end of the effects:

- **The stroboscopic effect.** Moving objects, such as a spinning fan or a waving hand, appear as a series of discrete positions rather than a smooth blur.
- **The phantom array.** When the eyes sweep quickly across a flickering source, it smears into a trail of separate dots. Many people notice this with tail lights and LED signs at well over 1,000 Hz.
- **Physiological effects** that are not consciously perceived. Some people, particularly those prone to migraine, report eye strain, headaches, or fatigue under low-frequency deep flicker. The IEEE 1789 recommendation (2015) frames safe ranges in terms of frequency and modulation depth together.
- **Camera banding.** Rolling-shutter cameras turn flicker into dark stripes in video, which is how many people first discover it.

Mains power adds its own flicker. Cheap LED drivers with poor smoothing pass through a ripple at twice the line frequency (100 or 120 Hz) at every brightness level, not only when dimmed.

The alternatives are known. **Constant-current reduction** dims by lowering current, avoiding flicker at a small cost in color consistency. **High-frequency PWM** in the tens of kilohertz pushes artifacts beyond what eyes or most cameras resolve. Displays face the same choice. Many OLED phone screens dim with low-frequency PWM at low brightness, which is why some people find one phone tolerable and another not. As with [[Reduced Motion]], the default that suits most people can still disable some, and [[Accessibility]] here means offering the choice. The same timing concerns appear on screens in [[Frame Pacing]]: steady output matters as much as average output.

## See also
- [[Color Temperature]]
- [[Apparent Motion]]
- [[Reduced Motion]]
- [[Accessibility]]
- [[Latency and Jitter]]
- [[Circadian Lighting]]
- [[Sensory Overload]]
- [[Aliasing]]
- [[Ohm's Law]]
- [[Semiconductor]]
- [[Capacitor]]
- [[Alternating Current]]
