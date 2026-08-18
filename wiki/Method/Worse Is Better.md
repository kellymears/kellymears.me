---
aliases:
  - The New Jersey Style
tags:
  - method
summary: A simpler, less correct design that ships and spreads beats a more correct one that doesn't, because adoption compounds.
---
**Worse Is Better** is Richard Gabriel's observation, made comparing Unix and C against the more rigorously designed Lisp Machines, that a design prioritizing simplicity of implementation over correctness, consistency, and completeness tends to win in the market — because it ships sooner, is easier to port, and gets adopted widely enough that its rough edges become someone else's problem to work around rather than a reason to reject it. He called the rigorous alternative "the MIT approach" and the pragmatic one "the New Jersey style," and argued, somewhat ruefully, that New Jersey usually wins.

The mechanism runs through time, not quality: a simpler system reaches users faster, and once it has users, it accumulates real-world feedback, integrations, and switching costs that a more "correct" but later competitor can't easily overcome no matter how much better its design is on paper. C's approach to error handling, memory, and portability is famously worse by almost any abstract design metric than what contemporaneous Lisp environments offered — and C spread to every corner of computing anyway, because it was small enough to implement on anything and its imperfections were tolerable enough to work around, over and over, at scale.

The idea is often misquoted as "quality doesn't matter" or as blanket permission to ship sloppy work, which inverts Gabriel's actual argument — he was diagnosing a real market dynamic, not endorsing it, and later wrote follow-up essays wrestling with the tension it creates for anyone who cares about doing the more correct thing. The honest reading is closer to: a simpler design that ships and gets used will teach you things a more complete design sitting in review never will, and the marginal cost of the imperfections is frequently smaller than the cost of the delay required to remove them upfront.

It sits directly behind [[Gall's Law]] and [[Minimum Viable Product]] as one more argument for shipping the small thing now — worse-is-better is what happens to that small thing once it meets the market, not always a virtue, but a force to plan around rather than deny.

## See also
- [[Gall's Law]]
- [[Minimum Viable Product]]
- [[Postel's Law]]
- [[Technical Debt]]

## Related
- [[Path Dependence]]
