---
aliases:
  - Spurious touchdown signal
  - Faster, better, cheaper
tags:
  - testing
summary: NASA lost the Mars Polar Lander in 1999, most likely because its software mistook the jolt of its own landing legs deploying for touchdown and shut off the engines about 40 meters above the surface, a flaw a rerun test could have caught.
---
**Mars Polar Lander** was a NASA spacecraft lost while attempting to land near the south pole of Mars on December 3, 1999. Contact was never re-established. Coming months after the loss of Mars Climate Orbiter, the failure prompted extensive reviews of how NASA built and tested spacecraft; see [[Mars Climate Orbiter]].

Without telemetry from the descent, investigators couldn't be certain what happened. A special review board identified a most probable cause.

The lander used sensors on each of its three legs to detect touchdown and shut off its descent engines. When the legs swung out into position, about 1,500 meters above the surface, the jolt could make those sensors generate a brief false signal. The software recorded the signal. It ignored touchdown signals until the lander was about 40 meters up, but at that point it acted on the one it had remembered and shut down the engines. The lander would have fallen the rest of the way at over 20 meters per second, far too fast to survive.

The hardware engineers knew the sensors could produce transient signals when the legs deployed. That knowledge was in a system requirement, but the requirement wasn't passed on clearly to the software engineers, whose code didn't filter out the transients; see [[Requirements Traceability]].

Testing should have caught it. During system testing, the touchdown sensors were wired incorrectly, so the test didn't exercise them. The wiring was later fixed, but the test wasn't run again; see [[Regression Testing]]. Investigators later reproduced the spurious signals on test hardware; see [[Hardware-in-the-Loop]].

The review also pointed to wider problems. Polar Lander and Climate Orbiter were part of a program meant to make space missions "faster, better, cheaper." The board found the project had been underfunded and understaffed, with too few people doing too many jobs, and with analyses and tests skipped to keep schedules; see [[Normalization of Deviance]].

Two small probes riding with the lander, Deep Space 2, were also lost, for reasons never determined.

Lessons drawn in later reviews include:

- **Test as you fly.** System tests should exercise the real configuration and sequence of flight events; see [[Integration Test]] and [[End-to-End Test]].
- **Rerun tests after fixes.** A test that failed for reasons unrelated to what it was checking hasn't checked anything.
- **Telemetry matters.** Without data from critical phases, failures can't be diagnosed; see [[Logging]].
- **Software must handle hardware's quirks.** Sensors bounce and glitch; see [[Defensive Programming]].

NASA's subsequent Mars landers, including Phoenix, which reused hardware designed for a cancelled sister mission, flew with fixes informed by these findings.

## See also
- [[Hubble Mirror Flaw]]
- [[Failure Mode and Effects Analysis]]
- [[Escape Velocity]]
- [[Space Shuttle Columbia Disaster]]
