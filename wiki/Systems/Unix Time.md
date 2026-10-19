---
aliases:
  - Unix timestamp
  - Unix epoch
  - Epoch time
  - POSIX time
tags:
  - systems
summary: Counting time as seconds since midnight UTC on January 1, 1970, the simple representation under most of computing, and its quirks around leap seconds and the year 2038.
---
**Unix time** counts the seconds since 00:00:00 UTC on January 1, 1970, a moment called the **Unix epoch**. As this note was written, the count was about 1.79 billion. It's the most common way computers represent a moment in time: file timestamps, database records, log entries, and authentication tokens all use it or a variant counting milliseconds or nanoseconds.

The appeal is simplicity. A single integer identifies an instant, independent of location. Comparing two moments is comparing two numbers, and the time between them is subtraction. There are no months of different lengths, no time zones, and no daylight saving transitions. Those matter only when converting for display, a separate step that needs a time zone database; see [[Time Zone]]. A robust rule is to store and compute in Unix time or UTC and convert to local time only at the edges.

The epoch was chosen for convenience. Early Unix at Bell Labs counted in sixtieths of a second from 1971, which would overflow within years, so it was redefined as whole seconds from a round date, the start of 1970.

Its quirks:

- **Leap seconds.** Earth's rotation is irregular, so official UTC occasionally inserts a leap second to stay aligned with the sun, 27 times since 1972. Unix time pretends every day has exactly 86,400 seconds, so during a leap second it repeats a value or stalls. Software that assumed time never repeats has crashed on these occasions, including widespread outages in 2012. Large operators now "smear" the extra second across hours instead. In 2022, timekeeping bodies voted to stop adding leap seconds by 2035.
- **The year 2038.** Systems storing Unix time as a signed 32-bit integer run out at 03:14:07 UTC on January 19, 2038, when the count wraps to a negative number, reading as 1901; see [[Year 2038 problem]]. Most modern systems use 64-bit time, good for billions of years, but embedded devices and old file formats remain at risk.
- **Units.** Some systems count seconds, others milliseconds (JavaScript) or nanoseconds, and mixing them gives dates in 1970 or far in the future.
- **Clocks drift.** A machine's clock is only as good as its synchronization; see [[Network Time Protocol]]. Clocks can jump backward when corrected, so measuring durations should use a monotonic clock, which only moves forward, rather than wall time.

Because separate machines' clocks never agree exactly, timestamps can't reliably order events across a distributed system; that's what a [[Logical Clock]] is for. Some identifiers embed timestamps to make them sortable, such as UUIDv7; see [[Universally Unique Identifier]]. Code that reads the clock directly is hard to test, which is why tests often inject a [[Fake Clock]].

Timestamps appear throughout systems tooling: [[Cron]] schedules, file modification times that drive build tools, and expiry values such as a [[Time to Live]].

## See also
- [[iCalendar]]
- [[Date Picker]]
