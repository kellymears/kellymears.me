---
aliases:
  - Band gap
  - Doping
  - P-n junction
  - Transistor
  - Diode
tags:
  - matter
summary: Materials like silicon whose conductivity sits between metals and insulators and can be precisely tuned, the physics underneath transistors, LEDs, and solar cells.
---
A **semiconductor** is a material whose ability to conduct electricity falls between a metal's and an insulator's, and, more importantly, can be controlled. Silicon is the dominant example; germanium, gallium arsenide, and gallium nitride are others. Nearly all modern electronics, from processors to LEDs to solar panels, are built on that controllability.

The explanation lies in the **band gap**. Electrons in a solid can only have energies within certain bands. In a metal, the band holding the outermost electrons is partly empty, so electrons move freely and current flows. In an insulator, that band is full and the next empty one is far above it, so electrons are stuck. A semiconductor has the same structure as an insulator, but with a small gap, about 1.1 electron volts in silicon. A little energy, from heat or light, lifts some electrons across into the empty band, where they can carry current, and leaves behind *holes*, gaps that behave like positive charges moving the other way.

One consequence runs opposite to metals. Heating a metal increases its resistance, but heating a pure semiconductor lowers it, since more electrons jump the gap. Thermistors exploit that sensitivity.

The real power comes from **doping**, adding tiny amounts of other elements. A few parts per million of phosphorus, which has one more outer electron than silicon, gives *n-type* silicon with spare electrons. Boron, with one fewer, gives *p-type* silicon with spare holes. Engineers set conductivity by choosing where, and how much, to dope.

Where p-type meets n-type, a **p-n junction** forms, and it is the basic building block:

- **Diodes** pass current in only one direction across the junction.
- **LEDs** are diodes in which electrons falling across the gap release their energy as light. The size of the band gap sets the color, which is why blue LEDs, needing a wide-gap material, took until the 1990s and earned a Nobel Prize. LED drivers often dim by switching rapidly, the source of [[LED Flicker]].
- **Solar cells** run the process in reverse: light knocks electrons across the gap, and the junction sweeps them into a current.
- **Transistors** use junctions or an electric field to let a small signal switch a larger current. The first was built at Bell Labs in 1947. Today's chips pack billions of field-effect transistors, each a switch whose on and off states implement binary logic and, ultimately, [[Microcode]].

Semiconductor devices obey the same basic physics as other circuits, including [[Ohm's Law]] for their resistive parts, and they wear out in specific ways: [[Electromigration]] erodes tiny wires, and [[Electrostatic Discharge]] can puncture the thin insulating layers of a transistor. Heat matters throughout, governed by [[Heat Transfer]], since every switching transistor dissipates a little energy and billions of them add up.

## See also
- [[Hall Effect]]
- [[Photovoltaic Effect]]
- [[Superconductivity]]
- [[Solid-State Drive]]
- [[Thermoelectric Effect]]
