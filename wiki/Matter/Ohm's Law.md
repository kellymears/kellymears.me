---
aliases:
  - Ohms law
  - Voltage
  - Electric current
  - Electrical resistance
  - Joule heating
tags:
  - matter
summary: The relationship between voltage, current, and resistance in a circuit, and the source of nearly every rule of thumb about wires, heat, and power delivery.
---
**Ohm's law** says that the current through a conductor is proportional to the voltage across it: V = IR. Voltage (in volts) is the push, current (in amperes) is how much charge flows per second, and resistance (in ohms) is how hard the material makes that flow. Georg Ohm published the relationship in 1827.

The usual analogy is water in a pipe. Voltage is the pressure, current is the flow rate, and resistance is how narrow the pipe is. Double the pressure and twice as much water flows.

Combined with the definition of electrical power, P = VI, the law gives two forms that explain most practical electrical design:

- **P = I²R.** The power lost as heat in a wire grows with the *square* of the current. This is **Joule heating**, and it's why power grids transmit at hundreds of thousands of volts: the same power at higher voltage means far less current, so far less is lost in the lines.
- **P = V²/R.** For a fixed load, power rises with the square of voltage. A chip's dynamic power scales roughly with voltage squared times clock frequency, which is why lowering voltage saves so much energy, the basis of [[Dynamic Voltage and Frequency Scaling]], and why heat, rather than transistor count, often limits processor speed, as described under [[Thermal Throttling]].

The same logic explains USB-C Power Delivery. Thin cables can safely carry only a few amperes, so delivering 100 watts or more means negotiating higher voltages, up to 20 volts and beyond, rather than more current.

Not everything obeys Ohm's law. Materials that do are called *ohmic*. Light-emitting diodes are not: above a threshold voltage their current shoots up steeply, so a tiny increase in voltage can destroy them. LEDs therefore need a resistor or a constant-current driver, and they're usually dimmed by switching them on and off rapidly rather than lowering the voltage, which can produce [[LED Flicker]]. Resistance also changes with temperature, which thermistors exploit to measure it.

Long runs of LED strip show the law at work: each segment of copper has a little resistance, so voltage drops along the strip and the far end glows dimmer or shifts color. Installers inject power at several points to keep it even.

Current also has effects beyond heat. In the microscopic wires of a chip, high current density gradually pushes metal atoms along, a wear mechanism called [[Electromigration]]. Batteries have internal resistance too, so drawing high current makes their voltage sag and wastes energy as heat, one reason fast charging and heavy loads warm a [[Lithium-Ion Battery]].

The energy lost to resistance doesn't vanish; it becomes heat, as [[Conservation of Energy]] requires, and has to be carried away by [[Heat Transfer]].

## See also
- [[Work and Power]]
- [[Electromagnetic Induction]]
- [[Capacitor]]
- [[Alternating Current]]
- [[Electrostatic Discharge]]
- [[Lightning]]
