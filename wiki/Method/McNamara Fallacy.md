---
aliases:
  - Quantitative fallacy
  - Surrogate endpoint
  - Metric fixation
tags:
  - method
summary: Making decisions only on what can be counted and treating what can't be counted as unimportant or nonexistent, named for the Vietnam War's body counts and seen in medicine, schools, and software metrics.
---
The **McNamara fallacy** is the mistake of judging a situation only by what can be measured and treating everything else as unimportant or nonexistent. The social scientist Daniel Yankelovich described it in 1972 as four steps: measure whatever can be easily measured; disregard what can't; presume that what can't be measured isn't important; and finally say that what can't be measured doesn't exist.

It is named for Robert McNamara, the US Secretary of Defense during much of the Vietnam War. McNamara had been one of the analytical managers who rebuilt Ford Motor Company after World War II, and he brought the same quantitative rigor to the Pentagon. Progress in the war was tracked through numbers such as enemy body counts. The counts were inflated by units under pressure to report results, and they left out what decided the war: the political will of the Vietnamese and of Americans at home.

The fallacy recurs wherever a measurable stand-in replaces a hard-to-measure goal:

- **Medicine.** A **surrogate endpoint** is a lab value or scan used in place of the outcome patients care about, such as survival. In the CAST trial, reported in 1989, drugs that suppressed irregular heartbeats after heart attacks, a reasonable surrogate, turned out to increase deaths.
- **Schools.** Test scores are easy to compare across schools; curiosity, judgment, and the subjects left off the test are not.
- **Software.** Lines of code, tickets closed, [[Story Points]], and [[Code Coverage]] are countable; maintainability, user trust, and whether the right thing was built are not. Even well-chosen delivery measures describe a team only partly; see [[DORA Metrics]].

The historian Jerry Muller called the broader pattern **metric fixation** in his 2018 book *The Tyranny of Metrics*.

Related ideas:

- A measure that becomes a target stops measuring well; see [[Goodhart's Law]] and [[Cobra Effect]].
- Searching where it is easy to look rather than where the answer is; see [[Streetlight Effect]].
- Every measure is a translation of a concept into something countable, and the translation loses something; see [[Operationalization]].
- A model is not the thing it models; see [[Map and Territory]].

The fallacy is not an argument against measurement. Unmeasured judgment has its own failures, and numbers often expose problems that intuition misses. The fix is to treat a metric as evidence rather than the goal: track several measures that pull in different directions, check them against direct observation such as talking to users, and keep an explicit list of what matters but isn't being measured; see [[Usability Testing]] and [[Ground Truth]].

A screen of numbers invites the fallacy by presenting what is countable as the whole picture; see [[Dashboard]].

## See also
- [[Survivorship Bias]]
- [[Law of the Instrument]]
- [[Pulse Oximetry]]
- [[Cost-Benefit Analysis]]
