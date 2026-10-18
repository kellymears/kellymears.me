---
aliases:
  - Buffer overflow
  - Use-after-free
  - Memory-safe language
  - Out-of-bounds read
tags:
  - systems
summary: The guarantee that a program only touches memory it is entitled to, the property whose absence causes most serious security vulnerabilities in C and C++ software.
---
**Memory safety** is the property that a program only reads and writes memory it is entitled to: within the bounds of the objects it owns, and only while those objects exist. Languages that enforce it rule out a whole class of bugs. C and C++ do not, and the result is the largest single source of serious security vulnerabilities.

The main failure modes:

- **Buffer overflow.** Writing past the end of an array overwrites whatever comes next, which may be another variable, heap metadata, or a return address on the [[Call Stack]].
- **Out-of-bounds read.** Reading past the end leaks adjacent data. Heartbleed (2014) let anyone ask OpenSSL to echo back up to 64 kilobytes of server memory, including private keys.
- **Use-after-free.** Using a pointer after the memory it points to has been released and reused, so the program reads or writes someone else's data.
- **Double free and uninitialized reads**, which corrupt the allocator or expose stale contents.

The consequences are severe because these bugs give attackers control, not just crashes. The Morris worm of 1988 spread through a buffer overflow in the `fingerd` daemon. Microsoft reported in 2019 that about 70% of the vulnerabilities it fixed each year were memory safety bugs, and the Chromium project reported a similar share of its serious bugs. In C and C++ these are also [[Sanitizer|undefined behavior]], so the compiler may optimize on the assumption that they never happen.

Memory-safe languages close the gap in different ways. Garbage-collected languages, such as Java, Go, Python, and JavaScript, check bounds at runtime and free memory only when nothing references it, through [[Garbage Collection]] or [[Reference Counting]]. Rust achieves safety without a garbage collector through [[Ownership and Borrowing]], checked at compile time, and confines unchecked operations to code explicitly marked `unsafe`.

Rewriting everything isn't practical, so the industry works on several fronts. Mitigations such as [[Address Space Layout Randomization]] and stack canaries make exploitation harder without removing bugs. [[Fuzzing]] combined with AddressSanitizer finds bugs before attackers do. Hardware is adding checks: Arm's memory tagging extension marks memory and pointers with matching tags, and the CHERI research architecture replaces raw pointers with bounds-carrying capabilities.

The most effective strategy so far has been writing *new* code in memory-safe languages. Vulnerabilities concentrate in new and recently changed code, so old code that is well tested matters less. Google reported in 2024 that memory safety bugs in Android fell from 76% of its vulnerabilities in 2019 to 24%, mostly because new code was written in Rust and Kotlin. Government security agencies in the United States and elsewhere have since urged software makers to publish roadmaps toward memory-safe languages, treating it as part of [[Supply Chain Security]].

## See also
- [[Address Space Layout Randomization]]
- [[Ownership and Borrowing]]
- [[Sanitizer]]
- [[Integer Overflow]]
- [[Abstract Interpretation]]
