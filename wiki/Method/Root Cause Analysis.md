---
aliases:
  - Root cause
tags:
  - method
summary: Escalating past the visible symptom until you find the layer that actually produced it.
---
**Root cause analysis** is the discipline of continuing to investigate a fault past the first plausible explanation, until you reach the layer that actually produced it. Its practical test is simple: if a fix does not fully clear the symptom, that is evidence you have not found the cause yet — not an invitation to add a second patch beside the first.

The failure mode it guards against is the **patch stack**: three defensive changes at three different layers, each of which addressed something real but none of which was the cause. Stacked patches are expensive twice over. They cost the round trips it took to write them, and they leave behind code whose purpose nobody can reconstruct — a future reader cannot tell a real constraint from a superstition. See [[Chesterton's Fence]] for the other half of that problem.

Root cause work depends on [[Ground Truth]]. A hypothesis about a cause is worth exactly as much as the observation behind it, so the move is usually to go get one measurement — the computed style, the network request, the actual bytes on disk — rather than to reason forward from what the code appears to say. [[Observability]] is what makes that measurement cheap.

The same instinct applies one level up. When a fix introduces a [[Regression]], the interesting question is not "what broke" but "what about the way I fixed it made this breakable". Fixing the substrate rather than the symptom is what keeps [[Technical Debt]] from compounding.

## See also
- [[Falsifiability]]
- [[Reproducible Case]]
- [[Silent Failure]]
- [[Plausible Mechanism]]
