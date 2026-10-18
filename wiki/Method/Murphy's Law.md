---
aliases:
  - Sod's Law
  - Finagle's law
tags:
  - method
summary: The rule that anything that can go wrong will go wrong, a joke about bad luck that began as an engineering principle for designing parts that can't be installed the wrong way, and still reads best as advice about rare failures at scale.
---
**Murphy's law** says that anything that can go wrong will go wrong. It is usually quoted as a joke about bad luck, the toast that lands butter-side down, but it began as an engineering principle, and that reading is the useful one.

The usual origin story comes from 1949, at Edwards Air Force Base in California, during rocket-sled tests of how much deceleration the human body could survive. Captain Edward Murphy, an engineer, had supplied strain gauges to measure the forces. A technician wired every one of them backward, and a test produced no data. Murphy reportedly complained that if there was any way to do something wrong, that technician would find it. The project's physician, John Paul Stapp, later told the press that the team's safety record came from taking "Murphy's law" seriously: assume every possible mistake will eventually be made, and design so it can't be. Accounts of the details differ, and similar sayings were in circulation earlier, including the British **Sod's law**.

The engineering reading has two parts:

- **Over enough trials, unlikely failures happen.** A step with a one-in-a-thousand chance of error, repeated a million times, fails a thousand times. At scale, "can" becomes "will"; see [[Base Rate Fallacy]] and [[Fallacies of Distributed Computing]].
- **Design out the wrong way.** Instead of hoping people install parts correctly, make the wrong installation physically impossible, as asymmetric connectors and keyed plugs do; see [[Forcing Function]].

Software engineers have absorbed the second idea widely. Validate inputs because someone will send malformed ones; handle the error path because the network will fail; see [[Defensive Programming]] and [[Fail Fast]]. Chaos engineering deliberately injects failures to make sure systems survive them before they happen by chance; see [[Chaos Engineering]]. Postmortems often find that the failure was always possible and had simply not been hit yet; see [[Blameless Postmortem]] and [[Normalization of Deviance]].

As a description of luck, it is false, and the reason it feels true is instructive. People remember the times the toast landed badly, the line they joined moved slowest, or the bus came just after they gave up, and forget the many times things went fine; see [[Confirmation Bias]] and [[Negativity Bias]]. Some cases have real causes: buttered toast falling from table height usually rotates about half a turn before landing, so it does land butter-side down more often than not.

Many corollaries have accumulated, mostly as humor. **Finagle's law** adds that things will go wrong at the worst possible moment. Others are close to [[Hofstadter's Law]]: everything takes longer than expected. Serious or not, they share a stance that makes systems more reliable: plan for failure as the normal case, not the exception; see [[Pre-mortem]].

## See also
- [[Margin of Safety]]
- [[Hanlon's Razor]]
- [[Inversion]]
