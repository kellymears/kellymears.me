---
aliases:
  - Property Testing
  - Generative Testing
tags:
  - testing
summary: Asserting a general property that should hold for all inputs, then letting the framework generate many random inputs to try to break it.
---
**Property-based testing** flips the usual test-writing direction: instead of picking a specific input and asserting a specific expected output, the developer states a property that should hold across a whole class of inputs — "sorting a list twice gives the same result as sorting it once," "encoding then decoding returns the original value" — and the testing framework generates hundreds or thousands of random inputs to try to find one that violates it. QuickCheck (Haskell, 1999) originated the idea, and it's since been ported to nearly every language (fast-check for JS/TS, Hypothesis for Python, jqwik for Java).

The value over a hand-written [[Unit Test]] is coverage of the input space a human wouldn't think to write by hand — empty lists, deeply nested structures, unicode edge cases, numbers at overflow boundaries — because the generator explores the space mechanically rather than relying on a person's intuition for which few examples matter. When a generated input fails the property, most frameworks then "shrink" it: repeatedly simplify the failing input while it still fails, so instead of a report saying "this 4,000-element list with these specific values broke it," the framework hands back the smallest failing case it can find, often a two- or three-element list — turning an unreadable counterexample into a debuggable one.

The hard part is the one the technique's name is honest about: finding a property that's both true and non-trivial. "The function doesn't crash" is a property but a weak one; "output length equals input length" is stronger and easier to falsify accidentally, which is exactly what makes it worth checking. Properties are also naturally suited to catching the kind of bug a fixed example-based [[Unit Test]] suite structurally can't — one that only shows up for inputs nobody thought to write down — which is why property-based testing tends to pair with, rather than replace, a normal suite of specific example tests for documented behavior and known edge cases.

## See also
- [[Unit Test]]
- [[Assertion]]
- [[Mutation Testing]]
- [[Test Fixture]]
