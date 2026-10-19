---
aliases:
  - Summer time
  - Clock change
tags:
  - systems
summary: The practice of moving clocks an hour forward each spring and back each autumn, adopted in wartime to save fuel, with doubtful savings, measurable health costs, and local times that either don't exist or happen twice.
---
**Daylight saving time** moves clocks forward an hour in spring and back an hour in autumn, shifting an hour of daylight from early morning to the evening. Around seventy countries observe it, most of them in Europe and North America. Most of the world doesn't.

Benjamin Franklin is often credited, but his 1784 letter was a satire urging Parisians to get up earlier, not to change their clocks. The modern idea came from George Hudson in New Zealand in 1895 and William Willett in Britain in 1907. Germany and Austria adopted it first, in 1916, to save coal during the First World War, and Britain followed within weeks. The United States standardized its dates with the Uniform Time Act of 1966 and extended them in 2007.

The savings are doubtful. Modern studies of energy use find small effects, and in some places air conditioning on long, hot evenings outweighs the lighting saved; see [[Energy]].

The costs are better documented. The spring change takes an hour of sleep and shifts the body's clock against the sun. Studies have found short-term rises in heart attacks and fatal traffic accidents in the days after it, and many sleep researchers argue that permanent standard time fits human biology better than either switching or permanent daylight time; see [[Circadian Rhythm]], [[Sleep Deprivation]], and [[Chronotype]]. The change works like a small, nationwide case of [[Jet Lag]].

For software, the change makes local time discontinuous:

- **Gaps.** On the spring-forward day, the hour from 2 to 3 a.m. doesn't happen in most US time zones, so a local time like 2:30 that morning doesn't exist.
- **Overlaps.** In autumn, the hour from 1 to 2 a.m. happens twice, so a local time like 1:30 is ambiguous without an offset.
- **Schedules.** A job scheduled in that window can be skipped in spring and run twice in autumn; see [[Cron]].
- **Durations.** Subtracting two local times across a change gives an answer an hour off. Elapsed time should be measured on a clock that never jumps; see [[Monotonic Clock]].

The usual advice is to store timestamps in UTC or as Unix time, with an explicit offset where needed, and convert to local time only for display; see [[Unix Time]] and [[ISO 8601]]. Windows historically kept the hardware clock in local time, so a machine that also booted Linux could show the wrong hour after a change; see [[Real-Time Clock]].

The rules themselves keep changing. Governments alter or abolish daylight saving with little notice, Morocco suspends it during Ramadan, and the European Parliament voted in 2019 to end clock changes, a plan that then stalled. Each change has to reach every device through updates to the time zone database; see [[Time Zone]].

## See also
- [[Falsehoods Programmers Believe]]
- [[Year 2000 Problem]]
- [[Date Picker]]
