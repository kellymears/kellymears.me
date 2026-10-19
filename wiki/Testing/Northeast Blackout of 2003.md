---
aliases:
  - 2003 blackout
  - Northeast blackout
tags:
  - testing
summary: The August 2003 power failure that cut electricity to about 50 million people in the United States and Canada, spread in part because a race condition had silently frozen a utility's alarm system an hour earlier.
---
The **Northeast blackout of 2003** began on the afternoon of 14 August 2003 and left about 50 million people in eight US states and the Canadian province of Ontario without power, some of them for days. New York, Detroit, Cleveland, and Toronto went dark. The final collapse took only minutes, but it was the end of a failure that had been building, unseen, for more than two hours.

It started in northern Ohio. On a hot day, with heavy demand, transmission lines owned by the utility FirstEnergy sagged as they heated and touched trees that had not been trimmed back, tripping offline one after another. Each lost line pushed its power onto the remaining ones, which then heated and sagged too. Shortly after 4 pm the overload spread beyond Ohio and the grid separated into islands, most of which could not balance supply and demand and shut down; see [[Cascading Failure]] and [[Positive feedback]].

The software failure explains why nobody stopped it. At about 2:14 pm the alarm system in FirstEnergy's control room stopped working, with no sign that it had. Operators watching their screens saw no alarms and reasonably concluded that nothing was wrong, while lines were tripping around them. The backup server failed as well. A neighboring coordinator's monitoring tool was also out of service at the time, for an unrelated data problem, so the operators who might have noticed lacked a full picture too.

The vendor later traced the alarm freeze to a [[Race Condition]] in its energy management software, triggered by a particular sequence of events that let two processes corrupt shared data. Finding it took weeks of analysis of a large codebase, in which the bug had run for years without showing itself; see [[Heisenbug]] and [[Systematic Concurrency Testing]].

The joint US-Canadian task force that investigated listed several causes: inadequate tree trimming, poor situational awareness, and a failure to act when the problem became visible. Investigators judged that shedding load around Cleveland in time might have contained the damage; see [[Load Shedding]]. Its recommendations led to mandatory reliability standards for North American grid operators.

The lessons for testing and operations:

- **Silence is not health.** An alarm system needs its own [[Heartbeat]], so that its failure is itself an alarm; see [[Synthetic Monitoring]] and [[Watchdog Timer]].
- **Backups share failure modes.** A standby running the same software on the same inputs will often fail the same way; see [[N-Version Programming]].
- **Operators trust their tools.** A quiet screen was taken as fact; see [[Automation Bias]] and [[Observability]].
- **Slow erosion matters.** Unmanaged tree growth was a standing hazard nobody treated as urgent; see [[Normalization of Deviance]].

## See also
- [[Common-Mode Failure]]
- [[Three Mile Island Accident]]
