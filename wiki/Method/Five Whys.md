---
aliases:
  - 5 Whys
tags:
  - method
summary: Repeatedly asking why a symptom occurred, chaining each answer into the next question until the causal chain runs out.
---
**Five Whys** is a root-cause technique that takes a symptom, asks why it happened, takes that answer, asks why *that* happened, and repeats — the number five is a convention, not a rule, meant to signal "keep going past the first answer," which is usually a proximate cause rather than the thing actually worth fixing. Taiichi Ohno developed it at Toyota to stop line workers from accepting the first plausible explanation for a defect.

A worked example makes the shape clear: a server crashed (why?) because it ran out of memory (why?) because a cache grew unbounded (why?) because an eviction policy was never configured (why?) because the caching library's default is "no eviction" and nobody read that far into the docs (why?) because the team was under deadline pressure and copied a config from an unrelated service. Stopping at "ran out of memory" gets you a bigger box; stopping at "eviction policy" gets you a config fix that will recur elsewhere; going the full chain gets you a process fix — a docs-read step in the checklist for adopting a new dependency — that generalizes.

The technique has two real failure modes worth knowing before you trust it blindly. First, causation in a real system is a graph, not a chain — a single "why" often has several true parents, and picking only one branch to interrogate produces a tidy narrative that quietly discards the others, which is a form of [[Overfitting]] to the story that felt most obvious. Second, the chain has to stop somewhere, and where it stops is a judgment call, not something the technique itself decides — stop too early and you fix a symptom; keep going past the point of actionability and you arrive at "capitalism" or "entropy," true but useless.

Five Whys works best as a prompt to keep asking, paired with a [[Blameless Postmortem]] posture so each answer names a system gap rather than a person, and checked against [[Correlation and Causation]] so each link in the chain is actually causal, not just adjacent in time.

## See also
- [[Root Cause Analysis]]
- [[Blameless Postmortem]]
- [[Correlation and Causation]]
- [[Chesterton's Fence]]

## Related
- [[Rubber Duck Debugging]]
