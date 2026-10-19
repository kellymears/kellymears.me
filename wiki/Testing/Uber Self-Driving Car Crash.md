---
aliases:
  - Uber autonomous vehicle fatality
  - Tempe self-driving crash
  - Safety driver
tags:
  - testing
summary: The 2018 death of a pedestrian struck by an Uber test vehicle in Arizona, the first pedestrian killed by a self-driving car, after software repeatedly reclassified the person it saw, emergency braking had been disabled, and the backup driver was not watching the road.
---
On the night of 18 March 2018, a modified Volvo SUV operated by Uber's self-driving program struck and killed a pedestrian who was walking a bicycle across a wide road in Tempe, Arizona. It was the first recorded death of a pedestrian involving a fully self-driving test vehicle, and it halted Uber's testing nationwide.

The National Transportation Safety Board's investigation, completed in 2019, found the software's perception system detected the pedestrian about 5.6 seconds before impact, enough time to stop. But it kept changing its mind about what it was seeing, alternating among a vehicle, a bicycle and an unknown object; see [[Object Detection]]. Each time the classification changed, the system discarded the object's tracking history, so it could never predict where the pedestrian was going. The system's design also did not account for pedestrians crossing outside a crosswalk.

When the software finally determined, about 1.2 seconds before impact, that a crash was imminent, it did not brake hard. Uber had disabled the Volvo's own automatic emergency braking while its software was in control, and had set its own system to suppress emergency braking for one second, partly to avoid false alarms and erratic stops. In that design, the vehicle relied on a human to intervene.

The human was the **safety driver**, a backup operator expected to watch the road and take over. Video from inside the car showed the driver looking down for long stretches, and investigators found a television show streaming on a personal phone. The driver looked up less than a second before impact. Uber had recently cut its test cars from two operators to one and had no effective system for monitoring attention.

Researchers have long warned that people are poor at supervising automation that works most of the time. Attention fades over long, uneventful monitoring, and a person who must take over in an emergency often lacks the context to act in time; see [[Vigilance Decrement]]. Trusting a system that usually performs well is a separate hazard; see [[Automation complacency]].

The NTSB's broader finding was that Uber had an inadequate safety culture, with no formal [[Safety Case]] or safety risk management for its testing, and that Arizona's oversight of public-road testing was minimal. The safety driver was later charged with negligent homicide and in 2023 pleaded guilty to a lesser endangerment charge.

For testing practice, the case shows the limits of using public roads as a test environment for software that has not been shown safe in simulation and closed courses; see [[Testing in Production]] and [[Hardware-in-the-Loop]]. Rare scenarios, like a pedestrian with a bicycle at night outside a crosswalk, are exactly what such systems must handle and what ordinary driving rarely provides; see [[Distribution Shift]] and [[Autonomous Vehicle]].

## See also
- [[Boeing 737 MAX Groundings]]
- [[Fail-Safe]]
