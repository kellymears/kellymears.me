---
aliases:
  - Self-driving car
  - Driverless car
  - Levels of driving automation
  - DARPA Grand Challenge
tags:
  - agents
summary: A vehicle that drives itself by sensing its surroundings, predicting what other road users will do and planning a path, a goal that seemed close after a 2005 desert race and took far longer than predicted because rare situations dominate the difficulty.
---
An **autonomous vehicle** drives without a human doing the driving. It has to sense the world with cameras, radar and often laser scanners, work out what each object is and where it's going, plan a safe path, and control the car, many times a second; see [[Object Detection]] and [[Lidar]].

The modern field started with a race. In 2004 the US military research agency DARPA offered a prize for crossing about 150 miles of desert without a driver. No vehicle finished; the best went roughly seven miles before getting stuck. A year later five finished, and a Stanford team won. The 2007 Urban Challenge moved the contest to a mock town with traffic, won by Carnegie Mellon. Many of those engineers went on to Google's self-driving project, started in 2009, which became Waymo.

Progress after that was real but much slower than promised. Companies repeatedly predicted fully driverless cars within a few years. Driving on a highway in good weather is the easy part. The difficulty lies in the **long tail** of rare events: a mattress on the road, a police officer waving traffic through a red light, children in costumes; see [[Long tail]] and [[Edge case]]. A system trained on millions of ordinary miles can still meet something it has never seen, the general problem of [[Distribution Shift]]. It's a vivid case of [[Moravec's Paradox]], where the perceptual skills people find easy are the hardest to automate.

The industry describes automation in levels set by the SAE standard. Level 2 systems steer and brake but need a human watching constantly; Level 4 drives itself within a defined area and conditions, with no human needed. The middle levels are troubling, because people are poor at supervising automation that almost always works. Attention drifts, and when the system hands back control the person may need many seconds to understand the situation; see [[Ironies of automation]], [[Automation Bias]] and [[Air France Flight 447]]. In 2018 a test vehicle with a safety driver struck and killed a pedestrian in Arizona; investigators found the system had classified the pedestrian too late to act and the driver had been looking away.

Approaches differ. Many companies build modular pipelines with high-definition maps and separate stages for perception, prediction and planning. Others train networks that map sensor input more directly to driving, learning from human demonstrations and from simulation; see [[Imitation Learning]], [[World Model]] and [[Reinforcement Learning]].

Driverless robotaxis now carry paying passengers in several cities, and regulators ask companies to argue in structured form why their systems are safe; see [[Safety Case]]. Whether self-driving cars will improve road safety overall, and how to compare their crashes to human ones, remains debated.

## See also
- [[Crash Testing]]
- [[Uber Self-Driving Car Crash]]
