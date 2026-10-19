---
aliases:
  - Fitness-fatigue model
  - Banister model
  - Training Stress Score
  - TSS
  - Chronic training load
  - Training stress balance
  - Acute:chronic workload ratio
tags:
  - body
summary: Quantifying training as a dose and modeling fitness and fatigue as two moving averages of it, whose difference predicts readiness.
---
**Training load** is the practice of putting a number on how much training stress a session or a week imposes, then modeling how that stress turns into fitness and fatigue. Its foundation is Eric Banister's **impulse-response model** from 1975. Every workout produces two effects at once, a gain in fitness and an accumulation of fatigue. Both decay over time, fatigue much faster than fitness. Performance on a given day is roughly fitness minus fatigue.

Load needs a unit. Banister's TRIMP weighted session duration by heart rate. With power meters, Andrew Coggan's **Training Stress Score** became standard: one hour at exactly [[Functional Threshold Power]] scores 100, and score scales with duration and with the square of relative intensity, so hard efforts count disproportionately. Running and swimming have pace-based analogues.

The popular implementation tracks three numbers:

- **Chronic training load** (often labeled fitness): an exponentially weighted moving average of daily load over about six weeks.
- **Acute training load** (fatigue): the same average over about one week.
- **Training stress balance** (form): chronic minus acute. Strongly negative means a hard block is underway. Slightly positive after a taper is the classic race-day target.

An exponentially weighted moving average responds to recent input while never quite forgetting old input. It is the same construction as the Unix load average and the averages in [[Pressure Stall Information]], and similarly it describes trends, not instants.

The models are useful and easy to over-trust. They see only what the sensors see: work stress, not sleep, illness, heat, or a hard week at work, all of which the body counts. They also invite [[Goodhart's Law]], since ramping chronic load as a goal in itself is a fast route to the overtraining described under [[Supercompensation]]. In team sports, the *acute:chronic workload ratio* was widely adopted to flag injury risk when weekly load spiked well above the monthly norm. Later statisticians showed that the ratio is partly an artifact of mathematical coupling (the acute week is part of the chronic average), so the clean thresholds were weaker than claimed. The underlying advice still holds: avoid sudden spikes, and build gradually.

## See also
- [[Tendinopathy]]
- [[Saddle Sore]]
- [[Periodization]]
- [[Blister]]
- [[Iliotibial Band Syndrome]]
- [[Plyometrics]]
- [[Side Stitch]]
- [[Patellofemoral Pain Syndrome]]
- [[Line Chart]]
- [[Shin Splints]]
- [[Time Series Database]]
