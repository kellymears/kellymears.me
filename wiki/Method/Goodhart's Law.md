---
aliases:
  - Measure becomes target
tags:
  - method
summary: When a measure becomes a target, it stops being a good measure.
---
**Goodhart's law** — usually stated as *when a measure becomes a target, it ceases to be a good measure* — describes what happens when a proxy is optimised directly. The proxy was informative because it correlated with the thing you cared about; pressure on the proxy breaks the correlation.

Software is full of instances. A coverage percentage is a proxy for thoroughness; enforced as a target it produces tests written to touch lines rather than to specify behaviour, and annotations that exclude the hard parts. A green build is a proxy for correctness; treated as the goal it produces checks that cannot fail. A count of shipped items is a proxy for progress; treated as the goal it produces empty items reported as built.

There is a variant worth naming separately, because it bites when instructing any generative system: **the number in view becomes the number produced.** If a constraint says "at most two hundred characters", output clusters just under two hundred — the ceiling was read as the goal. Stating the intended target in the description and keeping the hard limit far away, as a runaway backstop rather than the visible figure, is the shape that works. See [[Anchoring Effect]] and [[Structured Output]].

The law is not confined to software. Any institution judged on a recorded count acquires an interest in the count, which is why crime statistics used as a management target attract reclassification rather than reduction — the dispute over [[Broken Windows Theory]] is partly a dispute about exactly this.

Goodhart is not an argument against measurement. It is an argument for keeping the measure and the goal distinguishable, and for expecting drift whenever they are collapsed.

## See also
- [[Coverage Gate]]
- [[Code Coverage]]
- [[Fail Fast]]
- [[Anchoring Effect]]
- [[Performance Budget]]
- [[Prompt Engineering]]
- [[Core Web Vitals]]

## Related
- [[Silent Failure]]
- [[Schema Validation]]
