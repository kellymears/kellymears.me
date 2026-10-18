---
aliases:
  - colors.js
  - node-ipc
tags:
  - delivery
summary: Open source code that its own maintainer deliberately changes to make a protest, from the colors.js infinite loop over unpaid corporate use to node-ipc wiping files on Russian computers in 2022.
---
**Protestware** is software that its own maintainer deliberately alters to make a political or personal point, usually by changing how it behaves for the people who depend on it. It differs from an ordinary supply chain attack in that nobody broke in: the person with legitimate publishing rights made the change, through the normal release process; see [[Supply Chain Security]].

The term spread in early 2022 after two incidents in the npm ecosystem.

- **colors.js and faker.js.** In January 2022, Marak Squires, the author of both libraries, published new versions that broke them. colors.js, downloaded millions of times a week to color terminal output, went into an infinite loop printing "LIBERTY" and garbled text. faker.js, used to generate test data, was replaced with almost nothing. Squires had written in 2020 that he would no longer support large companies with free work. npm restored earlier versions, GitHub briefly suspended his account, and other contributors forked faker to keep it alive; see [[Software Fork]] and [[Free Rider Problem]].
- **node-ipc.** In March 2022, after Russia's invasion of Ukraine, the maintainer of node-ipc, a library for communication between processes, added code that checked the computer's IP address and, for machines located in Russia or Belarus, overwrote files with a heart emoji. Later versions instead wrote an antiwar message to the desktop. The library was a dependency of the Vue.js command-line tool, so the change reached a great many developers who had never heard of it; see [[Dependency Hell]].

Earlier, the 2016 removal of left-pad had begun as a protest too, over npm transferring a package name to a company, and broke builds across the ecosystem; see [[Left-Pad Incident]].

Reactions divide along a familiar line. One side holds that maintainers owe their users nothing: open source licenses state that the software comes with no warranty, and companies that use free code without contributing are in no position to complain; see [[Permissive License]] and [[Open Source Sustainability]]. The other holds that deliberately damaging users' systems is malware whatever the motive, and that it punishes mostly bystanders. The node-ipc change was assigned a vulnerability identifier like any other security flaw. Even protest that only prints a message erodes trust, because users can no longer assume an update means what it says; see [[Semantic Versioning]].

For delivery practice it changes the threat model. A trusted maintainer, not just a compromised account, can be the source of a bad release. Defenses are the same as for other supply chain risks:

- **Pin versions** so builds don't pick up new releases silently; see [[Lockfile]].
- **Delay adoption** of fresh releases by days, since most sabotage is noticed quickly; see [[Automated Dependency Updates]].
- **Copy critical code in** where a dependency is small enough to own; see [[Vendoring]].

## See also
- [[Event-stream Incident]]
- [[Bus Factor]]
- [[Code of Conduct]]
