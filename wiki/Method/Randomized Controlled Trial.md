---
aliases:
  - RCT
  - Control group
  - Double-blind
  - Blinding
  - Clinical trial
tags:
  - method
summary: The experiment design that assigns treatments by chance and compares against a control, the strongest everyday tool for telling whether something actually causes an effect.
---
A **randomized controlled trial**, or **RCT**, tests whether an intervention works by assigning participants at random to receive it or not, then comparing outcomes. The group that doesn't receive it, the *control group*, shows what would have happened anyway. Randomization is the essential part: it makes the groups alike on average in every respect, measured or not, so a difference in outcomes can be credited to the intervention itself.

That solves the central problem of [[Correlation and Causation]]. In observational data, people who choose a treatment differ from those who don't. Those who take vitamins also tend to exercise, eat better, and earn more. A *confounding variable* like that can produce a correlation with no causal link at all, and no amount of statistical adjustment can be sure to remove factors nobody measured. Random assignment breaks the link between who gets the treatment and everything else about them, which removes [[Selection Bias]].

Several design features protect the result:

- **Control groups** receive nothing, the current standard treatment, or a *placebo*, an inactive look-alike. Placebos matter because expecting to improve can produce real improvement, the [[Placebo Effect]], and simply being studied changes behavior.
- **Blinding** keeps participants from knowing which group they're in. *Double-blind* trials hide it from the researchers measuring outcomes too, since their expectations can color judgments.
- **Pre-registration** commits to the hypothesis, outcomes, and analysis before data arrive, preventing the quiet search for any result that looks significant, known as [[P-Hacking]].
- **Adequate size.** Small trials produce noisy results that often fail to replicate, a major contributor to the [[Replication Crisis]].

The first modern RCT is usually dated to 1948, when the British Medical Research Council tested streptomycin for tuberculosis, though James Lind compared scurvy treatments in 1747. Trials are now the basis of evidence-based medicine, and summarizing many trials in a meta-analysis ranks even higher in the evidence hierarchy.

The same logic runs outside medicine. [[AB Testing]] is an RCT on a website, with visitors randomly assigned to versions, and adaptive designs such as the [[Multi-Armed Bandit]] shift traffic toward winning variants during the test. Development economics uses field trials to evaluate aid programs.

RCTs have limits. Some questions can't ethically be randomized, such as whether smoking causes cancer, so researchers rely on careful observational studies and natural experiments. Trial participants may differ from the people who'll eventually use a treatment, so results may not generalize. An average effect can hide groups who respond very differently, the territory of [[Simpson's Paradox]]. And trials measure what they measure: a well-chosen outcome can still be the wrong target, a version of [[Goodhart's Law]].

## See also
- [[Meta-Analysis]]
- [[Pre-registration]]
- [[Hawthorne Effect]]
- [[Ideomotor Effect]]
- [[Ablation Study]]
- [[Fisher-Yates Shuffle]]
