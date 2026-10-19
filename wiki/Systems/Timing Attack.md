---
aliases:
  - Constant-time programming
  - Constant-time code
  - Cache timing attack
tags:
  - systems
summary: Learning a secret by measuring how long a computation takes, because code that branches, exits early or touches memory differently depending on secret data leaks it through time, which is why cryptographic code is written to run in constant time.
---
A **timing attack** recovers secret information by measuring how long operations take. If the time a computation needs depends on a secret, such as a password, a key or which memory a program touched, then careful measurement can reveal the secret even when every output looks correct. It's a classic side channel, information leaking through a physical effect of computing rather than through the data a program returns; see [[Speculative Execution]].

The simplest example is checking a password or authentication code one character at a time and returning as soon as a character doesn't match. A guess with the right first character takes slightly longer to reject than one with the wrong first character. By trying every possibility for each position and keeping the slowest, an attacker learns the secret one character at a time, needing guesses in proportion to its length rather than to every combination; see [[Combinatorial explosion]]. The fix is to compare every byte regardless and combine the results, so the time no longer depends on where the first mismatch falls.

Paul Kocher published the first widely known attacks on cryptography in 1996, showing that the time taken by RSA and Diffie-Hellman computations leaked private keys, because the arithmetic does extra work for each one bit in the key; see [[Public-Key Cryptography]] and [[Diffie-Hellman Key Exchange]]. In 2003 researchers showed such attacks worked across a local network against a web server's TLS implementation, despite the noise of networking, because averaging many measurements cancels random delay; see [[Transport Layer Security]] and [[Law of Large Numbers]].

Caches made the problem harder. A program that looks up a table entry chosen by a secret leaves that entry in the processor cache, and another program on the same machine can tell which entries are cached by timing its own memory accesses. Cache timing attacks recovered AES keys from table-based implementations and later underpinned Spectre and Meltdown; see [[Locality of Reference]] and [[Simultaneous Multithreading]].

The defense is **constant-time programming**. Cryptographic code avoids branches, early exits and memory addresses that depend on secret values, using arithmetic tricks such as masks instead of if-statements; see [[Bitwise Operation]]. It's subtle work, since a [[Compiler]] may reintroduce a branch while optimizing and processors may vary instruction timing with operand values, so libraries inspect their output and newer processors offer modes that promise data-independent timing. Dedicated AES instructions removed the table lookups altogether.

Coarser clocks help too. After Spectre, browsers reduced the precision of their high-resolution timers and restricted shared memory, which attackers had used to build fine-grained clocks of their own; see [[Monotonic Clock]].

Related channels measure power use, electromagnetic emissions or sound instead of time, and can extract keys from smart cards by watching current draw during a single operation; see [[Air Gap]].

## See also
- [[Rowhammer]]
- [[Hash Function]]
