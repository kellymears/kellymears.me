---
aliases:
  - Second-order effects
  - Unintended consequences
tags:
  - method
summary: Asking what happens after the obvious result of a decision, including how people and systems will react to it, which explains why many well-meant fixes backfire.
---
**Second-order thinking** asks what happens after the immediate result of a decision: how people will respond to it, what the response will cause, and what changes once the effect has spread. First-order thinking stops at the obvious outcome. The habit is often summed up in a single question, "and then what?"

The French economist Frédéric Bastiat made the case in an 1850 essay on "what is seen and what is not seen." A broken shop window, he wrote, gives work to the glazier, which is seen; what is not seen is whatever the shopkeeper would have bought with that money instead. The sociologist Robert Merton analyzed **unintended consequences** in 1936, blaming ignorance, error, short-term interest, and predictions that change the behavior they predict. The ecologist Garrett Hardin put it as a law: we can never do merely one thing.

Common second-order effects:

- **Incentives get gamed.** A reward for an outcome attracts behavior that produces the measured outcome without the intended one; see [[Cobra Effect]] and [[Goodhart's Law]].
- **Efficiency increases use.** Making something cheaper or faster often raises total consumption; see [[Jevons Paradox]].
- **Safety invites risk.** People offset protections by behaving less carefully; see [[Risk Compensation]].
- **Suppression spreads.** Trying to hide information can draw attention to it; see [[Streisand Effect]].
- **Help slows things.** Adding people to a late project adds training and coordination before it adds output; see [[Brooks's Law]].

Software is full of the same pattern. A cache makes reads fast and introduces stale data and stampedes when it empties. Retries make one request more reliable and can turn a brief outage into an overload; see [[Thundering Herd]]. Any behavior a system exposes, even by accident, will come to be relied on by someone, so a harmless cleanup breaks a user; see [[Hyrum's Law]]. Many second-order effects come from loops, where a result feeds back into its own cause; see [[Feedback Loop]].

Practical techniques:

- **Imagine the failure.** Assume the decision went badly a year from now and explain why; see [[Pre-mortem]].
- **Ask who adapts.** Each group affected will change its behavior to suit itself. List them and predict how.
- **Look past the first period.** Many choices that look good in the first month look different over years, and the reverse.
- **Respect what exists.** A rule that seems pointless may be preventing a second-order effect someone already met; see [[Chesterton's Fence]].

There is a limit. Each step of prediction is less certain than the one before, and few third-order forecasts deserve much confidence; see [[Cone of Uncertainty]]. Trying to anticipate everything can stall decisions entirely. The useful level is usually one or two steps beyond the obvious, plus the willingness to watch and correct after acting.

## See also
- [[Opportunity Cost]]
- [[Wicked Problem]]
- [[Inversion]]
