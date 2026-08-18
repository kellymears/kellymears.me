---
aliases:
  - Correlation Does Not Imply Causation
tags:
  - method
summary: Two things moving together is evidence for a causal link but never proof of one, or of its direction.
---
**Correlation and Causation** names the gap between observing that two variables move together and establishing that one produces the other. Correlation is symmetric and cheap to measure; causation is directional and expensive to establish, and the entire discipline of experimental design exists to close that gap when it can't be closed by staring at the data harder.

There are three standard ways correlation shows up without causation, and it's worth naming all three because "correlation isn't causation" alone doesn't tell you what to check instead. First, reverse causation: ice cream sales correlate with drowning deaths, and it's tempting to blame the ice cream, when both are driven by summer weather — a confound, the third thing causing both. Second, the arrow can run backward from the one assumed: a company's best engineers might get assigned the most interesting projects, making "interesting projects → great engineers" and "great engineers → interesting projects" both consistent with the same correlation. Third, plain coincidence — with enough variables in a dataset, some will correlate by chance alone (falling asleep with shoes on correlates with waking up with a headache; both are caused by drinking).

The gold-standard fix is a randomized controlled experiment, because randomization breaks any link between the treatment and whatever confound might otherwise explain the outcome — it's the only tool that can turn a correlation into a causal claim without a fully specified causal model of everything else going on. Short of that, the honest move is naming the confounds you can think of and checking whether the correlation survives controlling for them, rather than asserting causation because the story is intuitive.

Engineers hit this constantly in incident analysis: a deploy correlates with a spike in errors, and it's usually the deploy — but "usually" is doing real work in that sentence, and a [[Root Cause Analysis]] that stops at correlation is one confound away from blaming the wrong commit.

## See also
- [[Root Cause Analysis]]
- [[Simpson's Paradox]]
- [[Base Rate Fallacy]]
- [[Plausible Mechanism]]
- [[Falsifiability]]

## Related
- [[Regression to the Mean]]
