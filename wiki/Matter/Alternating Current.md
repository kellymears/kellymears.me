---
aliases:
  - AC power
  - Direct current
  - War of the currents
  - Mains electricity
tags:
  - matter
summary: Electric current that reverses direction many times a second, which won the power grid because transformers can step its voltage up for transmission and down for use.
---
**Alternating current** (AC) is electric current that reverses direction periodically, typically 50 or 60 times a second. Its voltage rises and falls in a smooth sine wave, a form of [[Simple Harmonic Motion]]. **Direct current** (DC) flows steadily one way, as from a battery. Wall outlets supply AC; nearly all electronics run on DC internally.

AC won the grid for one reason: transformers. A transformer is two coils on an iron core; a changing current in one induces a current in the other, with voltage scaled by the ratio of turns; see [[Electromagnetic Induction]]. Because it needs a *changing* current, it works only with AC.

Raising voltage matters because of losses. Power is voltage times current, and losses in a wire grow with the square of current; see [[Ohm's Law]] and [[Work and Power]]. Sending the same power at 100 times the voltage needs a hundredth of the current and loses a ten-thousandth as much as heat. So power plants step voltage up to hundreds of thousands of volts for long-distance lines, and transformers step it down near homes to a safer 120 or 230 volts.

That advantage settled the "war of the currents" in the late 1880s. Thomas Edison's company built DC systems, which in that era couldn't change voltage efficiently, so plants had to be within about a mile of customers. George Westinghouse, using Nikola Tesla's patents for AC motors and systems, could send power from distant plants. Edison campaigned on AC's dangers, but AC prevailed, starting with the Niagara Falls power station in 1895.

AC's other advantages:

- **Motors.** AC creates rotating magnetic fields naturally, so simple, robust induction motors run directly from it; see [[Electric Motor]].
- **Generation.** Spinning generators naturally produce AC.
- **Interrupting.** Since AC passes through zero twice per cycle, arcs are easier to break in switches.

The grid's frequency is a shared heartbeat. Every generator on a grid spins in synchrony, and frequency drops slightly when demand exceeds supply, which operators watch to balance the system. Clocks once kept time by counting cycles.

DC is returning, though. Electronics convert AC to DC, using diodes and [[Capacitor]]s to smooth the result. Solar panels and batteries produce and store DC, so they need inverters to feed the grid; see [[Photovoltaic Effect]] and [[Lithium-Ion Battery]]. Modern power electronics built on the [[Semiconductor]] can now convert DC voltages efficiently, so the longest and undersea transmission lines increasingly use high-voltage DC, which avoids AC's losses from charging the line's capacitance each cycle.

Cheap dimmers and LED drivers that pass AC ripple through cause visible [[LED Flicker]] at twice the mains frequency.

## See also
- [[Resonance]]
- [[Magnetism]]
- [[Nuclear Fission]]
- [[Electrolysis]]
- [[Northeast Blackout of 2003]]
