---
aliases:
  - Linus's Law
  - Bazaar model
  - Release early, release often
tags:
  - delivery
summary: Eric S. Raymond's 1997 essay contrasting carefully planned, closed development with the open, chaotic style of Linux, and the source of the claim that with enough eyeballs all bugs are shallow.
---
**The Cathedral and the Bazaar** is an essay by Eric S. Raymond, first presented in 1997 and published as a book in 1999. It contrasts two ways of building software:

- **The cathedral.** A small group works carefully and releases only when the work is ready. Raymond's examples included some early GNU projects, which were open source but developed largely behind closed doors between releases.
- **The bazaar.** Development happens in public, releases come often, and anyone can contribute. The Linux kernel was the model.

Raymond had expected the bazaar to produce chaos. Instead, Linux was growing quickly and getting more reliable. To test why, he ran an email program he maintained as a deliberate bazaar-style project and drew lessons from it.

The best-known is **Linus's Law**, named for Linux's creator: "Given enough eyeballs, all bugs are shallow." With a large group of testers and co-developers, problems are found quickly and the fix is obvious to someone. Related lessons include **"release early, release often,"** so users find bugs while the code is fresh, and treating users as co-developers.

The essay influenced Netscape's 1998 decision to release its browser's source code, which became the Mozilla project, and it helped launch the term "open source" as a business-friendly alternative to "free software"; see [[Copyleft]] and [[Permissive License]].

Many of its ideas became ordinary practice. Frequent small releases, public issue trackers, and contributions through patches and pull requests are now standard even inside companies; see [[Pull Request]] and [[Continuous Deployment]]. Distributed [[Version Control]] made the bazaar easier, since anyone can copy a repository and propose changes; see [[Software Fork]].

Linus's Law has aged less well. The **Heartbleed** bug sat in OpenSSL, used by much of the internet, for two years in 2012–2014. Many users, few readers: OpenSSL then had roughly one full-time developer. Eyeballs only help if they actually look, and most users of open-source code never read it; see [[Free Rider Problem]] and [[Open Source Sustainability]]. Studies of open-source projects also show most contributions come from a small core, not a vast crowd; see [[Pareto Principle]].

The bazaar also depends on someone resolving disagreements. Linux works partly because one person has final say, a governance style sometimes called *benevolent dictator for life*. Others use elected councils, foundations, or formal proposal processes to settle contested questions. Many successful open-source projects are more cathedral-like than the essay suggests, with a few maintainers doing most of the work.

The essay's lasting point is that openness and frequent feedback can beat careful central planning, an idea with parallels well outside software; see [[Commons-Based Peer Production]].

## See also
- [[Heartbleed]]
- [[Software Inspection]]
- [[Email Patch Workflow]]
- [[Benevolent Dictator for Life]]
- [[Wisdom of the Crowd]]
