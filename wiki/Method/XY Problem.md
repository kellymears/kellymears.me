---
aliases:
  - X-Y Problem
tags:
  - method
summary: Asking for help with your attempted solution (Y) instead of your actual problem (X), so the help solves the wrong thing.
---
**XY Problem** is what happens when someone has problem X, guesses that solution Y would solve it, and then asks for help with Y — without ever mentioning X. The people helping now optimize for the wrong target: they can answer the Y question perfectly and still leave the asker no closer to solving X, because X was never on the table.

The classic example: someone wants to find the extension of a file (X), decides the way to do that is to grab the last three characters of the filename (Y), and asks "how do I get the last three characters of a string?" A helpful answer to that literal question breaks the moment a filename doesn't have a three-letter extension — a problem the asker never has to encounter if someone had just answered X directly. The asker isn't being deceptive; they've simply already done the diagnostic work in their head and only surfaced the output.

The failure mode is symmetric between asker and helper. The asker's job is to disclose X even when Y feels like the "real" question — stating the goal, not just the step, costs one extra sentence and saves the whole exchange. The helper's job is to notice when a question smells like a means rather than an end, and ask "what are you actually trying to do?" before answering the literal ask; a good rule of thumb is any question containing an oddly specific constraint ("...but it has to use regex" / "...without touching that file") is worth one clarifying question before you comply with the constraint.

This is close kin to [[Chesterton's Fence]] in structure — both are about the cost of acting on the visible instruction without recovering the invisible reasoning behind it — but XY is specifically about a *request* whose framing hides its own motivation, where Chesterton's Fence is about a *decision* whose framing hides its own history.

## See also
- [[Chesterton's Fence]]
- [[Root Cause Analysis]]
- [[Rubber Duck Debugging]]
- [[Occam's Razor]]

## Related
- [[Streetlight Effect]]
