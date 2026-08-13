---
aliases:
  - Globbing
  - Wildcard
  - Pathspec
tags:
  - systems
summary: Wildcard pattern matching over filenames, similar enough to regular expressions to mislead.
---
A **glob** is a wildcard pattern for matching paths: an asterisk matching within a segment, a double asterisk matching across segments, a question mark matching one character, and brackets enclosing a character class.

Globs resemble regular expressions and behave differently in ways that produce silent, confident errors.

**Bracket syntax is a character class.** A path containing literal square brackets — a routing convention in several frameworks uses them — is parsed as a set of characters, so the pattern matches nothing and any rule attached to it never applies. There is no error; the configuration block is simply inert.

**Leading-directory matching applies only to literal patterns.** In several tools a bare directory path means "everything under it", but the moment the pattern contains a wildcard it is matched against the *whole* path — so a pattern ending at a directory name matches zero files, forever, and any check built on it passes on every input.

**Zero matches is success.** A command whose pattern matched nothing exits cleanly, so a gate built on it reads as a guarantee.

The habit that closes all three: enumerate what the pattern matches before relying on it. Listing the matched files is a one-second command and converts an assumption into a count. See [[Vacuous Truth]] and [[Silent Failure]].

## See also
- [[Shell]]
- [[Truncation Bias]]
- [[Falsifiability]]

## Related
- [[Ground Truth]]
- [[Exhaustive Claim]]
- [[Coverage Gate]]
- [[Root Cause Analysis]]
