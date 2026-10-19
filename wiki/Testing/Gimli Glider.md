---
aliases:
  - Air Canada Flight 143
  - Metrication
tags:
  - testing
summary: A 1983 Air Canada jet ran out of fuel at cruising altitude because a fuel gauge had failed and the crew calculated fuel with a pounds conversion factor instead of kilograms, then glided safely onto a decommissioned air base that had become a racetrack.
---
**The Gimli Glider** is the nickname of Air Canada Flight 143, a Boeing 767 that ran out of fuel at about 41,000 feet over Manitoba on July 23, 1983. Both engines stopped, and the airliner became a large glider. The crew landed it safely on a former air force base at Gimli, which by then was partly a drag racing strip hosting a family event.

The 767 was one of the first airliners in Air Canada's fleet measured in metric units, during Canada's conversion from imperial measures. Several failures had to line up for the plane to take off with too little fuel; see [[Normalization of Deviance]].

- **A broken gauge.** The aircraft's fuel quantity system had a faulty component, and its cockpit fuel gauges were blank. Technicians attempted fixes that didn't take, and confusion over the rules about flying with a broken gauge allowed the plane to be dispatched; see [[Defensive Programming]].
- **Manual measurement.** Without gauges, ground crew measured fuel with dipsticks, reading the volume in liters, which then had to be converted to mass.
- **The wrong conversion.** The crew and ground staff multiplied by 1.77, the density of jet fuel in pounds per liter, rather than 0.8, its density in kilograms per liter. The result, treated as kilograms, was really pounds. The plane carried less than half the fuel everyone believed.

Each person did the arithmetic carefully. The procedure was unfamiliar, the units were new, and everyone checked the same calculation with the same mistaken factor, so the checks agreed; see [[Mars Climate Orbiter]] and [[Falsehoods Programmers Believe]].

The landing became legendary. The captain, Robert Pearson, was an experienced glider pilot and used a sideslip, a maneuver rarely used in airliners, to lose height quickly. The first officer, Maurice Quintal, had served at Gimli and suggested it. A small ram air turbine provided enough hydraulic pressure for basic controls, but the nose gear failed to lock and collapsed on landing, which helped the plane stop. A handful of people had minor injuries.

An investigation blamed corporate failures as much as individual errors, including inadequate training on the new metric aircraft and unclear responsibility for fuel calculations; see [[Blameless Postmortem]]. The aircraft returned to service and flew for decades.

The incident has become a teaching case in several fields:

- **Units matter.** Values without explicit units invite catastrophic confusion; see [[Type System]].
- **Redundant checks must be independent.** Two people repeating the same flawed method aren't two checks; see [[N-Version Programming]].
- **Degraded modes need practice.** Rarely used fallback procedures fail when they're finally needed; see [[Checklist]].

It's also an example of how individual skill can recover from systemic failure; see [[Normal Accidents]].

## See also
- [[Fault Tree Analysis]]
- [[Automation Bias]]
- [[Three Mile Island Accident]]
- [[Air France Flight 447]]
