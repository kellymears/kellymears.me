---
aliases:
  - AF447
tags:
  - testing
summary: The 2009 crash of an Airbus jet into the Atlantic after its airspeed sensors iced over, the autopilot disconnected, and the pilots, unused to flying by hand at altitude, held the aircraft in a stall all the way to the sea.
---
**Air France Flight 447** was a scheduled flight from Rio de Janeiro to Paris that crashed into the Atlantic Ocean on June 1, 2009, killing all 228 people aboard. The wreckage and flight recorders lay on the ocean floor until 2011, and the final report the following year became a landmark study of how people and automation fail together.

The trigger was small. Flying through a high-altitude storm system at night, the Airbus A330's airspeed sensors, called pitot tubes, became blocked by ice crystals; see [[Pitot tube]]. The plane had three of them, but all three iced over at once, so the redundancy didn't help; see [[N-Version Programming]]. The airspeed readings dropped suddenly and became inconsistent.

The automation responded as designed. Unable to trust its airspeed, the autopilot disconnected and handed control to the pilots, and the flight control system switched to a mode with fewer protections, one that no longer prevented the plane from stalling. The ice cleared within about a minute. Nothing was wrong with the aircraft from then on.

The pilot flying pulled back on the side stick and kept pulling back for most of the remaining descent. The plane climbed, slowed, and stalled, the wings no longer producing enough lift. A stalled plane must lower its nose to regain airspeed, and the stall warning sounded repeatedly. But the crew didn't recognize the situation. For about three and a half minutes the plane fell, nose up, toward the sea.

Several factors made recognition harder:

- **Confusing warnings.** When airspeed fell very low, the system treated the readings as invalid and silenced the stall warning. When the nose was lowered and speed increased, the warning returned, as if doing the right thing were making it worse; see [[Alarm fatigue]].
- **Mode confusion.** The crew may not have registered that the protections they relied on were gone; see [[Mode error]] and [[Mental Model]].
- **Split controls.** The two side sticks weren't linked, so the other pilot couldn't feel what the pilot flying was doing.
- **Lack of practice.** Pilots rarely flew by hand at cruising altitude, where the plane handles differently; see [[Deliberate Practice]].

The crash is a stark example of the problem first described in 1983: automation removes routine work from operators, but leaves them to handle the rare, hard situations it can't, with skills that have faded from disuse; see [[Ironies of automation]] and [[Automation Bias]]. Under stress and overload, the crew lost track of the plane's state; see [[Cognitive Load]].

Changes followed in pitot tube design, stall recovery training, and simulator practice at high altitude. The same tension between automation and pilot understanding returned a decade later; see [[Boeing 737 MAX Groundings]]. Investigators cautioned against blaming the crew alone; see [[Hindsight Bias]].

## See also
- [[Gimli Glider]]
- [[Normal Accidents]]
- [[Common-Mode Failure]]
- [[Autonomous Vehicle]]
