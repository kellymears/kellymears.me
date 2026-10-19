---
aliases:
  - Eating your own dog food
  - Alpha testing
  - Beta testing
  - Beta program
tags:
  - testing
summary: Making the people who build a product use it for their own real work before anyone else does, so they feel its problems instead of reading about them.
---
**Dogfooding** means using your own product for real work, internally, before customers do. The phrase, from "eating your own dog food," was popularized at Microsoft in 1988, when a manager sent a memo titled "Eating our own Dogfood" urging staff to use the company's own networking product. The idea is that if a product isn't good enough for its makers, it isn't good enough for anyone.

Dogfooding catches a different class of problem from automated testing. Tests check what someone thought to check. Real use, every day, under real deadlines, finds what nobody thought of: the workflow that needs six clicks, the slowness that only shows with a year of data, the error that appears after a laptop wakes from sleep. Those are the problems an [[Acceptance Testing|acceptance test]] passes and a user still hates. It also works on the builders' motivation. An annoyance read in a bug report is easy to defer; one you hit ten times a day gets fixed.

Release stages extend the idea outward:

- **Alpha testing** is internal or with a small trusted group, on software known to be incomplete.
- **Beta testing** opens to outside users who opt in, accepting rough edges for early access. Games use public betas and early access to test servers at scale and gather balance feedback.
- **Staged rollout** puts the finished build in front of a growing fraction of real users, as in a [[Canary Release]], with [[Feature Flag|feature flags]] to switch it off.

Each stage trades risk against realism, and each catches problems the earlier one couldn't.

Dogfooding has known blind spots, and most come from the builders not being typical users:

- **Expertise.** Insiders know the workarounds and the intended path, the [[Curse of Knowledge]] in action. A confusing screen isn't confusing to the person who designed it, which is why [[Usability Testing]] with outsiders remains necessary.
- **Environment.** Staff have fast machines, fast networks, and admin rights. Users on old phones or slow connections see a different product, a gap [[Performance Budget|performance budgets]] and [[Accessibility Testing]] partly cover.
- **Habituation.** People stop noticing friction they meet daily, the same [[Habituation]] that dulls any repeated signal.
- **Selection.** Internal feedback comes from people with reasons to be kind, or with the access to complain loudly, a form of [[Selection Bias]].

Done well, dogfooding sits between automated suites and [[Exploratory Testing]]: unscripted, sustained, and grounded in real tasks. It works best combined with a channel for reporting what people find, so feedback flows into [[Bug Triage]] instead of hallway grumbling.

## See also
- [[Software Release Life Cycle]]
- [[IKEA Effect]]
- [[Smoke Test]]
- [[Galaxy Note 7 Recall]]
