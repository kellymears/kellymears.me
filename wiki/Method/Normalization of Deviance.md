---
aliases:
  - Normalized deviance
  - Drift into failure
  - Swiss cheese model
tags:
  - method
summary: How organizations gradually come to accept warning signs as normal because nothing bad happened last time, until the margin of safety is gone, and the Swiss cheese model of how accidents slip through.
---
**Normalization of deviance** is the gradual process by which an organization comes to accept something unsafe as normal. A rule is bent, a warning is ignored, or a part behaves outside its specification, and nothing bad happens. The next time, the deviation looks less alarming, because last time was fine. Each step is small and reasonable in context, but together they erode the margin of safety until an accident that seems shocking from outside looks, from inside, like an ordinary day.

Sociologist Diane Vaughan coined the term in her 1996 study of the Space Shuttle Challenger disaster. Engineers had seen erosion of the booster O-ring seals on earlier flights. It wasn't supposed to happen, but each flight that survived it became evidence that it was acceptable, and the acceptable amount kept growing. On a cold morning in January 1986, an O-ring failed and the shuttle broke apart. Vaughan found no single villain, just a culture where each decision followed sensibly from the previous ones. The 2003 Columbia investigation found the same pattern with foam strikes.

The mechanism is familiar well beyond spaceflight:

- **Ignored alerts.** A monitoring alert that fires constantly without consequence gets muted or ignored, until the one time it matters. That is [[Alarm fatigue]].
- **Flaky tests.** A test that sometimes fails gets rerun until it passes, teaching everyone that red is normal, until a real failure is dismissed too; see [[Flaky Test]].
- **Workarounds.** A manual step that "always works" becomes part of the process without anyone deciding it should be.

The **Swiss cheese model**, from psychologist James Reason, explains why the drift is dangerous but rarely immediately fatal. Each defense in a system, such as a review, a test, an alert, or a checklist, is a slice of cheese with holes. An accident happens when holes in every slice briefly line up. Normalized deviance quietly widens holes in several slices at once, so each problem still looks contained, but the chance of alignment rises.

Countering it takes deliberate effort, because the drift feels like experience:

- **Treat surprises as data.** An anomaly that caused no harm is a near miss, worth investigating while it's cheap, much as [[Fail Fast]] surfaces problems early.
- **Keep the signal clean.** Fix or delete noisy alerts and flaky tests rather than learning to ignore them; the [[Broken Windows Theory]] makes a similar argument about visible disorder.
- **Invite outsiders.** Fresh eyes notice what insiders have stopped seeing.
- **Report without blame.** People only raise small deviations if doing so is safe, the premise of the [[Blameless Postmortem]].

Normalization of deviance also explains why [[Hindsight Bias]] is so tempting after a disaster: from outside, the warning signs look obvious, because outsiders never watched them become normal.

## See also
- [[Therac-25]]
- [[Mars Polar Lander]]
- [[Ostrich Effect]]
- [[Gimli Glider]]
- [[Checklist]]
