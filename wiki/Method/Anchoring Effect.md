---
aliases:
  - Anchoring
tags:
  - method
summary: A stated number pulls subsequent estimates toward it, regardless of relevance.
---
The **anchoring effect** is a cognitive bias in which an initially presented number disproportionately influences later judgements, even when the anchor is arbitrary. It was described in the behavioural-economics literature of the 1970s and has proved durable across domains.

It matters in interface and instruction design because anchors are easy to introduce accidentally. A placeholder value in a form is an anchor. A default in a settings panel is an anchor. An example in documentation is an anchor — readers reproduce the example's shape long after the surrounding prose has told them not to.

The same effect appears when instructing a [[Large Language Model]]. A schema field described as "maximum four hundred characters" reliably produces output near four hundred characters, because the only number in the field's description is the ceiling. The mitigation is to state the intended length as the target and keep any hard cap out of the visible description, purely as a backstop. Ceilings that double as guidance become goals — the [[Goodhart's Law]] variant.

Anchoring also explains why an early, confident wrong diagnosis is so expensive: subsequent investigation tends to orbit it rather than start over. Deliberately restating the problem from the observations, without the first hypothesis in view, is the cheap counter-move. A vivid number crowds out an unstated one in the same way, which is where anchoring meets the [[Base Rate Fallacy]]: a witness's 80% reliability or a test's 99% accuracy fixes the estimate, while how common the thing being judged actually is goes unused despite mattering just as much.

## See also
- [[Prompt Engineering]]
- [[Structured Output]]
- [[Root Cause Analysis]]
- [[Plausible Mechanism]]

## Related
- [[Tool Use]]
- [[Nondeterminism]]
- [[System Prompt]]
