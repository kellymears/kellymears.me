---
aliases:
  - Li-ion battery
  - Lithium-ion
  - Battery
  - Battery degradation
  - Thermal runaway
  - LFP battery
tags:
  - matter
summary: The rechargeable battery chemistry in phones, laptops, bikes, and cars, how it stores energy, why it wears out, and why a damaged cell can catch fire.
---
A **lithium-ion battery** stores energy by moving lithium ions between two electrodes. When charging, ions travel through a liquid electrolyte from the positive electrode, usually a lithium metal oxide, and tuck between layers of graphite in the negative electrode. When discharging, they flow back, and electrons travel through the outside circuit, powering whatever is connected. John Goodenough, Stanley Whittingham, and Akira Yoshino shared the 2019 Nobel Prize in Chemistry for its development, and Sony sold the first commercial cells in 1991.

Lithium-ion won because it stores a lot of energy per kilogram and survives hundreds to thousands of cycles. Capacity is often given in milliamp-hours, but watt-hours, voltage times amp-hours, is the meaningful measure of energy; a typical cell runs at about 3.6 to 3.7 volts. See [[Work and Power]].

Batteries wear out in two ways. *Cycle aging* comes from use: each charge and discharge slightly damages the electrodes. *Calendar aging* happens even on a shelf, mainly as a protective film called the solid electrolyte interphase slowly thickens and consumes lithium. Both speed up with:

- **High state of charge.** Sitting at 100 percent stresses the cell, which is why phones and laptops offer to stop at 80 percent and why batteries should be stored around half full.
- **Heat.** Chemical side reactions roughly double in rate for every 10°C.
- **Fast charging and cold.** Pushing current quickly, especially below freezing, can deposit metallic lithium on the electrode surface instead of inside it, permanently losing capacity.
- **Deep cycles.** Shallow partial cycles are gentler than running from full to empty.

Cold also reduces capacity temporarily, as the chemistry slows and internal resistance rises; voltage sags under load, as described under [[Ohm's Law]]. Bike computers and e-bikes run shorter on winter rides.

The danger is **thermal runaway**. If a cell is punctured, overcharged, manufactured with a defect, or overheated, an internal short can heat it enough to break down the electrolyte, which releases more heat and flammable gas. The reaction feeds itself, spreads to neighboring cells, and is hard to extinguish. This is why airlines require spare lithium batteries in carry-on luggage, where a fire can be seen and fought, and limit their size. A *battery management system* monitors each cell's voltage and temperature, balances them, and cuts power outside safe limits.

Chemistry variations trade density against safety and life. Lithium iron phosphate (LFP) cells store less energy per kilogram but resist thermal runaway and last thousands of cycles, so they're increasingly used in cars and home storage.

Charging and discharging both waste some energy as heat, accounted for by [[Conservation of Energy]] and removed by [[Heat Transfer]]. Phones slow charging when warm, a battery version of [[Thermal Throttling]], and wireless charging adds its own losses through [[Electromagnetic Induction]].

## See also
- [[Ohm's Law]]
- [[Oxidation]]
- [[Electromagnetic Induction]]
- [[Thermal Throttling]]
- [[Bluetooth]]
