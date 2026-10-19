---
aliases:
  - Squads and tribes
  - Squads, tribes, chapters and guilds
tags:
  - delivery
summary: A description of how one music streaming company organized engineering into autonomous squads, tribes, chapters and guilds, which spread widely as a template despite its authors calling it a snapshot rather than a model.
---
The **Spotify model** is a way of organizing software teams popularized by a 2012 paper by Henrik Kniberg and Anders Ivarsson, "Scaling Agile @ Spotify with Tribes, Squads, Chapters & Guilds," and by two short animated videos about the company's engineering culture in 2014. The material was engaging and widely shared, and many companies set out to copy it.

The structure has four parts:

- **Squads** are small, cross-functional teams, roughly six to twelve people, each owning a feature area end to end and choosing its own way of working. A squad was likened to a mini-startup; see [[Two-Pizza Team]] and [[You Build It, You Run It]].
- **Tribes** group squads working in related areas, ideally kept below about 100 people so that everyone can know one another; see [[Dunbar's Number]].
- **Chapters** gather people with the same skill, such as backend developers, across the squads in a tribe. The chapter lead was the line manager responsible for growth and pay, so a person's day-to-day team and their manager differed.
- **Guilds** are voluntary communities of interest that cut across the whole company, sharing knowledge about a topic such as testing or web performance; see [[Inner Source]].

The guiding idea was "aligned autonomy": leadership says what problem to solve and why, and squads decide how. Loose coupling between squads was meant to let them release independently, with the architecture shaped so teams rarely blocked one another; see [[Conway's Law]] and [[Team Topologies]].

The authors repeatedly cautioned that the paper described one company at one moment, and that the company itself kept changing. Kniberg later said it was never meant as a framework to install. Former employees have written that parts of it worked less well than the videos suggested. In particular, the matrix of squad and chapter left nobody clearly accountable for some decisions, chapter leads had trouble supporting people whose daily work they did not see, and autonomy without enough coordination made cross-squad work slow.

Copies often fared worse. Organizations renamed existing teams as squads and departments as tribes without changing who made decisions, how work was funded, or how software was architected, keeping the vocabulary and missing the substance; see [[Cargo Cult]]. Autonomy also depends on a culture in which teams can raise problems openly and take risks; see [[Psychological Safety]] and [[Self-Determination Theory]].

The lasting lesson is broader than any one company. Team structure should follow the product's architecture and the organization's problems, and a structure that works well somewhere else is at best a source of ideas to test rather than a template; see [[Scaled Agile Framework]].

## See also
- [[Agile Software Development]]
- [[Bus Factor]]
