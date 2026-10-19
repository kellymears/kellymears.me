---
aliases:
  - Ariane 501
  - Ariane 5 failure
tags:
  - testing
summary: The maiden flight of Europe's Ariane 5 rocket, destroyed 37 seconds after launch in 1996 when guidance code reused from Ariane 4 overflowed while converting a number Ariane 4 could never have produced.
---
**Ariane 5 Flight 501** was the first launch of Europe's Ariane 5 rocket, on 4 June 1996 from Kourou, French Guiana. About 37 seconds after liftoff it veered off course, began breaking apart under aerodynamic loads, and destroyed itself, along with the four Cluster science satellites it carried. No one was hurt. The cause was a single unprotected number conversion.

The rocket's attitude came from an inertial reference system whose software was reused from Ariane 4, which had flown reliably for years. One routine converted a 64-bit floating-point value, related to the rocket's horizontal velocity, into a 16-bit signed integer. Ariane 5 built up horizontal speed much faster than Ariane 4, the value exceeded 32,767, and the conversion raised an error; see [[Integer Overflow]] and [[Floating-Point Arithmetic]].

Several decisions combined:

- **The routine was unnecessary.** It performed an alignment calculation useful only before liftoff, but kept running for about 40 seconds afterward, a requirement carried over from Ariane 4 that Ariane 5 didn't need.
- **The check was left out on purpose.** Some conversions were protected against overflow. This one was not, because analysis had shown the value could never get that large on Ariane 4's trajectory, and the processor's workload budget was tight. The assumption was right for the old rocket and never rechecked for the new one; see [[Design by Contract]].
- **The response to any error was to stop.** The design treated an exception as a hardware fault, so the unit shut down; see [[Exception Handling]].
- **The backup was identical.** A second inertial unit ran the same software and had already failed the same way, 72 milliseconds earlier. Redundancy guards against random hardware faults, not against a shared design error; see [[N-Version Programming]].
- **Diagnostics became data.** The main flight computer read the failed unit's diagnostic output as flight data and swung the engine nozzles to full deflection.

The inquiry board, chaired by the mathematician Jacques-Louis Lions, found the problem could have been caught. The inertial units had never been tested against Ariane 5's actual trajectory. In the system-level simulations they were represented by models, on the grounds that they were already qualified, so their real software never met the new flight profile; see [[Hardware-in-the-Loop]] and [[Test Double]]. The board recommended testing with realistic flight data, reviewing all reused software against the new requirements, and keeping a sensor running when it might still give usable output.

The flight shows that reuse moves assumptions along with code. A component's correctness depends on the environment it was proven in. Writing that environment down, in specifications, comments, or checks that fail loudly, is the only way the next user can see whether it still holds; see [[Assertion]].

## See also
- [[Therac-25]]
- [[Boundary Value Analysis]]
- [[Mars Climate Orbiter]]
- [[Mariner 1]]
- [[Hubble Mirror Flaw]]
