---
aliases:
  - Premortem
  - Project premortem
  - Prospective hindsight
tags:
  - method
summary: A planning exercise in which a team imagines its project has already failed and explains why, surfacing risks that optimism and politeness would otherwise keep hidden.
---
A **pre-mortem** is a short exercise run before a project starts, or at a major decision point. The team imagines that it's some months later and the project has failed completely, then each person writes down, independently, the reasons it failed. The reasons are collected, discussed, and turned into changes to the plan. Psychologist Gary Klein described the technique in a 2007 article, and Daniel Kahneman named it as his favorite debiasing technique.

It works by changing the question. Asking "what could go wrong?" invites a few polite caveats from people already committed to the plan. Asking "it failed, why?" treats failure as a fact to explain, which people find much easier. Research on *prospective hindsight* found that imagining an event as having already happened increased people's ability to identify reasons for it by around 30%. The exercise borrows the clarity of [[Hindsight Bias]] while the information can still change the outcome.

It also changes the social setting. In most planning meetings, voicing doubt looks disloyal, and once a leader has endorsed a plan, the group converges on agreement, the dynamic of [[Groupthink]]. A pre-mortem makes finding problems the assignment, so the people with quiet reservations, often the ones closest to the risky details, are rewarded for sharing them.

A typical session takes under an hour:

- **Set the scene.** State the plan, then announce that it has failed, ideally in a vivid, specific way.
- **Write alone.** Everyone lists reasons silently for a few minutes, so early voices don't anchor the rest, as the [[Anchoring Effect]] would predict.
- **Collect in turns.** Go around the room taking one reason at a time until the lists are exhausted, so senior people don't dominate.
- **Act on it.** Rank the risks, and for the most serious ones, change the plan, add a check, or decide what early signal will show the risk is coming true.

Pre-mortems fit naturally with other practices. They counter the [[Planning Fallacy]] by surfacing the delays and dependencies an inside-view estimate leaves out. They're the forward-looking twin of the [[Blameless Postmortem]], which examines a failure after it happens; a team that runs both can compare what it feared with what actually went wrong. In engineering, the same thinking appears in threat modeling, [[Chaos Engineering]], and [[Adversarial Review]], each asking how a system will break before it does.

The exercise has limits. It finds risks people can imagine, not truly novel ones, and a team that runs it as a ritual without changing the plan gains little. Done honestly, though, it is cheap insurance: an hour of imagined failure against months of real failure.

## See also
- [[Five Whys]]
- [[Delphi Method]]
- [[Second-Order Thinking]]
- [[Failure Mode and Effects Analysis]]
- [[Inversion]]
- [[Thought Experiment]]
- [[Architecture Decision Record]]
- [[Devil's Advocate]]
