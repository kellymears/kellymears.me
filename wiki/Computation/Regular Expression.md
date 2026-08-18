---
aliases:
  - Regex
  - Regexp
tags:
  - computation
summary: A pattern language for matching text, compiled internally into a finite state machine that runs over the input.
---
**Regular Expression** describes a pattern over text — literal characters, wildcards, repetition, alternation — that a matching engine compiles into a [[Finite State Machine]] and runs over the input one character at a time. `\d{3}-\d{4}` compiles to a machine with states for "seen 0 digits," "seen 1 digit," and so on, transitioning on each input character and accepting if it lands in a final state at the pattern's end — the pattern is notation, the FSM is the actual mechanism doing the matching.

This compiled-FSM origin is also the source of a regex's fundamental limit: a *true* regular expression, in the formal-language-theory sense, can only recognize what a finite state machine can, which provably excludes anything requiring unbounded memory to check — matching balanced parentheses or nested tags needs to count nesting depth, which has no bound a finite number of states can hold. This is the real content behind "you can't parse HTML with regex" — not a stylistic objection, a theorem.

What most programming languages call "regex" (PCRE and its descendants: Perl's, Python's `re`, JavaScript's) isn't a true regular expression anymore — backreferences (`\1`, referring back to an earlier captured group) and lookahead/lookbehind assertions push the engine's matching algorithm to backtracking, which is strictly more powerful than a finite automaton and, on an adversarial input, can take exponential time to fail to match — the ReDoS (regex denial of service) vulnerability class, where a pattern that looks innocuous hangs a server on a crafted string of a few dozen characters. RE2 (Google's library) and Rust's `regex` crate deliberately give up backreferences to guarantee linear-time matching, trading expressive power for a hard performance ceiling that can't be blown by any input.

## See also
- [[Finite State Machine]]
- [[Pattern Matching]]
- [[Trie]]
- [[Determinism]]
