---
aliases:
  - Heat sink
  - Liquid cooling
  - Fan curve
tags:
  - systems
summary: Moving the heat that chips produce away from them, through heat sinks, fans, heat pipes, and liquid loops, since nearly every watt a computer draws becomes heat and hot silicon slows down, wears faster, and eventually fails.
---
**Computer cooling** is the job of moving heat away from the chips that produce it. Nearly every watt a computer draws ends up as heat, and modern processors and graphics cards can draw hundreds of watts from a few square centimeters of silicon. Left alone, they would overheat within seconds.

The heat comes from switching. Each time a transistor changes state, it charges and discharges tiny capacitances, and the energy spent rises with clock speed and with the square of voltage. That's why raising clock speeds, which usually requires more voltage, makes chips so much hotter; see [[Dynamic Voltage and Frequency Scaling]].

The basic tool is the **heat sink**, a block of copper or aluminum with many thin fins that spread heat over a large surface area for air to carry away. Surfaces that look flat are rough at a microscopic level, so a thin layer of thermal paste fills the air gaps between chip and sink. Fans push air through the fins.

**Heat pipes** move heat far better than solid metal. Each is a sealed copper tube holding a small amount of fluid: it evaporates at the hot end, carrying heat as vapor, condenses at the cool end, and flows back through a wick. Laptops rely on them to carry heat from chips to small fans at the edge of the case.

**Liquid cooling** pumps water through a block on the chip to a radiator elsewhere. Water's high heat capacity lets it absorb a lot of heat with little temperature rise, and the radiator can be larger than anything that would fit on the chip. Some data centers go further and immerse whole servers in non-conductive fluid.

Fans are controlled by a **fan curve**, which maps temperature to speed. A good curve stays quiet at idle and ramps under load, with some delay or margin so fans don't hunt up and down around a threshold; see [[Hysteresis]]. Modern fans take their speed from a rapidly switched control signal.

When cooling can't keep up, chips protect themselves by slowing down, which is why a laptop can be fast for a minute and then sluggish. Heat also shortens hardware life by accelerating wear inside the chip. Chips from the same production line differ in how much heat they produce at a given speed.

At data center scale, cooling is a large share of the total energy bill, and operators track how much power goes to computing versus overhead. Some cooling systems use refrigeration cycles, which move heat uphill at an energy cost; see [[Vapor-Compression Refrigeration]].

## See also
- [[Hybrid CPU Architecture]]
- [[Motherboard]]
