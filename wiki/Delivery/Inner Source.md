---
aliases:
  - InnerSource
  - Internal open source
tags:
  - delivery
summary: Running a company's internal software the way open-source projects run, so any team can read another team's code and contribute changes to it, instead of filing a request and waiting.
---
**Inner source** is the practice of applying open-source development methods inside a company. Code is visible across the organization, and anyone can propose changes to another team's project, which that team reviews and accepts or declines, just as an open-source maintainer would. Tim O'Reilly coined the term in 2000; the InnerSource Commons community, founded in 2015, collected the patterns companies used.

The problem it addresses is dependency between teams. Suppose one team needs a small change in a service another team owns. Without inner source, it files a request and waits, perhaps for weeks, while the owning team works through its own priorities. Often the requesting team gives up and builds its own copy, and the company ends up with several half-maintained versions of the same thing; see [[Not Invented Here]]. With inner source, the requesting team writes the change itself and submits it for review.

The key practices come straight from open source:

- **Visibility.** Code, issues, and discussions are open to everyone in the company by default, often in a shared repository or [[Monorepo]].
- **Contributions through review.** Outside changes arrive as [[Pull Request]]s and go through [[Code Review]] by the owning team.
- **Trusted committers.** Designated people on the owning team mentor contributors, review their work, and guard the project's quality and direction; see [[Code Owners]].
- **Written documentation.** Contributing guides, decision records, and public discussion replace hallway conversations, so outsiders can participate; see [[Architecture Decision Record]].

Benefits reported include less duplicated code, faster delivery of cross-team needs, knowledge spread beyond the original authors, and fewer single points of failure; see [[Bus Factor]]. Code written to be read by strangers also tends to be better documented. Inner source works against the tendency of systems to mirror team boundaries; see [[Conway's Law]].

The challenges are mostly about people and incentives. Reviewing other teams' contributions takes time the host team may not be rewarded for, and contributors may submit changes and then leave the owners to maintain them; see [[Free Rider Problem]] and [[Open Source Sustainability]]. Managers may resist engineers spending time on another team's code. And some code has legitimate reasons to stay restricted, such as security-sensitive systems.

Inner source differs from simply making code visible. Many companies let everyone read everything without welcoming contributions, which gives transparency but not collaboration. It also differs from central teams that provide shared tools for others to use; see [[Platform Engineering]]. The two often work together, with platform teams accepting contributions from the teams they serve.

The approach borrows the reasoning that open, many-contributor development can outperform closed groups; see [[The Cathedral and the Bazaar]] and [[Benevolent Dictator for Life]].

## See also
- [[Open Source Program Office]]
- [[Spotify Model]]
