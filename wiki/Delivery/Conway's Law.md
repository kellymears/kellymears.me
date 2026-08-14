---
aliases:
  - Reverse Conway maneuver
  - Mirroring hypothesis
tags:
  - delivery
summary: Systems tend to reproduce the communication structure of the organization that built them.
---
**Conway's law** holds that any system designed by an organization will have a structure that mirrors the organization's communication structure — the modules, services, and interfaces a codebase ends up with tend to reproduce the team boundaries and reporting lines of whoever built it. Melvin Conway proposed it in 1967, in a paper *Harvard Business Review* rejected and *Datamation* ran in April 1968, as an observation about design generally, not just software, but it is cited most often about system architecture: two teams that rarely talk will produce two components joined by a narrow, awkward interface, because that interface is the only channel available for the coordination the design actually needs.

The law has an inverse, sometimes called the reverse Conway maneuver: instead of accepting that structure follows communication, deliberately reorganize teams around the architecture wanted, on the premise the system will grow to match. A team structured around a single service, with clear ownership and little need to coordinate across it, tends to produce a cleaner [[Client-Server Boundary]] or [[Module Graph]] than one where five groups each touch the same file. This is one reason a [[Monorepo]] gets carved along team lines rather than purely technical ones, and why [[Code Review]] assignment and [[Branching Model]] choices often track org charts more than anyone intends — a [[Pull Request]] crossing a team boundary collects reviewers from both sides, Conway's law visible in a diff.

The caveat is honest but narrower than usually stated. There are no controlled experiments, since nobody can randomize org charts, and the causal direction is plausibly bidirectional — architecture also shapes who needs to talk to whom. The observational evidence is quantitative rather than anecdotal, though: MacCormack, Rusnak and Baldwin's matched-pair study (2012) compared design structure matrices for products built by tightly coupled firms against loosely coupled open-source counterparts and found the predicted difference in modularity, and Nagappan, Murphy and Basili's study of Windows Vista (2008) found organizational metrics out-predicted code metrics at forecasting failure-prone components. It compounds with concentration risk, too: a team drawn too small around a critical component sharpens the architecture and quietly lowers [[Bus Factor]] at the same time.

## See also
- [[Bus Factor]]
- [[Monorepo]]
- [[Module Graph]]
- [[Client-Server Boundary]]
- [[Trunk-Based Development]]
