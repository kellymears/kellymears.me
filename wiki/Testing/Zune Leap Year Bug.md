---
aliases:
  - Zune bug
  - Leap year bug
tags:
  - testing
summary: On the last day of 2008, Microsoft's 30-gigabyte Zune music players froze worldwide because a date conversion loop never ended on the 366th day of a leap year, a bug fixed by waiting until the next day.
---
**The Zune leap year bug** froze Microsoft's original 30-gigabyte Zune music players on December 31, 2008. Owners who turned their devices on that day found them stuck on the startup screen. The official fix was simple: let the battery run down, then wait until after noon Greenwich time on January 1 and turn the player on again.

The cause was a short loop in the device's clock driver, code supplied by a chip vendor. The hardware clock counted days since January 1, 1980. To work out the current year, the code repeatedly subtracted a year's worth of days. In outline, it did the following:

- **While** more than 365 days remained,
- **if** the current year was a leap year and more than 366 days remained, subtract 366 and move to the next year;
- **otherwise, if** it wasn't a leap year, subtract 365 and move on.

On the 366th day of a leap year, exactly 366 days remained. That was more than 365, so the loop continued. But it wasn't more than 366, so the leap-year branch did nothing. And the year was a leap year, so the other branch did nothing either. Nothing changed, and the loop ran forever, a classic off-by-one error.

Several testing ideas would have caught it:

- **Boundary values.** The last day of a leap year is the obvious edge for date code; see [[Boundary Value Analysis]].
- **Controlled time.** Tests that set the clock to chosen dates, rather than waiting for them, make such cases cheap to check; see [[Fake Clock]].
- **Loop reasoning.** A loop terminates only if something it depends on changes on every pass. Reasoning about what each iteration guarantees exposes cases where nothing changes; see [[Loop Invariant]] and [[Halting Problem]].
- **Generated inputs.** Running the conversion across every day in a few decades would have taken seconds; see [[Property-Based Testing]].

The Zune bug belongs to a long family of date and time failures. Programmers routinely underestimate the irregularities of calendars and clocks; see [[Falsehoods Programmers Believe]] and [[Time Zone]]. Some systems failed at the turn of the millennium because years were stored as two digits; see [[Year 2000 Problem]]. Others will fail when 32-bit counts of seconds overflow in 2038; see [[Y2038]]. Leap seconds have caused separate outages; see [[Leap second]].

The incident also shows that the code vendors supply ships with the product. Few Zune users knew or cared whose loop had frozen their devices. The fix arrived the same way the bug had: automatically, when the date moved past the edge.

Device makers now commonly add timeouts and recovery behavior so that a single stuck routine doesn't hang the whole system; see [[Watchdog Timer]].

## See also
- [[Unix Time]]
- [[Pentium FDIV Bug]]
