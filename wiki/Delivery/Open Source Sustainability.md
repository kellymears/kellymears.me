---
aliases:
  - Maintainer burnout
  - Nebraska problem
  - Open source funding
tags:
  - delivery
summary: The problem of keeping widely used open-source software maintained when much of it rests on a few unpaid people, and the funding, governance, and security efforts that try to address it.
---
**Open source sustainability** is the problem of keeping open-source software maintained over time. Nearly all modern software depends on open-source libraries, and many of the most widely used are maintained by a handful of people, often unpaid, in their spare time. A well-known comic captures it: a tower of modern digital infrastructure resting on one small block labeled as a project "some random person in Nebraska has been thanklessly maintaining since 2003."

The problem became visible through failures:

- **Heartbleed** (2014), a serious flaw in OpenSSL, a library securing much of the web. The project had roughly one full-time developer and received only a few thousand dollars a year in donations; see [[The Cathedral and the Bazaar]].
- **The [[Left-Pad Incident]]** (2016), when removing one tiny package broke thousands of builds.
- **The xz backdoor** (2024), in which an attacker spent about two years gaining the trust of a burned-out solo maintainer of a compression library, became a co-maintainer, and slipped a backdoor into releases. It was caught by chance, by an engineer investigating a small slowdown; see [[Supply Chain Security]].

The economics are a classic [[Free Rider Problem]]. Open-source code is a [[Public good]]: anyone can use it, and use doesn't use it up. Companies that depend on it have little individual reason to pay for upkeep. Unlike the [[Tragedy of the Commons]], the resource isn't depleted by use; it decays from neglect, while demand on maintainers grows with every new user filing issues and requests.

**Maintainer burnout** is the human side. Maintainers face a stream of bug reports, feature requests, and sometimes hostility from users who treat volunteer work as a service owed to them. Many projects end when a maintainer quietly stops; see [[Bus Factor]].

Responses have come from several directions:

- **Direct funding.** Sponsorship platforms, foundations, and some governments now fund critical projects. A German public fund, for example, supports maintenance of open-source infrastructure.
- **Foundations and governance.** Moving projects under a foundation spreads ownership and makes them less dependent on one person.
- **Corporate staffing.** Companies pay employees to maintain projects they rely on.
- **Identifying critical projects.** Security initiatives map which packages matter most, using dependency data such as a [[Software Bill of Materials]].
- **Licensing changes.** Some companies switch projects to more restrictive licenses to stop cloud providers profiting without contributing, which is controversial and often leads to forks; see [[Software Fork]] and [[Copyleft]].

None of these fully solves the mismatch between how much value open source creates and how little of it reaches the people who maintain it; see [[Matthew Effect]].

## See also
- [[Code of Conduct]]
- [[Inner Source]]
- [[Open Core]]
- [[Benevolent Dictator for Life]]
