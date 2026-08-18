---
aliases:
  - Perceived Affordance
tags:
  - design
summary: A property an object's design communicates about how it can be used, before any instruction is read.
---
**Affordance** is a term from perceptual psychology (James Gibson, 1966) for the action possibilities an object's physical properties suggest — a chair affords sitting, a handle affords pulling — independent of whether anyone consciously reasons about it. Don Norman's *The Design of Everyday Things* (1988) imported the term into design and, in the process, subtly narrowed it: Norman cared about *perceived* affordance, the cues a design gives about its use, which is why the term in UI contexts usually means "what does this look like it does" rather than Gibson's stricter "what can it actually do."

In interface work, affordance is the reason a raised, shadowed rectangle reads as clickable and a flat one doesn't, why an underline still signals "link" decades after blue underlined text stopped being the only way to make one, and why a horizontal scrollbar sliver at a container's edge tells you there's more to see without a single word of instruction. Skeuomorphic design leaned on affordance heavily by literally reproducing the visual cues of a physical object it was replacing — see [[Skeuomorphism]] — but affordance survives the flattening of visual style precisely because it's about the cue, not the realism.

The recurring failure is a false affordance: styling something to look clickable when it isn't, or removing the cue (flattening a button until it's indistinguishable from static text) while keeping the click behavior. Both break the same contract, just in opposite directions, and both are diagnosed the same way — watch a new user's first click, and see where their expectation and the interface's actual behavior part ways.

Affordance is downstream of the same perceptual machinery [[Gestalt Principles]] describes, and it's the reason a well-designed [[Design Token]] system (consistent shadow, consistent radius) keeps affordance legible across an entire product rather than only within one screen.

## See also
- [[Skeuomorphism]]
- [[Gestalt Principles]]
- [[Dark Pattern]]
- [[UI Primitive]]

## Related
- [[Fitts's Law]]
