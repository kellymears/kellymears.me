---
aliases:
  - Twisted-pair cable
  - Crosstalk
  - Category 5 cable
  - Balanced line
tags:
  - networks
summary: Two insulated copper wires twisted around each other so that interference affects both equally and cancels out, a nineteenth-century telephone trick that still carries most wired office networks and the last stretch of many internet connections.
---
A **twisted pair** is two insulated copper wires wound around each other along their length. That simple twist solves a problem that plagued early telephony and makes ordinary copper usable at speeds far beyond what it was designed for.

Early telephone and telegraph lines often used a single wire with the earth as the return path; see [[Telegraph]]. They picked up hum from power lines, static and conversations on neighboring lines. Using two wires helped, and twisting them helped more. Alexander Graham Bell patented the twisted-pair approach in 1881, and it became the standard for connecting homes to the exchange; see [[Telephone Network]].

The physics is about symmetry. A changing magnetic field from a nearby cable induces a voltage in any wire it passes; see [[Electromagnetic Induction]]. In a twisted pair, each wire spends equal time on each side, so both pick up nearly the same interference. The signal is sent as a difference between the two wires, one going up while the other goes down, and the receiver reads only that difference. Interference that hits both wires equally subtracts away. This is called a **balanced line**, or differential signaling. Twisting also cuts the signal radiated from the pair itself, and giving neighboring pairs different twist rates keeps them from interfering with each other, a leak called **crosstalk**.

That trick let computer networks run on cheap phone-style cable. Twisted-pair [[Ethernet]] arrived in 1990 at 10 megabits per second over unshielded cable with ordinary plastic connectors. **Category 5 cable** carried 100 megabits, and its improved version gigabit speeds by sending data on all four pairs at once. Newer categories with tighter twists and better shielding reach 10 gigabits and beyond, typically over runs of up to 100 meters. The same cable can deliver power to phones, cameras and access points.

The legacy telephone pairs still reaching most homes have been reused again and again. Dial-up modems squeezed data into the voice band; see [[Modem]]. Digital subscriber lines used higher frequencies on the same copper, with speed falling as distance from the exchange grows, since the signal weakens while noise doesn't; see [[Signal-to-Noise Ratio]] and [[Last Mile]]. Fiber has replaced copper in many networks, but twisted pair remains cheaper to install and terminate over short distances; see [[Optical Fiber]].

Twisted pairs also hide inside many other cables. USB, HDMI, the networks connecting a car's electronics and industrial control systems all use differential pairs, because the principle works at any scale. Earlier office networks used other cabling, such as coaxial cable with metal shielding, and ring-shaped networks built on special shielded pairs; see [[Token Ring]].

## See also
- [[Faraday Cage]]
- [[Wave Interference]]
