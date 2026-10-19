---
aliases:
  - OSPO
  - TODO Group
tags:
  - delivery
summary: A team within a company, university or government that sets policy for using, contributing to and releasing open source software, handling license compliance, contribution approval and support for the projects the organization depends on.
---
An **open source program office**, or **OSPO**, is the part of an organization responsible for how it uses and participates in open source software. Nearly all modern software depends on open source components, often thousands of them, and nearly every large organization also has engineers who want to fix bugs upstream or publish internal tools. Without a central function, each of those decisions is made inconsistently, or not at all.

Typical responsibilities include:

- **License compliance.** Knowing which licenses are in use, which are acceptable for which products, and what obligations they impose, such as publishing source code or keeping notices; see [[License Compatibility]] and [[Copyleft]]. Much of this is automated with scanning tools that run in the build and flag a newly added dependency whose license has not been approved.
- **Inventory.** Maintaining a record of dependencies, increasingly in the form of a software bill of materials, so that the organization can answer questions such as which products ship a library with a newly announced vulnerability; see [[Software Bill of Materials]] and [[Supply Chain Security]].
- **Contribution policy.** Deciding when engineers may contribute to outside projects, handling contributor agreements, and reviewing whether a contribution might expose patents or confidential code; see [[Developer Certificate of Origin]] and [[Software Patent]].
- **Releasing projects.** Reviewing internal code before it is published, choosing a license, and making sure someone will actually maintain it, since an abandoned corporate project can damage a company's reputation with developers.
- **Sustaining dependencies.** Funding maintainers, paying for security audits, joining foundations, and encouraging engineers to contribute fixes upstream instead of carrying private patches; see [[Open Source Sustainability]] and [[Open Source Foundation]].

The idea grew out of large technology companies in the 2000s, several of which built dedicated open source teams as their reliance on Linux and other projects deepened. In 2014 a group of companies formed the TODO Group, short for "talk openly, develop openly," to share practices, later hosted by the Linux Foundation. OSPOs have since appeared in banks, car makers, universities and some governments, where publicly funded code raises its own questions about whether citizens should be able to reuse it.

Part of an OSPO's value is economic. Maintaining a private fork of an open source project means repeating the same merge work every time the project releases, while contributing a change upstream shares that maintenance with everyone; see [[Software Fork]] and [[Vendoring]]. Organizations that depend on underfunded projects are also exposed to their failure, as several high-profile vulnerabilities in widely used but thinly maintained libraries have shown; see [[Bus Factor]] and [[Free Rider Problem]].

OSPOs also encourage applying open source practices internally, letting any team propose changes to any other team's code; see [[Inner Source]].

## See also
- [[Open Core]]
- [[Code of Conduct]]
