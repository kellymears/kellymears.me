---
aliases:
  - BDFL
  - Steering council
  - Open source governance
tags:
  - delivery
summary: The open-source governance model in which one founder has the final say on every dispute, kept in check mainly by the fact that anyone unhappy can fork the project, and the councils and foundations that replace it when the founder steps back.
---
**Benevolent dictator for life** (BDFL) is a half-joking title for the founder of an open-source project who keeps final authority over its direction. Contributors propose and debate, but when they can't agree, one person decides. The phrase was coined in 1995 for Guido van Rossum, the creator of Python, and has been applied to the leaders of many other projects, including Linus Torvalds and the [[Linux kernel]].

The model has real strengths. A project with a final arbiter can make decisions quickly and keep a consistent design, rather than becoming a compromise among competing visions. Disputes over small matters, which can otherwise run forever, get settled; see [[Law of Triviality]]. Many successful languages and tools reflect a single person's taste.

The "benevolent" part rests on an unusual check: the right to fork. Open-source licenses let anyone copy the code and start a rival project, so a leader who ignores the community risks losing it; see [[Software Fork]] and [[Copyleft]]. A dictator who can be abandoned at any time has to lead by persuasion. Eric Raymond made this argument in his essays on open-source culture; see [[The Cathedral and the Bazaar]].

The weaknesses are just as clear. Everything depends on one person's time, judgment, and health; see [[Bus Factor]]. Decisions can turn on personal preference, and conflicts become personal. Founders burn out: in 2018, after a heated debate over a new Python syntax feature, van Rossum stepped down, writing that he no longer wanted to fight so hard for a decision and find that so many people despised it. Python then adopted a five-member steering council, elected by core developers. The same year, Torvalds took a break to reflect on his often harsh communication style, and the kernel adopted a code of conduct.

Other governance models spread the authority:

- **Elected leadership.** Debian, since 1999, elects a project leader every year and is governed by a written constitution.
- **Foundations.** The Apache Software Foundation hosts independent projects run by committees of committers, which decide by voting and consensus; see [[Request for Comments]] for the related principle of rough consensus.
- **Proposal processes.** Formal written proposals let anyone argue for a change in public, regardless of who decides; see [[Architecture Decision Record]].
- **Corporate stewardship.** Many projects are controlled by the company that sponsors them, which brings funding but can conflict with users' interests; see [[Open Source Sustainability]].

Governance disputes have split projects. In 2014, frustration with how Node.js was run led to the io.js fork, which merged back a year later under a new foundation with open governance.

Who holds commit access and review authority is the practical day-to-day form of governance; see [[Code Owners]] and [[Developer Certificate of Origin]].

## See also
- [[Conway's Law]]
- [[Dunbar's Number]]
- [[Inner Source]]
