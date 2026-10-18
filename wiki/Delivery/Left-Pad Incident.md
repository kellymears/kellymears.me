---
aliases:
  - Left-pad
  - Unpublishing
  - Trivial packages
tags:
  - delivery
summary: The 2016 episode in which removing an eleven-line npm package broke builds across the JavaScript ecosystem, exposing how deep and fragile dependency trees had become.
---
The **left-pad incident** was a brief, widely felt outage in the JavaScript ecosystem in March 2016. A developer, after a dispute over a package name, removed all of their packages from npm, the main JavaScript registry. One of them was `left-pad`, eleven lines of code that pads a string with spaces or zeros on the left. Within hours, thousands of builds failed, including those of widely used tools like Babel and React, because something deep in their dependency trees required it.

Most of the affected projects had never heard of `left-pad`. They depended on packages that depended on packages that depended on it. This is a [[Transitive dependency]], and modern JavaScript projects routinely pull in hundreds or thousands of them; see [[Dependency Hell]].

npm took the unusual step of restoring the package itself, overriding the author's removal, which settled the outage but started a debate about who controls published code. It then changed its rules so that packages can't be unpublished once other packages depend on them, except within a short window after release.

The incident raised several questions that are still argued:

- **Trivial packages.** Should a function this small be a dependency at all? Supporters of tiny packages argue that shared, tested code beats rewriting it everywhere. Critics argue that each dependency adds risk, a maintainer, and an attack surface, and that a few lines of code are cheaper to own; see [[Not Invented Here]].
- **Registry permanence.** Builds assumed published versions would exist forever. Teams responded by caching dependencies in their own registries; see [[Artifact Repository]] and [[Vendoring]].
- **Reproducibility.** A build that fetches dependencies fresh each time depends on the registry being available and unchanged; see [[Lockfile]] and [[Reproducible Build]].
- **Ownership.** Who decides when a name or a package can be taken away, the author, the registry, or a trademark holder?

The incident also showed how hidden infrastructure can be. A widely used project can sit on top of code that one person maintains in their spare time, unnoticed until it vanishes; see [[Open Source Sustainability]] and [[Bus Factor]]. The same shape of risk later appeared in deliberate sabotage, when maintainers pushed broken or malicious versions of their own popular packages, and in attacks on maintainer accounts; see [[Supply Chain Security]].

One concrete lesson stuck: the JavaScript language later gained a built-in `padStart` method, so the function that broke the internet now ships in every browser; see [[Web Standards]].

The left-pad incident is a standard example of a dependency nobody chose directly but everybody relied on, a case of [[Hyrum's Law]]'s wider point that whatever a system depends on, someone will notice when it changes.

## See also
- [[Package Manager]]
- [[Software Bill of Materials]]
- [[Backward Compatibility]]
