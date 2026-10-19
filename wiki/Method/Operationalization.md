---
aliases:
  - Operational definition
  - Construct validity
  - Proxy measure
tags:
  - method
summary: Turning a fuzzy concept like productivity, pain, or code quality into something that can actually be measured, a step every study and metric depends on and where much of their meaning is quietly decided.
---
**Operationalization** is the process of defining a fuzzy concept in terms of something that can be measured. Nobody can measure "intelligence," "user satisfaction," or "code quality" directly. A researcher or team has to pick specific observations, such as a test score, a survey rating, or a count of defects, and declare that those will stand for the concept. That choice, the **operational definition**, shapes every result that follows.

The idea comes from the physicist Percy Bridgman, who argued in 1927 that a scientific concept means no more than the operations used to measure it. Psychology and the social sciences adopted it widely, because most of what they study, such as anxiety, happiness, or trust, can't be observed except through something else.

Choosing a measure involves two questions:

- **Reliability.** Does it give consistent results when applied again, or by someone else? A bathroom scale that reads differently each time is unreliable.
- **Validity.** Does it actually measure the concept? A scale can be perfectly consistent and still wrong by five pounds. **Construct validity** asks whether the measure tracks the underlying idea rather than something correlated with it.

The gap between concept and measure causes problems at every level. Pain is measured on a zero-to-ten scale that means different things to different people. A study of "exercise" might count gym visits, and miss everyone who cycles to work. Software teams measure productivity by lines of code, commits, or tickets closed, each of which captures something but rewards the wrong behavior if pushed; see [[Goodhart's Law]] and [[Map and Territory]].

Measures used as targets drift away from their concepts. Once people know how they will be measured, they optimize the measure; see [[Hawthorne Effect]]. Machine learning systems do the same with any objective given to them; see [[Reward Hacking]]. Test coverage is a useful operationalization of thoroughness until it becomes a gate, at which point tests get written to hit lines rather than check behavior; see [[Code Coverage]].

The choice also affects how studies compare. Two studies of "screen time and well-being" can reach opposite conclusions because one counted hours of social media and the other any screen use, and measured well-being differently. Researchers with freedom to pick among measures after seeing the data can find an effect somewhere; see [[P-Hacking]] and [[Replication Crisis]]. Preregistering the operational definitions before collecting data is a common defense.

Practical habits help. State the operational definition explicitly. Use several measures when one could mislead, such as pairing a speed metric with a quality one; see [[DORA Metrics]]. Check measures against cases where the answer is known; see [[Ground Truth]]. And report effect sizes in the units of the measure, so readers can judge whether a change matters; see [[Effect Size]].

## See also
- [[Slider]]
- [[Pre-registration]]
- [[Data Labeling]]
- [[Ecological Fallacy]]
- [[McNamara Fallacy]]
