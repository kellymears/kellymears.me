---
aliases:
  - NDT
  - Nondestructive evaluation
  - Ultrasonic testing
  - Dye penetrant
tags:
  - testing
summary: Inspecting materials and structures for hidden flaws without damaging them, using dyes, magnets, sound, electric currents, and radiation, and the reason aircraft and rails are scheduled for inspection before cracks can grow to failure.
---
**Non-destructive testing** (NDT) is the family of methods for finding flaws in materials and structures without damaging them. A destructive test, such as pulling a sample until it breaks, says a lot about the sample and nothing about the part still in service. NDT inspects the part itself, so it can be used on every aircraft wing, pipeline weld, and rail.

The main methods each exploit a different physical effect:

- **Visual inspection.** Still the most common, often aided by magnifiers and borescopes.
- **Dye penetrant.** A colored or fluorescent liquid is wiped on and seeps into surface cracks. After the surface is cleaned, the trapped dye bleeds out and glows under ultraviolet light; see [[Fluorescence]].
- **Magnetic particle.** A steel part is magnetized and dusted with iron particles. A crack disrupts the field and particles gather along it; see [[Magnetism]].
- **Eddy current.** A coil induces swirling currents in a conductive part, and a crack or thinning changes how they flow, which the coil detects; see [[Electromagnetic Induction]].
- **Ultrasonic testing.** Pulses of high-frequency sound travel through the part and echo off internal flaws, timed like sonar; see [[Sound]].
- **Radiography.** X-rays or gamma rays pass through the part onto film or a detector, revealing voids and inclusions. CT scanning builds a 3D image the same way.
- **Thermography.** Infrared cameras spot flaws by how they disturb heat flow; see [[Electromagnetic Spectrum]].

The stakes became clear in aviation. In 1954 two de Havilland Comet jetliners broke apart in flight from fatigue cracks that grew from corners of the fuselage's openings; see [[Material Fatigue]]. In 1988 a section of roof tore off Aloha Airlines Flight 243, a heavily used Boeing 737, after corrosion and cracks along rivet lines went unnoticed; see [[Oxidation]]. Both led to stricter inspection regimes for aging aircraft.

Modern practice follows a **damage tolerance** philosophy: assume small cracks exist, calculate how fast they could grow under load, and set inspection intervals so that a crack missed once will be caught before it reaches a critical size. Every method has a probability of detection that falls for smaller flaws, so intervals include margin for misses. The resulting arguments feed a structure's [[Safety Case]] and [[Fault Tree Analysis]].

Inspection also catches what the failure curve predicts. Manufacturing flaws found early belong to the infant mortality region, and cracks found later mark the start of wear-out; see [[Bathtub Curve]].

Software testing has close parallels. Inspecting a running system without taking it down is the logic of [[Testing in Production]] and [[Synthetic Monitoring]], and choosing whether to look inside the part or only probe its surface echoes [[Black-Box and White-Box Testing]].

## See also
- [[Stress Fracture]]
- [[Risk-Based Testing]]
