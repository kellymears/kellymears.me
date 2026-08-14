---
aliases:
  - i-frames
  - Iframes
tags:
  - play
summary: The animation window during which a character is immune to hits despite appearing vulnerable on screen.
---
**Invincibility frames** — i-frames — are the span of an animation during which a character cannot be hit, regardless of what the sprite or model appears to be doing. The practice predates the genres now built around it, and the name arrived long afterward, from communities fluent enough in frame counting to measure the window: arcade cabinets granted a few seconds of immunity after a continue so a respawning player was not killed on sight by an enemy still occupying the spawn point, a courtesy against unfair loss rather than a combat tool.

The **dodge roll** is the modern carrier. A roll's duration splits into startup, an active i-frame window, and recovery, and only the middle segment is safe — the animation looks identical from a distance whether the player is inside that window or not. [[Soulslike]] design makes the window's length a stat: equip load or point investment shortens or lengthens it, so the same roll performed by a heavy build and a light one clears a different number of frames of the same attack. Fast [[Roguelike]] runs and dodge-heavy [[Metroidvania]] traversal both lean on the same window, tuned tighter for a faster, more repeatable read.

This is why i-frames convert dodging into a **timing problem rather than a spacing problem**. A player reasoning about distance is solving the wrong equation — an attack's hitbox can occupy the exact space the character rolls through and still miss, provided the press landed inside the window and not a beat early or late. That precision is exactly what [[Frame Data]] formalizes, and it rewards the same read-and-react discipline as a [[Parry and Riposte]], with the opposite risk profile: a parry cancels the attack, a dodge only cancels its consequence. Window lengths are rarely documented and get established the way [[Poise]] values were, by the [[Datamining]] community working from frame-by-frame video capture and runtime memory inspection rather than extracted files — the same discipline that lets [[Speedrun]] routes exploit windows that outlast their purpose. [[Game Feel]] governs whether the edges feel fair; [[Determinism]] lets a player trust that identical timing produces identical outcomes twice.

## See also
- [[Frame Data]]
- [[Poise]]
- [[Parry and Riposte]]
- [[Soulslike]]
- [[Game Feel]]
