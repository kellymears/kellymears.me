---
aliases:
  - Stagger resistance
  - Hyper armor
tags:
  - play
summary: A stagger-resistance stat shown as a number on the equipment screen and governed by a formula the developer never published.
---
**Poise** is the stat that determines whether an attack staggers a character out of their current action or is absorbed without interrupting it. The number is not hidden — it appears on the character and armour screens in both *Dark Souls* and *Dark Souls III* — but the formula behind it was never published: the poise damage each attack deals and the thresholds where an animation breaks. Unlike [[Invincibility Frames]], which prevent damage outright, poise governs what damage does to a character's ability to keep acting — a failure state that breaks [[Game Feel]] harder than most, since it revokes control at the exact moment the player expected to keep it.

Players describe poise in three ways, though the categories are a reading rather than a settled taxonomy. As a **static value** tied to armor or build, hits subtract from a running total, and dropping below zero interrupts the animation. As **attack animation frames**, a heavy attack grants hyper armor only while those frames are active — interruptible at a swing's start, immune partway through — which makes it [[Frame Data]] under another name. As a **regenerating pool**, closer to stamina, it breaks under a sustained combo the way a [[Parry and Riposte]] window breaks under a mistimed guess. The distinction blurs in practice: *Dark Souls* poise already behaves as a pool, dropping on hit and refilling after a few seconds undamaged — the first and third readings are less two models than one seen at different distances.

Poise is the canonical case of a **load-bearing mechanic that shipped undocumented**. The definitive investigation ran in the [[Soulslike]] community on *Dark Souls III*, where roughly six months of contradictory testing was resolved by a Cheat Engine table watching values change in a running game — runtime memory inspection rather than the file [[Datamining]] that produces frame charts elsewhere. FromSoftware's answer was to change poise in patch 1.08 rather than document it. That it shaped [[Meta-Progression]] investment in armor for years before its rules were pinned down says as much about observed play's limits as the stat itself — and the breakpoints, once known, became exactly what a [[Metagame]] guide exists to publish.

## See also
- [[Datamining]]
- [[Frame Data]]
- [[Invincibility Frames]]
- [[Soulslike]]
- [[Meta-Progression]]
