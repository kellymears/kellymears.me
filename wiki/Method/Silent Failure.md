---
aliases:
  - Failing silently
tags:
  - method
summary: A failure that produces no signal, so the absence of an error reads as success.
---
A **silent failure** is one that produces no error, no log line, and no visible difference — so the system reports success while doing nothing. It is the most expensive class of bug because the cost is paid later, by someone who reasonably believed the thing worked.

Silent failures cluster around a few shapes. A configuration key the parser does not recognise is ignored rather than rejected. A glob pattern that matches zero files exits successfully — see [[Glob]]. A required secret that resolves to an empty string is passed along as an empty string. A style rule scoped to a selector that never matches simply does not apply. A write that names a field the storage layer does not know about is dropped.

The structural defence is to make the quiet path loud. Prefer a crash to a [[Defensive Default]] when a required value is missing. Assert that a check *can* fail before trusting it, per [[Falsifiability]]. Count matches before believing a search, per [[Truncation Bias]]. And when a gate is added, prove it reds on a deliberately broken input.

A type-level defence exists too. An operation returning a value that may be absent can say so in the type — an option or result rather than a bare value the caller is free to ignore — so the compiler rather than the reader enforces that the empty case is handled. That the chaining these types support obeys the [[Monad]] laws is incidental to the point; the point is that absence is made explicit.

The rhetorical version is just as costly: an "everything passes" claim assembled from checks that never ran. See [[Vacuous Truth]].

## See also
- [[Root Cause Analysis]]
- [[Ground Truth]]
- [[Fail Fast]]
- [[Observability]]
- [[Coverage Gate]]
