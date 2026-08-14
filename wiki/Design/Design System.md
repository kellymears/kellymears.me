---
aliases:
  - Component library
tags:
  - design
summary: A shared vocabulary of tokens, primitives, and rules that makes independent work converge.
---
A **design system** is the combination of a token set, a component library, and the conventions governing their use — the shared vocabulary that lets many people build interfaces that look and behave as one thing.

Its purpose is to *close drift vectors*. Every place where a value can be typed freely is a place two people will choose differently, so a system works by replacing free values with enumerated ones: not any color but a named role, not any spacing but a scale step, not any markup but a typed primitive. Where an escape hatch remains — an arbitrary class name, an inline style, a raw element with hand-written styling — drift reappears there, and it reappears fastest under the pressure of shipping.

That is why the strictest systems ban the escape hatches outright rather than discouraging them. Removing a free-form styling prop is unpopular and effective: the styling then has to be expressible through typed properties, which means the system has to grow to accommodate real needs rather than being routed around.

The maintenance question is not whether the system covers everything but whether extending it is easier than bypassing it. When it is not, people bypass it, and the bypass is invisible to any check that only inspects the sanctioned path.

## See also
- [[Design Token]]
- [[UI Primitive]]
- [[Headless Component]]
- [[Naming]]
- [[Taxonomy]]
- [[Utility-First CSS]]
- [[Container Query]]
- [[Typographic Scale]]

## Related
- [[Plain Language]]
