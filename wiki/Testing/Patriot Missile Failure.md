---
aliases:
  - Patriot clock drift
  - Dhahran Scud attack
tags:
  - testing
summary: The 1991 failure of a Patriot air defense battery to intercept a Scud missile at Dhahran, Saudi Arabia, after 100 hours of uptime let a tiny rounding error in its clock grow to a third of a second.
---
On 25 February 1991, during the Gulf War, a Patriot air defense battery at Dhahran, Saudi Arabia, failed to track and intercept an incoming Iraqi Scud missile. The Scud hit an army barracks and killed 28 American soldiers. A 1992 report by the US General Accounting Office traced the **Patriot missile failure** to arithmetic: the system's clock had drifted by a third of a second, enough to look for the missile in the wrong place.

The Patriot's computer counted time in tenths of a second as an integer and multiplied the count by one tenth to get seconds. One tenth has no exact binary representation, just as one third has no exact decimal one, and the system stored it in a 24-bit register, cutting it off after 24 bits. The error was about a ten-millionth of a second per tick, harmless at first, but it grew with the count. After 100 hours of continuous operation it reached about 0.34 seconds; see [[Fixed-point arithmetic]].

A Scud flies at about 1,700 meters per second, so a third of a second put it more than half a kilometer away from where the system expected. Radar detected the Scud. To confirm it, the system predicted where the target should appear next and looked in a small window around that point, called the range gate. With the drifted clock the window was in the wrong place, the system found nothing there, and it dropped the detection as a false alarm.

Several facts made it worse:

- **The design assumed short runs.** The Patriot was built to defend against aircraft and to move often, so it was expected to restart regularly, which reset the clock. At Dhahran it had run for about 100 hours.
- **A partial fix.** The software had been updated to compute time more precisely, but the improved conversion wasn't used everywhere it was needed. Where old and new versions met, their errors no longer canceled out; see [[Regression Testing]].
- **The warning was vague.** Israeli forces had noticed the drift after 8 hours. On 21 February the Army advised that very long run times could cause targeting problems, without saying how long was too long. Corrected software reached Dhahran on 26 February, a day after the attack.

The workaround that would have prevented it was a reboot; see [[Crash-Only Software]]. The general lesson for testing is that some bugs depend on how long a system has been running, not on what it was asked to do, and only tests run for realistic durations reveal them; see [[Soak testing]]. Systems that restart on a schedule, or take their time from a reference clock instead of counting ticks, don't accumulate the error; see [[Clock drift]].

## See also
- [[Pentium FDIV Bug]]
- [[Floating-Point Arithmetic]]
- [[Integer Overflow]]
- [[Numerical Stability]]
