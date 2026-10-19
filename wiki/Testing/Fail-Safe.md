---
aliases:
  - Fail-secure
  - Fail-operational
  - Dead man's switch
tags:
  - testing
summary: A design principle in which a system that breaks falls into a safe state rather than a dangerous one, as when a railway signal drops to stop or a train's brakes apply if their air line is cut.
---
A **fail-safe** design is one where a failure leaves the system in a safe state. The idea isn't that it never fails, but that when it does, the default outcome is harmless. Engineers ask what happens if power is lost, a cable breaks, or a part stops responding, and arrange things so that the answer is something like stop, close or shut down.

Railways supplied many early examples. Mechanical semaphore signals were weighted so that if the wire controlling them snapped, gravity pulled the arm to the stop position. George Westinghouse's automatic air brake, introduced in the 1870s, inverted the earlier design: air pressure holds the brakes off, so if a coupling separates or a hose bursts, the pressure drops and the brakes apply on every car. Elevators have a safety brake that grips the guide rails if the cable goes slack, the feature Elisha Otis demonstrated dramatically in the 1850s by cutting the rope of a platform while standing on it.

A **dead man's switch** is a control that must be held for a machine to keep running, such as a train's driver pedal or a lawn mower's handle bar. If the operator is incapacitated, it releases and the machine stops. Nuclear reactor control rods are often held up by electromagnets or pressure, so a loss of power drops them in and stops the reaction. Sometimes a supposedly safe action has its own hazard, as at Chernobyl, where inserting the rods briefly increased power.

What counts as safe depends on the hazard. An electronic door lock that unlocks on power loss is called fail-safe, because people can leave in a fire. One that stays locked is **fail-secure**, protecting what's inside. Designers must choose which danger matters more.

Some systems have no safe state to fall into. An airliner in flight can't simply stop, so its flight controls are **fail-operational**: they keep working through a failure using redundant computers and sensors.

In software, the same thinking shows up in several forms. A program that hits an impossible state can halt rather than continue with corrupted data; see [[Fail Fast]]. Access controls should default to deny when a check errors. A [[Watchdog Timer|watchdog timer]] restarts a frozen system automatically. A [[Circuit Breaker|circuit breaker]] stops calling a failing service rather than piling on requests.

Fail-safe design is closely related to designing so errors are physically hard to make. It's checked by analyzing each way a component can fail and the resulting state. Its limits show in cases where the safe default was disabled or overridden.

## See also
- [[Progressive Enhancement]]
- [[Defensive Default]]
