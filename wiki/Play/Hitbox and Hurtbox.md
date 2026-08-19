---
aliases:
  - Hitbox
  - Hurtbox
tags:
  - play
summary: The two invisible shapes that actually decide a collision — a hitbox deals damage, a hurtbox receives it — and neither matches the sprite.
---
**Hitbox and Hurtbox** name the two collision shapes underneath every attack in an action or fighting game, and the distinction between them is the whole reason a hit lands or doesn't. A hitbox is the region that, if it overlaps something, deals damage — it exists only during an attack's active frames, and it's usually smaller and shorter-lived than the swinging sword or fist it's attached to. A hurtbox is the region that, if something's hitbox overlaps it, receives damage — it's tied to the character's whole body and is present essentially all the time the character can be hurt. Neither shape is the visible sprite; both are invisible rectangles or capsules the sprite is drawn over, sized by feel rather than by matching the art exactly.

This is where [[Frame Data]] and collision meet directly: a hitbox is only "live" during an attack's active-frame window, which is why an attack can visually connect on a screen a frame before or after it actually registers — the animation and the hitbox's activation aren't the same clock, and a fighting game's readability depends on keeping the gap between them small enough that players don't feel cheated by a visual hit that didn't count.

[[Invincibility Frames]] are the cleanest illustration of the pair's usefulness as a concept: an i-frame window is nothing more than a character's hurtbox switching off entirely for a span of frames, so hitboxes that would otherwise connect simply have nothing to collide with. This is also distinct from a character's ordinary movement-collision box, a third shape entirely, which governs whether two bodies can occupy the same space — a fighting game character can have hurtboxes overlapping an opponent's hitbox constantly while their movement-collision keeps them from ever actually touching.

## See also
- [[Frame Data]]
- [[Invincibility Frames]]
- [[Parry and Riposte]]
- [[Game Feel]]
