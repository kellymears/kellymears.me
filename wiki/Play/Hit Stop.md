---
aliases:
  - Hitstop
  - Hit pause
  - Hitlag
  - Screen shake
tags:
  - play
summary: A freeze of a few frames at the moment an attack connects, one of the main tricks that make hits feel heavy, often combined with screen shake, flashes, and sound, and also a timing window in fighting games.
---
**Hit stop** is a brief freeze, usually a few frames, at the moment an attack connects. Both the attacker and the target pause, then motion resumes. It lasts well under a tenth of a second, and players rarely notice it consciously, but without it hits feel weightless, like swinging through air.

The freeze works the way an impact feels in the world: a blade or bat that strikes something solid is momentarily stopped by it. Animators exaggerate the same moment with held poses and impact frames; see [[Twelve Basic Principles of Animation]]. In games, the pause gives the eye time to register what happened before the target reacts.

Fighting games made hit stop precise:

- **Scaled to force.** Light attacks freeze briefly and heavy ones longer. The *Super Smash Bros.* series scales its hitlag with the damage dealt.
- **A window for decisions.** The freeze gives players time to see that an attack landed and choose a follow-up, called hit-confirming, and lets the game accept the next input early; see [[Input buffering]].
- **Part of the numbers.** Freeze frames count in the timing tables that competitive players study; see [[Frame Data]] and [[Fighting Game]].

Hit stop is usually one layer of a stack of effects, often called juice:

- **Screen shake**, which jolts the camera on impact. Jan Willem Nijman of the studio Vlambeer gave a 2013 talk, "The Art of Screenshake," showing a dull shooter turned exciting purely through feedback like this.
- **Flashes** on the target, sparks, and particles.
- **Sound**, often the most important layer.
- **Controller rumble**; see [[Haptic Feedback]].

Together they create the sense of physical weight discussed under [[Game Feel]].

Implementation is mostly a matter of time. Games run on a loop that advances the world by a time step each frame, and hit stop sets that step to zero, or slows it, for the affected characters; see [[Game Loop]]. Freezing only the participants while the rest of the world moves keeps the effect local. Online play complicates it, since both machines must agree on when the freeze began; see [[Rollback Netcode]].

The pitfalls come from excess. Long or frequent freezes break the rhythm of fast combat, and in games with many small hits, such as horde shooters, constant pauses become stutter. Screen shake and flashes can cause discomfort or nausea, and flashing can trigger seizures in people with photosensitive epilepsy, so options to reduce or disable them are good practice; see [[Reduced Motion]].

Hit stop pairs with clear warnings before attacks, so that both the setup and the payoff read clearly; see [[Telegraphing]]. Parry systems often use an extended freeze to reward a perfectly timed block; see [[Parry and Riposte]].

## See also
- [[Hitbox and Hurtbox]]
- [[Easing]]
