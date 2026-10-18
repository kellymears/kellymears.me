---
aliases:
  - Hypothesis-driven debugging
  - Wolf fence algorithm
  - Debugging by hypothesis
tags:
  - testing
summary: Treating a bug as an unknown to be investigated with explicit hypotheses, predictions, and experiments, instead of changing code until the symptom disappears.
---
**Scientific debugging** applies the scientific method to finding the cause of a bug. Instead of changing things until the symptom goes away, you state a hypothesis about the cause, predict what you'd observe if it were true, run an experiment to check, and refine. Computer scientist Andreas Zeller set out the method in his book *Why Programs Fail*, arguing that debugging is a search problem best tackled systematically.

The cycle looks like this:

1. **Observe the failure.** Pin down exactly what goes wrong, ideally reduced to a [[Minimal Reproducible Example]].
2. **Hypothesize.** Propose a specific cause: "the cache returns stale data after a write."
3. **Predict.** If the hypothesis is true, what else should hold? "Clearing the cache before the read should make the bug vanish."
4. **Experiment.** Test the prediction with a line of [[Logging]], a breakpoint in the [[Debugger]], an assertion, or a changed input.
5. **Conclude.** If the prediction failed, the hypothesis is rejected; if it held, refine it until it explains the whole failure.

Zeller recommends keeping a written log of hypotheses and results. It stops you retrying ideas already ruled out, and it helps when explaining the problem to someone else, which is the insight behind [[Rubber Duck Debugging]].

The key discipline is trying to disprove your hypothesis, not confirm it. A test that can only agree with your idea teaches nothing, the lesson of [[Falsifiability]]. Developers are prone to [[Confirmation Bias]]: once they suspect a culprit, every symptom seems to fit. A good experiment is one whose outcome you can't predict with confidence.

Several systematic techniques narrow the search space mechanically:

- **The wolf fence algorithm.** Described by Edward Gauss in 1982: there is one wolf in Alaska; build a fence down the middle, wait for it to howl, and fence the half it's in, until you find it. In code, check the program state halfway through execution, then halfway through the bad half.
- **[[Git Bisect]]** applies the same halving to history, finding the commit that introduced the bug.
- **[[Delta Debugging]]**, also from Zeller, automatically shrinks failing inputs or changes to the smallest one that still fails.

Some bugs resist the method. A [[Heisenbug]] changes when observed, and a [[Flaky Test]] fails only sometimes, so a single experiment proves little; repeating runs and controlling timing become part of the experimental design.

The method ends with understanding, not with a passing test. A fix that makes the symptom disappear without explaining the cause may mask the problem, and the same root issue returns elsewhere. Asking why once more, as in the [[Five Whys]], and writing a regression test that captures the cause, makes the fix stick. [[Occam's Razor]] helps choose which hypothesis to test first: the simple explanation is usually right.

## See also
- [[Spectrum-Based Fault Localization]]
- [[Program Slicing]]
- [[Regression Testing]]
