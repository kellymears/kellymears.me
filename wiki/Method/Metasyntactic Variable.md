---
aliases:
  - Foo and bar
  - Placeholder name
tags:
  - method
summary: a placeholder identifier chosen to carry no meaning of its own.
---
A **metasyntactic variable** is a placeholder name used in an example, template, or explanation where the identity of the thing named does not matter — only its role. English computing culture settled on `foo` and `bar` (with `baz` and further nonsense words as more slots are needed); other traditions developed their own sets independently, among them `toto` in French-language examples and `hoge` in Japanese ones. None of these names encode any property of what they stand for, which is the entire point.

A popular derivation traces `foo` and `bar` to the WWII army slang acronym FUBAR. The hedge belongs on only half of that. `Foo` on its own is older, attested throughout Bill Holman's *Smokey Stover* comic strips from the 1930s and so predating the acronym; an account making FUBAR the sole source of the word is [[Folk Etymology]]. The pairing is a separate claim, and both RFC 3092 and the Jargon File accept it — the specific coupling of `foo` with `bar` was probably shaped by FUBAR, even though the nonsense word it drew on was already in circulation.

The reason the convention matters is what it protects against. A real-sounding placeholder — `userID`, `orderTotal` — smuggles a domain assumption into an example that is supposed to be about structure, not content, costing the reader effort resolving a meaning that was never intended to exist. Naming is normally the discipline of choosing an identifier that states its contract, as covered under [[Naming]]; a metasyntactic variable is the deliberate exception, built to state nothing.

Because each set arose locally, the choice of `foo`, `toto`, or `hoge` in a given codebase or textbook works as an informal marker of which teaching tradition produced it, in something like the way a dialect word functions as a [[Shibboleth]] for a speech community. The sets rarely mix within one example; picking one and using it consistently is itself a small act of legibility.

## See also
- [[Naming]]
- [[Folk Etymology]]
- [[Shibboleth]]
- [[Reproducible Case]]
- [[Linguistic Relativity]]

## Related
- [[Prototype Theory]]
- [[Grammatical Gender]]
- [[Taxonomy]]
- [[Plausible Mechanism]]
- [[Plain Language]]
