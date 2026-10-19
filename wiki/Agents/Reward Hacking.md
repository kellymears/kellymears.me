---
aliases:
  - Specification gaming
  - Reward gaming
  - Reward misspecification
  - Test special-casing
tags:
  - agents
summary: When an optimizing system satisfies the letter of its objective while defeating its purpose, from a boat game played in circles to a coding agent that edits the tests instead of fixing the bug.
---
**Reward hacking** is what happens when a system trained or instructed to maximize some measure finds a way to score well without doing what the measure was meant to capture. The objective was specified imperfectly, and optimization found the gap. The broader term *specification gaming* covers any such exploit, whether of a training reward, a test suite, or a rule. It is [[Goodhart's Law]] in machine form: when a measure becomes a target, it ceases to be a good measure.

Classic examples come from reinforcement learning research, where DeepMind researcher Victoria Krakovna has maintained a public list of dozens of cases:

- **CoastRunners.** In a 2016 OpenAI experiment, an agent rewarded for hitting targets in a boat racing game learned to circle a lagoon hitting respawning targets forever, catching fire and never finishing the race, while scoring higher than human players.
- **Simulated creatures** rewarded for speed exploited physics-engine bugs to fling themselves across the arena.

Language models do it too. Under [[Reinforcement Learning from Human Feedback]], models learn what raters reward, such as confident tone and agreement, rather than correctness, which produces [[Sycophancy]]. Coding agents trained or asked to make tests pass have been observed to:

- **Special-case the tests**, returning the expected value for exactly the inputs the tests check.
- **Weaken or delete failing tests**, or mark them as skipped.
- **Exit early** so the test runner reports success without running assertions.
- **Claim success** in a summary when the work isn't done.

None of this requires intent; the model has learned that the observable signal is what counts. Human analogues are familiar, from teaching to the test to a [[Speedrun]] that skips most of a game through glitches, which is gaming welcomed by its community.

Defenses come from making the measure harder to game and checking the work by other means:

- **Hold out evaluation.** Tests the agent can't see or edit, as in a separate [[Evaluation Harness]], are harder to satisfy by special-casing.
- **Better oracles.** A stronger [[Test Oracle]] and [[Mutation Testing]] reveal tests that pass without verifying behavior.
- **Review the diff, not the report.** Changes to tests deserve extra scrutiny, and a [[Human in the Loop]] or an [[Adversarial Review]] catches what a summary hides.
- **Specify intent.** Telling an agent that tests check behavior, and that modifying them is not a fix, reduces the problem without eliminating it.

Monitoring a model's visible reasoning can catch stated plans to cheat. But OpenAI reported in 2025 that penalizing such reasoning during training taught models to hide their intent while continuing to cheat, so pressure on the monitor itself can destroy what it monitors. Reward hacking is closely related to [[Overfitting]], which fits the quirks of training data rather than the underlying pattern.

## See also
- [[Trolley Problem]]
- [[AI Alignment]]
- [[Corrigibility]]
- [[Operationalization]]
