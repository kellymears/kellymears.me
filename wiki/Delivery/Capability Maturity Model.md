---
aliases:
  - CMM
  - CMMI
  - Software process maturity
tags:
  - delivery
summary: A five-level scale for rating how disciplined and repeatable an organization's software process is, developed for the US defense department to judge contractors and later both widely adopted and widely criticized.
---
The **Capability Maturity Model**, or **CMM**, rates an organization's software development process on a scale of five maturity levels. It was developed at the Software Engineering Institute at Carnegie Mellon University, funded by the US Department of Defense, which needed a way to judge whether the contractors bidding on its software projects could actually deliver. Watts Humphrey, who led the institute's process work, laid out the ideas in the 1989 book "Managing the Software Process," and the first official model appeared in 1991.

The levels are:

1. **Initial.** Success depends on individual heroics. Schedules and budgets are routinely missed, and nobody can say why one project went well and another did not.
2. **Repeatable.** Basic project management is in place: requirements are tracked, plans and estimates exist, and similar projects can repeat earlier successes.
3. **Defined.** The organization has a documented standard process that projects tailor, with training and peer review; see [[Software Inspection]].
4. **Managed.** The process and its products are measured quantitatively, and variation is understood and controlled; see [[Control Chart]].
5. **Optimizing.** The organization continuously improves the process based on measurements and experiments.

The model drew on quality management ideas from manufacturing, particularly the view that a product's quality reflects the process that made it, and that a process must be stable before it can be measured or improved; see [[Value Stream Mapping]]. It arrived in the context of the [[Software Crisis]], when large government projects regularly ran years late.

CMM was influential. Defense and government contracts increasingly required a certain level, and an appraisal at the highest levels became a marketing asset, especially for large outsourcing firms. In the early 2000s it was folded into **CMMI**, Capability Maturity Model Integration, which combined separate models for software, systems engineering and other disciplines.

Critics raised several objections:

- **Paperwork over outcomes.** Appraisals checked that processes were defined and followed, which rewarded documentation and could say little about whether the software was any good.
- **Gaming.** Once a level became a requirement for winning contracts, organizations prepared for appraisals rather than improving; see [[Goodhart's Law]] and [[Cargo Cult]].
- **Fit.** The model suited large, plan-driven projects and sat uneasily with iterative methods; see [[Waterfall Model]] and [[Agile Software Development]]. Later versions explicitly allowed agile practices.
- **Heroics are not always bad.** Small teams of skilled people can succeed without the scaffolding the model requires.

Its core insight has outlasted the certificates. Measuring delivery outcomes, such as how often a team ships and how quickly it recovers from failure, is a descendant of the same belief that process can be observed and improved; see [[DORA Metrics]] and [[Mean Time to Recovery]]. The difference is that newer approaches measure results rather than conformance to a prescribed process.

## See also
- [[Change Advisory Board]]
- [[Definition of Done]]
