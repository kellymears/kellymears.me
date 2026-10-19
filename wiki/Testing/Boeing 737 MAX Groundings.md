---
aliases:
  - MCAS
  - Boeing 737 MAX
  - 737 MAX crashes
tags:
  - testing
summary: Two crashes in five months, in 2018 and 2019, traced to flight-control software that acted on a single faulty sensor, was left out of pilot manuals, and was certified largely by the company that built it.
---
The **Boeing 737 MAX** was grounded worldwide in March 2019 after two crashes killed 346 people: Lion Air Flight 610 off Indonesia in October 2018 and Ethiopian Airlines Flight 302 near Addis Ababa in March 2019. Both aircraft were new. In both, a flight-control program called the **Maneuvering Characteristics Augmentation System**, or MCAS, repeatedly pushed the nose down while the pilots fought to climb.

The software existed because of a design compromise. The 737 first flew in 1967, and the MAX kept its airframe so airlines could fly it without retraining pilots on a new type; see [[Path Dependence]] and [[Backward Compatibility]]. Its larger, more efficient engines had to be mounted farther forward and higher, which made the nose tend to pitch up at high angles of attack. MCAS compensated by moving the horizontal stabilizer to push the nose down, so the aircraft would handle like its predecessors.

Several decisions combined:

- **One sensor.** MCAS read a single angle-of-attack sensor, though the aircraft carried two. When that sensor failed, nothing cross-checked it; compare [[Triple modular redundancy]].
- **Repeated activation.** MCAS could fire again after each pilot correction, adding nose-down trim each time, and during development its authority had been increased well beyond the original design.
- **Unknown to pilots.** It was left out of the flight crew manual, and pilots trained without simulator time on it, keeping the MAX on the same type rating as earlier 737s.
- **Optimistic assumptions.** The safety analysis assumed pilots would recognize a runaway stabilizer and respond within seconds. In the cockpit, MCAS failures came amid stall warnings, stick shakers, and conflicting airspeed readings; see [[Ironies of automation]] and [[Checklist]].

An alert that would have shown the two sensors disagreeing turned out to be inoperative on most aircraft, because it had been tied to an optional display.

Certification had been largely delegated. The Federal Aviation Administration relied on Boeing employees, acting on its behalf, to assess much of the design, and the regulator was not fully informed about how MCAS had changed; see [[Regulatory Capture]] and [[Principal-Agent Problem]]. Congressional investigators described pressure to match a rival airliner on cost and schedule; see [[Normalization of Deviance]].

The fix made MCAS compare both sensors, fire only once per event, and never command more nose-down trim than pilots can counter with the control column. The aircraft returned to service in the United States in November 2020. Boeing agreed in 2021 to a deferred prosecution settlement of about $2.5 billion.

For testing, the case shows that a [[Safety Case]] is only as good as its assumptions about the humans in the loop, and that an analysis of how parts fail must include the sensors feeding the software; see [[Failure Mode and Effects Analysis]] and [[Fault Tree Analysis]].

## See also
- [[Galaxy Note 7 Recall]]
- [[Comet Airliner Crashes]]
- [[Gimli Glider]]
