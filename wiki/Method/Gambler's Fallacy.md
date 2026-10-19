---
aliases:
  - Monte Carlo fallacy
  - Hot hand fallacy
  - Hot hand
tags:
  - method
summary: Believing that independent random events balance out, so a long run of one outcome makes the other "due," along with its mirror image, believing a streak will continue.
---
The **gambler's fallacy** is the belief that if a random event has happened more often than expected recently, it's less likely to happen next, as if chance kept a ledger and corrected it. After five reds in a row at roulette, black feels "due." It isn't. The wheel has no memory; the next spin is as likely to be red as the first was.

The most famous case happened at the Monte Carlo Casino in 1913, when black came up 26 times in a row. Gamblers lost millions of francs betting against black, convinced the streak had to end, which is why the error is also called the *Monte Carlo fallacy*.

The fallacy comes from misunderstanding how averages work. Over many spins, the proportion of reds approaches half; this is the law of large numbers. But it gets there by *diluting* early streaks with many later spins, not by correcting them. After 10 extra reds, a thousand more fair spins leave the count still about 10 ahead, while the proportion has moved much closer to half.

People also have a poor sense of what randomness looks like. Asked to write down a random sequence of coin flips, they alternate too often and avoid long runs. Real random sequences have more streaks and clusters than intuition expects; see [[Pseudorandom Number Generator]]. Apple reportedly made its shuffle feature *less* random because listeners complained that true randomness played the same artist twice in a row too often.

The mirror image is the **hot hand fallacy**: believing a streak will continue, that a basketball player who has made several shots is more likely to make the next. A 1985 study by Thomas Gilovich, Robert Vallone, and Amos Tversky found no evidence for it in professional basketball data. In 2018 economists Joshua Miller and Adam Sanjurjo showed the original analysis contained a subtle statistical bias, and that corrected data does show a modest hot hand. The episode is a lesson in how hard randomness is to reason about, even for experts.

Both errors matter only when events are truly independent. When they aren't, a streak does carry information: a server that has failed three times is more likely to fail again; see [[Flaky Test]]. Recognizing which situation applies is the real skill.

Related errors:

- **Seeing patterns in noise.** Random clusters look meaningful; see [[Texas Sharpshooter Fallacy]] and [[Apophenia]].
- **Regression to the mean.** An extreme result tends to be followed by a more typical one, not because of balancing but because extremes are partly luck; see [[Regression to the Mean]].
- **Sunk costs.** Continuing to bet to "win back" losses mixes this fallacy with [[Sunk Cost Fallacy]].

Game designers exploit the feeling, using near-misses and variable rewards to keep players engaged; see [[Gacha Monetization]].

## See also
- [[Fisher-Yates Shuffle]]
- [[Radioactive Decay]]
- [[Mental Accounting]]
