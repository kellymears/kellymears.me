---
aliases:
  - Fuzz testing
  - Fuzzer
  - Coverage-guided fuzzing
  - AFL
tags:
  - testing
summary: Feeding a program huge volumes of random or mutated input to find the crashes, hangs, and security holes no one thought to test for.
---
**Fuzzing** tests a program by throwing enormous amounts of unexpected input at it and watching for crashes, hangs, assertion failures, and memory errors. A human writing tests checks the inputs they thought of. A fuzzer checks millions they didn't. Barton Miller coined the term in 1988, after line noise on a dial-up connection during a thunderstorm crashed the Unix utilities he was using. His class then fed random input to standard Unix tools and crashed roughly a quarter of them.

Purely random input finds shallow bugs quickly but rarely gets past the first check in a parser, since random bytes almost never form a valid header. Modern fuzzers are smarter:

- **Mutation-based** fuzzers start from a corpus of valid sample files and flip bits, splice inputs together, and insert interesting values such as zero, -1, and maximum integers.
- **Coverage-guided** fuzzers, popularized by American Fuzzy Lop (AFL) and libFuzzer, use [[Instrumentation]] to observe which code paths each input reaches and keep any input that discovers new ones as a seed for further mutation. The fuzzer evolves inputs that burrow steadily deeper into the program, an approach close to [[Mutation Testing]] turned on the input rather than the code.
- **Grammar-based** fuzzers generate inputs from a description of the format, so they always get past the parser and test the logic behind it.

Fuzzing pairs with sanitizers, compiler options that turn silent memory corruption into immediate crashes, since a buffer overflow that doesn't crash is invisible to a fuzzer. When a fuzzer finds a failure, it *minimizes* the input to the smallest one that still triggers it, producing a [[Reproducible Case]]. That is the same shrinking step [[Property-Based Testing]] performs. The two sit on a spectrum: property tests generate structured inputs and check a stated property, while fuzzers generate raw inputs and check that nothing breaks.

Fuzzing is a major source of security fixes, because parsers of untrusted input, such as image decoders, font renderers, network protocols, and file formats, are where attackers aim. Google's OSS-Fuzz has run continuous fuzzing on open source projects since 2016 and found tens of thousands of bugs. It strengthens [[Supply Chain Security]] in a quiet way, catching flaws in the libraries everyone depends on. The input fuzzers reach for first, with malformed lengths, bad [[Character Encoding]], and deep nesting, is a list of the assumptions [[Postel's Law]] invites programs to make.

## See also
- [[Property-Based Testing]]
- [[Mutation Testing]]
- [[Instrumentation]]
- [[Reproducible Case]]
- [[Supply Chain Security]]
- [[Cross-Site Scripting]]
- [[Code Coverage]]
- [[Differential Testing]]
