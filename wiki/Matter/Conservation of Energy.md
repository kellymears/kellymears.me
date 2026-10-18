---
aliases:
  - Energy
  - First law of thermodynamics
  - Kinetic energy
  - Potential energy
  - Perpetual motion
  - Noether's theorem
tags:
  - matter
summary: Energy can change form but is never created or destroyed, which rules out perpetual motion and explains why every computer is also a space heater.
---
The **conservation of energy** says that the total energy of an isolated system stays constant. Energy can change form, from chemical to motion to heat, and can move from one object to another, but it is never created or destroyed. In thermodynamics this is the *first law*.

Some of the forms:

- **Kinetic energy**, the energy of motion, equals half of mass times velocity squared. Doubling speed quadruples it.
- **Potential energy** is stored by position or configuration: a raised weight, a stretched spring, a charged battery, or the chemical bonds in food and fuel.
- **Thermal energy** is the random motion of molecules, the form that most other energy eventually becomes.

Mathematician Emmy Noether proved in 1918 why the law holds. Her theorem shows that every continuous symmetry of physics corresponds to a conserved quantity, and energy conservation follows from the laws of physics being the same at all times. Momentum conservation follows in the same way from the laws being the same everywhere, which ties energy to [[Newton's Laws of Motion]].

The law rules out **perpetual motion** machines that produce more energy than they take in, and its companion, the second law described under [[Entropy]], rules out machines that convert heat entirely into work.

The practical lesson is to follow the energy:

- **Computers are heaters.** Nearly every joule of electricity a computer draws ends up as heat in the room, so a machine drawing 400 watts warms a room like a 400-watt heater. Cooling it is a [[Heat Transfer]] problem, and failing to remove that heat causes [[Thermal Throttling]].
- **Brakes are heaters too.** Stopping a car or bike turns kinetic energy into heat in the brakes. Electric vehicles recover some of it with regenerative braking, running the motor as a generator through [[Electromagnetic Induction]].
- **Descents.** A cyclist coasting downhill converts potential energy into speed until air resistance balances gravity at [[Terminal Velocity]].
- **Heat pumps** move heat rather than create it, so they can deliver three or four units of heat per unit of electricity without breaking the law; see [[Vapor-Compression Refrigeration]].

In cooking, energy goes into raising temperature, measured by [[Specific Heat Capacity]], and into changing phase, as [[Latent Heat]], which is why a pot stays at boiling until the water is gone.

Simulations have to respect conservation too. Game physics engines step motion forward in small time increments, and simple methods gain or lose a little energy each step. Physicists use *symplectic* integrators that keep energy errors bounded over long runs, and rounding in [[Floating-Point Arithmetic]] adds its own drift.

Einstein's E = mc² extended the law to include mass as a form of energy, which is what powers the sun and nuclear reactors.

## See also
- [[Siphon]]
- [[Nuclear Fission]]
- [[Nuclear Fusion]]
- [[Sankey Diagram]]
- [[Lever]]
