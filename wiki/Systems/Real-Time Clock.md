---
aliases:
  - RTC
  - CMOS battery
  - Hardware clock
tags:
  - systems
summary: The small battery-backed chip that keeps time while a computer is off, counting a quartz crystal's vibrations, drifting seconds a day, and causing strange failures when its coin cell dies.
---
A **real-time clock** (RTC) is a small chip that keeps track of the date and time while a computer is switched off. A coin-cell battery keeps it running for years. When the computer starts, the operating system reads the time from it, then keeps time in software from there.

It counts the vibrations of a tiny quartz crystal that oscillates at 32,768 times a second; see [[Piezoelectric Effect]]. That number is two to the fifteenth power, so a simple chain of 15 halving circuits turns it into exactly one tick per second. The same crystal frequency runs most quartz watches.

The IBM PC AT in 1984 put the clock in a chip that also held a small amount of battery-backed memory for firmware settings. That memory used CMOS technology, which is why the coin cell is still called the **CMOS battery**, even though modern firmware keeps settings in flash; see [[Firmware]]. When the battery dies, the clock resets to a default date each time the machine loses power, often years in the past.

A stale clock causes surprising failures. Secure websites present certificates valid only between two dates, so a computer that believes it's years in the past sees every certificate as not yet valid and refuses to connect; see [[Transport Layer Security]]. Builds and backups that compare timestamps make wrong decisions, and logs become impossible to order.

Quartz drifts. A typical crystal is accurate to roughly 20 parts per million, about two seconds a day, and the rate changes with temperature. Networked computers correct this continuously by synchronizing with time servers; see [[Network Time Protocol]]. Devices without an RTC, such as many small single-board computers, start with no idea what time it is and must reach the network before any date-sensitive work. Some save the last known time to disk at shutdown as a rough starting point.

The clock's time zone is a long-running source of confusion. Linux and macOS usually store UTC in the hardware clock, while Windows traditionally stores local time. On a machine that dual-boots both, each "corrects" the other, and the clock jumps by the time-zone offset after every switch; see [[Time Zone]]. Daylight saving changes make it worse.

The hardware clock also stores dates in its own format, and older chips kept only a two-digit year, one of many places the year 2000 needed attention. Software that converts its time to seconds since 1970 must also survive 2038; see [[Unix Time]] and [[Integer Overflow]].

Beyond keeping time, the RTC can raise an alarm, letting a sleeping computer wake itself at a set time to run backups or scheduled jobs; see [[Suspend and Hibernation]] and [[Cron]].

## See also
- [[Monotonic Clock]]
- [[Boot Process]]
- [[Year 2000 Problem]]
- [[Patriot Missile Failure]]
