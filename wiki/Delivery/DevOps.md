---
aliases:
  - DevOps culture
  - CALMS
  - Wall of confusion
  - You build it, you run it
tags:
  - delivery
summary: The movement to break down the wall between the people who write software and the people who run it, through shared ownership, automation, and fast feedback from production.
---
**DevOps** is a movement, and a set of practices, aimed at closing the gap between software development and IT operations. In many organizations the two were separate teams with opposite incentives: developers were rewarded for shipping changes, operations for keeping systems stable, and the safest way to stay stable was to resist change. The handoff between them was called the **wall of confusion**: developers threw releases over it, and operations caught whatever broke.

The term came from a 2009 conference in Belgium, DevOpsDays, organized after a well-known talk that year from Flickr engineers describing ten or more deployments a day, made possible by developers and operations working together. The idea drew on earlier [[Agile Software Development]], which had sped up development but left deployment slow, and on lean manufacturing's focus on flow; see [[Kanban]].

A common summary is **CALMS**:

- **Culture.** Shared responsibility for outcomes rather than for separate stages, and learning from failure without blame; see [[Blameless Postmortem]].
- **Automation.** Builds, tests, infrastructure, and deployments done by machines, repeatably; see [[Continuous Integration]], [[Deployment Pipeline]], and [[Infrastructure as Code]].
- **Lean.** Small batches, limited work in progress, and attention to how work flows from idea to production.
- **Measurement.** Data on deployments, failures, and recovery to guide improvement; see [[DORA Metrics]].
- **Sharing.** Knowledge, tools, and on-call duty spread across the people who build and run the system.

A phrase from the same period captures the core: **"you build it, you run it."** Teams that are woken up by their own bugs write fewer of them, add better monitoring, and make deployment safer. It also shortens feedback: the people who can fix a problem see it first, instead of learning about it days later from a ticket passed between teams.

Research summarized in the 2018 book *Accelerate* found that high-performing teams deploy more often *and* have fewer failures and faster recovery. Speed and stability weren't a trade-off; small, frequent, automated changes improved both; see [[Continuous Deployment]].

DevOps has its critics and failure modes. It's often reduced to a job title or a toolchain, as if hiring "DevOps engineers" or buying a pipeline product made an organization DevOps. A separate "DevOps team" can simply rebuild the wall in a new place, which is one reason later approaches focus on how teams are organized; see [[Team Topologies]] and [[Platform Engineering]]. Asking every developer to own every layer can also overload them; see [[Cognitive Load]].

[[Site Reliability Engineering]] is often described as one concrete implementation of DevOps, with explicit reliability targets and limits on manual operations work.

## See also
- [[Conway's Law]]
- [[Pets vs Cattle]]
- [[Change Advisory Board]]
