---
aliases:
  - Schiaparelli
  - ExoMars Schiaparelli
tags:
  - testing
summary: The 2016 loss of a European test lander on Mars, which concluded it was below the ground while still several kilometers up, after a brief saturated sensor reading was held for too long and never sanity-checked.
---
**Schiaparelli** was a lander built by the European Space Agency, carried to Mars on the ExoMars 2016 mission with the Russian space agency Roscosmos. Its main purpose was to test the technology for landing on Mars ahead of a later rover. On October 19, 2016, it crashed into the surface at high speed after its software decided, while it was still several kilometers up, that it had already landed.

The descent began normally. The heat shield did its job and the parachute opened. Then, as the parachute deployed, the lander began rotating faster than its designers had expected. Its inertial measurement unit, which senses rotation and acceleration, hit the top of its measuring range and reported a maximum value, a condition called saturation; see [[Inertial Measurement Unit]].

The problem was how the software handled it. When the unit flagged saturation, the navigation software held on to the maximum reading for a set period before accepting fresh data. That period had been set too long. For about a second, the software kept integrating a false, extreme rotation rate, and its estimate of the lander's orientation became wildly wrong.

With a wrong orientation, the software misread the radar altimeter's distance measurements. Its calculated altitude came out negative, meaning below the ground. The logic had no rule rejecting an impossible value. It concluded the lander had arrived, released the parachute, fired the braking thrusters for only about three seconds instead of around thirty, and switched to surface mode. The lander fell from about 3.7 kilometers and hit the ground at roughly 150 meters per second; see [[Terminal Velocity]].

The inquiry found that the saturation case had not been adequately modeled or tested, that the persistence setting had not been checked against flight conditions, and that simulations had not explored the parachute dynamics that triggered it; see [[Hardware-in-the-Loop]] and [[Boundary Value Analysis]]. It also pointed to the lack of a plausibility check: an altitude below zero, or an altitude jumping by kilometers in an instant, should have been rejected; see [[Assertion]] and [[Defensive Programming]].

The lander had sent its telemetry in real time to the orbiting spacecraft that carried it, so engineers could reconstruct the failure in detail. A NASA orbiter later photographed the impact crater; see [[Instrumentation]].

The failure has a family. A 1999 Mars lander likely shut its engines early after misreading a transient signal as touchdown; see [[Mars Polar Lander]]. A rocket in 1996 was destroyed when a value overflowed its range in inertial reference software; see [[Ariane 5 Flight 501]]. And a 1999 orbiter was lost through a units mismatch between teams; see [[Mars Climate Orbiter]]. In each, a single sensor value, outside its tested range, drove a fatal decision; see [[Single Point of Failure]].

## See also
- [[Apollo 11 Program Alarms]]
- [[Integer Overflow]]
