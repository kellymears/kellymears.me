---
aliases:
  - Robustness Principle
tags:
  - method
summary: Be conservative in what you produce, liberal in what you accept — a design rule for interoperating systems.
---
**Postel's Law**, also called the robustness principle, instructs a system's implementation to be conservative in what it sends and liberal in what it accepts from others. Jon Postel wrote it into the original TCP specification, and it quietly shaped how the early internet's protocols tolerated the inevitable bugs in each other's implementations — a client that tolerates a slightly malformed header from a buggy server keeps the network working even when not every implementation is perfect.

The mechanism is asymmetric on purpose: you have full control over what you emit, so hold that side to the strict letter of the spec; you have no control over what arrives, so accept anything that's a reasonable interpretation of the spec even if it isn't a perfect one, rather than rejecting on a technicality. HTML parsing is the law's most famous embodiment — browsers accept catastrophically malformed markup (unclosed tags, wrong nesting) and quietly guess intent, which is precisely why the web tolerated a generation of hand-written HTML from people who'd never read a spec, and why it's still enormously hard to write a fully conformant HTML parser today.

The law has also aged into a genuine controversy, and it's worth knowing the counter-argument rather than treating it as unopposed wisdom. Being liberal in what you accept means tolerating inputs the spec never sanctioned, and those inputs become a de facto second spec the moment enough senders rely on the tolerance — see [[Hyrum's Law]]: with enough users of an interface, every observable behavior, including the lenient parsing quirks, becomes something someone depends on. Security-sensitive protocols have moved the other direction entirely, toward strict parsing and rejecting anything ambiguous, because a lenient parser is also an attacker's most reliable tool for smuggling something malformed past a filter that expected well-formed input.

The modern synthesis is roughly: be liberal when the cost of an accepted edge case is confusion, and strict when the cost is a vulnerability — the law was never meant to be applied uniformly, only where robustness against honest bugs outweighs robustness against adversarial ones.

## See also
- [[Hyrum's Law]]
- [[Defensive Default]]
- [[Fail Fast]]
- [[Design System]]

## Related
- [[Worse Is Better]]
