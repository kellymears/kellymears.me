---
aliases:
  - DRY
  - Single source of truth
  - WET
tags:
  - method
summary: The rule that every piece of knowledge in a system should have one authoritative representation, so a change happens in one place, often misread as a ban on similar-looking code and over-applied into tangled abstractions.
---
**Don't repeat yourself**, or **DRY**, is the rule that every piece of knowledge in a system should live in exactly one place. Andy Hunt and Dave Thomas stated it in The Pragmatic Programmer in 1999: every piece of knowledge must have a single, unambiguous, authoritative representation within a system. When a fact is written down twice, the copies eventually disagree, and nobody knows which one is right.

The rule is about knowledge, not text. A tax rate, a validation rule, the shape of a record, or the list of supported currencies each count as one piece of knowledge. If the tax rate appears in the billing code, the invoice template, and a test, changing it means finding all three, and missing one produces a bug that looks like it came from nowhere. The usual remedy is a **single source of truth**: one definition that everything else reads or is generated from; see [[Code generation]].

The same principle runs well beyond code:

- **Databases.** Storing the same fact in two rows invites them to drift, which is the problem normalization solves; see [[Database Normalization]].
- **Documentation.** Prose that restates what code does goes stale the moment the code changes; see [[Documentation Rot]] and [[Code Comment]].
- **Caches.** A cache is a deliberate copy, and keeping it in sync with the original is notoriously hard; see [[Cache Invalidation]].
- **Configuration.** Servers described in a single definition, instead of configured by hand one at a time, stay consistent; see [[Infrastructure as Code]].

The opposite style has a joking acronym, **WET**, read as "write everything twice" or "we enjoy typing."

DRY is also one of the most over-applied rules in programming. Two pieces of code that look alike aren't necessarily the same knowledge. They may simply resemble each other today and need to change for different reasons tomorrow. Merging them couples things that should stay independent, and the shared function sprouts flags and special cases to serve both callers. Sandi Metz put it this way: duplication is far cheaper than the wrong abstraction; see [[Leaky Abstraction]].

A common heuristic is to tolerate duplication until a third copy appears, by which point the real pattern is visible; see [[Rule of three]]. Extracting too early is a version of building for imagined needs; see [[You Aren't Gonna Need It]]. Good names matter too, since an abstraction nobody can describe in a phrase probably bundles several ideas together; see [[Naming]].

Duplication is a debt with interest that's easy to misjudge in either direction; see [[Technical Debt]]. The useful question is never "do these lines look the same?" but "if this fact changed, how many places would I have to edit?"

## See also
- [[Premature Optimization]]
- [[Gall's Law]]
- [[Data Silo]]
