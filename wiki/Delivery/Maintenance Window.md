---
aliases:
  - Scheduled downtime
  - Planned outage
  - Read-only mode
tags:
  - delivery
summary: A scheduled, announced period during which a service may be degraded or unavailable so that operators can make disruptive changes, a practice that zero-downtime techniques have reduced but not eliminated.
---
A **maintenance window** is a period agreed in advance during which a system may go offline or run in a reduced state so that its operators can make changes that would be risky or impossible while it is fully in use. Typical work includes database upgrades, hardware replacement, network changes and large data migrations; see [[Database Migration]].

Windows are usually placed when the fewest people are affected: late at night, on weekends, or at the low point of a service's daily traffic curve. For a business with customers in one region, that is easy to find. For a global service, the quietest hour for one continent is the busiest for another, so there may be no good time at all; see [[Time Zone]]. Operators also have to work at those hours, and fatigue during overnight changes is a known source of mistakes; see [[Circadian Rhythm]].

A well-run window follows a pattern:

- **Announce early.** Customers are told the date, the expected duration and what will be affected, often on a public page; see [[Status Page]].
- **Freeze other changes.** Unrelated work is held back so that, if something breaks, the cause is clear; see [[Code Freeze]].
- **Rehearse and plan the way back.** Steps are written and practiced, with a defined point at which the team abandons the change and restores the previous state; see [[Rollback]].
- **Degrade gracefully.** Where possible the service stays partly available, for example in **read-only mode**, letting users view data while writes are paused.

Many service level agreements exclude scheduled maintenance from the uptime they promise, which makes windows attractive to providers and less so to customers; see [[Service Level Objective]].

Windows also have predictable cadences in some ecosystems. Monthly security update days give administrators a known time to plan patching; see [[Patch Tuesday]]. Banks have traditionally scheduled core system work over weekends and holidays.

The trend over the past two decades has been to make windows unnecessary. Techniques such as running two environments and switching traffic between them, updating servers one at a time, and changing databases in backward-compatible steps let many services deploy many times a day without users noticing; see [[Zero-Downtime Deployment]] and [[Expand and Contract]]. Some kernels can even be patched while running; see [[Live Patching]].

Windows persist where these techniques are impractical: a single large database without replicas, embedded systems, older applications, or regulated environments where every change needs formal approval; see [[Change Advisory Board]]. The related debate about whether teams should avoid deploying on Fridays turns on the same question, whether to schedule risk around the people who must respond if a change fails or to make changes small and safe enough that timing matters less; see [[Small Batches]].

## See also
- [[Incident Response]]
- [[Configuration Drift]]
