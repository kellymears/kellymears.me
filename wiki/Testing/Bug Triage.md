---
aliases:
  - Bug report
  - Issue triage
  - Severity and priority
  - Defect triage
tags:
  - testing
summary: Sorting incoming bug reports by how bad they are and how soon they matter, so a team spends its limited attention on the defects that count.
---
**Bug triage** is the routine of reviewing incoming bug reports and deciding what happens to each one: fix now, fix later, ask for more information, or close. The word comes from battlefield medicine, where medics sorted the wounded into those who would survive without help, those who would not survive with it, and those for whom treatment made the difference. Software has the same arithmetic. There are always more reports than time, and the job is to find the ones where effort changes the outcome.

A good **bug report** makes triage fast. It states what happened, what was expected, the exact steps, and the environment: version, browser, operating system. Better still is a [[Minimal Reproducible Example]]. Logs, a [[Call Stack|stack trace]], or a screenshot help; "it doesn't work" does not. Many teams use templates so reporters supply these up front.

Triage usually separates two measures that are easy to blur:

- **Severity** is how bad the bug is when it happens: data loss, a crash, a security hole, a wrong number, a cosmetic glitch.
- **Priority** is how soon it should be fixed, which also weighs how many people hit it, whether a workaround exists, and what else is on fire.

They diverge often. A crash in a feature nobody uses can be high severity and low priority. A typo in the company name on the home page is low severity and fixed today. Security bugs are the main exception to calm sorting; a credible [[Penetration Testing|vulnerability report]] skips the queue and goes through [[Incident Response]].

The typical triage pass works through the new queue:

- **Reproduce it.** Unreproducible reports go back to the reporter with specific questions. Intermittent ones may be a [[Heisenbug]] or a [[Race Condition]].
- **Deduplicate.** Popular bugs arrive many times. Merging them keeps the discussion in one place and gives a rough count of how many people are affected, though counts suffer from [[Selection Bias]], since only some users report anything.
- **Classify and route.** Label the area, set severity and priority, and assign an owner. Tools like [[Code Owners]] files make routing automatic.
- **Close honestly.** "Won't fix" and "working as intended" are legitimate outcomes. A backlog of thousands of untouched reports is not a plan, only a record of decisions not made.

Crash reporters such as those in [[Crash Reporting]] do part of this automatically, grouping identical crashes and ranking them by how many users they hit. Triage also feeds [[Risk-Based Testing]]: areas that keep producing severe bugs deserve more tests, and a fixed bug should leave behind a [[Regression Testing|regression test]].

## See also
- [[Mars Pathfinder Priority Inversion]]
- [[Post Office Horizon Scandal]]
- [[Product Backlog]]
- [[Issue Tracker]]
