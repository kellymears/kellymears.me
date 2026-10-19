---
aliases:
  - 1202 alarm
  - Apollo Guidance Computer
  - Executive overflow
tags:
  - testing
summary: During the first Moon landing in 1969, the lunar module's computer repeatedly signaled overload, and the landing continued because its software was designed to shed low-priority work and keep flying, and because controllers had rehearsed exactly that alarm.
---
**The Apollo 11 program alarms** were a series of computer warnings that sounded during the descent of the lunar module Eagle to the Moon on July 20, 1969. A few minutes from touchdown, the crew reported a "1202" alarm, a code few people in mission control recognized instantly. Further 1202 and 1201 alarms followed. Within seconds, controllers in Houston decided the landing could continue, and Eagle touched down safely.

The Apollo Guidance Computer was a small machine by modern standards, with a few kilobytes of erasable memory, running software developed at the MIT Instrumentation Laboratory, where Margaret Hamilton led software engineering; see [[Real-Time Operating System]]. Its operating system scheduled jobs by priority and kept a limited number of slots for active work.

The alarms meant the computer had run out of those slots. A hardware interface with the rendezvous radar, used for docking and not needed for landing, was generating a stream of spurious requests that consumed a significant fraction of processing time; see [[Interrupt]]. With the landing guidance also running at full load, the computer couldn't finish all its work in each cycle, and new jobs found no free slots; see [[Resource Starvation]].

What happened next was designed. On an overflow, the software performed a restart: it discarded all its jobs, then reloaded only the important ones from saved checkpoints, abandoning lower-priority tasks. Guidance and engine control resumed within moments. In effect, the computer recovered from overload by crashing deliberately into a known good state; see [[Crash-Only Software]] and [[Graceful degradation]].

The human side mattered as much. Weeks earlier, a training simulation had thrown a different program alarm at flight controllers, and they had called an abort that wasn't needed. Afterward, the guidance officer Steve Bales and the computer specialist Jack Garman reviewed every alarm code and noted which were survivable as long as they didn't persist; see [[Checklist]]. When 1202 appeared during the real landing, they could judge it within seconds.

Apollo 11's alarms are often cited as a case study in several testing and reliability ideas:

- **Rehearsing failure.** Simulations that inject faults prepare both systems and people; see [[Chaos Engineering]].
- **Watchdogs and restarts.** Detecting overload and resetting cleanly beats hanging; see [[Watchdog Timer]].
- **Alarm design.** Too many unexplained alarms risk being ignored or causing panic; see [[Alarm fatigue]].

The radar interface problem had arisen from a mismatch between the power supplies of two systems, each correct by its own documentation; see [[Integration Test]]. Later Apollo missions changed procedures to avoid it.

The episode is a reminder that robustness lies partly in software that expects to be overwhelmed and partly in people who've practiced what to do when it is; see [[Defensive Programming]].

## See also
- [[Mars Pathfinder Priority Inversion]]
- [[Schiaparelli Lander Crash]]
- [[Gyroscope]]
- [[Apollo 13]]
