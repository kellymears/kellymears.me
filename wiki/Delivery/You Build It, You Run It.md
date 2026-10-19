---
aliases:
  - You build it you run it
  - Service ownership
tags:
  - delivery
summary: The principle that the team that builds a piece of software should also operate it in production, including being on call for it, so that the people who can fix problems are the ones who feel them.
---
**You build it, you run it** is the principle that a team building a piece of software should also be responsible for operating it in production: deploying it, monitoring it, and being woken up when it breaks. The phrase comes from a 2006 interview with Werner Vogels, Amazon's chief technology officer, describing how the company had organized its engineering teams around services each team owned completely.

It was a reaction to a traditional split. In many organizations, developers wrote code and handed it to a separate operations team to deploy and keep running. The arrangement created poor incentives. Developers were rewarded for shipping features and rarely saw the consequences of fragile code. Operators bore those consequences but couldn't change the code. The handoff was often described as throwing software over the wall; see [[DevOps]].

Putting developers on call changes what they notice. A team that gets paged at three in the morning when its service falls over has a strong, direct reason to make the service reliable, add good monitoring, and fix recurring problems rather than work around them; see [[Feedback Loop]] and [[Observability]]. The people best equipped to fix a problem are the ones who feel it. Vogels described the contact with day-to-day operation as also bringing developers closer to their customers.

The principle has costs. Being on call is stressful, and a team with an unreliable service or noisy alerts can burn out quickly; see [[Alarm fatigue]]. Teams also need operational skills that pure developers may lack, and every team repeating the same infrastructure work is wasteful. Organizations often respond by building shared internal platforms that handle deployment, monitoring, and infrastructure, so product teams can own their services without building everything themselves; see [[Platform Engineering]].

There are alternative models. Google's approach places specialized reliability engineers alongside product teams, sharing responsibility through agreed reliability targets; if a service exceeds its error budget, the reliability team can hand operational duty back to the developers; see [[Site Reliability Engineering]] and [[Service Level Objective]]. This keeps some separation while preserving the incentive.

The principle fits naturally with small teams owning independent services, since a team can only run what it clearly owns; see [[Two-Pizza Team]] and [[Microservices]]. It also reflects the observation that systems mirror their organizations: giving one team end-to-end responsibility shapes services with clear boundaries; see [[Conway's Law]] and [[Team Topologies]].

At its core, the principle is about aligning incentives, ensuring the people making decisions bear their consequences; see [[Principal-Agent Problem]]. The same idea treats servers as replaceable rather than hand-tended, making operations a matter of automation rather than heroics; see [[Pets vs Cattle]].

## See also
- [[Incident Response]]
- [[Spotify Model]]
