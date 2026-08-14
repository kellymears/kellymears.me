---
aliases:
  - Don't remove the fence
tags:
  - method
summary: Do not remove something whose purpose you cannot explain.
---
**Chesterton's fence** is G. K. Chesterton's parable about reform: coming upon a fence across a road, the sensible reply to "I see no use for this, let us clear it away" is "go away and think. When you can come back and tell me that you do see the use of it, I may allow you to destroy it."

Applied to code, it argues against deleting a guard, a workaround, or an odd-looking line simply because its purpose is not evident. Much production code encodes constraints that are invisible from the code itself — a browser quirk, an ordering requirement, an upstream bug. Removing one produces a fault that looks unrelated and reappears months later. At an interface the fence may not be in the code at all: [[Hyrum's Law]] holds that with enough users every observable behavior — error wording, iteration order, timing, even a bug — is depended on by somebody, so a property with no visible purpose can still be load-bearing for a caller nobody can enumerate.

The productive form of the principle is not conservatism but *investigation*: find the reason, then decide. If the fence turns out to be a real constraint, that is exactly the fact worth recording — see [[Code Comment]], whose useful form answers "what breaks if you rewrite this?".

The principle has a mirror, and both are needed. A fence whose reason has expired should come down; keeping it forever is [[Technical Debt]] with a good story. And a fence nobody can explain because nobody wrote it down is why [[Documentation Rot]] is a correctness problem, not a tidiness one.

## See also
- [[Defensive Default]]
- [[Root Cause Analysis]]
- [[Naming]]
- [[Code Review]]
- [[Unreachable Code]]

## Related
- [[Plausible Mechanism]]
- [[Silent Failure]]
