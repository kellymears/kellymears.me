---
aliases:
  - Scope Creep
  - Featuritis
tags:
  - method
summary: A product accumulates features one reasonable addition at a time until the sum is bloated, slow, and hard to use.
---
**Feature Creep** is the gradual expansion of a product's scope through a sequence of individually reasonable additions, none of which alone looks like a mistake, whose sum is a system that's slower, harder to learn, and more expensive to maintain than the one anyone actually set out to build. It's a compounding process, not a single bad decision — which is exactly why it's hard to stop: there's rarely a moment where saying yes to the next feature looks wrong in isolation.

The mechanism runs through the asymmetry between adding and removing. Every feature request has a visible advocate — a customer, a salesperson, a stakeholder who needs it for one deal — while the cost of the feature is diffuse and delayed: a slightly heavier settings page, one more code path to test, one more interaction to consider when the next feature is added on top. Nobody advocates for the option that was never built, so the ledger is structurally biased toward yes. Consumer software's classic case is a remote control or a word processor where the tenth toolbar's worth of buttons serves fractions of a percent of users each, while every user pays the cost of finding the button they actually wanted among all the others.

Feature creep also has a technical mirror: each added feature multiplies the states the rest of the system has to be correct under, so complexity grows faster than the feature count would suggest — two independent toggles are four states to reason about, not two. This is the same compounding [[Second-System Effect]] describes for a whole rewrite, but feature creep is the version that happens gradually to a system that never had a "second system" moment at all, just a thousand small yeses.

The defense isn't refusing all requests — it's requiring that a new feature's cost be weighed against removing or simplifying something else, and treating "no" as the default answer a proposal has to earn its way past, which is most of what a real product roadmap and a firm [[Minimum Viable Product]] boundary are for.

## See also
- [[Second-System Effect]]
- [[Minimum Viable Product]]
- [[Technical Debt]]
- [[Law of Triviality]]
- [[Hick's Law]]

## Related
- [[Parkinson's Law]]
