---
aliases:
  - Jidoka
  - Stop the line
tags:
  - delivery
summary: The cord on a Toyota assembly line that any worker can pull to signal a problem and stop production, the practice behind stopping the line in software when a build breaks or a defect escapes.
---
An **andon cord** is a rope or button on a production line that any worker can pull to signal a problem. Pulling it lights a signal board, the andon, and calls a team leader to the station. If the problem can't be solved within the time the car would spend at that station, the line stops. It is a central practice of the Toyota Production System.

The principle behind it is **jidoka**, often translated as automation with a human touch. It traces back to Sakichi Toyoda, founder of the company that became Toyota, whose automatic looms stopped themselves when a thread broke, so one operator could watch many machines and no cloth was woven with a flaw. Toyota extended the idea to people: anyone who sees a defect should stop the process rather than pass the defect downstream.

That runs against intuition. Stopping a whole line for one worker's concern looks expensive, and traditional factories ran the line no matter what, fixing defects at the end. Toyota's reasoning was that a defect caught at the station where it happens is cheap to fix and easy to understand, while one found later has been built into the car and its cause is harder to trace; see [[Root Cause Analysis]] and [[Five Whys]]. Each stoppage becomes an occasion to improve the process; see [[Lean manufacturing]].

It works only with [[Psychological Safety]]. A cord that workers are scolded for pulling goes unpulled. When General Motors and Toyota ran a joint plant in California from 1984, workers were reportedly surprised to be thanked for stopping the line. Without that trust, small problems get passed along until they become accepted; see [[Normalization of Deviance]].

Software teams borrowed the idea in several forms:

- **Stop the line on a broken build.** When the main branch fails [[Continuous Integration]], nobody merges until it is fixed, so failures don't pile up and hide each other; see [[Merge Train]].
- **Anyone can halt a deploy.** A release pipeline gives every engineer the power to pause or roll back without asking permission; see [[Rollback]].
- **Customer reports.** Amazon has described giving customer service staff the power to take a product off sale when customers report a recurring defect.
- **Error budgets.** When a service burns through its allowed unreliability, feature releases stop until reliability work catches up; see [[Error budget]].

The failure modes are familiar. If the line stops too often for noise, people learn to ignore or bypass the signal; see [[Flaky Test]] and [[Alarm fatigue]]. If stopping triggers a hunt for someone to blame, people stop pulling; see [[Blameless Postmortem]]. The physical cord also prevents errors no better than the people watching; mistake-proofing the process is the complementary half; see [[Poka-yoke]].

## See also
- [[Ishikawa Diagram]]
- [[Just Culture]]
