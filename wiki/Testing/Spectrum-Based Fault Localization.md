---
aliases:
  - Fault localization
  - Tarantula
  - Ochiai
tags:
  - testing
summary: Ranking lines of code by how suspicious they look, based on which lines the failing tests ran and the passing tests mostly didn't, a statistical shortcut that points debugging toward the likely culprit.
---
**Spectrum-based fault localization** is a family of techniques that suggest where a bug is by comparing which parts of the code run during passing and failing tests. The "spectrum" is the record of which lines or branches each test executed, the same data collected for [[Code Coverage]]. Code that runs in nearly every failing test and few passing ones is ranked as most suspicious, and the programmer starts looking there.

The method needs nothing but a test suite with at least one failure. For each line, it counts four numbers: how many failing tests ran it, how many failing tests didn't, and the same for passing tests. A formula turns those counts into a suspiciousness score:

- **Tarantula**, from James Jones and Mary Jean Harrold in 2002, compares the fraction of failing tests that ran a line with the fraction of passing tests that did.
- **Ochiai**, borrowed from a 1957 formula for comparing species in ecology, usually ranks the faulty line higher and became a common default.

Dozens of other formulas have been proposed, with modest differences between them.

The idea is correlation, and it inherits correlation's limits; see [[Correlation and Causation]]. A line that runs in every test, such as setup code, can't be told apart from anything else. A bug that lives in a missing line, such as a forgotten check, can't be ranked at all, because there's nothing to execute. When several bugs are present, their signals mix. Lines that always run alongside the faulty one get the same score; see [[Confounding]].

Evaluations measure how much code a programmer would have to inspect before reaching the bug. Early studies reported good results, but a 2011 study by Chris Parnin and Alessandro Orso found that programmers given rankings did not simply go down the list. They read the top few entries, and if the bug wasn't there they abandoned the ranking. The measure of success had assumed a reader who doesn't exist; see [[Goodhart's Law]].

The technique works best combined with others. [[Delta Debugging]] shrinks the failing input first, so less code runs. [[Git Bisect]] narrows down which change introduced a regression, after which localization narrows down where within it. [[Mutation Testing]] data can sharpen the scores, since mutants that change test outcomes like the real bug probably sit near it.

It shares a weakness with all test-based methods: the results are only as good as the tests. A [[Flaky Test]] that fails at random adds noise to every count, and code without tests has no spectrum. Treated as a hint rather than an answer, the ranking gives [[Scientific Debugging]] a reasonable place to form its first hypothesis; see [[Debugger]].

## See also
- [[Branch Coverage]]
- [[Test Impact Analysis]]
- [[Root Cause Analysis]]
- [[Program Slicing]]
